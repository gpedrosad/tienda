# Estado SEO orgánico (actualizar tras cambios grandes)

- **Host canónico:** `https://www.ideamadera.cl`
- **Propiedad GSC:** `sc-domain:ideamadera.cl` (siteOwner vía OAuth)
- **Sitemap vivo:** ~50 URLs (`src/app/sitemap.ts`)
- **Landings de servicio:** peldaños, cubiertas, molduras, puertas, **muebles-chillan**, **muebles-de-cocina-chillan**, quiénes somos, contacto
- **Catálogo indexable:** 29/55 productos (con `imageUrl`)
- **Última tanda código:** 2026-07-23 → [CHANGELOG.md](./CHANGELOG.md) · eval [EVAL.md](./EVAL.md)
- **Backlog:** [NEXT.md](./NEXT.md)

## Snapshot GSC 2026-07-23 (28d: 25 jun → 23 jul)

| Métrica | Actual | Periodo anterior | Delta |
|---|---:|---:|---:|
| Clics | 63 | 22 | +186% |
| Impresiones | 2.675 | 812 | +229% |
| CTR | 2,36% | 2,71% | −0,35 pp |
| Posición media | 12,4 | 9,4 | empeora ~3 |

Informe: `docs/gsc-informe-2026-07-23.md`  
Diagnóstico: `docs/seo-diagnostico-completo-2026-07-23.md`

### Marca vs no marca

| Bucket | Clics | Imp | CTR |
|---|---:|---:|---:|
| Marca | 9 | 19 | 47% |
| No marca | 18 | 1.438 | 1,25% |

### Top páginas (clics)

| Página | Clics | Imp |
|---|---:|---:|
| `/` (www) | 33 | 907 |
| `/peldanos-a-medida` | 8 | 145 |
| `/` (sin www) | 5 | 265 |
| `/collections/todos-los-productos` | 4 | 128 |
| `/collections/futon` · `mesas?page=1` | 3 c/u | ~100 |
| `/products/mesa-nordica` | 2 | 349 |

### Oportunidad CTR (0 clics, con impresiones)

| URL / query | Imp | Nota |
|---|---:|---|
| `/products/mesa-tripode-ratona` | 312 | query `mesa ratona` ~194 |
| `/products/mesa-nordica` | 349 | CTR 0,57% |
| `/products/mesa-centro-roma` | 74 | |
| `/products/silla-kentucky` | 49 | query pos. ~2,6 |
| `muebles de madera en chillán` | 18 | CTR 0% |

### Técnico (post-tanda 23 jul)

| Señal | Estado |
|---|---|
| Sitemap GSC | ✅ www enviado; legacy sin www eliminado |
| URL Inspection top | ✅ Submitted and indexed (home, peldaños, cubiertas, puertas, mesas, 4 PDPs) |
| Titles CTR gap products | ✅ seoTitle/seoDescription en ratona/nórdica/roma/kentucky |
| Schema reviews fake | ✅ quitados del Product JSON-LD |
| Middleware `?page=1` + `pr_*` | ✅ |
| Redirects legacy productos | ✅ mesa-madera, futon viejo, g800065l |
| Chillán on-page | ✅ hero, quiénes somos, cubiertas, puertas |
| Fotos 26 productos | ❌ pendiente (bloquea índice) |

## Pendiente (prioridad)

Ver ranking vivo en [NEXT.md](./NEXT.md). Resumen:

1. Deploy de esta tanda a prod
2. Fotos productos sin imagen (prioridad demanda)
3. Pedir recrawl manual en UI GSC de PDPs CTR gap (tras deploy)
4. Cierre EVAL ~6–20 ago
5. Profundizar landings cubiertas/puertas (fotos obra)
6. No crear blog/guías hasta saturar CTR de money pages
