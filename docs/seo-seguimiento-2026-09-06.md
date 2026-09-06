# Seguimiento SEO — 6 de septiembre de 2026

Plan: `docs/plan-seo-kimi3-2026-09-06.md`. Fuente de totales: `docs/gsc-informe-2026-09-06.md` (API, `dataState` del informe). Baseline normalizado de 28 días inclusivos: `docs/gsc-base-plan-kimi3-2026-09-06.json`.

WhatsApp desde orgánico: **no medido** (evento `whatsapp_click` en código; falta DebugView / informe GA4). Leads cualificados y ventas: **pendiente del negocio**.

## Ventanas

| Etiqueta | Fechas | Clics | Impresiones | CTR | Pos. media | Nota |
|---|---|---:|---:|---:|---:|---|
| Informe 6 sep (script) | 9 ago–6 sep | 201 | 9.698 | 2,07% | 9,6 | Etiqueta “28 días”; inclusivo son 29 |
| Baseline normalizado | 8 ago–4 sep | 207 | 9.984 | 2,073% | 9,640 | Usar para experimentos |
| Comparación normalizada | 11 jul–7 ago | 125 | 4.173 | 2,995% | 11,125 | Misma longitud |

Última fila diaria del informe: **4 sep**. No mezclar las dos ventanas actuales.

## Chile vs mundo (informe 9 ago–6 sep)

| Ámbito | Clics | Impresiones | CTR | Pos. |
|---|---:|---:|---:|---:|
| Chile | 195 | 9.505 | 2,05% | 9,6 |
| Mundo (total informe) | 201 | 9.698 | 2,07% | 9,6 |

## Dispositivo (informe)

| Dispositivo | Clics | Impresiones | CTR | Pos. |
|---|---:|---:|---:|---:|
| Móvil | 118 | 6.487 | 1,82% | 7,8 |
| Escritorio | 81 | 3.142 | 2,58% | 13,6 |
| Tablet | 2 | 69 | 2,90% | 6,3 |

## No marca observado

El corte marca/no marca del informe suma **65 clics** (4 marca + 61 no marca) frente a **201** totales. Cobertura parcial / anonimización. CTR no marca observado: **0,97%** (61/6.273). No afirmar que el resto es marca.

## URLs intervenidas (código 6 sep; deploy pendiente)

| URL | Clics | Imp | CTR | Pos. | Cambio | Pub. | Recrawl |
|---|---:|---:|---:|---:|---|---|---|
| `/collections/mesas` | 0 | 3.614 | 0% | 7,9 | Title + intro/FAQ | Pendiente | Pendiente GSC UI |
| `/products/mesa-tripode-ratona` | 1 | 227 | 0,44% | 7,2 | Title + nombre | Pendiente | Pendiente |
| `/products/silla-kentucky` | 0 | 117 | 0% | 3,2 | Title | Pendiente | Pendiente |
| `/products/mesa-centro-roma` | 0 | 101 | 0% | 3,5 | Title living vs comedor | Pendiente | Pendiente |
| `/products/mesa-nordica` | 2 | 264 | 0,76% | 20,2 | Title + medidas | Pendiente | Pendiente |
| `/cubiertas-a-medida` | 6 | 436 | 1,38% | 7,9 | Mesones quincho | Pendiente | Pendiente |
| `/kit-pergola` | 27 | 749 | 3,60% | 7,1 | Exclusiones | Pendiente | Pendiente |
| `/` | 69 | 1.429 | 4,83% | 10,6 | H1 + bloque Chillán | Pendiente | Pendiente |
| `/puertas-a-medida` | 14 | 427 | 3,28% | 9,5 | Alcance hoja / vano | Pendiente | Pendiente |
| `/molduras-a-medida` | 9 | 132 | 6,82% | 8,0 | Perfil y cotización | Pendiente | Pendiente |
| `/peldanos-a-medida` | 4 | 163 | 2,45% | 9,8 | Huellas, no escalera | Pendiente | Pendiente |
| `/mesas-de-centro` | 0 | 111 | 0% | 8,5 | Redirects legacy → aquí | Pendiente | — |

Cifras = informe 9 ago–6 sep. No son post-cambio.

## Peldaños: caída 10 → 4 clics

En el mismo informe: 4 clics / 163 imp ahora vs 10 clics / ~213 imp antes (−6 clics, −50 imp). Seis clics en un sitio chico no justifican reescritura. Decisión: aclarar alcance (huellas, no obra completa) y no tocar title/H1. Revaluar en la siguiente ventana de 28 días comparables.

## Indexabilidad / canonical

- Canónico de código: `https://www.ideamadera.cl`.
- El informe aún lista impresiones en `ideamadera.cl` (4 filas de URL). Apex → www es 308 de plataforma; no es prueba de redirect roto.
- Sitemap “0 indexadas” del API: campo `indexed` obsoleto. No usar como alerta.
- Colecciones vacías: `noindex,follow` en código (lote anterior).
- Productos sin `imageUrl`: 26, no indexables. Sin fotos nuevas.

## Próxima comprobación

Tras deploy: anotar fecha de publicación, solicitar indexación en GSC UI (lista de URLs de arriba) y no declarar resultado SEO antes de ~28 días post-recrawl. Siguiente archivo: `docs/seo-seguimiento-YYYY-MM-DD.md`.
