# Qué más recomiendo (backlog agentes)

Orden de impacto. Actualizar al cerrar ítems.

## P0 — ops inmediatas

| # | Acción | Quién | Notas |
|---|---|---|---|
| 1 | ~~Deploy tanda 23 jul / 2 ago~~ | — | ✅ vivo en prod (eval 4 ago) |
| 2 | **URL Inspection → Solicitar indexación** en ratona, nórdica, kentucky, `collections/mesas`, home | Humano | Titles nuevos aún no mueven `mesa ratona` (170 imp / 0 clics) |
| 3 | ~~Verificar `?page=1` + titles en HTML~~ | — | ✅; GSC aún lista `mesas?page=1` con 82 imp |

## P1 — máximo ROI siguiente

| # | Acción | Impacto | Esfuerzo |
|---|---|---|---|
| 4 | **Fotos a 26 productos sin `imageUrl`** (prioridad: racks, escritorios, mesas Frida/Liguria/Praga si hay demanda) | Alto — amplía índice | Medio (assets) |
| 5 | **Fotos de obra** en cubiertas/puertas/molduras/peldaños (texto de alcance ya en código) | Alto — ya traen clics | Medio (assets) |
| 5b | ~~Indexar `/molduras-a-medida`~~ | — | ✅ 2 clics / CTR 8% en 28d |
| 6 | Auditar SERP (incógnito) snippets `mesa ratona` / `mesa nordica` | Alto — 170+88 imp con CTR ~0–1% | Bajo |
| 7 | Re-medir [EVAL.md](./EVAL.md) ~20 ago | Titles 2 ago maduros | Bajo |
| 7b | ~~Title/meta **`/collections/mesas`**~~ | — | ✅ 6 sep: title A + intro/FAQ; falta recrawl GSC UI |

## P2 — consolidación

| # | Acción | Notas |
|---|---|---|
| 8 | Redirects adicionales si GSC sigue mostrando URLs legacy (revisar “Páginas” no indexadas / 404) | Tras nuevo informe; matriz en `docs/seo-matriz-redirects.md` |
| 9 | ~~Bloque Chillán en home~~ | ✅ H1 + bloque local (6 sep, pendiente deploy) |
| 10 | Merchant / Google Business Profile alineado a Chillán + fotos + reseñas reales | Autoridad local |
| 11 | Sustituir social proof genérico por reseñas verificables (o no mostrar rating) | Confianza + rich results |
| 12 | Canonical/hreflang no aplica (solo es-CL); mantener `lang="es"` | OK hoy |

## P3 — más adelante (no antes de saturar P1)

| # | Acción | Por qué esperar |
|---|---|---|
| 13 | Blog / guías (“cómo elegir mesa de comedor”, “mesa ratona vs mesa de centro”) | No diluir crawl mientras money pages tengan CTR 0% |
| 14 | Landing “muebles a medida Chillán” dedicada | Solo si queries locales crecen y home no captura |
| 15 | Programmatic SEO por comuna | Alto riesgo thin content; autoridad aún baja |
| 16 | Panel interno tipo `/interno/gsc` | Nice-to-have; CLI basta |

## No hacer

- Service account como auth GSC por defecto (OAuth desktop).
- Inventar ratings/reviews en schema.
- Crear decenas de URLs nuevas “por SEO”.
- Commitear `.secrets/` o `.env.local`.
- Usar host del request para URLs canónicas/schema.
- Apuntar todos los redirects legacy a `/` si hay destino mejor.

## Checklist agente ante pedido “mejorar SEO”

1. Leer [STATE.md](./STATE.md) + esta página.
2. Correr `npm run gsc:report` (o report:md si pide informe).
3. Preferir ítems P0/P1 abiertos sobre ideas nuevas.
4. Si toca código: seguir [RULES.md](./RULES.md); 1 línea en CHANGELOG; actualizar STATE si cambian métricas o flags técnicos.
5. No inventar números de tráfico: siempre desde GSC API o informe fechado.
