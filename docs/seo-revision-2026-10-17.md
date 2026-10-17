# Revisión SEO + conversión · 2026-10-17

Revisión multi-modelo dirigida por Claude Opus 5.5 (diseño de encargos, verificación en código y síntesis).
Fuente de métricas: `docs/gsc-informe-2026-10-17.md` (20 sep → 17 oct; serie diaria cerrada el **15 oct**).

| Frente | Modelo | Resultado |
|---|---|---|
| A · Datos GSC (3 cortes) | Grok 4.7 Medium Fast (Cursor) | 13 hallazgos |
| B · SEO técnico | GPT-5.3 Codex (Codex CLI, read-only) | 8 hallazgos |
| B' · SEO técnico (ciego a B) | Grok 4.7 High (Cursor) | 14 hallazgos |
| C · Conversión / UX | Grok 4.7 Extra High (Cursor) | 10 hallazgos |
| Verificación + priorización | Claude Opus 5.5 | ver abajo |

## 1. Lectura de los datos

| Métrica | 6 sep | 25 sep | 17 oct |
|---|---:|---:|---:|
| Clics | 201 | 179 | **224** |
| Impresiones | 9.698 | 5.862 | **10.076** |
| CTR | 2,07% | 3,05% | 2,22% |
| Posición media | 9,6 | 11,5 | **9,0** |
| CTR no marca | 0,97% | 1,63% | 1,29% |

- Crecen las landings de servicio: `/muebles-chillan` 30 clics / 620 imp, `/kit-pergola` 26 / 1.209, `/puertas-a-medida` 17 / 725, `/cubiertas-a-medida` 15 / 502, `/peldanos-a-medida` 12 / 319, cocina Chillán 13 / 273.
- Kentucky pasó de 0 a 8 clics (pos. 2,1).
- La home www baja en los tres cortes (69 → 52 → 46 clics).
- **Huecos de CTR grandes:** `veladores de madera` 1 / 1.114 imp en pos. 3,6 (CTR 0,09%); `/guias/medidas-mesa-comedor` 5 / 1.059 (0,47%); `mesa ratona` 0 / 212 en pos. 6,6 (tercer corte seguido en 0 clics).

**Advertencia de lectura:** los lotes 11–17 y la mejora UX se publicaron entre el 11 y el 17 oct. La serie termina el 15 oct, así que este corte es **línea base**, no evaluación de esos lotes. Los titles de veladores, guía de comedor y ratona que vio Google son los anteriores al lote 16.

## 2. Hallazgos confirmados y priorizados

Leyenda de fuente: A = Grok datos, B = Codex, B' = Grok técnico, C = Grok UX, O = Opus. ✔ = verificado en código.

### Congelar (no tocar hasta corte ≥14 días post 16 oct, ~5 nov)

Titles/meta de `/collections/veladores`, `/guias/medidas-mesa-comedor`, `mesa-tripode-ratona`, `/puertas-a-medida`, `silla-kentucky` y guía de sillas. Reescribirlos ahora destruye la medición del lote 16. (A; B' proponía cambiarlos ya → descartado por timing.)

### P0 — Datos falsos o inconsistentes publicados (bajo esfuerzo)

| # | Hallazgo | Fuente | Evidencia |
|---|---|---|---|
| 1 | FAQ de **todas las fichas** pregunta "¿Hacen envíos fuera de **Santiago**?" (taller en Chillán); también en JSON-LD | B', O ✔ | `src/app/products/[handle]/page.tsx:171` |
| 2 | Schema de servicios emite `Offer` sin `price`, `InStock` y plazos de 15 + 3–10 días que la página no promete | B, B' ✔ | `src/lib/seo.ts:328-335` |
| 3 | Quiénes somos: "+3.000 clientes", "3.000+ clientes satisfechos", "ahorrándote hasta un 50%" sin fuente | C ✔ | `src/lib/service-landings.ts:1258,1278,1342` |
| 4 | FAQ y schema de `/mesas-de-centro` prometen Bali, Seúl y Taipei con foto y precio; no tienen `imageUrl` | B, B' ✔ | `src/app/mesas-de-centro/page.tsx:66` |
| 5 | Plazo contradictorio: home dice "envío 15 días hábiles"; acordeón de ficha, envío 15 + fabricación 15; constantes, 15 + 3–10 | C ✔ | `src/lib/seo.ts:11-12,25`; `Accordion.tsx:14,26` |
| 6 | Guías: `datePublished` = `dateModified`, fallback `new Date()` y fecha distinta a la del sitemap (17 oct vs 5 oct) | B, B' ✔ | `src/lib/guides.ts:119-120,273,291` |
| 7 | HowTo del kit con `totalTime: PT4H` sin respaldo visible | B' ✔ | `src/app/kit-pergola/page.tsx:222` |

### P1 — Conversión en páginas con tráfico

| # | Hallazgo | Fuente | Evidencia |
|---|---|---|---|
| 8 | Hero de colección: botón "Ver filtros" → `/#catalogo` (saca al usuario a la home). En veladores (1.291 imp) hay 1 solo producto visible | C ✔ | `src/app/collections/[handle]/page.tsx:190-195` |
| 9 | Guía de medidas de comedor: único CTA al final; el cuerpo no enlaza mesas ni `/mesas-de-comedor-a-medida` | C ✔ | `GuidePage.tsx:160` |
| 10 | `/mesas-de-centro`: el botón del hero "Ver todas las mesas" lleva a la colección de comedor | C ✔ | `src/app/mesas-de-centro/page.tsx:175-178,287` |
| 11 | Kit pérgola: title "Kit para Armar Pérgola de Madera 3×3" vs oferta real (uniones, sin maderas). **4 de 4 modelos** lo marcan | A, B, B', C | `src/app/kit-pergola/page.tsx:16-18` |
| 12 | Home: botón del hero dice "Contáctanos" (no "Cotizar") | C ✔ | `HeroBanner.tsx:50` |

### P2 — Rendimiento y limpieza

| # | Hallazgo | Fuente |
|---|---|---|
| 13 | `GuidePage` es `"use client"` sin estado ni eventos → hidratación innecesaria | B ✔ |
| 14 | `ProductCard`: `sizes` 50vw en grilla de 1 columna y sin `priority` en la primera tarjeta | B |
| 15 | `/blog/*` y `/blogs/*` redirigen a `/` en vez de `/guias` | B' |
| 16 | Title de cocinas Chillán se recorta solo (69 → 51 chars); escribir el final | B' |
| 17 | Botones de catálogo "Consultar" con ~40 px de alto (tap target) | C |

## 3. Descartado o pendiente de decisión

| Propuesta | Modelo | Decisión |
|---|---|---|
| Mover `gtag` a `afterInteractive` | B, B' | **Descartado:** el commit `1765042` lo puso en el head a propósito para arreglar `page_view` de GA4 |
| Sacar "Chillán" del title de la home | A | **Descartado:** `muebles chillan` convierte 9,65% en la home; riesgo de perder los clics sin garantía de que migren |
| Agregar `shippingRate` al Offer de producto | B' | **Requiere dato real** de costo de despacho; no inventar |
| CTA antes de la foto en el hero móvil de landings | C | **Decisión del dueño:** contradice "foto antes en móvil" de `f05b62b` (hoy) |
| Cambiar titles congelados ya | B' | **Postergado** a ~5 nov |
| Acción sobre apex `ideamadera.cl` (415 imp) | A | **Sin acción:** Google ya canoniza www; revisar enlaces externos/GBP si persiste |
| Foto de `velador-tokio` | A, B' | **Asset humano**; duplicaría la colección de veladores |

## 4. Concordancia entre modelos

| Tema | Codex | Grok técnico | Grok datos | Grok UX |
|---|:-:|:-:|:-:|:-:|
| Offer de servicio | ✔ | ✔ | | |
| FAQ mesas de centro | ✔ | ✔ | | |
| Fechas de guías | ✔ | ✔ | | |
| Kit pérgola title/oferta | ✔ | ✔ | ✔ | ✔ |
| Veladores (CTR / 1 producto) | ✔ | ✔ | ✔ | ✔ |
| gtag en head | ✔ | ✔ | | |
| FAQ "Santiago" | | ✔ | | |
| Claims sin fuente quiénes somos | | | | ✔ |

Codex: menos hallazgos, más precisos (0 falsos). Grok técnico: más amplio, pero proponía cambiar titles recién publicados. Grok datos: el único que detectó el corte del 15 oct y recomendó congelar. Grok UX: aportó los hallazgos que nadie más vio (claims, hero de colección, plazos).

## 5. Próximo corte

- ~**5 nov 2026**: `npm run gsc:report:md` y medir veladores, guía comedor, ratona, puertas, kentucky con ≥14 días del lote 16.
- Pedir en ese informe los pares consulta+página de veladores, guía comedor y ratona (hoy no salen en la tabla).
