# Changelog SEO orgánico (ops desde repo)

Formato: `YYYY-MM-DD` · qué · cómo. Una viñeta por cambio.

## 2026-09-06

- **Plan Kimi3 P0+P1 parcial:** GSC fechas inclusivas; Osaka = asiento alto; colecciones vacías `noindex`; lastmod artificial fuera; reseñas 4,9/200 retiradas; garantía **2 meses** (no 12); claim 3.200+ proyectos retirado. **SEO-06** `/collections/mesas`. **SEO-07** ratona, Kentucky, Roma, nórdica. **SEO-09** cubiertas, puertas, molduras, peldaños (texto). **SEO-10** kit exclusiones. **SEO-11** H1 home + bloque Chillán. **SEO-02** `docs/seo-seguimiento-2026-09-06.md`. **SEO-04** redirects `mesas-de-centro`/`mesas-ratona` → `/mesas-de-centro`.
- **GA4 Data API:** OAuth readonly + `npm run ga:report` sobre `properties/552969056` (stream `G-KBR6DKMXVM`). Token en `.secrets/ga-oauth-token.json`.

## 2026-08-04

- **GSC reevaluación:** 98 clics · 3.533 imp · CTR 2,77% · pos. 11,6 (vs baseline 23 jul: 63 / 2.675 / 2,36% / 12,4). Informe `docs/gsc-informe-2026-08-04.md`. Landings servicio suben; PDPs CTR-gap aún flojos (`mesa ratona` 170 imp / 0 clics).

## 2026-08-02

- **CTR + CWV:** titles/metas reforzados en mesa nórdica, mesa ratona, colecciones clave y landings Chillán/servicio; GTM + Facebook Pixel pasan a carga diferida por interacción o espera.

## 2026-07-28

- **GSC Product snippets:** `/kit-pergola` — JSON-LD `Product` sin `price` → `Service` (cotización WhatsApp). Cierra error crítico «price / priceSpecification.price en offers».

## 2026-07-23

- **Landing molduras:** `/molduras-a-medida` (config + page + footer/nav + redirects `/molduras`, `/pages/molduras`).
- **Landings locales:** `/muebles-chillan`, `/muebles-de-cocina-chillan` (queries Chillán / cocina).
- **GSC OAuth:** scripts `gsc:auth` / `gsc:report` / `gsc:report:md`; `.env.local` + symlink `.secrets`; propiedad `sc-domain:ideamadera.cl`.
- **Informe:** `docs/gsc-informe-2026-07-23.md` (63 clics · 2.675 imp · CTR 2,36% · pos. 12,4).
- **Diagnóstico:** `docs/seo-diagnostico-completo-2026-07-23.md`.
- **CTR P0:** `seoTitle`/`seoDescription` + shortPitch — mesa-tripode-ratona, mesa-nordica, mesa-centro-roma, silla-kentucky.
- **Schema:** removidos `aggregateRating`/`review` genéricos del Product JSON-LD; badge PDP → Chillán/envío.
- **Redirects:** `/products/mesa-madera`, `/products/futon-madera-modelo-noruega`, `/products/g800065l`.
- **Middleware:** strip `?page=1` en colecciones y params Shopify `pr_*` en productos.
- **Local SEO:** hero brand + Chillán; quiénes somos / cubiertas / puertas con Chillán.
- **GSC write:** `gsc:sitemap` — eliminado sitemap sin www; enviado `https://www.ideamadera.cl/sitemap.xml`; inspección top URLs OK.
- **Self-learn:** carpeta `self-learn/seo/` creada.
- Eval post-metas: [EVAL.md](./EVAL.md).

## 2026-07-17 (aprox.)

- Landings: cubiertas, puertas, quiénes somos, contacto (+ refactor peldaños).
- Redirects Shopify pages/collections (mesas-de-comedor, etc.).
- SEO titles colecciones (`collection-seo.ts`) y generador productos (`product-seo.ts`).
- Sitemap ampliado a landings de servicio.

## 2026-07-01

- Plan histórico GSC: `SEO_GSC_EXECUTION_PLAN_2026-07-01.md` (baseline pre-crecimiento).
