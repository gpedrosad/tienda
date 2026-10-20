# Prompt para Grok · Auditoría de SERP y competencia en Chile (2026-10-19)

Copiar todo el bloque de abajo en Grok (con búsqueda web activada). Pegar su respuesta completa de vuelta a Claude.

---

```
Eres un analista de SEO y e-commerce. Necesito una investigación EN VIVO de los resultados de Google en Chile para una mueblería. Usa búsqueda web real; no respondas de memoria. Responde en español.

## Contexto (datos reales, no los cambies)
- Sitio: https://www.ideamadera.cl — taller familiar de muebles de madera en Chillán (Ñuble, Chile), desde 1993. Vende mesas, sillas, bancas, veladores y hace proyectos a medida (puertas, peldaños, cubiertas, molduras, muebles de cocina) y un kit de uniones metálicas para pérgola (sin maderas). Cotización por WhatsApp. Precios con IVA. Retiro en taller o envío a todo Chile.
- Datos de Google Search Console (28 días al 17-oct-2026):
  - "veladores de madera": 1.271 impresiones, posición media 3,4, CTR 0,16%. En móvil: 958 impresiones, posición 2,7, CTR 0,21%. URL: https://www.ideamadera.cl/collections/veladores (solo 1 velador con foto: Velador Cubo 45×45×50 cm, $270.000).
  - "mesa ratona": 208 impresiones, posición 6,5, 0 clics. Reparte impresiones entre /mesas-de-centro, /products/mesa-tripode-ratona y /products/mesa-centro-roma.
  - "kit pergola": 175 imp, pos 6,4, CTR 1,1%. "puertas a medida": 137 imp, pos 9,5, CTR 0,7%. "comedor nordico": 145 imp, pos 10,1, CTR 1,4%.
  - "muebles chillan": 122 imp, pos 5,7, CTR 9,8% (la consulta que mejor convierte).
  - Apariciones: product snippets 1.613 imp / 1,7% CTR; merchant listings (Shopping gratis) 15 imp / 26,7% CTR. Aún NO tienen Google Merchant Center ni Google Business Profile.

## Hipótesis a validar
En consultas de compra, Google muestra primero grillas de Shopping / "Productos populares", anuncios, imágenes o el mapa, y el resultado orgánico de ideamadera.cl queda debajo aunque su "posición" sea 2–3. Confírmala o refútala con evidencia.

## Tarea 1 — SERP de 8 consultas (Google Chile, idioma español; si puedes, simula móvil)
Consultas: "veladores de madera", "mesa ratona", "mesa ratona de madera", "kit pergola", "puertas a medida", "comedor nordico", "muebles chillan", "mesa de comedor de madera".
Para CADA consulta, en este orden:
1. Lista los bloques que aparecen ARRIBA del primer resultado orgánico, en orden (anuncios de texto, anuncios de Shopping, "Productos populares"/grilla de productos gratis, mapa/negocios locales, imágenes, videos, "Otras preguntas de los usuarios", resumen de IA (AI Overview), foros).
2. Top 10 resultados orgánicos: posición, dominio, URL, título visible, si muestra precio/estrellas/stock en el snippet.
3. ¿Aparece ideamadera.cl? ¿En qué bloque y posición? ¿Cómo se ve su título y descripción?
4. Si hay AI Overview: ¿qué sitios cita? ¿Cita a ideamadera.cl?
5. Si hay grilla de productos: qué tiendas aparecen y a qué precio (los 5 primeros).

## Tarea 2 — Competencia directa
Identifica los 6 competidores que más se repiten en esas consultas (excluye marketplaces genéricos solo si no compiten en muebles de madera). Para cada uno:
- Dominio, ciudad/región, si fabrica o revende.
- Precio de un producto comparable: velador de madera, mesa ratona/de centro de madera, mesa de comedor de madera para 6 personas (indica medidas si las publica).
- Qué hace mejor en su ficha de producto (fotos, medidas, plazos, envío, reseñas, botón de compra/WhatsApp, financiamiento).
- ¿Tiene Google Business Profile con reseñas? ¿Cuántas y qué nota?
- ¿Aparece en Shopping/Productos populares?

## Tarea 3 — Búsquedas locales Chillán / Ñuble
Busca "mueblería chillán", "muebles a medida chillán", "fábrica de muebles chillán", "carpintería chillán". Para cada una: los 3 negocios del mapa (nombre, nota, nº de reseñas, categoría), y qué lugar ocupa ideamadera.cl en orgánico.

## Tarea 4 — Visibilidad en asistentes de IA
Pregunta (o busca cómo responden) "¿dónde comprar muebles de madera en Chillán?" y "mueblería de madera a medida en Chile". ¿Mencionan a Idea Madera? ¿A qué competidores? Indica la fuente.

## Tarea 5 — Recomendaciones
Con la evidencia anterior, da las 7 acciones de mayor impacto para ganar CLICS y COTIZACIONES (no solo posiciones), ordenadas por impacto/esfuerzo. Cada acción debe citar la evidencia concreta (consulta + qué viste) que la justifica. Separa: (a) cambios en el sitio, (b) Google Merchant Center / Shopping, (c) Google Business Profile / reseñas, (d) contenido nuevo (solo si hay un hueco claro que ningún competidor cubre bien).

## Reglas
- No inventes. Si no puedes ver algo (por ejemplo, la SERP móvil exacta o la ubicación), dilo explícitamente en una sección "Limitaciones" en vez de suponer.
- Cita la URL de cada dato de competencia y la fecha/hora de tu búsqueda.
- No recomiendes comprar reseñas, inventar ratings, cloaking, PBNs ni páginas masivas por comuna.
- Precios en CLP tal como aparecen publicados.

## Formato de salida (obligatorio)
1. Resumen de 5 líneas: qué está pasando con "veladores de madera" y "mesa ratona".
2. Tarea 1: una tabla por consulta.
3. Tarea 2: una tabla comparativa de competidores.
4. Tarea 3: tabla de mapa local.
5. Tarea 4: lista corta.
6. Tarea 5: tabla | # | Acción | Tipo (a/b/c/d) | Evidencia | Impacto (alto/medio/bajo) | Esfuerzo |.
7. Limitaciones.
8. Al final, un bloque JSON con esta forma exacta, para que otro agente lo procese:
{"fecha":"","consultas":[{"q":"","bloques_sobre_organico":[],"ideamadera":{"aparece":false,"bloque":"","posicion":null},"ai_overview_cita_ideamadera":false,"top3":[{"pos":1,"dominio":"","precio_visible":""}]}],"competidores":[{"dominio":"","ciudad":"","precio_velador":"","precio_mesa_ratona":"","precio_comedor_6":"","gbp_resenas":null,"gbp_nota":null,"en_shopping":false}],"acciones":[{"accion":"","tipo":"","impacto":"","esfuerzo":""}]}
```
