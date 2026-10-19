# Changelog SEO orgánico (ops desde repo)

Formato: `YYYY-MM-DD` · qué · cómo. Una viñeta por cambio.

## 2026-10-19

- **Lote 19:** primera tarjeta de colección con `priority` y `sizes` de la grilla real (home sin priority). `GuidePage` pasa a Server Component; First Load JS de `/guias/medidas-mesa-comedor` 136 kB → 117 kB, HTML de las guías igual. `/mesas-de-comedor-a-medida`: sección con medidas del catálogo (solo `products.ts` y la guía), `updatedAt` 2026-10-19. `/collections/mesas` enlaza `/guias/medidas-mesa-de-centro`. Sitemap con `image:loc` (74 `<loc>` iguales). Detalle: `SEO-CHANGELOG.md`.
- **Analytics solo en producción:** GA4, GTM, Pixel y conversiones de Meta (`/api/facebook-whatsapp`) solo cargan/envían en `www.ideamadera.cl` y no en navegadores automatizados (`src/lib/analytics-host.ts`). Antes, localhost y previews contaban como visitas (13 sesiones de `localhost` en GA4 el 17–18 oct). GA4 recién mide bien desde el 17 oct (fix `1765042`); antes, 1 sesión en 6 semanas.

## 2026-10-18

- **Lote 18:** intro y meta de `/collections/sillas` distinguen Milán Lenga (comedor) de Kentucky (silla de descanso); title y H1 iguales. `/kit-pergola`: title `Kit de Uniones Metálicas para Pérgola 3×3 | Sin Maderas` (55), meta 142, H1 «Kit de uniones metálicas para pérgola 3×3, sin maderas». Guía de medidas: CTA «Cotizar por WhatsApp» tras la tabla y bullets con `InlineLinkedText` a `/collections/mesas` y `/mesas-de-comedor-a-medida`; title y meta congelados. `/mesas-de-centro`: hero «Cotizar mesa ratona» y relacionado a `/products/mesa-tripode-ratona`. 308 de `/blog`, `/blog/:path*`, `/blogs` y `/blogs/:path*` → `/guias`. lastmod `2026-10-18` en sillas, comedores nórdicos, guía de sillas, kit, guía de medidas y mesas de centro. Detalle: `SEO-CHANGELOG.md`.
- **Silla Kentucky no es de comedor** (confirmado por el dueño): ficha, seoTitle/meta y features como silla de descanso de listones; fuera de `/comedores-nordicos`, de la guía de sillas de comedor y de la meta de `/collections/sillas`; relacionados ya no ofrecen mesas de comedor (`NON_DINING_CHAIR_IDS`). Rompe el congelamiento de su title a propósito (dato falso).
- **Fotos de producto:** `ui/ProductImage` decide por foto si llena el marco o se muestra completa sobre fondo desenfocado (`src/lib/image-fit.ts`, medidas en `src/data/image-dimensions.json` vía `npm run images:dims`). Galería cuadrada en móvil; en escritorio 4:3 si la mayoría de sus fotos son horizontales. Tarjetas 4:3 → cuadradas. Visor sin estirar fotos de baja resolución.

## 2026-10-17

- **UX L1–L8** (`docs/specs-ux-grok-2026-10-17.md`, Grok 4.7 High + revisión Opus): sistema de botones (`ui/Button`, `ui/WhatsAppCTA`, contraste AA, tracking en todos los wa.me); ficha con CTA en primer pantallazo, IVA incluido, retiro en taller; home 12 productos + "Ver todo"; colecciones con productos arriba; guías con tabla primero y CTA intermedio; landings sin repetición en hero; kit con sticky; nav "A medida" + Kit pérgola. Sin cambios de title/meta ni borrado de texto indexable (FAQ y bloques ocultos siguen en config).
- **Revisión 17 oct (P0):** quiénes somos sin "+3.000 clientes" ni "hasta 50%"; FAQ de fichas sin "fuera de Santiago"; plazo único "15 días hábiles en total" de fabricación (home, acordeón, ficha); Service sin `Offer` sin precio (landings, guías, kit); kit sin `HowTo.totalTime`; guías con `datePublished`/`dateModified` reales (sin `new Date()`), misma fecha en sitemap y pantalla; FAQ mesas-de-centro solo con modelos con foto; colecciones sin botón "Ver filtros" → `/#catalogo`. Informe: `docs/seo-revision-2026-10-17.md`.
- **Lote 17:** claims de antigüedad alineados a «desde 1993 / 33 años» (Gonzalo, 2026-10-17; `FOUNDING_YEAR` = 1993 en `src/lib/founding.ts`; el arreglo del Lote 15 no había salido); lastmod por `updatedAt` fijo; enlaces del pie a puertas, peldaños y mesas a medida; guía `/guias/medidas-mesa-de-centro` y `/guias/madera-para-meson-quincho`. Detalle: `SEO-CHANGELOG.md`.
- **Ronda 2:** páginas `/puertas-de-madera-con-vidrio`, `/puertas-para-locales`, `/peldanos-flotantes` y `/mesas-de-comedor-a-medida` (WhatsApp, enlaces de clúster, sitemap por descubrimiento). Alt, lazy y nombres de 28 fotos de catálogo con redirect. Oportunidades en `docs/seo-oportunidades-ronda2.md`. Sin precios ni cambios de antigüedad.
- **SEO técnico:** sitemap descubre `page.tsx` nuevas; titles ≤60 y metas ≤155; alt de producto con datos reales; búsqueda solo enlaza fichas con foto; un `<main>` por página. Sin cambios de copy en home, puertas ni peldaños.
- **Puertas:** más profundidad, FAQ y enlaces en `/puertas-a-medida` (la antigüedad la fija el Lote 17: desde 1993); páginas nuevas de interiores, entrada/exterior, correderas y madera nativa; guía `/guias/medidas-y-madera-puertas`. Sin páginas de granero, pino ni «maciza»: el repo no las respalda como línea de puertas.
- **Peldaños:** clúster de huellas (`/peldanos-madera-chillan`, `/peldanos-escalera-concreto`, `/escaleras-de-madera`) y guías de medidas y de madera. Hub `/peldanos-a-medida` enlaza el clúster. Sin URL de pasamanos (no es línea de producto). Sin precios ni especies nuevas.

## 2026-10-16

- **Lote 16:** title/meta de `/collections/veladores` hacia «veladores de madera» + dormitorio; title de `/guias/medidas-mesa-comedor` sin año, con personas y altura 75 cm; seoTitle/meta de mesa-tripode-ratona (100×60×40) y primer seoTitle de mesa-comedor-niza (200×100×75). Detalle: `SEO-CHANGELOG.md`.

## 2026-10-15

- **Lote 15:** el changelog anotó un cambio de antigüedad que no salió a producción. La antigüedad publicada quedó en el Lote 17: desde 1993 / 33 años (Gonzalo, 2026-10-17). Sí salieron: CTR guía elegir-sillas (title/meta + FAQ de ancho + enlaces Kentucky/Milán); seoTitle con medida en Hairpin 100×50, Ferrara Ø140 y Cantabria 240×110; pulido meta de mesa-nordica vs hub. Detalle: `SEO-CHANGELOG.md`.

## 2026-10-14

- **Lote 14:** fact-check Lote 13 (quito imprimante en molduras y coworking en Roma Negra; «30 años» en puertas → 2001); CTR `/puertas-a-medida` (title/meta + tipos + medir vano + 5 FAQ); seoTitle/meta en 3 Trípode; snippets `/collections/todos-los-productos` y `/tiny-house-dlt`. Detalle: `SEO-CHANGELOG.md`.

## 2026-09-06

- **GSC inspect:** `npm run gsc:inspect` lee cobertura + último crawl de 11 URLs y compara el title vivo. No pide indexación.
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
