# Ejecución plan Kimi3 — estado

Plan: `docs/plan-seo-kimi3-2026-09-06.md`. Actualizado: 2026-09-06.

## Lote hecho (sin commit hasta autorización)

### SEO-XX — Garantía y claims
- Estado: hecho (garantía) / parcial (claims)
- Cambio: garantía publicada = **2 meses** (`WARRANTY_MONTHS` en `seo.ts`, SocialProof, FAQ home/PDP, Accordion). Retirado “3.200+ proyectos”.
- Siguiente: confirmar resto de políticas (plazos, 30 días cambios) con el negocio.

### SEO-01 — Medición GSC
- Estado: hecho (núcleo)
- Archivos: `scripts/lib/gsc-dates.mjs`, `scripts/gsc-report.mjs`, `scripts/gsc-report-md.mjs`
- Pendiente: query+page a 2.500; muestra URL Inspection 8–12.

### SEO-03 / SEO-05 / SEO-08 / SEO-13
- Estado: hecho
- Colecciones vacías noindex; sitemap sin lastmod inventado; Osaka = asiento alto; reseñas 4,9/200 fuera.

### SEO-06 — Colección mesas
- Estado: hecho (código)
- Title: `Mesas de madera para comedor y living` (+ plantilla `| Idea Madera`)
- Intro, guía, FAQ, links a `/mesas-de-centro` y `/comedores-nordicos`, CTA WhatsApp.
- Evaluación: pendiente recrawl + 28d comparables.

### SEO-07 — Ratona, Kentucky, Roma, nórdica
- Estado: hecho (snippet + ficha de las 4)
- Roma: `Mesa de centro Roma de madera` · Nórdica: `Mesa nórdica de madera: medidas y terminación`

### SEO-09 — Cubiertas, puertas, molduras, peldaños
- Estado: hecho (texto; sin fotos de obra nuevas)
- Cubiertas: mesones para quincho + checklist. Sin claims de calor/intemperie.
- Puertas: hoja vs marco/herrajes/instalación; interior/exterior; foto del vano.
- Molduras: perfil/sección, largo, terminación; sin catálogo ficticio.
- Peldaños: huellas, no escalera completa. Title/H1 sin reescritura (caída 10→4 clics no justifica).

### SEO-10 — Kit pérgola
- Estado: hecho (exclusiones y datos para cotizar, ya visibles en hero)

### SEO-11 — Home y Chillán
- Estado: hecho (H1 home temático + bloque local; landing Chillán = taller/fábrica)

### SEO-02 — Tablero
- Estado: hecho (`docs/seo-seguimiento-2026-09-06.md`). WhatsApp orgánico y ventas: pendiente.

### SEO-04 — Redirects
- Estado: hecho (matriz + destinos equivalentes)
- `/collections/mesas-de-centro` y `/collections/mesas-ratona` → `/mesas-de-centro`.
- Matriz: `docs/seo-matriz-redirects.md`.

### SEO-15 — WhatsApp → gtag
- Estado: en código, sin DebugView.

## No hecho
SEO-12 (fotos), SEO-14 (validación Rich Results), SEO-16–18. Fotos de obra en landings.

## Siguiente paso
1. Commitear y desplegar este lote.
2. GSC UI: solicitar indexación de mesas, ratona, Kentucky, Roma, nórdica, cubiertas, kit, home, puertas, molduras, peldaños.
3. Fotos de obra o catálogo (SEO-12) cuando existan archivos.
