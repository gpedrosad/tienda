# Matriz HTTP / canonical — SEO-04

Fecha de medición en producción: **6 de septiembre de 2026**. Host canónico: `https://www.ideamadera.cl`. Código de redirects: `next.config.ts` + `src/middleware.ts`. Apex → www: 308 de plataforma.

`?page=2` en `/collections/mesas` responde **200** y no pagina el catálogo (la colección muestra todos los productos). No se canonicaliza a `?page=1` porque no hay paginación real; el middleware solo limpia `page=1`. Si en el futuro hay páginas distintas, cada una tendrá URL y canonical propios.

Parámetros `pr_*` de Shopify se limpian en productos (308). No se eliminan parámetros de atribución de analytics.

## Medido en producción (antes del deploy de este lote)

| Origen | Status primer salto | Destino | Final | Canonical / robots | Sitemap |
|---|---|---|---|---|---|
| `https://www.ideamadera.cl/` | 200 | — | home | www | Sí |
| `https://ideamadera.cl/` | 308 | `https://www.ideamadera.cl/` | home 200 | www | No (apex) |
| `http://ideamadera.cl/` | 308×2 | https + www | home 200 | www | No |
| `/collections/mesas` | 200 | — | misma | `…/collections/mesas` · index,follow | Sí |
| `/collections/mesas?page=1` | 308 | `/collections/mesas` | 200 | canónico limpio | No |
| `/collections/mesas?page=2` | 200 | — | misma URL con query | canónico de colección (sin page) | No |
| `/products/mesa-nordica` | 200 | — | ficha | www | Sí |
| `/products/mesa-nordica?pr_prod_strat=test` | 308 | `/products/mesa-nordica` | 200 | limpio | No |
| `/puertas` | 308 | `/puertas-a-medida` | 200 | landing | No origen |
| `/pages/puertas` | 308 | `/puertas-a-medida` | 200 | landing | No origen |
| `/molduras` | 308 | `/molduras-a-medida` | 200 | landing | No origen |
| `/cubiertas` | 308 | `/cubiertas-a-medida` | 200 | landing | No origen |
| `/pages/peldanos` | 308 | `/peldanos-a-medida` | 200 | landing | No origen |
| `/pages/foo-bar` | 308 | `/` | home 200 | home (legacy genérico) | No |
| `/cart` · `/search` | 308 | `/` | home 200 | home | No |
| `/collections/all` | 308 | `/collections/todos-los-productos` | 200 | colección | No origen |
| `/esta-ruta-no-existe-seo04` | 404 | — | 404 | no indexable | No |
| `/collections/mesas-de-centro` | 308 | `/collections/mesas` | 200 | colección mesas | No origen |
| `/collections/mesas-ratona` | 308 | `/collections/mesas` | 200 | colección mesas | No origen |
| `/mesas-de-centro` | 200 | — | landing living | `…/mesas-de-centro` | Sí |

No se observaron bucles en esta muestra.

## Cambio de este lote (código; vivo tras deploy)

`/collections/mesas-de-centro` y `/collections/mesas-ratona` pasan de `/collections/mesas` a **`/mesas-de-centro`**. Destino más equivalente: la landing lista ratonas/centro (Tripode, Roma, Ferrara, Hairpin) y responde a esas consultas; la colección de mesas mezcla comedor y living.

Comprobar en local tras restart de `next.config.ts`: 308 → `/mesas-de-centro`, un salto, sin cadena nueva.

## Conservado

Resto de redirects Shopify (colecciones, handles rotos, landings cortas, account/cart/checkout) sin cambio. `/pages/:slug` residual sigue a home: no hay sustituto específico.
