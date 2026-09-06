# Plan maestro SEO de Idea Madera para ejecución por Kimi3

Fecha de preparación: **6 de septiembre de 2026**. Sitio: **https://www.ideamadera.cl**. Repositorio: `/Users/gonzalo/tienda`. Horizonte de ejecución: **90 días**, con una primera entrega técnica y comercial durante las primeras dos semanas.

Este documento es una especificación de trabajo, no una declaración de cambios ya implementados. Está escrito para que Kimi3 pueda retomar el repositorio, verificar cada hallazgo, implementar por entregas, comprobar resultados y dejar evidencia. No depende de funciones especiales de ese modelo ni presupone acceso a herramientas que no tenga.

**Decisión principal:** primero corregir medición y contenido incorrecto, después mejorar las URLs comerciales existentes y activar productos con fotografías reales. La expansión editorial viene después. No crear decenas de páginas para intentar compensar problemas del catálogo.

**Presupuesto de investigación externa:** Apify utilizado para preparar este plan: **USD 0**. No se ejecutó ningún actor. Search Console, código y consultas web aportaron información suficiente. Si se usa Apify posteriormente para este encargo, el límite acumulado sigue siendo **USD 3**, incluidos reintentos y cargos asociados.

## Índice

1. Instrucción inicial para el modelo ejecutor
2. Evidencia y línea base
3. Diagnóstico y prioridades
4. Arquitectura y archivos
5. Medición de Search Console
6. Investigación de consultas y competencia
7. Mapa de palabras clave y URLs
8. Especificación técnica
9. Colecciones y productos prioritarios
10. Servicios y SEO local
11. Fotografías y catálogo pendiente
12. Datos estructurados y confianza
13. Conversión y medición comercial
14. Rendimiento e imágenes
15. Contenido editorial y visibilidad en IA
16. Backlog y calendario
17. Pruebas y aceptación
18. Evaluación, decisiones y reversión
19. Entregables y continuidad
20. Fuentes y límites

## 1. Instrucción inicial para el modelo ejecutor

Puedes entregar a Kimi3 el siguiente bloque junto con acceso a este archivo:

> Trabaja en `/Users/gonzalo/tienda` y ejecuta el plan de `docs/plan-seo-kimi3-2026-09-06.md`. Responde en español. Lee `AGENTS.md` y la memoria SEO antes de editar. Revalida los hallazgos contra el estado actual: el plan fue preparado el 6 de septiembre de 2026. Implementa primero la fase de datos y las correcciones P0, luego la primera tanda P1. Conserva las URLs y componentes existentes salvo justificación documentada. No inventes características, fotografías, reseñas, métricas, precios, disponibilidad ni condiciones comerciales. No gastes más de USD 3 acumulados en Apify; usa por defecto GSC y fuentes gratuitas. Mantén un registro de tareas, archivos, pruebas y pendientes. Si falta un dato del negocio, deja ese campo pendiente y continúa las tareas independientes. No publiques promesas sin respaldo. La implementación debe terminar en cambios revisables y comprobados; despliega solamente si la sesión de ejecución lo autoriza. No consideres un clic a WhatsApp una venta ni una conversación confirmada. No declares mejoría SEO antes de medirla en ventanas comparables.

### 1.1 Orden de lectura obligatorio

1. `AGENTS.md`.
2. `self-learn/seo/INDEX.md`, `RULES.md`, `NEXT.md`, `STATE.md` y `COMMANDS.md`.
3. Este plan y `docs/gsc-informe-2026-09-06.md`.
4. `docs/gsc-base-plan-kimi3-2026-09-06.json`, generado como evidencia adicional con ventanas explícitas.
5. `self-learn/seo/CHANGELOG.md`, `EVAL.md` y `CTR-PLAN.md` antes de repetir experimentos anteriores.
6. Los archivos de código de cada tarea. Los informes históricos se consultan para preguntas concretas, no para sustituir datos recientes.

### 1.2 Reglas de ejecución

- El host canónico es `https://www.ideamadera.cl`. No usar el host del request como fuente SEO.
- No indexar productos sin `imageUrl`; tampoco usar imágenes de relleno para eludir esta regla.
- No exponer ni versionar `.secrets/`, `.env.local`, tokens OAuth o credenciales. Al preparar el plan ya existían archivos sin seguimiento, incluida `.secrets`; no incorporarlos con un `git add .`.
- Empezar con `git status --short`; preservar cambios ajenos. Si se necesita una rama nueva, usar prefijo `codex/` salvo instrucción distinta del usuario.
- No asumir que el nombre del paquete `shopify-headless` significa que Shopify sea la fuente actual: el catálogo revisado está en TypeScript local.
- Reutilizar el sistema actual de metadata, catálogo, landings y CTAs. No migrar de framework por SEO.
- Cambiar por lotes pequeños con una hipótesis y una medición. No reescribir todos los títulos simultáneamente.
- Resolver autónomamente las tareas técnicas reversibles. Consultar solo datos de negocio realmente faltantes o acciones externas sin autorización.
- No enviar mensajes a clientes, proveedores o medios sin autorización explícita.
- No instalar servicios de pago, comprar enlaces o activar campañas publicitarias como parte de este plan.

## 2. Evidencia y línea base

### 2.1 Fuentes utilizadas

Se revisó el informe GSC del 6 de septiembre, se ejecutó de nuevo `npm run gsc:report` con OAuth de lectura, se inspeccionó código del catálogo y SEO, y se consultaron páginas públicas del sitio y documentación oficial de Google. El comando volvió a entregar **201 clics y 9.698 impresiones** para el intervalo solicitado por el script actual.

La memoria `STATE.md` todavía presenta métricas de agosto. Es útil para contexto histórico, pero no debe gobernar las prioridades actuales. El catálogo sí sigue coincidiendo con la memoria: **55 productos, 29 con imagen y 26 sin imagen**, contados desde `src/data/products.ts`.

### 2.2 Resultado del informe existente

**Atención al período:** el informe etiqueta como “28 días” el intervalo `2026-08-09 → 2026-09-06`. Las fechas inclusivas abarcan 29 días. Además, la última fila diaria que contiene el informe es `2026-09-04`. Los totales son los que devolvió Google, pero la etiqueta temporal y la comparación necesitan normalización antes de usarlos como baseline experimental.

| Métrica | Informe actual | Período anterior del mismo informe | Lectura |
|---|---:|---:|---|
| Clics | 201 | 131 | +53,4%, comparación según ventanas del script |
| Impresiones | 9.698 | 4.459 | +117,5%, fuerte ampliación de exposición |
| CTR | 2,07% | 2,94% | Caída de 0,87 puntos porcentuales |
| Posición media | 9,6 | 11,1 | Mejora aproximada de 1,4 con datos sin redondear del informe |
| Clics desde Chile | 195 | No extraído aquí | Chile concentra casi todos los clics |
| Impresiones desde Chile | 9.505 | No extraído aquí | Priorizar intención y lenguaje chilenos |
| Clics móvil / escritorio / tablet | 118 / 81 / 2 | No extraído aquí | Medir por dispositivo |

No interpretar la caída del CTR como deterioro general: las impresiones crecieron más rápido que los clics y cambió la mezcla de búsquedas. Tampoco atribuir automáticamente el aumento a los títulos anteriores: no hay experimento causal que lo pruebe.

### 2.2.1 Baseline complementario normalizado: usar este para ejecutar

La extracción independiente terminó correctamente durante la preparación. Se solicitaron datos finales de búsqueda web para dos ventanas de **28 días inclusivos**, sin filtros de país o dispositivo en los totales:

| Métrica | 8 agosto–4 septiembre de 2026 | 11 julio–7 agosto de 2026 | Diferencia |
|---|---:|---:|---:|
| Clics | 207 | 125 | +65,6% |
| Impresiones | 9.984 | 4.173 | +139,3% |
| CTR | 2,073% | 2,995% | −0,922 puntos porcentuales |
| Posición media | 9,640 | 11,125 | Mejora aproximada de 1,485 |

Los totales difieren del informe existente por las fechas utilizadas; no reemplazar sus cifras históricas ni mezclar denominadores. El JSON complementario incluye 507 filas de consultas y 593 combinaciones consulta+página para el período actual, frente a 374 y 429 del anterior. Ninguno alcanzó el límite solicitado de 2.500 filas; esto no elimina la omisión de datos propia de GSC.

La nueva tabla cruzada **sí confirma** la asociación de `mesa` con `/collections/mesas`: 3.049 impresiones, 0 clics y posición media 6,112 en la ventana normalizada. Usar este hallazgo para priorizar la segmentación por día, país y dispositivo. Las tablas siguientes conservan las cifras del informe original y están identificadas como tales.

### 2.3 URLs prioritarias del informe existente

| URL | Clics | Impresiones | CTR | Posición media | Decisión inicial |
|---|---:|---:|---:|---:|---|
| `/` en www | 69 | 1.429 | 4,83% | 10,6 | Proteger captación local y aclarar oferta |
| `/kit-pergola` | 27 | 749 | 3,60% | 7,1 | Profundizar producto y contenido de compra |
| `/muebles-chillan` | 25 | 406 | 6,16% | 9,4 | Consolidar diferenciación con home |
| `/puertas-a-medida` | 14 | 427 | 3,28% | 9,5 | Añadir evidencia y especificaciones reales |
| `/molduras-a-medida` | 9 | 132 | 6,82% | 8,0 | Proteger y ampliar con perfiles reales |
| `/cubiertas-a-medida` | 6 | 436 | 1,38% | 7,9 | Prioridad de intención y contenido |
| `/muebles-de-cocina-chillan` | 6 | 195 | 3,08% | 7,7 | Casos locales y alcance comercial |
| `/peldanos-a-medida` | 4 | 163 | 2,45% | 9,8 | Investigar caída desde 10 clics |
| `/collections/mesas` | 0 | 3.614 | 0% | 7,9 | Mayor oportunidad aparente; validar consulta y dispositivo |
| `/products/mesa-nordica` | 2 | 264 | 0,76% | 20,2 | Segmentar consultas antes de tocar snippet |
| `/products/mesa-tripode-ratona` | 1 | 227 | 0,44% | 7,2 | Mejorar intención comercial y producto |
| `/products/silla-kentucky` | 0 | 117 | 0% | 3,2 | Validar significado de Kentucky y SERP |
| `/mesas-de-centro` | 0 | 111 | 0% | 8,5 | Diferenciar landing y productos |
| `/products/mesa-centro-roma` | 0 | 101 | 0% | 3,5 | Revisar consulta, foto, precio y resultado mostrado |
| `/comedores-nordicos` | 1 | 218 | 0,46% | 19,5 | Distinguir mesa individual de conjunto de comedor |

Los “126,5 clics potenciales” que el informe asigna a mesas provienen de un CTR de referencia fijo. **No son un pronóstico.** Un CTR esperado debe depender de consulta, país, dispositivo, intención, posición y composición de la página de resultados.

### 2.4 Consultas observadas, sin inventar volumen de mercado

| Consulta exacta del informe | Clics | Impresiones | Posición | Interpretación inicial |
|---|---:|---:|---:|---|
| `mesa` | 0 | 3.011 | 6,1 | Muy genérica; investigar concentración y relevancia |
| `mesas` | 0 | 283 | 14,7 | Categoría amplia |
| `muebles chillan` | 15 | 163 | 5,1 | Intención local de valor probado |
| `mesa ratona` | 0 | 158 | 9,0 | Comercial o exploratoria; validar Chile |
| `kit pergola` | 4 | 121 | 5,4 | Buena base para ampliar intención útil |
| `comedores nordicos` | 0 | 99 | 33,6 | Visibilidad aún débil para esta consulta |
| `puertas a medida` | 6 | 98 | 11,1 | Demanda comercial comprobada |
| `fabrica de muebles chillan` | 0 | 77 | 7,3 | Oportunidad local |
| `muebleria chillan` | 1 | 68 | 5,4 | Comparar con variantes locales que sí convierten en clic |
| `comedor nordico` | 0 | 68 | 23,5 | Revisar si usuario busca juego completo |
| `mesa nordica` | 0 | 67 | 2,3 | No confundir con la posición global del producto |
| `silla kentucky` | 0 | 64 | 1,3 | Posición alta sin clic; requiere inspección de intención |
| `mesones para quinchos` | 1 | 36 | 7,6 | Profundizar dentro de cubiertas antes de crear otra URL |

Estas impresiones representan exposición de Idea Madera en GSC, **no búsquedas mensuales totales**, dificultad SEO ni tamaño del mercado. No convertirlas en esas métricas.

### 2.5 Limitaciones que afectan decisiones

- El bucket marca/no marca del informe suma 65 clics, muy por debajo de los 201 totales. Existe cobertura parcial de consultas, anonimización y/o límites de extracción. No afirmar que la diferencia pertenece a marca o no marca.
- El corte consulta+página del generador usa solo 25 filas. Es insuficiente para diagnosticar canibalización o el total de la consulta `mesa`.
- GSC puede omitir filas incluso paginando. Una exportación grande sigue sin equivaler a un censo de todas las búsquedas.
- Los datos de sitemap incluyen un campo `indexed` obsoleto. El cero no prueba desindexación.
- Tener impresiones históricas del host sin www no demuestra que hoy falte una redirección.
- No se midieron aquí Core Web Vitals de campo, ventas atribuidas ni leads cualificados. El plan especifica cómo hacerlo.

## 3. Diagnóstico y prioridades

### 3.1 Hallazgos confirmados

| Hallazgo | Evidencia | Prioridad y efecto |
|---|---|---|
| Medición con fechas mal etiquetadas | `start = end - DAYS` con extremos inclusivos | P0: comparar ventanas equivalentes |
| Alerta de indexación basada en campo obsoleto | `contents[].indexed` de Sitemaps API | P0: evitar diagnóstico y trabajo innecesarios |
| Colección vacía accesible e indexable | `/collections/racks` respondió 200 con canonical propio; catálogo tiene cero racks con imagen | P0: definir política de colecciones vacías |
| Producto descrito con intención equivocada | Piso Osaka habla de metros cuadrados e instalación; foto inspeccionada muestra taburete alto | P0: corregir contenido comercial falso por confusión semántica |
| Reseñas genéricas y rating fijo en UI | `SocialProof.tsx`, constantes 4,9 y 200 en `seo.ts` | P0: verificar procedencia o retirar afirmaciones |
| Sitemap con fechas artificialmente frescas | `new Date()` para todas las URLs | P1: `lastmod` basado en cambios reales o ausente |
| 26 productos sin imagen | Conteo del catálogo TypeScript | P1/P2: activar por lotes con fotografías verificadas |
| CTR cero con exposición comercial | Tabla GSC | P1: diagnóstico por consulta, seguido de cambios específicos |
| Seguimiento WhatsApp no demuestra envío a GA4 | `dataLayer.push({event: 'whatsapp_click'})`, mientras GA se carga vía gtag | P1: verificar evento real y evitar duplicación |

El HTML de la muestra de Silla Kentucky no contenía `aggregateRating`. Por tanto, no se afirma que todos los productos estén publicando reseñas falsas en JSON-LD: el hallazgo confirmado es el componente visible y la existencia de helpers reutilizables. Auditar usos y HTML antes de describir alcance.

### 3.2 Lo que ya funciona y se debe preservar

- La home sin www terminó en www durante la consulta pública.
- `collections/mesas?page=1` terminó en la URL limpia.
- `/collections/mesas` expone título, H1 y canonical en HTML.
- El sitemap público respondió 200 y contenía **52 URLs**.
- Robots permite el sitio y excluye `/api/`.
- La separación de helpers de SEO, productos, colecciones y servicios permite cambios concentrados.
- Las landings locales y de servicios están consiguiendo clics. No sustituirlas con páginas genéricas nuevas.

La inspección pública siguió redirecciones; no registró toda la cadena ni cada código intermedio. La validación técnica de ejecución deberá guardarlos explícitamente.

## 4. Arquitectura y archivos a utilizar

| Archivo o carpeta | Función | Trabajos previstos |
|---|---|---|
| `src/data/products.ts` | Catálogo estático, precios, atributos, imágenes | Corregir Osaka, completar fichas, SEO por producto |
| `src/lib/catalog.ts` | Visibilidad y categorías | Política de colecciones vacías, validación de imágenes |
| `src/lib/product-seo.ts` | Copy derivado de producto | Evitar fallbacks inventados y mantener coherencia |
| `src/lib/collection-seo.ts` | H1, títulos y descripciones | Mesas, pisos/taburetes y textos únicos |
| `src/lib/service-landings.ts` | Contenido de servicios | Cubiertas, puertas, molduras, peldaños y local |
| `src/lib/seo.ts` | URLs, schema, políticas, FAQs y prueba social | Datos verificados, URLs canónicas y schema |
| `src/app/collections/[handle]/page.tsx` | Render de colecciones | Vacías, bloques de ayuda y enlaces contextuales |
| `src/app/products/[handle]/page.tsx` | Fichas y galerías | Atributos, FAQ visible, producto y CTA |
| `src/app/components/ServiceLandingPage.tsx` | Plantilla de servicios | Casos, especificaciones, dudas y cotización |
| `src/app/components/SocialProof.tsx` | Prueba social visible | Reseñas verificables o contenido factual |
| `src/app/components/HomePage.tsx` y `HeroBanner.tsx` | Home y propuesta inicial | Claridad temática y enlace a servicios |
| `src/app/kit-pergola/page.tsx` | Landing propia del kit | Inclusiones, exclusiones y compatibilidad |
| `src/app/mesas-de-centro/page.tsx` | Landing específica | Diferenciación frente a colección de mesas |
| `src/app/comedores-nordicos/page.tsx` | Landing específica | Alcance real: mesas o conjuntos |
| `src/app/sitemap.ts` y `robots.ts` | Descubrimiento | URLs elegibles y fechas reales |
| `src/middleware.ts` y `next.config.ts` | Normalización y redirects | Matriz de URLs y destinos específicos |
| `src/lib/whatsapp.ts` | CTA y tracking | Instrumentación y atribución básica |
| `src/app/components/DeferredThirdPartyScripts.tsx` | Carga de analytics | Validar envío de eventos y carga diferida |
| `scripts/gsc-report*.mjs` | Extracción y reportes | Ventanas, cobertura, paginación y alertas |
| `public/images/` | Fotografías | Inventario, correspondencia y optimización |
| `self-learn/seo/` | Memoria operativa | Actualizar tras cada entrega |

## 5. Especificación de medición de Search Console

### SEO-01. Corregir línea base y reportes

**Problema:** una mala comparación puede priorizar la consulta equivocada, generar alertas falsas o declarar éxito sin evidencia.

**Implementación solicitada:**

1. Permitir fechas explícitas de inicio y fin en ambos reportes, con una interfaz consistente y documentada.
2. Para una ventana de N días, usar `inicio = fin - (N - 1)`; comparación anterior: `finAnterior = inicio - 1`, `inicioAnterior = finAnterior - (N - 1)`.
3. Manejar fechas de calendario de GSC en zona PT. Evitar que UTC del servidor cambie accidentalmente el día solicitado.
4. Solicitar `type: 'web'` y `dataState: 'final'` explícitamente para comparaciones. Distinguir fecha pedida de última fecha con datos devueltos. Si se prueba `all`, etiquetar los datos recientes como provisionales.
5. La extracción complementaria preparada usa `2026-08-08 → 2026-09-04` y `2026-07-11 → 2026-08-07`: **28 días inclusivos cada uno**. Mantenerla separada del informe original.
6. Exportar JSON además de Markdown: períodos, filtros, hora de extracción, dimensiones, límites, filas y errores.
7. Totales con consulta sin dimensiones; cortes separados por página, consulta, fecha, dispositivo y país.
8. Consulta+página con paginación y límite explícito. Empezar con hasta 2.500 filas para este sitio; ampliar solo si se alcanza el límite y el diagnóstico lo necesita.
9. Para mesas, Kentucky, ratona y cubiertas obtener consultas por URL; después separar Chile, móvil/escritorio y evolución diaria. Hacer solicitudes pequeñas y dirigidas antes de cruzar todas las dimensiones.
10. Mostrar `cobertura de consultas observadas = clics de filas query / clics totales`. No reasignar clics faltantes.
11. Conservar acentos y consulta original; crear una columna normalizada adicional para agrupación. No fusionar productos distintos por similitud del nombre.
12. Quitar la severidad automática basada en `contents[].indexed`. Conservar errores de sitemap, fecha de descarga y URLs enviadas como señales de operación.
13. URL Inspection: muestrear 8–12 URLs de distintos tipos; registrar canonical de Google, canonical declarado, estado y última lectura disponible. No afirmar que la API fuerza indexación.
14. Si un endpoint falla, mostrar `no disponible` con error resumido, no `0`. No confundir ausencia de credenciales con ausencia de tráfico.

**Aceptación:** informe con ventanas de igual longitud, extracción reproducible, totales reconciliados hasta donde GSC lo permite y ningún mensaje de “0 indexadas” sustentado en el campo obsoleto.

**Pruebas necesarias:** aritmética de fechas en cambio de mes/año, CTR con denominador cero, paginación, timeout y respuestas sin filas. Son pruebas funcionales del sistema de medición, no tests del texto del informe.

### SEO-02. Tablero de resultados útil

Crear `docs/seo-seguimiento-YYYY-MM-DD.md` con:

- Clics e impresiones totales para Chile y mundo, separados.
- CTR comercial no marca sobre consultas observadas, con porcentaje de cobertura.
- Rendimiento de cada URL intervenida y su grupo de consultas.
- Distribución móvil/escritorio.
- URLs con canonical inesperado o problemas confirmados de indexabilidad.
- Clics a WhatsApp desde sesiones orgánicas, solo si GA4 los registra.
- Leads cualificados y ventas cuando el negocio proporcione el dato.
- Registro de fecha de publicación, primera comprobación del cambio y posible recrawl.

No hace falta construir un dashboard web. Los archivos fechados y una tabla histórica son suficientes.

## 6. Investigación de consultas y competencia

### 6.1 Método de bajo costo

La fuente principal es GSC: ya hay consultas con exposición real. Expandir con preguntas comerciales del taller y observación de resultados de búsqueda. Una búsqueda web abierta no reproduce una SERP geolocalizada de Google Chile y no debe reportarse como ranking local exacto.

Para cada cluster prioritario:

1. Obtener consultas de la URL actual y separar las que tienen intención de compra, consulta técnica, inspiración o ambigüedad.
2. Revisar hasta cinco páginas competidoras relevantes, empezando por fabricantes o vendedores reales.
3. Registrar URL, fecha, tipo de página, producto real, información útil que aporta, fotos, inclusiones, precio si está publicado, despacho y tipo de CTA.
4. Registrar elementos observados de SERP: anuncios, Shopping, imágenes, mapas y resultados informativos. Si la herramienta no los devuelve, marcar `no observado`.
5. Escribir una diferencia útil que Idea Madera pueda respaldar. No copiar descripciones ni atribuirse materiales o servicios de competidores.
6. Guardar oportunidades con nivel de evidencia: `GSC`, `SERP observada`, `pregunta de clientes` o `hipótesis`.

La consulta `silla kentucky` necesita comprobar si los resultados se refieren al mismo tipo de silla vendido por Idea Madera. La posición media 1,3 no garantiza que el usuario vea un resultado tradicional atractivo ni que busque este diseño. El contraste de imagen y producto es decisivo.

Para `mesa`, inspeccionar si las impresiones están concentradas en pocos días o dispositivos. La tabla cruzada complementaria confirmó 3.049 impresiones en `/collections/mesas` para su ventana de 28 días; no mezclarlas con las 3.011 del informe original. No perseguir una palabra genérica solo porque aumenta un total.

### 6.2 Referencias externas iniciales

La búsqueda exploratoria encontró [Casa Zaru](https://www.casazaru.cl/) en cubiertas y puertas y [iTamar](https://www.itamar.cl/) en pérgolas y trabajos de exterior. Son referencias de oferta para una revisión posterior, no un ranking documentado de competidores ni una comparación de calidad.

En la búsqueda también apareció la [landing propia del kit](https://www.ideamadera.cl/kit-pergola). El producto declara que son uniones metálicas y fijaciones y que **no incluye maderas**. No proponer títulos como “kit completo de pérgola de madera” sin aclarar el contenido real.

### 6.3 Protocolo opcional de Apify: máximo USD 3

Usar únicamente si sigue faltando información que cambie una decisión concreta; por ejemplo, una muestra reproducible de resultados de Google Chile para seis consultas. No es necesario contratarlo para seguir este plan.

1. Leer la skill de Apify disponible en el entorno y descubrir herramientas accesibles.
2. Verificar precio vigente del actor, cargo mínimo, eventos facturables, costos de plataforma/proxy y límites efectivos antes de ejecutar.
3. Mantener `docs/apify-gastos-seo.csv`: fecha, actor, objetivo, run ID, límite, costo observado, acumulado y saldo.
4. Preferir un único lote pequeño: seis consultas, una página por consulta, máximo diez resultados orgánicos por consulta, sin crawlear destinos automáticamente.
5. Consultas sugeridas: `mesas de madera chile`, `mesa ratona chile`, `silla kentucky chile`, `cubiertas de madera a medida`, `kit pergola chile`, `muebles chillan`.
6. Reservar hasta USD 1 para piloto y hasta USD 2 adicionales solo si el costo del piloto está confirmado y existe una pregunta pendiente. **El total no puede superar USD 3.**
7. Si el actor permite un tope monetario duro, configurarlo conforme a su schema vigente. No inventar un parámetro de control de gasto.
8. Si no puede garantizarse un límite total bajo USD 3, no ejecutar; seguir con GSC y revisión gratuita. Un cálculo aproximado por resultado no es una garantía de presupuesto.
9. Desactivar recurrencias. No iniciar ejecuciones paralelas ni reintentos automáticos de pago. Consultar estado y dataset de la misma ejecución antes de repetirla.
10. No enviar tokens, datos de clientes, reportes privados o credenciales del sitio al actor. Para esta tarea solo hacen falta consultas públicas.

No añadir columnas de “volumen” o “dificultad” con números deducidos de SERP. Si no hay una fuente válida, usar `no disponible`.

## 7. Mapa de palabras clave y URLs

La columna de consultas secundarias contiene propuestas de cobertura semántica, no volúmenes comprobados. Cada URL debe tener un propósito principal reconocible.

| Cluster | URL principal propuesta | Consulta principal | Cobertura secundaria | Condición |
|---|---|---|---|---|
| Marca y catálogo del fabricante | `/` | Idea Madera; muebles de madera en Chillán | taller, muebles Chile, categorías | Preservar consultas locales que ya llegan a home |
| Servicio local | `/muebles-chillan` | muebles en Chillán | fábrica de muebles Chillán, mueblería Chillán | Diferenciar con atención local y obras reales |
| Fabricación personalizada | `/muebles-a-medida` | muebles de madera a medida | proceso, medidas, terminaciones | Ya existe; no crear duplicado |
| Cocinas | `/muebles-de-cocina-chillan` | muebles de cocina Chillán | diseño, fabricación, instalación si se ofrece | Verificar materiales y alcance |
| Mesas de catálogo | `/collections/mesas` | mesas de madera | mesas comedor, redondas, madera maciza si corresponde | Colección principal |
| Mesas de centro | `/mesas-de-centro` | mesas de centro de madera | mesa ratona, living | Landing que ayuda a elegir |
| Modelo ratona | `/products/mesa-tripode-ratona` | mesa ratona trípode | mesa de centro trípode | Ficha del modelo |
| Estilo nórdico | `/comedores-nordicos` | comedores nórdicos | comedor estilo nórdico | Aclarar qué incluye la compra |
| Modelo nórdica | `/products/mesa-nordica` | mesa nórdica de madera | medidas y terminación del modelo | Ficha, no guía de todo el estilo |
| Modelo Kentucky | `/products/silla-kentucky` | silla Kentucky de madera | silla comedor si el diseño corresponde | Validación de intención previa |
| Cubiertas | `/cubiertas-a-medida` | cubiertas de madera a medida | mesones para quinchos, cubierta mesa | Unificar necesidades compatibles |
| Puertas | `/puertas-a-medida` | puertas de madera a medida | puertas personalizadas | Tipos realmente fabricados |
| Peldaños | `/peldanos-a-medida` | peldaños de madera a medida | huellas de escalera | No prometer construcción integral de escaleras |
| Molduras | `/molduras-a-medida` | molduras de madera a medida | perfiles y terminaciones | Mostrar sección real del perfil |
| Kit de uniones | `/kit-pergola` | kit de uniones para pérgola | bases, conectores, madera compatible | No incluye madera |
| Taburetes | `/collections/pisos` | pisos o taburetes de madera | asiento alto, banqueta según producto | Mantener URL; corregir significado |
| Piso Osaka | `/products/piso-osaka` | piso de madera Osaka | taburete de madera | No usar vocabulario de revestimientos |

### 7.1 Reglas para evitar canibalización

- Dos URLs con impresiones para la misma consulta no son automáticamente un problema. Buscar alternancia persistente de URL, intención duplicada y peor resultado agregado.
- Mantener fichas para modelos, colecciones para selección de productos y landings para necesidades específicas.
- Home puede seguir captando `muebles chillan`; no cambiar canonical a la landing local ni forzar un redirect.
- Antes de fusionar páginas, registrar contenido único, consultas, enlaces internos, conversiones y destino equivalente.
- No crear `/mesas-ratonas`, `/mesas-ratonas-chile` y `/mesa-de-centro-chile` como variantes redundantes de la landing actual.
- Si dos páginas se consolidan, trasladar lo útil, aplicar un redirect permanente al destino equivalente, actualizar enlaces y sitemap, y monitorizar ambas URLs.

## 8. Especificación técnica

### SEO-03. Política de colecciones vacías y productos invisibles

**Archivos:** `catalog.ts`, página de colección, página de producto, sitemap.

`getCategoryByHandle` reconoce categorías de una lista fija, aunque no tengan productos visibles. La página de colección puede devolver una colección vacía con metadata indexable. El caso racks se verificó públicamente.

**Política a implementar:**

- Categoría desconocida: `notFound()` y metadata noindex cuando corresponda.
- Categoría conocida sin productos publicables y sin contenido comercial propio útil: no indexar ni incluir en sitemap. Elegir 404 si no debe existir públicamente; si debe conservarse como espera temporal, 200 con `noindex,follow`, información honesta y alternativas relevantes.
- No bloquear por robots una página que necesita que Google lea su `noindex`.
- No redirigir todas las vacías a home. Una redirección requiere un reemplazo pertinente.
- Cuando aparezca un producto real con imagen válida, revisar y retirar el noindex, incorporar la categoría a navegación y sitemap y comprobar HTML.
- Producto sin imagen: respetar exclusión existente y comprobar acceso directo, no solo `generateStaticParams`. La ausencia de una ruta prerenderizada por sí sola no garantiza que no pueda resolverse dinámicamente.

**Aceptación:** ninguna colección vacía queda indexable accidentalmente; los productos sin imagen mantienen su exclusión; las categorías con productos siguen funcionando.

### SEO-04. Normalización, canonical y redirecciones

Construir una matriz que incluya home www/apex, HTTP/HTTPS, `?page=1`, `?page=2`, parámetros `pr_*`, producto por handle/id, rutas legacy y ruta inexistente.

- Registrar status de cada salto, URL final, canonical, robots y destino en sitemap.
- Conservar redirecciones existentes que funcionan.
- La colección actual muestra todos los productos y no implementa paginación real. Confirmar que `?page=2` no pretende mostrar un subconjunto diferente antes de normalizarlo.
- Si se implementa paginación real en el futuro, cada página con contenido distinto tendrá URL y canonical propios; no canonicalizar todas a página 1.
- No eliminar indiscriminadamente parámetros de atribución usados por analytics.
- Revaluar redirects de `/collections/mesas-de-centro` y `/collections/mesas-ratona`: actualmente apuntan a `/collections/mesas`, aunque existe `/mesas-de-centro`. Cambiar al destino más equivalente solo después de revisar oferta y enlaces.
- Para contenido eliminado sin sustituto equivalente, un 404/410 correcto puede ser preferible a un redirect irrelevante. La regla del repo sobre legacy no debe interpretarse como obligación de convertir cualquier URL inexistente en home.
- Verificar `NEXT_PUBLIC_SITE_URL`: el helper admite override. Proteger la configuración de producción para que metadata y schema siempre usen www.

**Aceptación:** no hay bucles, rutas canónicas apuntando a 404 o cadenas nuevas innecesarias; se conserva la semántica de parámetros funcionales.

### SEO-05. Sitemap y robots

- Mantener únicamente URLs canónicas, indexables y con contenido real.
- Reemplazar `lastModified: new Date()` global por fechas de edición verificables. Añadir `updatedAt` a datos solo cuando exista una fecha real; si no hay fuente fiable, omitir `lastModified`.
- No inventar fechas de actualización tomando la fecha del plan.
- Mantener solo el sitemap www enviado a GSC. No reenviarlo repetidamente como técnica de posicionamiento.
- Comparar URLs del sitemap con catálogo visible y landings; detectar duplicados, redirecciones y productos sin imagen.
- Robots no debe ocultar JS, CSS o fotografías necesarias para renderizar páginas públicas.

**Aceptación:** sitemap válido, sin URLs excluidas por la política de visibilidad y sin fechas artificialmente renovadas para contenido sin cambios.

## 9. Colecciones y productos prioritarios

### SEO-06. Primera tanda: colección de mesas

**Objetivo:** que la URL responda mejor a una decisión de compra real, sin reducir su tema a la palabra `mesa`.

**Antes de editar:** extraer consultas cruzadas, ver distribución diaria, revisar snippet observado y confirmar precio mínimo vigente. El título actual ya dice “Mesas de Madera Maciza | Comedor y Living Chile | Idea Madera”; no registrar su existencia como tarea pendiente.

**Especificación de página:**

1. H1 claro de mesas de madera, con “maciza” solo si describe todo el inventario al que se refiere.
2. Introducción propia de 60–100 palabras orientativas, separada de la meta description para que ambas cumplan funciones distintas.
3. Enlaces visibles a mesas de centro y comedores nórdicos con texto descriptivo.
4. Grilla accesible en HTML con productos con imagen, nombre, precio vigente y enlace a ficha.
5. Bloque breve para elegir forma, capacidad y tamaño. No asignar número de comensales a modelos sin medidas verificadas.
6. Explicar cómo cotizar medidas/terminación y cómo se confirma despacho.
7. Entre tres y cinco preguntas comerciales con respuestas reales; sin relleno para llegar a un número de palabras.
8. CTA contextual que identifique la colección en el mensaje.

**Variantes editoriales para elegir una, no rotar diariamente:**

- Título A: `Mesas de madera para comedor y living` + plantilla de marca.
- Título B: `Mesas de madera: modelos y medidas` + plantilla de marca.
- Descripción propuesta: `Explora mesas de madera para comedor y living. Compara modelos y cotiza medidas, terminaciones y despacho con Idea Madera.`

Son borradores. Validar oferta antes de publicación. Si se usa “desde $…”, calcular desde productos elegibles y vigentes, o eliminar el precio para evitar que quede obsoleto. No sumar la marca dos veces si `layout.tsx` ya aplica la plantilla.

**Aceptación:** contenido específico, datos coherentes, enlaces rastreables y registro del título final; baseline guardado antes del cambio.

### SEO-07. Fichas ratona, Kentucky, nórdica y Roma

Orden recomendado: ratona y Kentucky primero; después Roma y nórdica según consultas recientes. No juzgar una URL solo por la posición media global.

Cada ficha debe contener:

- Nombre comercial y tipo de mueble reconocible.
- Foto principal exacta del modelo y galería que no mezcle acabados distintos sin explicación.
- Precio en CLP, indicación de unidad o conjunto y disponibilidad coherente.
- Dimensiones reales con ejes claros: ancho, profundidad/largo y alto.
- Madera/material, terminación y uso recomendado respaldados por catálogo o taller.
- Qué se puede personalizar y qué debe cotizarse.
- Fabricación y despacho como procesos distintos.
- Cuidados pertinentes al acabado real.
- Enlace a colección y a dos o tres alternativas relevantes.
- CTA con nombre, referencia y URL del producto.

**Borradores de título:**

| Producto | Título base sugerido, antes de la marca | Condición |
|---|---|---|
| Ratona | `Mesa ratona trípode de madera para living` | Verificar que trípode describe el modelo |
| Kentucky | `Silla Kentucky de madera para comedor` | Confirmar uso/diseño y consulta esperada |
| Nórdica | `Mesa nórdica de madera: medidas y terminación` | Si la ficha aporta realmente esos datos |
| Roma | `Mesa de centro Roma de madera` | Diferenciarla de variantes de comedor Roma |

**Experimento:** cambiar un conjunto pequeño de snippet y claridad de ficha con fecha única. Si se cambia también imagen principal o precio, registrarlo como intervención conjunta; no atribuir el efecto solamente al title.

### SEO-08. Corrección semántica del Piso Osaka

**Evidencia:** `public/images/piso-osaka-main.jpg` muestra un asiento alto de madera. El texto actual habla de pisos interiores, metros cuadrados e instalación. Es un error comercial, no solo una oportunidad de keyword.

1. Corregir descripción, shortPitch y features para describir un piso/taburete de madera.
2. Eliminar “cotización por metro cuadrado”, “confirmar metros” e instalación de revestimientos.
3. Corregir `collection-seo.ts` para que `/collections/pisos` represente asientos y no pavimentos.
4. Revisar `product-seo.ts` por fallbacks derivados de la categoría.
5. Mantener `/products/piso-osaka` y `/collections/pisos` para evitar migración innecesaria.
6. No inferir altura exacta, capacidad de carga, especie o uso exterior a partir de la foto. Solicitar esos datos si no existen.

**Aceptación:** página, metadata, schema y mensajes de cotización describen el mismo tipo de objeto; no queda vocabulario de revestimientos vinculado al Osaka.

## 10. Servicios y SEO local

### SEO-09. Profundizar cubiertas, puertas, molduras y peldaños

Usar `ServiceLandingPage` y datos estructurados reutilizables. Si una sección nueva exige extender tipos, hacer campos opcionales para no romper las demás landings.

| Landing | Información que debe resolver | Evidencia a conseguir | Conversión |
|---|---|---|---|
| Cubiertas | Uso, medidas, espesor, cantos, acabado y cuidados | Fotos de cubiertas reales y ficha del material | Cotización con medidas, uso y comuna |
| Puertas | Interior/exterior, hoja/marco, medidas, herrajes e instalación | Fotos de trabajos reales y alcance del taller | Medidas y foto del vano si el cliente lo desea |
| Molduras | Forma del perfil, dimensiones, largo y terminación | Fotos frontales y de sección con escala | Enviar perfil deseado y cantidad |
| Peldaños | Huella, espesor, cantidad, terminación y montaje incluido o excluido | Casos y piezas reales | Medidas de peldaño, cantidad y comuna |

**Estructura por landing:** respuesta inicial breve, galería real, aplicaciones, especificaciones confirmadas, proceso, inclusiones/exclusiones, logística, preguntas frecuentes y CTA. Longitud orientativa de 500–900 palabras cuando exista material útil; nunca rellenar hasta alcanzar una cuota.

Para cubiertas incluir una sección de **mesones para quinchos** dentro de la URL actual. Solo abrir una landing aparte si el análisis posterior demuestra intención claramente distinta y hay oferta/fotografías suficientes. No afirmar resistencia al calor o intemperie sin respaldo técnico del acabado y la madera.

Para peldaños investigar la caída de 10 a 4 clics por consulta y posición. Seis clics de diferencia en un sitio pequeño no justifican reescribir toda la página sin conocer el motivo.

### SEO-10. Potenciar el kit de pérgola

Ya tiene 27 clics y crecimiento. Mantener visibles sus exclusiones:

- Es un kit de uniones metálicas y fijaciones, no una pérgola terminada.
- No incluye maderas.
- Documentar compatibilidad publicada y confirmar tolerancias reales antes de ampliarlas.
- Mostrar el contenido exacto de la caja y tipos de base.
- Explicar qué información necesita el vendedor para cotizar.
- Añadir fotos de piezas reales y del montaje solo cuando existan y corresponda su uso.
- No prometer que cualquier dimensión de pérgola es estructuralmente segura. No inventar cargas, luces admisibles o certificaciones.

Si se evalúa schema Product, confirmar que el kit se vende como producto identificable con datos de oferta válidos. No convertir un servicio cotizable sin precio real en un producto ficticio para lograr resultados enriquecidos.

### SEO-11. Home y landings de Chillán

La home aporta 14 de los 15 clics observados en la combinación `muebles chillan` del informe. La landing local también crece, pero esto no prueba canibalización.

- Home: presentar al fabricante, el catálogo, categorías y servicios; revisar el H1 actual “Idea Madera” para valorar una aclaración temática natural.
- `/muebles-chillan`: atención local, taller, ejemplos de proyectos y cómo cotizar desde Chillán.
- `/muebles-a-medida`: proceso y decisiones de personalización.
- `/muebles-de-cocina-chillan`: alcance específico de cocinas y casos reales.
- Mantener enlaces entre páginas cuando ayuden a elegir; no repetir exactamente el mismo bloque local en todas.

**Google Business Profile:** preparar una ficha de consistencia con nombre, teléfono, dirección o área de servicio, horario, web y categorías. Contrastar los datos existentes del schema con información aprobada por el negocio. La existencia en el código no verifica una dirección, coordenada u horario.

No inventar sucursales para comunas cercanas. No publicar dirección residencial como local abierto si no corresponde. Actualizaciones en Business Profile o solicitud de reseñas solo con el acceso y autorización pertinentes; el ejecutor puede dejar contenido y lista de cambios listos para revisión.

## 11. Fotografías y catálogo pendiente

### SEO-12. Activar productos sin imagen por lotes

La prioridad comercial de racks y escritorios es una hipótesis hasta revisar demanda. Las mesas pueden aprovechar una categoría ya expuesta; elegir por demanda observada, disponibilidad real y fotos listas.

**Inventario completo de los 26 pendientes al preparar el plan:**

| Categoría | IDs sin imagen |
|---|---|
| Mesas | `mesa-comedor-liguria`, `mesa-comedor-genova`, `mesa-comedor-frida`, `mesa-comedor-frida-negra`, `mesa-centro-taipei`, `mesa-centro-bali`, `mesa-comedor-osaka`, `mesa-comedor-luisa`, `mesa-comedor-praga`, `mesa-centro-seul` |
| Racks | `rack-oslo`, `rack-bali`, `rack-osaka`, `rack-tokio`, `rack-kyoto`, `rack-helsinki` |
| Repisas | `repisa-madera-moderna`, `repisa-madera-catania`, `repisa-taipei` |
| Escritorios | `escritorio-mid-century`, `escritorio-mid-century-negro` |
| Bancas | `banca-griega-negra`, `banca-luisa` |
| Sitiales | `sillon-lombardo-dos-cuerpos` |
| Percheros | `perchero-sofia` |
| Veladores | `velador-tokio` |

**Proceso por producto:**

1. Inventariar archivos ya disponibles en `public/images` y cualquier carpeta de assets autorizada.
2. Ver visualmente la foto; no emparejar solo por nombre de archivo.
3. Confirmar modelo, terminación y derecho de uso.
4. Si falta foto, registrar una solicitud concreta: vista principal, detalle, medidas y acabado. El modelo no puede producir evidencia fotográfica de un producto real inexistente mediante generación de imágenes.
5. Optimizar tamaño sin degradar la percepción del producto; conservar original fuera del flujo público si hace falta.
6. Añadir `imageUrl`, galería si existe, alt descriptivo y atributos verificados.
7. Confirmar precio, stock y capacidad de fabricación antes de mostrar “disponible”.
8. Verificar inclusión coherente en categoría, enlaces, ficha y sitemap.
9. Publicar lotes iniciales de 3–5 productos cuando estén completos; no forzar los 26 si faltan datos.

**Aceptación:** cada producto activado tiene foto exacta accesible, ficha útil y ruta indexable sin romper la exclusión de los restantes. El objetivo de 55/55 es condicional a que los 55 sigan siendo comercialmente válidos.

## 12. Datos estructurados y confianza

### SEO-13. Verificar todo dato comercial publicado

Hay constantes de reseñas, plazos, devoluciones, dirección, horarios y garantías. Clasificarlas en una matriz:

`dato | archivo | valor actual | fuente del negocio | fecha validada | aparece en UI | aparece en schema | acción`.

- Reseñas: conservar solo con procedencia verificable y uso permitido. Una reseña de la empresa no se transforma en reseña de cada producto.
- Si no hay respaldo para “4,9”, “200+” y testimonios genéricos, retirar esos bloques y mantener afirmaciones factuales verificadas.
- No fabricar nombres de autores ni reutilizar el mismo rating para todo el catálogo.
- Garantía, devoluciones y despacho: confirmar política del negocio y su aplicación a productos a medida; no establecer condiciones legales nuevas como tarea SEO.
- Si falta una condición, omitir el campo no respaldado o redactar una invitación a confirmarlo, sin convertir una duda en promesa.

### SEO-14. Schema por tipo de página

| Tipo de página | Schema apropiado a evaluar | Validaciones |
|---|---|---|
| Home / empresa | Organization o FurnitureStore coherente | Identidad real y `@id` estable |
| Producto | Product y Offer cuando exista oferta válida | Nombre, imagen, precio CLP, URL y disponibilidad |
| Colección | BreadcrumbList e ItemList | Solo elementos visibles, URLs finales |
| Servicio | Service con proveedor real; oferta solo si corresponde | Alcance visible y sin precio inventado |
| Guía futura | Article cuando sea contenido editorial real | Autor/revisor y fechas verificables |

Validar JSON sintácticamente, contrastarlo con el contenido visible y usar las herramientas oficiales disponibles para los tipos compatibles. No considerar que un schema válido garantice un resultado enriquecido.

**FAQs:** mantener preguntas útiles para personas. Google retiró los resultados enriquecidos de FAQ en mayo de 2026 según su registro oficial consultado. No priorizar `FAQPage` como promesa de más CTR ni de visibilidad en IA; no hace falta eliminarlo por urgencia si es correcto, pero tampoco añadirlo masivamente esperando un beneficio garantizado.

## 13. Conversión y medición comercial

### SEO-15. Hacer medible el contacto orgánico

El flujo de compra está orientado a WhatsApp. El negocio debe saber si los clics adicionales producen consultas útiles.

**Hallazgo técnico:** `trackWhatsAppClick` inserta un objeto en dataLayer y realiza una llamada a la integración de Facebook. El sitio carga GA4 mediante gtag. Ese objeto no demuestra que GA4 reciba automáticamente el evento; comprobar red de eventos y DebugView antes de afirmar que la medición existe.

**Implementación:**

1. Elegir una única vía de envío a GA4 coherente con la instalación actual; no agregar GTM solo por esta tarea.
2. Mantener evento `whatsapp_click` con `page_path`, identificador de producto o servicio y `placement`.
3. No enviar el texto libre del mensaje, teléfono del cliente, nombre, correo u otros datos personales a analytics.
4. No enviar el precio de referencia como ingreso de una venta. Si se conserva como parámetro, etiquetarlo claramente como contexto de producto.
5. Verificar que el primer clic, incluso antes de completar la carga diferida, no se pierda o duplique. El enlace debe funcionar aunque analytics falle.
6. Evitar que un clic origine varios eventos idénticos por bubbling o varios listeners.
7. Validar navegación entre rutas para no duplicar page views.
8. Usar el evento como microconversión. Reservar `generate_lead` para el evento que realmente represente un lead según la definición acordada.

**Definiciones del embudo:**

- Sesión orgánica: sesión atribuida por GA4 a organic search, bajo su modelo y limitaciones.
- Clic WhatsApp: intención de abrir contacto; no confirma mensaje enviado.
- Lead cualificado: contacto real con necesidad compatible, datos suficientes y posibilidad de cotización, registrado por el negocio.
- Venta: operación confirmada por el negocio, con importe real.

No igualar clics GSC a sesiones GA4: son sistemas y unidades diferentes. El sitio puede medir el clic externo; confirmar conversación requiere información adicional del negocio o una integración autorizada.

**Aceptación:** evento visible en validación, un envío por clic, enlace funcional sin tracker y reporte de microconversiones separado de ingresos y leads reales.

## 14. Rendimiento e imágenes

### SEO-16. Medir antes de optimizar

Muestra mínima: home, colección mesas, ratona, Kentucky, cubiertas y kit. Usar móvil como primera comprobación, ya que aporta la mayor cantidad de impresiones y clics.

- Guardar Lighthouse/PageSpeed con fecha, URL, configuración y entorno.
- Si existen datos CrUX suficientes, evaluar LCP, INP y CLS de campo al percentil 75. Umbrales de referencia a verificar con documentación vigente: LCP ≤2,5 s, INP ≤200 ms y CLS ≤0,1.
- Si no hay muestra de campo, declararlo y usar laboratorio para diagnosticar; no afirmar que una puntuación Lighthouse prueba cumplimiento de campo.
- Revisar imagen principal, `sizes`, dimensiones reservadas y carga diferida de imágenes bajo el primer pliegue.
- No aplicar lazy loading a la imagen que determina LCP sin evaluar el efecto.
- Revisar galería, carruseles, vídeo de fábrica, fuentes y scripts de terceros antes de añadir más librerías.
- El proyecto ya configura WebP/AVIF en Next Image; no presentarlo como una función ausente.
- Mantener CTA visible sin tapar contenido en móvil y evitar saltos de layout al cargarlo.

**Aceptación:** solucionar un cuello de botella medido, comparar con la misma configuración y comprobar que fotografías, navegación y contacto no se rompen. No perseguir 100/100 sacrificando contenido útil.

## 15. Contenido editorial y visibilidad en IA

### SEO-17. Ampliar contenido solo tras estabilizar páginas comerciales

Primera fase: insertar ayuda dentro de las URLs actuales. Segunda fase: como máximo dos guías piloto si los clusters y preguntas de clientes justifican piezas independientes.

| Brief | Ubicación inicial | Contenido propio requerido | Enlaces comerciales |
|---|---|---|---|
| Cómo elegir una mesa de comedor | Bloque en colección; guía independiente si crece | Medidas reales, fotos y criterio del taller | Mesas y modelos apropiados |
| Mesa de centro y mesa ratona | `/mesas-de-centro` | Diferencias de uso y ejemplos propios | Ratona y Roma |
| Qué medir para cotizar una cubierta | `/cubiertas-a-medida` | Lista de datos y ejemplo de medición real | CTA de cubiertas |
| Qué incluye un kit de pérgola | `/kit-pergola` | Piezas, fotos, exclusiones y compatibilidad | CTA del kit |
| Cómo pedir molduras a medida | `/molduras-a-medida` | Sección del perfil, cantidades y acabado | CTA de molduras |

**Brief mínimo antes de redactar una guía:** intención, consultas observadas, usuario, pregunta principal, URL propietaria, por qué no basta la página actual, material original disponible, revisor real, enlaces y CTA.

No fabricar autor experto ni testimonios. Identificar como revisor al responsable real solo con su autorización. No crear artículos con números técnicos de resistencia, tratamientos o seguridad deducidos por el modelo.

### SEO-18. Descubrimiento y citas en motores de IA

La documentación oficial de Google indica que los fundamentos SEO siguen aplicando a sus funciones de IA; no se requiere un schema especial ni un archivo de texto de IA. Por eso este plan prioriza páginas accesibles, información comprobable, imágenes propias y coherencia comercial.

- Responder preguntas concretas al inicio de secciones.
- Presentar tablas de especificaciones reales y condiciones claras.
- Hacer explícita la identidad del taller y la procedencia de ejemplos.
- Revisar bloqueos por bot según su función y la preferencia del negocio. No confundir bots de búsqueda con bots de entrenamiento ni abrirlos todos como requisito SEO.
- `llms.txt` no es una prioridad ni un requisito de este plan.
- No prometer porcentajes de aumento de citas por añadir FAQs, estadísticas o citas externas.
- Si se mide presencia en respuestas de IA, guardar consulta, herramienta, fecha, respuesta, URL citada y variabilidad entre ejecuciones. Es observación complementaria, no ranking estable.

## 16. Backlog y calendario de ejecución

Las estimaciones son rangos de trabajo activo orientativos para planificar; no tiempos garantizados del modelo. Fotografías, acceso a cuentas, revisión comercial e indexación pueden añadir espera externa.

| ID | Prioridad | Trabajo | Dependencia | Esfuerzo orientativo | Entrega verificable |
|---|---|---|---|---|---|
| SEO-01 | P0 | Corregir extracción y alertas | OAuth lectura | 4–8 h | JSON/MD con fechas y cobertura |
| SEO-02 | P1 | Seguimiento por cohortes | SEO-01 | 2–4 h | Tabla fechada |
| SEO-03 | P0 | Colecciones vacías y acceso directo | Catálogo | 2–4 h | Política implementada y pruebas |
| SEO-04 | P1 | Canonicals y redirects | Matriz HTTP | 3–5 h | Rutas verificadas |
| SEO-05 | P1 | Sitemap y lastmod | SEO-03 | 2–4 h | Sitemap coherente |
| SEO-06 | P1 | Colección mesas | SEO-01 e intención | 4–8 h | Página y experimento registrado |
| SEO-07 | P1 | Cuatro fichas con exposición | Datos comerciales | 6–12 h | Fichas consistentes |
| SEO-08 | P0 | Corregir Piso Osaka | Foto ya verificada | 1–2 h | Semántica coherente |
| SEO-09 | P1 | Servicios prioritarios | Fotos y especificaciones | 8–16 h | 2 primeras landings completas |
| SEO-10 | P1 | Kit pérgola | Contenido real de kit | 3–6 h | Oferta clara y documentada |
| SEO-11 | P1 | SEO local y home | Datos de taller | 4–8 h | Diferenciación y ficha NAP |
| SEO-12 | P1/P2 | Fotos pendientes | Assets y validación del negocio | 1–2 h por ficha, sin sesión fotográfica | Lotes de 3–5 productos |
| SEO-13 | P0 | Prueba social y políticas | Fuentes del negocio | 2–5 h | Matriz y contenido corregido |
| SEO-14 | P1 | Schema por tipo | SEO-13 | 3–6 h | Validación de muestras |
| SEO-15 | P1 | WhatsApp y GA4 | Acceso y configuración | 3–6 h | Evento real sin duplicados |
| SEO-16 | P2 | Rendimiento | Mediciones previas | 4–10 h | Comparación reproducible |
| SEO-17 | P2 | Contenido editorial piloto | P1 estable | 4–8 h por pieza | Brief, revisión y contenido |
| SEO-18 | P3 | Seguimiento de citas IA | P1/P2 estables | 1–3 h iniciales | Registro acotado |

### Días 1–3: asegurar los fundamentos

- Registrar estado del repo y revisar evidencia de este plan.
- Normalizar GSC, generar baseline y corregir alerta obsoleta.
- Corregir Osaka, colecciones vacías y afirmaciones sin procedencia comprobable.
- Elaborar solicitud concreta de fotos/datos faltantes.
- Crear inventario de cambios y pruebas; completar QA del primer lote.

**Puerta de salida:** datos reproducibles y correcciones P0 verificadas. Si falta respuesta comercial, retirar u omitir afirmaciones no respaldadas y continuar lo independiente.

### Días 4–7: primera tanda comercial

- Analizar intención de mesas, ratona y Kentucky.
- Implementar colección mesas y dos fichas prioritarias.
- Verificar eventos WhatsApp.
- Revisar canonical, redirects y sitemap.
- Preparar contenidos de cubiertas y kit con fotos disponibles.

**Puerta de salida:** primer experimento documentado, HTML comprobado y rutas de contacto funcionales.

### Días 8–14: servicios y catálogo

- Completar cubiertas y kit; avanzar puertas/molduras según evidencia disponible.
- Completar Roma/nórdica si los datos lo justifican.
- Activar primer lote de productos con imagen.
- Revisar home/local y medición inicial de rendimiento.
- Actualizar memoria SEO y lista de tareas restantes.

### Días 15–30: observar y corregir regresiones

- Comprobar indexabilidad y cambios visibles tras publicación autorizada.
- No reescribir titles cada pocos días por oscilaciones pequeñas.
- Medir primer corte comparable; separar días previos y posteriores a publicación.
- Corregir errores técnicos confirmados sin esperar al día 30.
- Preparar segundo lote de fotos y un brief editorial si P1 está estable.

### Días 31–60: expandir lo que demuestra utilidad

- Evaluar cohortes de páginas, consultas comerciales y contacto.
- Mejorar variantes que no respondieron; priorizar intención/contenido si title ya era adecuado.
- Completar productos con datos disponibles.
- Publicar hasta dos guías útiles si tienen evidencia original y aprobación necesaria.
- Alinear Business Profile/Merchant Center si corresponde al modelo comercial y existe autorización.

### Días 61–90: consolidar

- Evaluar segundo período maduro y evitar atribución simplista por estacionalidad.
- Consolidar duplicados solo cuando se confirme el problema.
- Ampliar los clusters rentables según consultas cualificadas y ventas disponibles.
- Entregar siguiente backlog basado en datos; mantener como pendientes los activos que el negocio no haya aportado.

## 17. Pruebas y criterios de aceptación

### 17.1 Verificación del código

Comandos existentes o compatibles con las dependencias instaladas:

```bash
git status --short
npm run build
npx tsc --noEmit
npm run lint
```

El script de lint actual es `next lint`, con Next 15.5.19 declarado. Verificar su funcionamiento real antes de declarar que pasa. Si falla por configuración de herramienta, registrar el fallo y corregir la integración de ESLint existente de forma mínima; no ocultarlo como éxito ni migrar todo el proyecto. Ejecutar pruebas del módulo afectado si se añaden para fechas, visibilidad, redirects o eventos. No crear snapshots que solo repitan copy.

### 17.2 Matriz de URLs para QA

| Caso | Comprobación esperada |
|---|---|
| Home www | 200, canonical www, propuesta visible |
| Home apex | Redirect permanente correcto a www; inspeccionar cadena |
| Colección mesas | 200, H1 y metadata coherentes, productos con enlaces |
| `mesas?page=1` | URL limpia, sin alterar atribución ajena |
| `mesas?page=2` | Comportamiento documentado según paginación real o duplicado |
| Colección racks vacía | No indexable bajo política elegida |
| Categoría inventada | 404 correcto |
| Producto con imagen | 200, ficha e imagen reales |
| Producto sin imagen | Sigue excluido y acceso directo verificado |
| Producto con `pr_*` | Redirect limpio al producto equivalente |
| Piso Osaka | Texto de asiento/taburete, sin m² ni revestimiento |
| Landing cubiertas | Contenido y cotización coherentes |
| Kit pérgola | Exclusión de maderas visible |
| Sitemap | Solo URLs elegibles; XML válido |
| Ruta inexistente aleatoria | 404, sin convertirla en home |

### 17.3 Aceptación por página comercial

- Un H1 principal útil y jerarquía de subtítulos comprensible.
- Title y descripción únicos, sin marca duplicada ni precio desactualizado.
- Canonical absoluto correcto al resolver metadata.
- Datos principales y enlaces disponibles en HTML renderizado.
- Imágenes accesibles y correspondientes al producto.
- Schema sin datos que contradigan UI o fuentes del negocio.
- CTA funciona en móvil/escritorio y sin depender de analytics.
- Sin scroll horizontal ni botón flotante que tape acciones esenciales.
- Enlaces internos a destinos equivalentes y sin parámetros legacy nuevos.
- Estado antes/después y prueba registrados.

La longitud de title o descripción es una orientación editorial, no un requisito rígido de caracteres. Priorizar claridad y contenido visible sobre llenar límites arbitrarios.

## 18. Evaluación, decisiones y reversión

### 18.1 Objetivos de trabajo, no promesas

**Técnicos:** cero colecciones vacías indexables involuntariamente en la muestra completa de categorías; cero afirmaciones detectadas de m² en Osaka; cero ratings sin procedencia publicados tras la revisión; todos los cambios con evidencia y pruebas.

**Comerciales:** aumentar clics cualificados y contactos útiles desde URLs existentes. Una meta numérica de crecimiento debe fijarse después de normalizar el baseline y verificar la conversión. El informe actual no permite estimar ingresos.

**Escenarios ilustrativos para mesas:** con 3.614 impresiones constantes, un CTR de 0,5% serían aproximadamente 18 clics y 1% serían 36. Son aritmética de escenario, no resultados esperados. Las impresiones, la intención y la posición pueden cambiar.

### 18.2 Cómo decidir tras 28 días comparables

1. Filtrar mismas URLs, país, tipo de búsqueda y grupo de consultas cuando sea posible.
2. Comparar clics, impresiones, CTR y distribución de posición; no solo un promedio agregado.
3. Verificar que el cambio estuvo publicado durante el período observado y comprobar señales de rastreo cuando estén disponibles.
4. Separar consultas nuevas de las ya existentes: más impresiones genéricas pueden bajar CTR sin perjudicar negocio.
5. Revisar leads/microconversiones antes de concluir que “más clics” equivalen a valor.
6. Con muestras muy pequeñas o resultados contradictorios, marcar `inconcluso` y extender observación a 56 días.
7. No presentar un cambio antes/después como experimento aleatorizado. Considerar estacionalidad, demanda de primavera en pérgolas y otros cambios del sitio como posibles factores, no causas demostradas.

### 18.3 Reglas de acción

| Situación | Acción |
|---|---|
| Noindex accidental, canonical equivocado, 404 de producto activo | Corregir de inmediato o revertir el lote causante |
| CTR sube y clics comerciales suben con posición comparable | Mantener, documentar y observar siguiente ventana |
| Impresiones suben, CTR baja y contactos mejoran | No revertir por CTR agregado |
| Posición alta sin clic en Kentucky | Revisar intención y resultado mostrado antes de nuevo title |
| Mucha exposición en `mesa`, sin consultas concretas | Segmentar; no expandir contenido genérico automáticamente |
| No cambia nada con escasa muestra | Mantener observación; evitar cambios semanales compulsivos |
| Caída persistente tras cambio, con intención/posición comparables | Investigar y considerar revertir metadata/copy del lote |
| Producto aún sin foto o validación comercial | Mantener fuera del conjunto indexable |

### 18.4 Reversión

Cada lote debe poder revertirse por archivos o commit propio, sin restablecer cambios ajenos. Guardar título/copy anterior, fecha de publicación y motivo. No usar reset destructivo sobre el árbol compartido. Si cambia una redirección, comprobar también los enlaces y sitemap para no dejar el estado mezclado.

## 19. Entregables y continuidad

### 19.1 Archivos a producir durante la ejecución

| Entregable | Contenido mínimo |
|---|---|
| `docs/seo-ejecucion-kimi3.md` | Checklist de tareas, estado, dependencias y siguiente paso |
| `docs/seo-inventario-urls.csv` | URL, tipo, status, canonical, robots, sitemap, prioridad |
| `docs/seo-mapa-consultas.csv` | Consulta, cluster, URL objetivo, fuente, métricas y período |
| `docs/seo-serp-YYYY-MM-DD.md` | Observaciones, consultas, país/herramienta y límites |
| `docs/seo-validacion-comercial.csv` | Afirmación, fuente, fecha, estado y archivo |
| `docs/seo-fotos-pendientes.csv` | Producto, foto disponible, correspondencia y datos faltantes |
| `docs/seo-experimentos.md` | Hipótesis, URLs, cambios, fechas, baseline y resultado |
| `docs/seo-qa-YYYY-MM-DD.md` | Comandos, matriz HTTP, schema, móvil y fallos abiertos |
| `docs/seo-seguimiento-YYYY-MM-DD.md` | Resultados comparables y decisiones |
| `docs/apify-gastos-seo.csv` | Solo si se usa; todo gasto y saldo acumulado |

Los nombres de estos entregables son propuestas para ejecución futura. No declarar que existen hasta crearlos. Este plan y el JSON de baseline complementario sí son entregables de la preparación actual.

### 19.2 Formato de una tarea completada

```markdown
### SEO-XX — Título
- Estado: hecho / en curso / bloqueado por dato externo / descartado con motivo
- Evidencia inicial:
- Hipótesis:
- Archivos modificados:
- Cambio aplicado:
- Validación y resultado:
- Fecha de publicación, si corresponde:
- Métrica y fecha de evaluación:
- Limitaciones:
- Siguiente acción:
```

### 19.3 Memoria del repositorio

Al terminar cada lote:

- Añadir una entrada corta en `self-learn/seo/CHANGELOG.md`.
- Actualizar `STATE.md` con fecha, período exacto y enlace al nuevo informe; no borrar la distinción con el histórico.
- Actualizar `NEXT.md` cerrando tareas realmente terminadas y reordenando las que siguen.
- Actualizar `COMMANDS.md` si cambia la interfaz de reportes.
- Registrar evaluación y fecha de próximo corte en `EVAL.md`.

No marcar SEO como “completado” porque se publicó contenido: separar implementación terminada de evaluación pendiente. Al retomar con otra sesión o modelo, el próximo paso debe estar escrito, sin necesidad de reconstruir toda la conversación.

### 19.4 Información concreta a solicitar al negocio cuando falte

Pedir en un lote organizado, sin bloquear trabajo técnico independiente:

1. Fotografías y correspondencia por modelo de los primeros 3–5 productos priorizados.
2. Dimensiones, madera, terminación y disponibilidad de Osaka y fichas intervenidas.
3. Políticas reales de fabricación, despacho, pagos, garantía y devoluciones.
4. Procedencia de las reseñas y autorización de uso; si no existe, omitirlas.
5. Datos públicos correctos del taller y si recibe visitas.
6. Dos o tres proyectos reales de cubiertas/puertas/molduras con permiso para publicar.
7. Definición de lead cualificado y forma simple de contar cotizaciones/ventas orgánicas.

## 20. Fuentes, referencias y límites

### Evidencia local

- [Informe GSC del 6 de septiembre](./gsc-informe-2026-09-06.md): cifras del informe existente, consultas, páginas, dispositivos y países.
- [Baseline complementario de 28 días](./gsc-base-plan-kimi3-2026-09-06.json): extracción API independiente con fechas explícitas y `dataState: final`.
- `npm run gsc:report`, ejecutado al preparar este documento: confirmó los totales del informe existente para su intervalo.
- `src/data/products.ts` y `src/lib/catalog.ts`: conteo 55/29/26 y visibilidad.
- `src/lib/seo.ts`, `SocialProof.tsx`, scripts GSC y páginas de colección: hallazgos técnicos descritos.
- `public/images/piso-osaka-main.jpg`: imagen inspeccionada visualmente para confirmar tipo de producto.
- Consultas HTTP de home, mesas, `?page=1`, Kentucky, racks, sitemap y robots realizadas durante la preparación. Son una muestra puntual, no un crawl exhaustivo ni una auditoría de render móvil.

### Referencias oficiales consultadas

- [Search Console: recurso Sitemaps](https://developers.google.com/webmaster-tools/v1/sitemaps): el campo `contents[].indexed` figura como obsoleto y no debe usarse. Sustenta la corrección de la alerta.
- [Search Analytics: query](https://developers.google.com/webmaster-tools/v1/searchanalytics/query): fechas inclusivas en PT, dimensiones, límites y estados de datos. Sustenta la normalización de reportes; la API no garantiza todas las filas.
- [Guía de extracción de Search Analytics](https://developers.google.com/webmaster-tools/v1/how-tos/search_analytics): paginación y consulta por fechas.
- [Paginación para ecommerce](https://developers.google.com/search/docs/specialty/ecommerce/pagination-and-incremental-page-loading): tratamiento de páginas realmente distintas.
- [Datos estructurados Product](https://developers.google.com/search/docs/appearance/structured-data/product): documentación base para validar ofertas y productos reales.
- [Web Vitals](https://web.dev/articles/vitals): umbrales de LCP, INP y CLS, percentil 75 y diferencias entre laboratorio y campo. Lighthouse sin interacción no mide INP real.
- [Funciones de IA y sitios web](https://developers.google.com/search/docs/appearance/ai-features): fundamentos SEO y ausencia de requisitos especiales de archivos/schema de IA.
- [Actualizaciones de documentación de Google Search](https://developers.google.com/search/updates): registro de mayo de 2026 sobre retirada de resultados enriquecidos FAQ. La antigua URL de FAQPage redirigió a ese registro durante la consulta.

### Límites y jerarquía de evidencia

Datos actuales del negocio y comportamiento verificado del sitio tienen prioridad sobre suposiciones del modelo. Documentación oficial vigente tiene prioridad sobre ejemplos desactualizados de skills. No usar porcentajes universales de factores de ranking, supuestos aumentos de “visibilidad IA” ni reglas antiguas de FAQ como garantías.

Este plan no presume cambios de producción ya realizados, no incorpora gastos de Apify, no asigna volúmenes de búsqueda sin fuente, no promete tráfico ni ingresos y no requiere ampliar el catálogo con contenido sin respaldo. Su ejecución debe producir páginas más precisas, una medición confiable y decisiones comerciales contrastables.
