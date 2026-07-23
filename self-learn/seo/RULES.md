# SEO · reglas

## Alcance

- **Orgánico:** home, colecciones, productos con imagen, landings de servicio (`/peldanos-a-medida`, `/cubiertas-a-medida`, `/puertas-a-medida`, `/quienes-somos`, `/contacto`), `/ofertas`.
- **No indexar:** `/api/*` (robots). Productos **sin** `imageUrl` no entran al sitemap ni a `generateStaticParams`.
- No hace falta Meta Pixel / GTM / Ads / OpenAI para operar GSC.

## Host y canónicos

- Canónico: `https://www.ideamadera.cl` (`SITE_URL` en `src/lib/seo.ts`).
- Apex `ideamadera.cl` → `www` (308 a nivel plataforma).
- **Nunca** construir URLs SEO absolutas desde `host` / `x-forwarded-host`. Usar `SITE_URL`.
- Enlaces internos y schema: siempre www.
- Sitemap en GSC: solo `https://www.ideamadera.cl/sitemap.xml` (no el sin www).

## Productos y catálogo

- Una URL por producto: `/products/{handle|id}`.
- Title: query principal al inicio; ~50–60 chars + ` | Idea Madera`.
- Preferir `seoTitle` / `seoDescription` en el producto si hay query GSC con impresiones y CTR bajo.
- Schema Product: Offer + shipping OK. **No** inventar `aggregateRating` / `review` sin reseñas verificables.
- No generar params Shopify (`pr_*`). Middleware los limpia si llegan.

## Colecciones

- Canonical limpio: `/collections/{handle}` (sin `?page=1`).
- Middleware redirige `?page=1` → URL limpia.
- Titles en `collection-seo.ts` (keywords comerciales, no solo el nombre de categoría).

## Landings de servicio

- Modelo de referencia: `/peldanos-a-medida` (mejor CTR de contenido).
- Cubiertas / molduras / puertas / muebles-chillan / muebles-de-cocina-chillan / quiénes somos / contacto: mismo componente `ServiceLandingPage`.
- Incluir Chillán + envío Chile cuando sea natural (queries locales).

## Redirects

- Legacy Shopify → ruta nueva con **301/308** en `next.config.ts`.
- Preferir destino específico (colección/producto/landing) antes que home.
- Soft duplicates / URLs rotas del índice GSC → redirect, no 404.

## Contenido nuevo

- No crear decenas de URLs nuevas mientras productos con impresiones tengan CTR 0%.
- Prioridad: ganar clic en URLs ya vistas → fotos a productos sin imagen → profundizar landings → guías/blog.

## GSC ops

- Readonly: `gsc:report` / `gsc:report:md`.
- Escritura sitemaps: `gsc:sitemap` (token write separado).
- Si `invalid_grant` → re-auth correspondiente.
- La API **no** solicita indexación masiva; URL Inspection en UI para forzar recrawl puntual.
