# Changelog SEO orgánico (ops desde repo)

Formato: `YYYY-MM-DD` · qué · cómo. Una viñeta por cambio.

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
