# Diagnóstico SEO completo — Idea Madera

**Fecha:** 23 de julio de 2026  
**Sitio:** `https://www.ideamadera.cl`  
**Propiedad GSC:** `sc-domain:ideamadera.cl`  
**Fuentes:** Search Console API (28 días: 25 jun → 23 jul), inspección del código Next.js, sitio en producción.

> **Para agentes:** memoria operativa corta en [`self-learn/seo/INDEX.md`](../self-learn/seo/INDEX.md). Backlog priorizado: [`self-learn/seo/NEXT.md`](../self-learn/seo/NEXT.md). No cargar este documento entero salvo auditoría completa.

Documento de referencia operativa: puntos fuertes a potenciar, puntos débiles a corregir, y plan priorizado.

---

## 1. Resumen ejecutivo

Idea Madera está en **fase de crecimiento post-migración** (Shopify → Next.js). El tráfico orgánico **subió fuerte** en el último mes (+186% clics, +229% impresiones), pero el sitio todavía convierte poca demanda en clics: CTR global **2,36%**, posición media **12,4**, y muchas URLs de producto con impresiones y **0 clics**.

| Señal | Lectura |
| --- | --- |
| Hay demanda | 2.675 impresiones / 28 días; queries comerciales reales |
| Hay marca | `idea madera` en pos. 2,3 con CTR 47% |
| Hay fricción | Productos visibles en SERP sin clics; host www vs no-www; sitemap con 0 indexadas reportadas |
| Hay base técnica | Canonicals, schema, landings, redirects, titles SEO ya desplegados |

**Veredicto:** no es un sitio “sin SEO”; es un sitio con **demanda reprimida**. El upside más barato está en CTR de productos ya impresos + indexación limpia + potenciar lo que ya funciona (home, peldaños, marca, Chile/móvil).

---

## 2. Tráfico orgánico (GSC)

### 2.1 KPIs — últimos 28 días

| Métrica | Actual | Periodo anterior | Delta |
| --- | ---: | ---: | ---: |
| Clics | **63** | 22 | **+186%** |
| Impresiones | **2.675** | 812 | **+229%** |
| CTR | **2,36%** | 2,71% | −0,35 pp |
| Posición media | **12,4** | 9,4 | empeora ~3 posiciones |

Crecimiento de volumen con ligera caída de CTR y de posición media: típico cuando entran más queries competitivas / long-tail.

### 2.2 Marca vs no marca

| Bucket | Clics | Impresiones | CTR | Posición |
| --- | ---: | ---: | ---: | ---: |
| Marca (`idea madera`, etc.) | 9 | 19 | **47,4%** | 2,3 |
| No marca | 18 | 1.438 | **1,25%** | 17,2 |

La marca está sana. El volumen está en **no marca**, donde el CTR es el cuello de botella.

### 2.3 Dispositivo y país

- **Mobile:** 42 clics / 1.648 imp (CTR 2,55%, pos. 8,7) — canal principal.
- **Desktop:** 21 clics / 1.015 imp (CTR 2,07%, pos. 18,4).
- **Chile:** 61 de 63 clics (~97%). Optimizar para intención chilena local, no global.

### 2.4 Apariencia en resultados

| Tipo | Clics | Impresiones | CTR |
| --- | ---: | ---: | ---: |
| Product snippets | 32 | 1.610 | 1,99% |
| Merchant listings | 2 | 7 | 28,6% |
| Review snippets | 0 | 11 | 0% |

Hay rich results de producto, pero el CTR de snippets es bajo. Los review snippets no generan clics (posible señal de reseñas poco confiables en schema).

---

## 3. Qué está indexado / qué mueve tráfico

### 3.1 Top páginas (clics)

| Página | Clics | Imp | CTR | Rol |
| --- | ---: | ---: | ---: | --- |
| `/` (www) | 33 | 907 | 3,6% | Motor principal |
| `/peldanos-a-medida` | 8 | 145 | 5,5% | Mejor landing de servicio |
| `/` (sin www) | 5 | 265 | 1,9% | Ruido de host |
| `/collections/todos-los-productos` | 4 | 128 | 3,1% | Catálogo |
| `/collections/futon` | 3 | 105 | 2,9% | Colección con tracción |
| `/collections/mesas?page=1` | 3 | 110 | 2,7% | Mesas (URL paginada) |
| `/products/mesa-nordica` | 2 | 349 | **0,57%** | Mucha visibilidad, poco clic |

### 3.2 Páginas con demanda y CTR 0% (oportunidad inmediata)

| URL | Impresiones | Pos. aprox. | Clics extra estimados* |
| --- | ---: | ---: | ---: |
| `/products/mesa-tripode-ratona` | 312 | 8,4 | ~11 |
| `/products/mesa-centro-roma` | 74 | 3,8 | ~4 |
| `/products/silla-kentucky` | 49 | 4,4 | ~3 |
| `/products/mesa-comedor-roma-negra` | 38 | 5,1 | ~2 |
| `/products/futon-noruega` | 32 | 6,3 | ~1 |
| `/cubiertas-a-medida` | 15 | 6,3 | ~0,5 |

\*Estimación del informe GSC vs CTR esperado de primera página.

### 3.3 Queries clave

**Ya convierten (potenciar):**
- `idea madera` — brand, pos. 2,3
- `muebles madera` / `muebles madera a medida`
- `peldaño de madera` → landing peldaños
- `percheros en madera` → producto Verona

**Alta impresión, 0 clics (arreglar match title/snippet):**
- `mesa ratona` — **194 impresiones**, pos. 9,7
- `mesa nordica` — 96 impresiones, CTR 1%
- `muebles de madera` — 57 impresiones, CTR 0%
- `comedores nordicos` — 56 impresiones, pos. profunda
- `silla kentucky` — 23 impresiones, pos. 2,6 (casi top 3 sin clic)
- `muebles de madera en chillán` — 18 impresiones, pos. 4,2
- `mesa ratona de madera` — 21 impresiones, pos. 5,9

---

## 4. Estado técnico del sitio (código + producción)

### 4.1 Ya implementado (bien)

| Área | Estado |
| --- | --- |
| Host canónico | `ideamadera.cl` → 308 → `www.ideamadera.cl` |
| `robots.txt` | Allow `/`, Disallow `/api/`, Sitemap www |
| Sitemap dinámico | 45 URLs (home, ofertas, 5 landings, colecciones, 29 productos) |
| Landings de servicio | Peldaños, cubiertas, puertas, quiénes somos, contacto |
| Redirects Shopify | `/pages/*`, `/collections/mesas-de-comedor`, etc. → rutas nuevas |
| Titles colecciones | Keywords comerciales (ej. “Mesas de Comedor en Madera a Medida”) |
| Titles productos | Generados con categoría + material (`product-seo.ts`) |
| Schema | Organization, WebSite, Product, FAQ, Breadcrumb, Service |
| Meta OG/Twitter | Presentes |
| GSC OAuth | Conectado (`npm run gsc:report`) |

### 4.2 Cobertura de catálogo

| Catálogo | Cantidad |
| --- | ---: |
| Productos totales | 55 |
| Con imagen (indexables) | **29** |
| Sin imagen (fuera de sitemap) | **26** |

Casi la mitad del catálogo no compite en Google.

### 4.3 Alertas GSC técnicas

1. **Sitemap en GSC:** registrado como `https://ideamadera.cl/sitemap.xml` (sin www) → redirige a www. Reporta **45 enviadas / 0 indexadas** (dato API a validar; home www sí está indexada por URL Inspection).
2. **Hosts mezclados** en impresiones: `www` (25 filas) y sin www (3).
3. **URLs con parámetros Shopify** aún aparecen (`?pr_prod_strat=...`).
4. **URLs legacy muertas** aún en el índice histórico (`/products/mesa-madera`, `/products/g800065l`).

---

## 5. Puntos más fuertes (potenciar)

### F1. Marca “Idea Madera” consolidada
- Query brand en posición ~2 con CTR ~47%.
- Home captura la mayor parte de clics brand + genéricos.
- **Potenciar:** reforzar home con prueba social real, ciudad (Chile / Chillán / Buin), y CTAs claros a colecciones top. Mantener consistencia de marca en titles.

### F2. Landing `/peldanos-a-medida`
- Mejor CTR de páginas de contenido (5,5%) y crecimiento fuerte (+7 clics vs periodo anterior).
- Demuestra que el formato “servicio a medida + WhatsApp + FAQ schema” funciona.
- **Potenciar:** replicar el mismo nivel de profundidad en cubiertas y puertas (más copy, fotos de obra, casos); enlazar desde home y footer (ya está); pedir indexación explícita.

### F3. Demanda de producto concreto ya visible
- `mesa nordica`, `mesa ratona`, `silla kentucky`, `mesa-tripode-ratona` tienen impresiones reales.
- Varios productos están en posiciones 3–9 (primera página) con CTR 0%.
- **Potenciar:** no hace falta “crear demanda”; hace falta **ganar el clic** (title, description, imagen OG, precio en snippet si aplica).

### F4. Product snippets ya activos
- 1.610 impresiones de tipo PRODUCT_SNIPPETS.
- Schema Product + Offer ya desplegado.
- **Potenciar:** validar rich results; alinear precio/disponibilidad; sustituir reseñas genéricas por reseñas verificables para no quemar el snippet.

### F5. Crecimiento orgánico reciente
- +186% clics y +229% impresiones vs el mes anterior.
- Migración + landings + titles están empujando visibilidad.
- **Potenciar:** no romper lo que funciona; iterar titles de las URLs con gap CTR; medir cada 14 días con `npm run gsc:report:md`.

### F6. Enfoque Chile + mobile
- 97% clics desde Chile; mobile gana en volumen y posición.
- **Potenciar:** copy, CTAs WhatsApp y Core Web Vitals pensados mobile-first; menciones “envío a todo Chile”, “cotiza por WhatsApp”.

### F7. Infraestructura SEO lista para operar
- Scripts GSC, redirects, sitemap, landings, metadatos por colección/producto.
- **Potenciar:** usarlo como ritmo operativo (reporte quincenal + backlog de CTR gaps).

---

## 6. Puntos más débiles (corregir)

### D1. CTR de producto / no marca (crítico)
- No marca CTR 1,25%. Productos con cientos de impresiones y 0 clics.
- `mesa ratona` (194 imp) y `mesa-tripode-ratona` (312 imp) son el ejemplo más claro.
- **Acción:** auditar title/description/H1 vs query dominante; incluir “mesa ratona”, precio referencial, “madera maciza Chile” donde encaje.

### D2. Indexación / cobertura de sitemap (crítico)
- GSC reporta 0 indexadas de 45 enviadas en el sitemap sin www.
- Históricamente el sitio tuvo muy pocas URLs indexadas post-migración.
- **Acción:** reenviar sitemap **www** en GSC; inspeccionar top 15 URLs; eliminar/actualizar el sitemap sin www en la propiedad.

### D3. Catálogo incompleto (alto)
- 26/55 productos sin imagen → no están en sitemap ni son indexables.
- **Acción:** priorizar fotos de productos con demanda de búsqueda (racks, escritorios, mesas Frida/Liguria si aplica).

### D4. Dilución www vs no-www (medio-alto)
- Impresiones y clics todavía en ambos hosts.
- **Acción:** confirmar redirect 308 en todas las rutas; no emitir URLs sin www en schema/WhatsApp/sitemap (usar siempre `SITE_URL` canónico).

### D5. Deuda Shopify (medio)
- Parámetros `?pr_*`, URLs viejas (`mesa-madera`, handles raros), colecciones paginadas `?page=1`.
- **Acción:** redirects 301 de URLs legacy conocidas; canonical limpio en colecciones (evitar indexar `?page=1` como URL preferida); no generar params internos.

### D6. Schema de reseñas genéricas (medio)
- Review snippets con 0 clics; riesgo de invalidación.
- **Acción:** quitar `aggregateRating`/`review` inventados o conectar reseñas reales (Google Business / clientes).

### D7. Dependencia excesiva de la home (medio)
- 33 de 63 clics (~52%) vienen de la home.
- Si la home baja, el sitio se siente el golpe.
- **Acción:** distribuir tráfico a colecciones y landings con enlaces internos y titles más competitivos.

### D8. Queries locales Chillán poco convertidas (oportunidad)
- `muebles de madera en chillán`, `muebles a medida chillan` con impresiones y CTR 0.
- **Acción:** bloque local en home / quiénes somos / contacto (fábrica, ciudad, cobertura nacional).

---

## 7. Matriz: potenciar vs arreglar

| Prioridad | Qué | Tipo | Impacto esperado | Esfuerzo |
| --- | --- | --- | --- | --- |
| P0 | Reenviar sitemap www + pedir indexación top URLs | Técnico | Más páginas compitiendo | Bajo |
| P0 | Titles/snippets de mesa-tripode-ratona, mesa-nordica, mesa-centro-roma, silla-kentucky | CTR | +10–20 clics/mes potenciales | Bajo |
| P1 | Fotos a productos sin imagen (prioridad demanda) | Contenido | Ampliar índice | Medio |
| P1 | Profundizar landings cubiertas/puertas (modelo peldaños) | Contenido | Nuevas puertas de servicio | Medio |
| P1 | Unificar canonical origin en schema/WhatsApp (siempre www) | Técnico | Menos dilución | Bajo |
| P2 | Redirects de URLs legacy que aún aparecen en GSC | Técnico | Limpiar índice | Bajo |
| P2 | Bloque Chillán / local SEO | On-page | CTR en queries locales | Bajo |
| P2 | Reseñas reales o quitar schema falso | Confianza | Proteger rich results | Medio |
| P3 | Canonical de colecciones con `?page=` | Técnico | Menos URLs ruidosas | Bajo |
| P3 | Contenido blog/guías (“cómo elegir mesa de comedor”) | Topical | Autoridad no marca | Alto |

---

## 8. Plan de acción en 3 horizontes

### Próximas 72 horas
1. En GSC: enviar `https://www.ideamadera.cl/sitemap.xml` y retirar/ignorar el sitemap sin www si sigue listado.
2. Solicitar indexación: home, peldaños, cubiertas, puertas, `/collections/mesas`, mesa-nordica, mesa-tripode-ratona, silla-kentucky.
3. Revisar en SERP (incógnito) los snippets de las 5 URLs con mayor gap CTR y ajustar title/description si Google aún muestra textos viejos.

### Próximas 2 semanas
1. Subir fotos a al menos 10 productos prioritarios sin imagen.
2. Mejorar copy SEO de `mesa-tripode-ratona` / “mesa ratona” (title, H1 secundario, primer párrafo, FAQ).
3. Añadir menciones Chillán + envío Chile en home y contacto.
4. Correr `npm run gsc:report:md` y comparar deltas.

### Próximo mes
1. Completar catálogo visual (26 → 0 sin foto, o lo máximo posible).
2. Landings cubiertas/puertas al nivel de peldaños (fotos de proyectos).
3. Decisión sobre schema de reseñas.
4. Meta: CTR no marca > 2%, clics 28 días > 100, más páginas de producto con ≥1 clic.

---

## 9. KPIs de éxito

| KPI | Baseline (23 jul 2026) | Meta 30 días | Meta 90 días |
| --- | ---: | ---: | ---: |
| Clics / 28 días | 63 | 100 | 180 |
| Impresiones / 28 días | 2.675 | 3.500 | 5.000 |
| CTR global | 2,36% | 3,0% | 3,5% |
| CTR no marca | 1,25% | 2,0% | 2,5% |
| Clics mesa-tripode-ratona | 0 | ≥3 | ≥8 |
| Clics mesa-nordica | 2 | ≥6 | ≥12 |
| Productos indexables (con foto) | 29 | 40 | 55 |
| Landings servicio con ≥1 clic | 1 (peldaños) | 3 | 4 |

---

## 10. Comandos operativos

```bash
# Auth (si invalid_grant)
npm run gsc:auth

# Resumen rápido en terminal
npm run gsc:report

# Informe Markdown completo
npm run gsc:report:md
```

Propiedad: `GSC_SITE_URL=sc-domain:ideamadera.cl`  
Informe crudo de esta fecha: `docs/gsc-informe-2026-07-23.md`

---

## 12. Qué más recomiendo (post-tanda 23 jul)

Lo ya aplicado (titles CTR, schema, redirects, middleware, Chillán, sitemap www) está en `self-learn/seo/CHANGELOG.md`.

**Siguiente, en orden:**

1. **Deploy** de la tanda a producción.
2. **Solicitar indexación** en UI GSC de las 4 PDPs de CTR gap (API no lo hace masivo).
3. **Fotos** a productos sin imagen (26) — mayor ampliador de índice.
4. **Fotos de obra** en cubiertas/puertas (mismo patrón que peldaños).
5. **Google Business Profile** Chillán + reseñas reales.
6. **Reevaluación** ~14–28 días (`self-learn/seo/EVAL.md`).
7. **No** abrir blog/programmatic hasta que money pages con impresiones dejen de tener CTR 0%.

Backlog vivo para agentes: [`../self-learn/seo/NEXT.md`](../self-learn/seo/NEXT.md).

---

## 13. Conclusión

**Fortalezas reales:** marca fuerte, home y peldaños como anclas, crecimiento rápido de impresiones/clics, snippets de producto activos, stack técnico SEO ya armado, demanda clara en mesas (nórdica/ratona) y queries Chile/móvil.

**Debilidades reales:** CTR de producto/no marca, cobertura de índice limitada por fotos faltantes, ruido legacy Shopify residual, demasiada concentración de clics en la home.

**Estrategia:** potenciar lo que ya rankea (brand, peldaños, mesas con impresiones) ganando el clic, y en paralelo ensanchar el índice (fotos + landings de servicio). No hace falta reinventar el sitio: hace falta **cerrar el gap entre ser visto y ser elegido**.
