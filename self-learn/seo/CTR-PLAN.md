# Plan para aumentar CTR orgánico — Idea Madera

**Fecha:** 2026-07-23  
**Baseline GSC (28d):** CTR global **2,36%** · no marca **1,25%** · marca **~47%**  
**Meta 30 días:** CTR global **≥ 3,0%** · no marca **≥ 2,0%**  
**Meta 90 días:** CTR global **≥ 3,5%** · no marca **≥ 2,5%**

Entrada agentes: [INDEX.md](./INDEX.md) · medición [EVAL.md](./EVAL.md)

---

## 1. Diagnóstico (por qué el CTR está bajo)

| Causa | Evidencia | Efecto |
|---|---|---|
| Snippets genéricos / poco match con la query | `mesa ratona` 194 imp / 0 clics; `silla kentucky` pos. ~2,6 / 0 clics | Usuario ve resultado pero no hace clic |
| Título no lidera con la query exacta | Antes: nombres de producto sin “mesa ratona”, “mesa nórdica” | Google muestra poco atractivo vs competencia |
| Mucha impresión, poca promesa (precio/beneficio) | PDPs con imp. altas y CTR 0–0,6% | Pierde frente a resultados con precio/local |
| Host / URLs ruidosas | sin www, `?page=1`, params Shopify | Diluye y ensucia snippet |
| Rich results débiles | Review snippets 0 clics; ratings inventados (ya quitados) | No aporta CTR extra |

**Conclusión:** no hace falta más tráfico bruto primero; hace falta **ganar el clic** en URLs que ya se ven.

---

## 2. Fórmula de snippet (usar en todos los money pages)

### Title (~50–60 chars + ` | Idea Madera`)

```
[Query principal] + [beneficio/material] + [local o formato]
```

Ejemplos buenos:
- `Mesa Ratona de Madera Maciza | Trípode Living | Idea Madera`
- `Muebles de Cocina en Chillán | Madera a Medida | Idea Madera`

### Meta description (~140–160 chars)

1. Keyword natural en la 1ª frase  
2. Diferenciador (madera maciza / a medida / Chillán)  
3. Precio referencial si aplica (`Desde $X`)  
4. CTA (`Cotiza por WhatsApp` / `Envío a todo Chile`)

### Visible on-page (afecta CTR si Google reescribe el snippet)

- H1 alineado a la query (puede ser más corto que el title)  
- Primer párrafo: respuesta directa en 1–2 frases  
- Precio visible arriba  
- CTA WhatsApp claro

---

## 3. Plan por fases

### Fase A — Quick wins (esta semana) · impacto alto / esfuerzo bajo

Objetivo: subir CTR en URLs **ya con impresiones**.

| # | Acción | Owner | Done cuando |
|---|---|---|---|
| A1 | Verificar en **prod** que titles de ratona / nórdica / kentucky / roma están live | Agente/humano | `curl` muestra seoTitle nuevo |
| A2 | GSC UI → Inspección URL → **Solicitar indexación** de esas 4 PDPs + home | Humano | Solicitud enviada |
| A3 | SERP incógnito (Chile): anotar qué title/description muestra Google vs el HTML | Humano | Tabla en nota / EVAL |
| A4 | Si Google no adoptó el title en 7–14 días: acortar title (query más al inicio) y reforzar H1/primer párrafo | Agente | Nuevo deploy + re-pedir indexación |
| A5 | Revisar OG image de top PDPs (imagen clara del producto = mejor en algunos resultados) | Agente | Imagen principal nítida / no logo |

**KPIs Fase A (14–28 días):**
- `/products/mesa-tripode-ratona`: CTR > 0% con ≥20 imp.  
- `/products/mesa-nordica`: CTR > 0,57%  
- Al menos 1 clic en kentucky o centro-roma

### Fase B — Queries con demanda y 0 clics (2 semanas)

| Query GSC | Imp. aprox. | Página a optimizar | Ajuste de mensaje |
|---|---:|---|---|
| `mesa ratona` | 194 | `/products/mesa-tripode-ratona` | Title/H1/lead con “mesa ratona” exacto |
| `mesa nordica` | 96 | `/products/mesa-nordica` | “mesa nórdica” + precio + comedor |
| `muebles de madera` | 57 | Home + `/muebles-chillan` | Home: beneficio Chile/Chillán; landing local |
| `muebles de madera en chillán` | 18 | `/muebles-chillan` | Title ya alineado; pedir indexación |
| `silla kentucky` | 23 | `/products/silla-kentucky` | Title con “silla kentucky” + madera comedor |
| `mesa ratona de madera` | 21 | misma PDP ratona | Description con “mesa ratona de madera” |

**Táctica B:**
1. Una query dominante por URL (no saturar keywords).  
2. FAQ on-page con la query en la pregunta (ayuda a snippet/FAQ).  
3. Enlace interno desde home/colección con anchor descriptivo (`mesa ratona de madera`, no “ver más”).

### Fase C — CTR de landings nuevas (2–6 semanas)

URLs: `/muebles-chillan`, `/muebles-de-cocina-chillan`, `/molduras-a-medida`, cubiertas, puertas.

| Acción | Por qué |
|---|---|
| Pedir indexación GSC | Sin índice no hay CTR |
| Añadir **fotos reales** de obra/taller | Snippet y confianza; peldaños ya convierte sin tantas fotos pero el resto compite peor |
| Bloque local visible (“Taller en Chillán”) arriba | Queries locales |
| Enlazar desde home (1 bloque “Servicios / Chillán”) | Descubre + relevance |

**KPI Fase C:** ≥1 landing nueva con ≥10 imp. y CTR ≥ 2%.

### Fase D — Confianza en SERP (continuo)

| Acción | Efecto en CTR |
|---|---|
| Google Business Profile Chillán + fotos + reseñas | Pack local / brand CTR |
| Reseñas reales en sitio (sin inventar schema) | Mejor elección humana |
| Merchant / product snippets limpios (precio, stock) | CTR de PRODUCT_SNIPPETS (hoy ~2%) |
| No volver a poner ratings falsos en JSON-LD | Evita penalizar rich results |

---

## 4. Prioridad de URLs (ranking CTR)

Trabajar en este orden:

1. `/products/mesa-tripode-ratona` (312 imp, 0 clics)  
2. `/products/mesa-nordica` (349 imp, CTR 0,57%)  
3. `/` home (907 imp — mejorar CTR 3,6% → 4,5%+)  
4. `/products/silla-kentucky`  
5. `/products/mesa-centro-roma`  
6. `/muebles-chillan` + `/muebles-de-cocina-chillan`  
7. `/peldanos-a-medida` (ya buen CTR 5,5% — no tocar fuerte; solo enlazado)

---

## 5. Checklist de edición por página

Al tocar una URL:

- [ ] Title con query al inicio  
- [ ] Description con beneficio + precio/CTA  
- [ ] H1 coherente con query  
- [ ] Primer párrafo responde la búsqueda  
- [ ] Precio visible above the fold  
- [ ] 1 CTA WhatsApp claro  
- [ ] 1–2 enlaces internos con anchor keyword  
- [ ] Imagen principal nítida (OG)  
- [ ] Canonical www limpio  
- [ ] Tras deploy: pedir indexación GSC  

---

## 6. Qué no hacer (mata CTR o diluye)

- Crear 10 landings nuevas antes de arreglar CTR de money pages  
- Titles keyword-stuffed > 70 chars (Google trunca y baja confianza)  
- Misma meta description en muchas URLs  
- Prometer “oferta” o ratings sin respaldo  
- Cambiar titles cada 2 días (no da tiempo a adoptar snippet)

---

## 7. Medición

```bash
npm run gsc:report
npm run gsc:report:md
```

Cada 14 días anotar en [EVAL.md](./EVAL.md):

| URL | Imp | Clics | CTR | vs baseline |
|---|---:|---:|---:|---|
| mesa-tripode-ratona | | | | 0% |
| mesa-nordica | | | | 0,57% |
| home | | | | 3,64% |
| muebles-chillan | | | | — |

**Éxito 30 días:** ≥2 PDPs del top gap con CTR > 0% y ≥20 imp.; CTR global ≥ 3% **o** clics 28d ≥ 90.  
**Éxito 90 días:** CTR no marca ≥ 2%; clics 28d ≥ 150 si hubo fotos de catálogo.

---

## 8. Estimación de impacto CTR → clics

Si se recuperan solo los gaps claros:

| Palanca | Imp. actuales | CTR objetivo | Clics extra / 28d |
|---|---:|---:|---:|
| Ratona + queries mesa ratona | ~300–500 | 2–3,5% | **+6–18** |
| Nórdica | ~350 | 2–3% | **+5–10** |
| Kentucky + Roma | ~120 | 3–5% | **+4–6** |
| Home (+0,5–1 pp CTR) | ~900 | 4–4,5% | **+5–9** |
| Landings locales (nuevas) | creciendo | 2–4% | **+3–15** a 60d |

**Rango total plausible por CTR solo:** **+20–50 clics / 28 días** en 1–2 meses, sin contar fotos de catálogo completo.
