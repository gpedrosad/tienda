# Reevaluación post-metas SEO (2026-07-23)

**Baseline código:** 2026-07-23 (medible en GSC tras deploy)  
**Revisar desde:** ~2026-08-06 (mín. ~14 días post-deploy) · ideal ~2026-08-20  

Volumen orgánico moderado → no juzgar CTR de una sola URL con <7 días de datos post-recrawl.

## Cambios hechos (intervención)

| # | Cambio | Fecha |
|---|---|---|
| A1 | Sitemap www en GSC + borrar legacy sin www | 2026-07-23 |
| A2 | Titles/metas CTR (ratona, nórdica, roma, kentucky) | 2026-07-23 |
| A3 | Quitar reviews fake del schema Product | 2026-07-23 |
| A4 | Middleware `?page=1` + limpia `pr_*` | 2026-07-23 |
| A5 | Redirects legacy productos | 2026-07-23 |
| A6 | Chillán on-page (hero + landings) | 2026-07-23 |

Detalle: [CHANGELOG.md](./CHANGELOG.md) · diagnóstico `docs/seo-diagnostico-completo-2026-07-23.md`.

## Baseline GSC (28d al 23 jul · pre-impacto de esta tanda en SERP)

Fuente: `docs/gsc-informe-2026-07-23.md`

| Métrica | Valor |
|---|---:|
| Clics | 63 |
| Impresiones | 2.675 |
| CTR | 2,36% |
| Posición media | 12,4 |
| CTR no marca | 1,25% |

CTR 0% / gap (objetivo A2):

| URL | Imp | CTR baseline |
|---|---:|---|
| `/products/mesa-tripode-ratona` | 312 | 0% |
| `/products/mesa-nordica` | 349 | 0,57% |
| `/products/mesa-centro-roma` | 74 | 0% |
| `/products/silla-kentucky` | 49 | 0% |

## Efectos esperados

| Esperado | Señal |
|---|---|
| Mejor CTR en PDPs A2 | CTR > 0% con ≥20 imp. en ratona; nórdica CTR ↑ vs 0,57% |
| Query `mesa ratona` | Algún clic o CTR > 0% si imp. ≥50 |
| Menos ruido `?page=1` / `pr_*` | Menos filas con esos params en páginas GSC |
| Host | Impresiones sin www ↓ o redirigidas |
| Sitemap | GSC lista solo sitemap www |
| Schema | Sin avisos graves de Review en Rich Results (muestrear 2 PDPs) |

**No esperado:** saltar a cientos de clics solo por metas (hace falta tiempo de recrawl + fotos/catálogo).

## Cómo reevaluar

```bash
npm run gsc:report
npm run gsc:report:md
npm run gsc:sitemap   # listar sitemaps; no hace falta cada vez
curl -sI "https://www.ideamadera.cl/collections/mesas?page=1" | grep -i location
curl -sL "https://www.ideamadera.cl/products/mesa-tripode-ratona" | rg -n "<title>|name=\"description\""
```

| Check | ¿OK? | Nota |
|---|---|---|
| Deploy vivo de tanda 23 jul | ⬜ | |
| Sitemap GSC = www only | ⬜ | |
| CTR ratona > 0% (≥20 imp.) | ⬜ | |
| CTR nórdica > baseline | ⬜ | |
| Kentucky o Roma con ≥1 clic | ⬜ | |
| Hosts en informe: mayoría www | ⬜ | |
| Clics 28d ≥ 63 o imp. money pages ↑ | ⬜ | |

## Criterios orientativos

| Resultado | Criterio |
|---|---|
| **Éxito** | ≥2 PDPs A2 con CTR > 0% y ≥20 imp.; sitemap www only; clics 28d ≥63 o CTR no marca ↑ |
| **Neutro** | Sin daño; datos aún escasos → mantener |
| **Revisar** | Caída fuerte home/peldaños; o titles nuevos no aparecen en SERP tras 3+ semanas |

## Al cerrar

1. Sección `## Reevaluación YYYY-MM-DD` abajo.
2. Actualizar `STATE.md`.
3. 1 línea en `CHANGELOG.md`.
4. Ajustar [NEXT.md](./NEXT.md).

## Reevaluación 2026-08-04

Fuente: `docs/gsc-informe-2026-08-04.md` · periodo 7 jul → 4 ago (28d).  
Comparado vs baseline informe 23 jul (25 jun → 23 jul). Periodos se solapan → lectura direccional, no A/B puro. Titles del 2 ago aún con poco tiempo de recrawl.

| Check | ¿OK? | Nota |
|---|---|---|
| Deploy vivo de tanda 23 jul + 2 ago | ✅ | Titles live verificados |
| Sitemap GSC = www only | ✅ | |
| CTR ratona > 0% (≥20 imp.) | ✅ | 0,35% · 282 imp · 1 clic (débil) |
| CTR nórdica > baseline | ❌ | 0,52% plano vs 0,57% |
| Kentucky o Roma con ≥1 clic | ✅ parcial | Roma 1 clic; Kentucky 0 |
| Hosts en informe: mayoría www | ✅ | 37 www / 2 apex |
| Clics 28d ≥ 63 o imp. money pages ↑ | ✅ | 98 clics · CTR 2,77% |

### Resultado orientativo: **Éxito parcial / en progreso**

- Cumple umbral de clics y sitemap; ≥2 PDPs A2 con CTR > 0% (ratona, roma).
- Fallan: nórdica plana; kentucky 0%; query `mesa ratona` 170 imp / 0 clics.
- Ganadores claros: landings servicio (cubiertas/puertas/molduras/kit) y home www.
- Meta CTR plan (global ≥3% / no marca ≥2%) aún no: 2,77% / 1,54%.

Próxima medición sugerida: ~2026-08-20 (titles 2 ago maduros).
