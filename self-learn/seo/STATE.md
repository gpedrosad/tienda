# Estado SEO orgánico (actualizar tras cambios grandes)

- **Host canónico:** `https://www.ideamadera.cl`
- **Propiedad GSC:** `sc-domain:ideamadera.cl` (siteOwner vía OAuth)
- **Sitemap vivo:** ~50 URLs (`src/app/sitemap.ts`) · GSC lista solo www
- **Landings de servicio:** peldaños, cubiertas, molduras, puertas, **muebles-chillan**, **muebles-de-cocina-chillan**, kit-pergola, quiénes somos, contacto
- **Catálogo indexable:** 29/55 productos (con `imageUrl`)
- **Última tanda código:** 2026-08-02 → [CHANGELOG.md](./CHANGELOG.md)
- **Última medición GSC:** 2026-08-04 → `docs/gsc-informe-2026-08-04.md` · eval [EVAL.md](./EVAL.md)
- **Backlog:** [NEXT.md](./NEXT.md)

## Snapshot GSC 2026-08-04 (28d: 7 jul → 4 ago)

| Métrica | Actual | Baseline informe 23 jul | Delta |
|---|---:|---:|---:|
| Clics | 98 | 63 | +56% |
| Impresiones | 3.533 | 2.675 | +32% |
| CTR | 2,77% | 2,36% | +0,41 pp |
| Posición media | 11,6 | 12,4 | mejora ~0,8 |

Informe: `docs/gsc-informe-2026-08-04.md`  
Baseline previo: `docs/gsc-informe-2026-07-23.md`

### Marca vs no marca

| Bucket | Clics | Imp | CTR |
|---|---:|---:|---:|
| Marca | 10 | 22 | 45% |
| No marca | 28 | 1.824 | 1,54% |

### Top páginas (clics)

| Página | Clics | Imp |
|---|---:|---:|
| `/` (www) | 46 | 1.113 |
| `/peldanos-a-medida` | 8 | 189 |
| `/` (sin www) | 6 | 310 |
| `/kit-pergola` | 6 | 122 |
| `/cubiertas-a-medida` · `/puertas-a-medida` | 4 c/u | 52 / 79 |

### CTR gap vs baseline (PDPs A2)

| URL | Baseline CTR | Ahora CTR | Nota |
|---|---:|---:|---|
| `/products/mesa-tripode-ratona` | 0% (312 imp) | 0,35% (282) | 1 clic; query `mesa ratona` sigue 170 imp / 0 clics |
| `/products/mesa-nordica` | 0,57% | 0,52% | plano; pos. ~21 |
| `/products/mesa-centro-roma` | 0% | 1,64% | 1 clic |
| `/products/silla-kentucky` | 0% | 0% | pos. ~4,3 sin clic |

### Landings nuevas / servicio (señal fuerte)

| URL | Clics | Imp | CTR |
|---|---:|---:|---:|
| `/cubiertas-a-medida` | 4 | 52 | 7,7% |
| `/puertas-a-medida` | 4 | 79 | 5,1% |
| `/molduras-a-medida` | 2 | 25 | 8,0% |
| `/muebles-chillan` | 2 | 59 | 3,4% |
| `/kit-pergola` | 6 | 122 | 4,9% |

### Técnico

| Señal | Estado |
|---|---|
| Sitemap GSC | ✅ solo www |
| Titles CTR Aug-02 en prod | ✅ verificados live |
| Middleware `?page=1` | ✅ 308 en prod; GSC aún muestra fila legacy con imp. |
| Hosts | ✅ mayoría www (37 filas) vs apex (2) |
| Fotos 26 productos | ❌ pendiente (bloquea índice) |

## Pendiente (prioridad)

Ver [NEXT.md](./NEXT.md). Resumen:

1. Recrawl GSC UI de PDPs CTR gap (ratona, nórdica, kentucky) + `collections/mesas`
2. Fotos productos sin imagen
3. Subir CTR de `mesa ratona` (170 imp / 0 clics) — snippet/SERP audit
4. Limpiar ruido residual `?page=1` y `pr_*` vía inspección/recrawl
5. Meta CTR plan: global ≥3,0% · no marca ≥2,0% (hoy 2,77% / 1,54%)
