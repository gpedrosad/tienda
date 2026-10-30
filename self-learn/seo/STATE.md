# Estado SEO orgánico (actualizar tras cambios grandes)

- **Host canónico:** `https://www.ideamadera.cl`
- **Propiedad GSC:** `sc-domain:ideamadera.cl` (siteOwner vía OAuth)
- **Sitemap vivo:** 74 URLs (`src/app/sitemap.ts`, GSC 2026-10-17, 0 errores) · GSC lista solo www
- **Landings de servicio:** peldaños (`/peldanos-a-medida`, Chillán, concreto, escaleras de madera, **flotantes**), cubiertas, molduras, puertas (interiores, entrada, correderas, nativa, **vidrio**, **locales**), **muebles-chillan**, **muebles-de-cocina-chillan**, **mesas-de-comedor-a-medida**, kit-pergola, quiénes somos, contacto
- **Catálogo indexable:** 29/55 productos (con `imageUrl`)
- **Última tanda código:** 2026-10-30 (lote 31: H2 «Medidas de una silla de comedor de madera» en `/guias/elegir-sillas-madera-comedor`; H2 «Muebles de cocina a medida en Chillán» en `/muebles-de-cocina-chillan`; H2 «puertas de madera nativa» y H3 «Interior o exterior» en `/puertas-madera-nativa`). El lote 30 sigue en la misma rama, sin merge. → [CHANGELOG.md](./CHANGELOG.md). Sitemap sigue en 74 URLs. El commit de imágenes `0426b8d` no se tocó.
- **Última medición GSC:** 2026-10-17 → `docs/gsc-informe-2026-10-17.md` (20 sep→17 oct, serie hasta 15 oct: 224 clics · 10.076 imp · CTR 2,22% · pos. 9,0 · no marca 1,29%). Es **línea base** de los lotes 11–17. Revisión: `docs/seo-revision-2026-10-17.md`. Anterior: 2026-09-06 (201 · 9.698 · 2,07% · 9,6). Histórico ago: [EVAL.md](./EVAL.md)
- **Titles congelados hasta ~5 nov:** veladores, guía medidas comedor, mesa-tripode-ratona, puertas-a-medida, guía sillas. `silla-kentucky` se corrigió el 2026-10-18 (no es de comedor: silla de descanso) → medir desde ~1 nov
- **Backlog:** [NEXT.md](./NEXT.md)
- **GA4** (`properties/552969056`, `G-KBR6DKMXVM`): solo mide bien desde el **2026-10-17** (antes, 1 sesión en 6 semanas). Desde el 2026-10-19: `whatsapp_click` es key event, dimensión de evento `placement` registrada; desde el 2026-10-23 también `phone_click` y `email_click` (todo `tel:`/`mailto:`, con `data-placement`) y dimensión `product_id`, zona `America/Santiago`, y el sitio solo carga GA4/GTM/Pixel en `www.ideamadera.cl` sin `navigator.webdriver`. **Base de clics a WhatsApp: contar desde el 20 oct; primera lectura ~17 nov.** Datos del 17–18 oct contaminados (Buenos Aires = equipo, `localhost`, bots de Meta en Linux con 0 engagement).

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
| Sitemap GSC | ✅ solo www. El XML descubre rutas estáticas nuevas desde `src/app` (2026-10-17). |
| Titles CTR Aug-02 en prod | ✅ verificados live |
| Middleware `?page=1` | ✅ 308 en prod; GSC aún muestra fila legacy con imp. |
| `/collections/mesas-de-centro` y `/mesas-ratona` | Código: 308 → `/mesas-de-centro` (pendiente deploy; prod aún va a `/collections/mesas`) |
| Hosts | ✅ mayoría www (37 filas) vs apex (2) |
| Fotos 26 productos | ❌ pendiente (bloquea índice) |

## Pendiente (prioridad)

Ver [NEXT.md](./NEXT.md). Resumen:

1. Recrawl GSC UI de PDPs CTR gap (ratona, nórdica, kentucky) + `collections/mesas`
2. Fotos productos sin imagen
3. Subir CTR de `mesa ratona` (212 imp / 0 clics al 17 oct) y `veladores de madera` (1.114 imp / CTR 0,09% en pos. 3,6) — medir lote 16 antes de tocar
4. Limpiar ruido residual `?page=1` y `pr_*` vía inspección/recrawl
5. Meta CTR plan: global ≥3,0% · no marca ≥2,0% (17 oct: 2,22% / 1,29%)
