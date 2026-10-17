/** Mesas de comedor (para sentarse a comer). No incluye mesas de centro ni arrimos. */
export const DINING_TABLE_IDS = new Set([
  "mesa-nordica",
  "mesa-comedor-tripode",
  "mesa-comedor-liguria",
  "mesa-comedor-genova",
  "mesa-comedor-frida",
  "mesa-comedor-frida-negra",
  "mesa-comedor-niza",
  "mesa-comedor-tripode-redonda",
  "mesa-comedor-redonda-ferrara",
  "mesa-frida-redonda",
  "mesa-tripode-redonda-negra",
  "mesa-comedor-tripode-negra",
  "mesa-comedor-roma-negra",
  "mesa-comedor-roma-natural",
  "mesa-comedor-cantabria",
  "mesa-comedor-redonda-novara",
  "mesa-comedor-bolonia",
  "mesa-comedor-osaka",
  "mesa-comedor-luisa",
  "mesa-comedor-praga",
]);

/** Mesas de centro que publican largo, fondo y alto. Son las de la guía de medidas. */
export const COFFEE_TABLE_WITH_SIZES = new Set([
  "mesa-centro-roma",
  "mesa-centro-ferrara",
  "mesa-centro-hairpin",
  "mesa-tripode-ratona",
]);

export function isDiningTableId(id: string) {
  return DINING_TABLE_IDS.has(id);
}

export function showsCoffeeTableGuide(id: string) {
  return COFFEE_TABLE_WITH_SIZES.has(id);
}
