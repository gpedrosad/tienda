import type { Product } from "@/data/products";
import { formatCLP, getProductPath } from "@/lib/whatsapp";

export const REPISA_J60_ID = "repisa-j60";
export const REPISA_J60_MIN_CM = 40;
export const REPISA_J60_MAX_CM = 200;

/** Tramos con precio cerrado. La pendiente entre ellos es $20.000 cada 30 cm. */
export const REPISA_J60_PRESETS = [
  { cm: 60, price: 69990 },
  { cm: 90, price: 89990 },
  { cm: 120, price: 109990 },
] as const;

export type RepisaLengthMode = "60" | "90" | "120" | "custom";

const BASE_CM = 60;
const BASE_PRICE = 69990;
const SLOPE_NUM = 20000;
const SLOPE_DEN = 30;

export function isRepisaJ60Length(value: number) {
  return Number.isInteger(value) && value >= REPISA_J60_MIN_CM && value <= REPISA_J60_MAX_CM;
}

/**
 * Interpola entre 60, 90 y 120 cm y extrapola con la misma pendiente
 * ($20.000 / 30 cm) fuera de ese tramo. Redondea hacia arriba al precio
 * que termina en 990.
 */
export function repisaJ60Price(lengthCm: number) {
  if (!Number.isInteger(lengthCm)) {
    throw new Error("El largo de la repisa se calcula en centímetros enteros.");
  }

  const numerator = BASE_PRICE * SLOPE_DEN + (lengthCm - BASE_CM) * SLOPE_NUM;
  const target = numerator - SLOPE_DEN * 990;
  const denom = 1000 * SLOPE_DEN;
  const k = target <= 0 ? 0 : Math.floor((target + denom - 1) / denom);
  return k * 1000 + 990;
}

export function buildRepisaJ60WhatsAppMessage(
  product: Pick<Product, "id" | "handle" | "name" | "finish">,
  origin: string,
  lengthCm: number,
  price: number,
  custom: boolean,
) {
  const cleanOrigin = origin.replace(/\/$/, "");
  const largo = custom ? `${lengthCm} cm (a medida)` : `${lengthCm} cm`;

  return [
    "Hola Idea Madera",
    `Me interesa cotizar: ${product.name}`,
    `Largo: ${largo}`,
    `Precio referencia: ${formatCLP(price)}`,
    `Link: ${cleanOrigin}${getProductPath(product)}`,
    "",
    "Cantidad:",
    "Comuna (o retiro en taller):",
    product.finish ? `Terminación (${product.finish.toLowerCase()}):` : "Terminación:",
  ].join("\n");
}
