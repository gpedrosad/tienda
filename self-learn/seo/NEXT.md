# Qué más recomiendo (backlog agentes)

Orden de impacto. Actualizar al cerrar ítems.

## P0 — ya en código; falta deploy / ops

| # | Acción | Quién | Notas |
|---|---|---|---|
| 1 | **Deploy a producción** de la tanda 23 jul | Humano / CI | Sin deploy, titles y middleware no afectan SERP |
| 2 | **URL Inspection → Solicitar indexación** (UI GSC) en ratona, nórdica, kentucky, roma, home | Humano | API no lo hace masivo; acelera recrawl de metas nuevas |
| 3 | Verificar en prod: `?page=1` redirige; titles nuevos en HTML | Agente | `curl` post-deploy |

## P1 — máximo ROI siguiente

| # | Acción | Impacto | Esfuerzo |
|---|---|---|---|
| 4 | **Fotos a 26 productos sin `imageUrl`** (prioridad: racks, escritorios, mesas Frida/Liguria/Praga si hay demanda) | Alto — amplía índice | Medio (assets) |
| 5 | **Profundizar cubiertas/puertas/molduras** con fotos de obra reales (modelo peldaños) | Alto — landings indexables | Medio |
| 5b | **Deploy + indexar `/molduras-a-medida`** en GSC UI | Medio — URL nueva | Bajo |
| 6 | Auditar SERP (incógnito) snippets de `mesa ratona` / `mesa nordica` tras 7–14 días | Medio — validar si Google adoptó title | Bajo |
| 7 | Cerrar [EVAL.md](./EVAL.md) ~6–20 ago con `gsc:report:md` | Medición | Bajo |

## P2 — consolidación

| # | Acción | Notas |
|---|---|---|
| 8 | Redirects adicionales si GSC sigue mostrando URLs legacy (revisar “Páginas” no indexadas / 404) | Tras nuevo informe |
| 9 | Bloque explícito “Muebles de madera en Chillán” en home debajo del hero (copy + link a quiénes somos / WhatsApp) | Queries locales CTR 0% |
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
