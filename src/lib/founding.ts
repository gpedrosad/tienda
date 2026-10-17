/**
 * Año de fundación de Idea Madera.
 * Gonzalo lo fijó el 2026-10-17: la única antigüedad permitida es
 * «desde 1993» o los años cumplidos desde ese año (33 en 2026).
 */
export const FOUNDING_YEAR = 1993;

export function yearsSinceFounding(year = new Date().getFullYear()): number {
  return year - FOUNDING_YEAR;
}

/** "1993". Schema `foundingDate` y el stat de año de fundación. */
export const FOUNDING_YEAR_LABEL = String(FOUNDING_YEAR);

/** "desde 1993" */
export const SINCE_FOUNDING = `desde ${FOUNDING_YEAR}`;

/** "Desde 1993" */
export const SINCE_FOUNDING_LABEL = `Desde ${FOUNDING_YEAR}`;

/** "33 años" en 2026. Se calcula al cargar el módulo (build y render). */
export const YEARS_SINCE_FOUNDING_LABEL = `${yearsSinceFounding()} años`;

export const tallerFamiliarStat = {
  value: SINCE_FOUNDING_LABEL,
  label: "Taller familiar",
} as const;
