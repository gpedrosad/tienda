// Helper compartido de fechas para los reportes de Search Console.
//
// GSC trabaja con fechas de calendario en hora del Pacifico (PT). Para que el
// UTC del servidor no cambie el dia pedido, "hoy" se calcula en la zona
// America/Los_Angeles y las ventanas se arman con componentes de calendario
// (getFullYear/getMonth/getDate), nunca con aritmetica UTC ni toISOString.

const GSC_TIMEZONE = "America/Los_Angeles";
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const DAY_MS = 86400000;

export function todayInPacific() {
  return new Date(new Date().toLocaleString("en-US", { timeZone: GSC_TIMEZONE }));
}

export function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function shiftDays(date, days) {
  const shifted = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  shifted.setDate(shifted.getDate() + days);
  return shifted;
}

export function inclusiveDays(start, end) {
  return Math.round((end.getTime() - start.getTime()) / DAY_MS) + 1;
}

function parseCliDate(value, flag) {
  if (!DATE_PATTERN.test(value)) {
    throw new Error(`${flag} debe tener formato YYYY-MM-DD (recibido: "${value}").`);
  }
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
    throw new Error(`${flag} no es una fecha de calendario valida: "${value}".`);
  }
  return date;
}

// Resuelve la ventana del reporte. Si argv trae --start=YYYY-MM-DD y
// --end=YYYY-MM-DD (siempre juntos), esas fechas tienen prioridad; si no, la
// ventana es de `days` dias inclusivos terminando hoy (PT).
export function resolveReportWindow(argv, days) {
  const startFlag = argv.find((arg) => arg.startsWith("--start="));
  const endFlag = argv.find((arg) => arg.startsWith("--end="));

  if (startFlag !== undefined || endFlag !== undefined) {
    if (startFlag === undefined || endFlag === undefined) {
      throw new Error("Debes pasar --start y --end juntos, o ninguno.");
    }
    const start = parseCliDate(startFlag.slice("--start=".length), "--start");
    const end = parseCliDate(endFlag.slice("--end=".length), "--end");
    if (start.getTime() > end.getTime()) {
      throw new Error("--start no puede ser posterior a --end.");
    }
    return { start, end, days: inclusiveDays(start, end), source: "cli" };
  }

  const end = todayInPacific();
  const start = shiftDays(end, -(days - 1));
  return { start, end, days, source: "days" };
}

// Periodo anterior de igual largo: termina el dia anterior a `start`.
export function previousWindow(start, end) {
  const days = inclusiveDays(start, end);
  const prevEnd = shiftDays(start, -1);
  const prevStart = shiftDays(prevEnd, -(days - 1));
  return { prevStart, prevEnd };
}
