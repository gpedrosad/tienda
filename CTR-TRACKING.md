# CTR tracking — Idea Madera

Registro de cambios hechos para ganar el clic. Las métricas «antes» salen del encargo (Search Console), no de un pull nuevo de este entorno.

## 2026-11-23 — Lote 44: retry guía peldaños y cubiertas (test Opus) + snippet de percheros

Search Console (último día 2026-11-22). 90d: 926 clics / 56.987 impr / CTR 1.62 % / pos 8.7. 7d (2026-11-16..2026-11-22): 110 clics / 9.172 impr / CTR 1.2 % / pos 7.6 vs prev7 (2026-11-09..2026-11-15): 108 clics / 8.949 impr / CTR 1.21 % / pos 8.3. Copy: claude-opus-5-5 (effort high) vía API de Anthropic, revisado y aplicado por Grok Bot. Congeladas y no tocadas: lotes 2026-11-21 (hasta 11-28), tienda #40 (hasta 11-26) y lotes 11-10 (hasta 11-24). GA4: conector sigue pidiendo reautenticación. Medir el 2026-12-07.

### `/guias/medidas-peldanos-escalera`

Antes — 28d (2026-10-26..2026-11-22): 10 clics / 3635 impr / CTR 0.28 % / pos 5.2; 7d 1/783 vs prev7 2/884. Consultas: «huella y contrahuella» 0 clics/237 impr, pos 4.2; «contrahuella escalera» 1 clics/126 impr, pos 7.1; «huella y contrahuella escaleras» 0 clics/81 impr, pos 5.9; «contrahuella» 0 clics/76 impr, pos 7.7.
Consulta objetivo: «huella y contrahuella / contrahuella escalera / cuanto mide una contrahuella». Title `Huella y contrahuella: medidas de referencia | Idea Madera` → `Huella y contrahuella de escalera: medidas | Idea Madera`. Meta → «¿Cuánto mide una contrahuella? Como referencia, 15 a 18 cm, con huella cerca de 25 a 30 cm (2 contrahuellas + huella: cerca de 63 cm). Cómo medirlas.». H1: igual. Motivo: El test bajó el CTR (0,31→0,18 %, muestra chica). No vuelvo al title anterior tal cual: propongo uno que suma 'escalera' (presente en 'contrahuella escalera', 'huella y contrahuella escalera(s)', 'huella escalera') y retoma 'medidas' del title previo al test. La meta abre con la pregunta literal 'cuánto mide una contrahuella' y conserva todas las cifras existentes; el H1 no se toca porque el fragmento está truncado.
Modelo: claude-opus-5-5. Aplicado 2026-11-23. Medir 2026-12-07 (14 d).

### `/cubiertas-a-medida`

Antes — 28d (2026-10-26..2026-11-22): 16 clics / 1056 impr / CTR 1.52 % / pos 7.8; 7d 4/264 vs prev7 2/283. Consultas: «mesones de madera» 1 clics/66 impr, pos 9.1; «meson para quincho» 0 clics/49 impr, pos 7.1; «meson quincho» 0 clics/35 impr, pos 7.1; «mesones para quinchos» 0 clics/18 impr, pos 6.9.
Consulta objetivo: «mesones de madera / meson para quincho». Title `Mesones y Cubiertas de Madera a Medida para Quincho` → `Mesones de Madera para Quincho y Cubiertas a Medida`. Meta → «Mesones de madera para quincho, cocina o barra, hechos a medida en lenga austral o pino premium. Cotiza tu mesón por WhatsApp con envío a todo Chile.». H1: igual. Motivo: El title pre-test, que abría con 'Mesones para Quincho', tenía mejor CTR (2,41 % vs 1,10 %). Vuelvo a esa estructura e incorporo la consulta principal 'mesones de madera'. La meta abre con 'mesones de madera para quincho' y mantiene maderas, cocina/barra, WhatsApp y envío a todo Chile.
Modelo: claude-opus-5-5. Aplicado 2026-11-23. Medir 2026-12-07 (14 d).

### `/collections/percheros`

Antes — 28d (2026-10-26..2026-11-22): 3 clics / 757 impr / CTR 0.40 % / pos 2.7; 7d 1/514 vs prev7 1/212. Consultas: «percheros de madera» 0 clics/273 impr, pos 2.7; «perchero de madera» 0 clics/259 impr, pos 1.8; «perchero madera» 1 clics/132 impr, pos 2.5; «percheros madera» 0 clics/19 impr, pos 2.5.
Consulta objetivo: «perchero de madera / percheros de madera». Title `Percheros de Madera Artesanales para Recibidor` → `Perchero de Madera Artesanal para Recibidor`. Meta → «Percheros de madera artesanales: modelos Verona y Sofía desde $149.990. Taller en Chillán desde 1993. Cotiza por WhatsApp; envío a todo Chile.». H1: igual. Motivo: La página está en posición 1,8–2,7 con casi 0 clics. El title pasa al singular exacto 'perchero de madera' (pos 1,8) y suma la marca. El plural 'percheros de madera' queda en la meta y el H1. La meta mantiene el precio existente tal cual y agrega como señal de confianza el taller en Chillán desde 1993, un dato del sitio.
Modelo: claude-opus-5-5. Aplicado 2026-11-23. Medir 2026-12-07 (14 d).


### Test CTR Opus 5.5 — medición 14 d (2026-11-23)

Antes 2026-10-24..2026-11-06 vs después 2026-11-09..2026-11-22 (GSC dataState all; el 22/11 puede no estar final: provisional). Total del sitio (8 URLs): 64/5627 (CTR 1.14 %) → 67/6292 (CTR 1.06 %). Sin control A/B: no es causal. Las páginas se descongelan. Re-medición 28 d en la primera corrida desde 2026-12-06.

| URL | Var. | Antes (clics/impr, CTR, pos) | Después | Veredicto |
|---|---|---|---|---|
| `/guias/medidas-peldanos-escalera` | A | 6/1951, 0.31 %, 5.1 | 3/1667, 0.18 %, 5.3 | sin cambio claro |
| `/collections/veladores` | B | 3/721, 0.42 %, 6.2 | 5/471, 1.06 %, 8.9 | mejoró |
| `/guias/medidas-y-madera-puertas` | A | 2/559, 0.36 %, 4.5 | 11/1791, 0.61 %, 4.8 | sin cambio claro |
| `/comedores-nordicos` | A | 0/293, 0.00 %, 17.2 | 2/234, 0.85 %, 16.9 | sin datos suficientes |
| `/puertas-de-madera-con-vidrio` | A | 10/438, 2.28 %, 8.1 | 8/513, 1.56 %, 7.6 | empeoró |
| `/cubiertas-a-medida` | A | 13/540, 2.41 %, 7.9 | 6/547, 1.10 %, 7.8 | empeoró |
| `/puertas-a-medida` | A | 15/527, 2.85 %, 7.4 | 18/472, 3.81 %, 6.9 | mejoró |
| `/peldanos-a-medida` | A | 15/598, 2.51 %, 8.9 | 14/597, 2.35 %, 9.0 | sin cambio claro |

Revertidas/reintentadas por el test: `/cubiertas-a-medida` (13/540 → 6/547, CTR 2,41 → 1,10 %) vuelve a la estructura «Mesones … para Quincho»; `/guias/medidas-peldanos-escalera` (6/1951 → 3/1667) reintento con «contrahuella escalera». En vigilancia sin cambio: `/puertas-de-madera-con-vidrio` (2,28 → 1,56 %), se re-mide a 28 d.

### Medición vencida (cambios 2026-11-09, medir 11-23)

- `/products/silla-kentucky` (cambio 11-09): antes 2026-10-27..2026-11-08 0/88 CTR 0.0 % pos 1.8 → después 2026-11-10..2026-11-22 2/80 CTR 2.5 % pos 1.6. Muestra chica (0 → 2 clics); se mantiene.
- `/puertas-correderas` (cambio 11-09): antes 2026-10-27..2026-11-08 2/230 CTR 0.87 % pos 7.5 → después 2026-11-10..2026-11-22 2/212 CTR 0.94 % pos 8.8. Sin cambio claro (0,87 → 0,94 %); se mantiene.


## 2026-11-21 — Lote 43 (CTR): CTR de guía mesa de centro, kit pérgola y guía de sillas

Search Console (último día 2026-11-20). 90d: 914 clics / 55.011 impr / CTR 1.66 % / pos 8.7. 7d (2026-11-14..2026-11-20): 115 clics / 9.135 impr / CTR 1.26 % / pos 7.5 vs prev7 (2026-11-07..2026-11-13): 103 clics / 8.830 impr / CTR 1.17 % / pos 8.4. Copy: claude-sonnet-5-5 vía API de Anthropic, revisado y aplicado por Grok Bot. Congeladas y no tocadas: test Opus 11-08 (se mide desde 2026-11-22) y lotes 11-09 en adelante. GA4: conector sigue pidiendo reautenticación. Medir el 2026-12-05.

### `/guias/medidas-mesa-de-centro`

Antes — 28d (2026-10-24..2026-11-20): 1 clics / 1145 impr / CTR 0.09 % / pos 7.6; 7d 1/253 vs prev7 0/298. Consultas: «medidas mesa de centro» 0 clics/86 impr, pos 12.6; «mesa ratona» 0 clics/31 impr, pos 6.9; «altura mesa ratona» 0 clics/26 impr, pos 9.1; «altura de mesa ratona» 0 clics/14 impr, pos 8.5.
Consulta objetivo: «medidas mesa de centro». Title `Medidas Mesa de Centro y Mesa Ratona: Largo y Alto` → `Medidas Mesa de Centro: Cuánto Debe Medir y Qué Altura`. Meta → «¿Cuánto debe medir una mesa de centro o mesa ratona? El largo va entre la mitad y dos tercios del sofá; la altura, cerca de la del asiento.». H1: igual. Motivo: El title apunta a «medidas mesa de centro» y «cuánto mide una mesa de centro», y deja «mesa ratona» a la colección. La meta responde en forma de pregunta con los datos que ya existían (largo y altura).
Modelo: claude-sonnet-5-5. Aplicado 2026-11-21. Medir 2026-12-05 (14 d).

### `/kit-pergola`

Antes — 28d (2026-10-24..2026-11-20): 28 clics / 1650 impr / CTR 1.70 % / pos 7.1; 7d 4/461 vs prev7 8/480. Consultas: «kit pergola» 2 clics/145 impr, pos 6.8; «kit de herraje para pergola» 1 clics/39 impr, pos 8.4; «kit pergola madera» 0 clics/38 impr, pos 5.7; «kit herraje pergola» 0 clics/34 impr, pos 7.4.
Consulta objetivo: «kit pergola / kit de herraje para pergola / kit pergola madera». Title `Kit Pérgola 3×3 | Uniones Metálicas, Sin Maderas` → `Kit para Pérgola de Madera: Herrajes y Bases 3×3`. Meta → «Kit de herrajes para pérgola: uniones metálicas y bases para pérgolas 3×3 (75×75 mm). Sin maderas. Atornillar o cementar. Cotiza por WhatsApp.». H1: igual. Motivo: El cambio anterior bajó el CTR. Ahora el title abre con la frase de las consultas («kit para pérgola de madera», «herrajes», «bases») y «sin maderas» pasa a la meta, con los mismos datos de siempre.
Modelo: claude-sonnet-5-5. Aplicado 2026-11-21. Medir 2026-12-05 (14 d).

### `/guias/elegir-sillas-madera-comedor`

Antes — 28d (2026-10-24..2026-11-20): 1 clics / 775 impr / CTR 0.13 % / pos 9.4; 7d 0/250 vs prev7 0/129. Consultas: «medida de silla» 0 clics/73 impr, pos 25.5; «altura mesa comedor» 0 clics/23 impr, pos 12.4; «altura de mesa comedor» 0 clics/12 impr, pos 13.7; «sillas de madera» 0 clics/11 impr, pos 14.7.
Consulta objetivo: «medidas de sillas de comedor de madera / cuanto mide una silla de comedor». Title `Sillas de Madera para Comedor: Medidas y Cantidad` → `Medidas de Sillas de Comedor de Madera y Cuántas Poner`. Meta → «Cuánto mide una silla de comedor: asiento de 45-48 cm y cuántas sillas caben según el largo de la mesa. Revisa la colección o cotiza por WhatsApp.». H1: igual. Motivo: El enfoque anterior no funcionó. El title ahora abre con «medidas de sillas de comedor de madera» y la meta responde «cuánto mide una silla de comedor» con el dato existente de 45-48 cm.
Modelo: claude-sonnet-5-5. Aplicado 2026-11-21. Medir 2026-12-05 (14 d).


### Medición vencida (cambios 2026-11-07, medir 11-21)

- `/kit-pergola` (cambio 11-07): antes 2026-10-24..2026-11-06 16/709 CTR 2.26 % pos 7.2 → después 2026-11-07..2026-11-20 12/941 CTR 1.28 % pos 7.1. Empeoró: reintento hoy con Sonnet.
- `/guias/elegir-sillas-madera-comedor` (cambio 11-07): antes 2026-10-24..2026-11-06 1/396 CTR 0.25 % pos 10.3 → después 2026-11-07..2026-11-20 0/379 CTR 0.0 % pos 8.5. Empeoró (1 → 0 clics): reintento hoy con Sonnet.

Sin datos nuevos: medidas (45-48 cm, 75×75 mm, proporciones del sofá) ya estaban en la página. «Mesa ratona» queda para /mesas-de-centro.

## 2026-11-17 — Lote 41 (CTR): CTR de velador Cubo, guía de cuidado de muebles y mesa Cantabria

Search Console (último día 2026-11-16). 90d: 869 clics / 51.279 impr / CTR 1.69 % / pos 8.8. 7d (2026-11-10..2026-11-16): 102 clics / 8.871 impr / CTR 1.15 % / pos 8.1 vs prev7 (2026-11-03..2026-11-09): 108 clics / 9.340 impr / CTR 1.16 % / pos 7.8. Copy: claude-opus-5-5 (effort high) vía API de Anthropic, revisado y aplicado por Grok Bot. Congeladas y no tocadas: test Opus 11-08 (hasta 2026-11-22), lotes 11-04 (hasta 11-18), 11-07 (11-21), 11-09/11-10 (11-23/24), 11-13 (11-20) y 11-15 (11-22). GA4: conector sigue pidiendo reautenticación. PageSpeed: HTTP 429. Medir el 2026-12-01.

### `/products/velador-cubo`

Antes — 28d (2026-10-20..2026-11-16): 0 clics / 48 impr / CTR 0.00 % / pos 4.5; 7d 0/39 vs prev7 0/8. Consultas: «veladores de madera para dormitorios» 0 clics/23 impr, pos 2.2; «medidas velador» 0 clics/2 impr, pos 41.0; «habitación» 0 clics/1 impr, pos 1.0; «medidas de velador de cama» 0 clics/1 impr, pos 2.0.
Consulta objetivo: «veladores de madera para dormitorios». Title `Velador Cubo de Madera para Dormitorio | Idea Madera` → `Velador de Madera para Dormitorio Moderno | Cubo 45×45 cm`. Meta → «Velador de madera maciza para dormitorio moderno, medidas 45×45×50 cm y barniz natural. Desde $270.000. Cotiza por WhatsApp con envío a todo Chile.». H1: igual. Motivo: Abre con la consulta principal (pos 2.2, 23 impr) y suma «moderno» y las medidas reales, que responden a las consultas de medidas y de velador moderno.
Aplicado 2026-11-17. Medir 2026-12-01 (14 d).

### `/guias/cuidado-muebles-madera`

Antes — 28d (2026-10-20..2026-11-16): 1 clics / 81 impr / CTR 1.23 % / pos 5.3; 7d 0/18 vs prev7 0/17. Consultas: «como cuidar una mesa de madera» 0 clics/1 impr, pos 11.0; «cuidado de muebles» 0 clics/1 impr, pos 6.0; «encerada» 0 clics/1 impr, pos 1.0.
Consulta objetivo: «como cuidar una mesa de madera». Title `Cuidado y Mantención de Muebles de Madera Maciza | Chile` → `Cómo Cuidar una Mesa y Muebles de Madera | Guía Práctica`. Meta → «Cómo cuidar una mesa de madera y tus muebles de madera maciza: limpieza, barniz, manchas y protección. Guía práctica para que duren años.». H1: igual. Motivo: Usa la formulación «cómo cuidar» de las búsquedas reales y nombra la mesa explícitamente para captar la intención de cuidado de muebles.
Aplicado 2026-11-17. Medir 2026-12-01 (14 d).

### `/products/mesa-comedor-cantabria`

Antes — 28d (2026-10-20..2026-11-16): 0 clics / 33 impr / CTR 0.00 % / pos 4.4; 7d 0/17 vs prev7 0/7. Consultas: «mesa comedor 240» 0 clics/9 impr, pos 3.0; «búscalo en la web» 0 clics/1 impr, pos 2.0; «mesa 240» 0 clics/1 impr, pos 2.0; «mesas largas de madera» 0 clics/1 impr, pos 2.0.
Consulta objetivo: «mesa comedor 240». Title `Mesa de Comedor Cantabria 240×110 cm | Gran Formato` → `Mesa Comedor 240 cm Larga de Madera Maciza | Cantabria`. Meta → «Mesa comedor 240×110×75 cm en madera maciza con barniz natural, más larga que Roma y Trípode. Desde $999.000, cotiza por WhatsApp con envío a todo Chile.». H1: igual. Motivo: Pone al inicio la consulta exacta «mesa comedor 240» (9 impr, pos 3) y agrega «larga de madera» por la consulta «mesas largas de madera».
Aplicado 2026-11-17. Medir 2026-12-01 (14 d).


### Medición vencida: Lote 34 (2026-11-03, medir 11-17)

- `/collections/veladores` (Lote 34): antes 2026-10-20..2026-11-02 2/483 CTR 0.41 % pos 7.3 → después 2026-11-03..2026-11-16 5/680 CTR 0.74 % pos 7.6. Mejora, pero la página entró al test Opus del 11-08: se evalúa con el test el 2026-11-22.
- `/puertas-de-madera-con-vidrio` (Lote 34): antes 2026-10-20..2026-11-02 11/457 CTR 2.41 % pos 8.9 → después 2026-11-03..2026-11-16 7/505 CTR 1.39 % pos 7.3. Baja el CTR con mejor posición; también está en el test Opus 11-08 (title/meta), así que la ventana mezcla los dos cambios. No se revierte hoy: se decide con el test el 2026-11-22.
- `/puertas-exteriores` (Lote 34): antes 2026-10-20..2026-11-02 0/100 CTR 0.0 % pos 7.2 → después 2026-11-03..2026-11-16 5/147 CTR 3.4 % pos 9.1. Mejora (0 → 5 clics). Se mantiene.

Precios citados ($270.000 velador Cubo, $999.000 Cantabria) y medidas salen de `src/data/products.ts`. En fichas, `documentTitle()` recorta la segunda parte del seoTitle y agrega « | Idea Madera»: titles live esperados «Velador de Madera para Dormitorio Moderno | Idea Madera» y «Mesa Comedor 240 cm Larga de Madera Maciza | Idea Madera».

## 2026-11-15 — Lote 40 (CTR): CTR de percheros, mesa redonda trípode y guía de cotizar

Search Console (último día 2026-11-14). 90d: 852 clics / 49.598 impr / CTR 1.72 % / pos 8.9. 7d (2026-11-08..2026-11-14): 104 clics / 8.876 impr / CTR 1.17 % / pos 8.3 vs prev7 (2026-11-01..2026-11-07): 103 clics / 8.820 impr / CTR 1.17 % / pos 7.8. Copy: claude-opus-5-5 (effort high) vía API de Anthropic, revisado y aplicado por Grok Bot. Congeladas y no tocadas: test Opus 11-08 (hasta 2026-11-22), lotes 11-04/11-07/11-09/11-10 y lo editado el 11-13 (hasta 2026-11-20). GA4: conector sigue pidiendo reautenticación. PageSpeed: HTTP 429 (cuota). Medir el 2026-11-29.

### `/collections/percheros`

Antes — 28d (2026-10-18..2026-11-14): 2 clics / 164 impr / CTR 1.22 % / pos 5.1; 7d 1/130 vs prev7 0/18. Consultas: «percheros de madera» 0 clics/67 impr, pos 3.5; «perchero de madera» 0 clics/20 impr, pos 2.1; «perchero madera» 0 clics/19 impr, pos 2.3; «percheros de madera artesanales» 0 clics/14 impr, pos 9.9.
Consulta objetivo: «percheros de madera». Title `Percheros de Madera para Hogar | Idea Madera` → `Percheros de Madera Artesanales para Recibidor | Idea Madera`. Meta → «Percheros de madera artesanales para recibidor y dormitorio: modelos Verona y Sofía desde $149.990. Cotiza por WhatsApp con envío a todo Chile.». H1: igual. Motivo: Suma «artesanales» y «recibidor», que aparecen en las consultas reales, y agrega al meta los modelos y el precio real desde $149.990 para destacar en posiciones 2-4 sin clics.
Aplicado 2026-11-15. Medir 2026-11-29 (14 d).

### `/products/mesa-comedor-tripode-redonda`

Antes — 28d (2026-10-18..2026-11-14): 1 clics / 108 impr / CTR 0.93 % / pos 5.5; 7d 1/32 vs prev7 0/31. Consultas: «mesa comedor redonda madera» 0 clics/4 impr, pos 6.5; «mesa redonda 140» 0 clics/3 impr, pos 9.7; «mesa redonda 140 cm» 0 clics/3 impr, pos 2.7; «mesa tripode» 0 clics/3 impr, pos 1.0.
Consulta objetivo: «mesa comedor redonda madera». Title `Mesa Comedor Trípode Redonda Ø140 cm | Madera Maciza` → `Mesa de Comedor Redonda de Madera 140 cm | Trípode`. Meta → «Mesa redonda de comedor en madera maciza, Ø140 × 75 cm, patas trípode y barniz natural. Para 6-8 personas. Desde $729.900, cotiza por WhatsApp.». H1: igual. Motivo: Ordena el title según las consultas «mesa de comedor madera redonda», «mesa redonda 140 cm» y «mesa tripode», usa «140 cm» sin Ø para que coincida con la búsqueda y mantiene medidas y precio reales.
Aplicado 2026-11-15. Medir 2026-11-29 (14 d).

### `/guias/cotizar-muebles-a-medida`

Antes — 28d (2026-10-18..2026-11-14): 0 clics / 94 impr / CTR 0.00 % / pos 6.3; 7d 0/10 vs prev7 0/12. Consultas: (anonimizadas).
Consulta objetivo: «cotizar muebles a medida». Title `Cómo Cotizar un Mueble a Medida por WhatsApp | Idea Madera` → `Cotizar Muebles a Medida: Qué Datos Enviar | Idea Madera`. Meta → «Guía para cotizar muebles a medida por WhatsApp: qué información enviar y cómo describir tu proyecto para recibir una propuesta clara en pocas horas.». H1: igual. Motivo: Sin consultas visibles: el title se alinea con la keyword principal en plural y con el beneficio concreto de la guía, y el meta incluye «propuesta clara en pocas horas», dato que ya está en la intro.
Aplicado 2026-11-15. Medir 2026-11-29 (14 d).

Precios citados ($149.990 Verona, $729.900 Trípode redonda) salen de `src/data/products.ts`.

## 2026-11-13 — Lote 39 (CTR)

Search Console (último día 2026-11-12). 90d: 846 clics / 48.337 impr / CTR 1.75 % / pos 8.9. 7d (2026-11-06..2026-11-12): 107 clics / 8.873 impr / CTR 1.21 % / pos 8.3 vs prev7 (2026-10-30..2026-11-05): 106 clics / 8.278 impr / CTR 1.28 % / pos 7.9. Copy: claude-opus-5-5 (effort high) vía API de Anthropic, revisado y aplicado por Grok Bot. Congeladas y no tocadas: test Opus 11-08 (hasta 2026-11-22) y todo lo editado el 11-04/11-07/11-09/11-10 (ver freeze del run). GA4: conector pide reautenticación. PageSpeed: HTTP 429 (cuota). Medir el 2026-11-27.

### `/mesas-de-centro`

Antes — 28d (2026-10-16..2026-11-12): 1 clics / 379 impr / CTR 0.26 % / pos 6.1; 7d 0/115 vs prev7 1/129. Consultas: «mesa ratona» 1 clics/146 impr, pos 5.0; «mesa ratonera» 0 clics/22 impr, pos 4.2; «mesa ratona de madera» 0 clics/21 impr, pos 4.3; «mesas para living» 0 clics/11 impr, pos 2.5.
Consulta objetivo: «mesa ratona». Title `Mesas Ratonas de Madera y Mesa Ratona | Living Chile` → `Mesa Ratona de Madera para Living | Chillán`. Meta → «Mesa ratona o ratonera de madera para living, altura 40-50 cm ideal para sofá: Trípode, Roma, Ferrara, Hairpin. Fabricación en Chile. Cotiza por WhatsApp.». H1: igual. Motivo: Title más natural (43 car., deja margen para sufijo de marca) con «mesa ratona de madera» y «living» exactos. La meta suma «ratonera» y mantiene altura, modelos y WhatsApp tal cual. H1 no está en el fragmento.
Aplicado 2026-11-13. Medir 2026-11-27 (14 d).

### `/puertas-interiores`

Antes — 28d (2026-10-16..2026-11-12): 2 clics / 525 impr / CTR 0.38 % / pos 11.1; 7d 0/241 vs prev7 0/164. Consultas: «puertas interiores» 1 clics/45 impr, pos 11.4; «puertas para dormitorios» 0 clics/26 impr, pos 16.0; «puertas de madera interior» 0 clics/23 impr, pos 13.6; «puerta de dormitorio» 0 clics/21 impr, pos 15.7.
Consulta objetivo: «puertas interiores». Title `Puertas Interiores de Madera a Medida | Chillán` → `Puertas Interiores de Madera a Medida para Dormitorio` (Grok Bot mantuvo «a Medida» al revisar). Meta → «Puertas interiores de madera a medida para dormitorio, baño o cocina, en Chillán. Cotiza la hoja por WhatsApp con alto, ancho y foto. Envío a todo Chile.». H1: igual. Motivo: Las consultas de dormitorio suman ~93 impr. y no aparecían en el title. Se suman a «puertas interiores de madera» exacto (44 car.). La meta conserva todos los datos y el H1 ya es correcto.
Aplicado 2026-11-13. Medir 2026-11-27 (14 d).

### `/guias/madera-para-meson-quincho`

Antes — 28d (2026-10-16..2026-11-12): 1 clics / 94 impr / CTR 1.06 % / pos 6.3; 7d 0/25 vs prev7 1/15. Consultas: «madera para quincho» 0 clics/8 impr, pos 5.6; «madera para meson» 0 clics/3 impr, pos 10.3; «cincho» 0 clics/1 impr, pos 2.0; «cubierta de cocina» 0 clics/1 impr, pos 5.0.
Consulta objetivo: «madera para quincho». Title `Madera para Mesón de Quincho | Lenga y Pino` → `Madera para Quincho: Mesón en Lenga o Pino`. Meta → «Madera para quincho: tu mesón en lenga austral o pino premium, secos en cámara. Bajo techo o al aire cambia el acabado. Cotiza la cubierta por WhatsApp.». H1: igual. Motivo: Abre title y meta con la consulta principal exacta «madera para quincho» (42 car.) sin cambiar maderas, secado ni acabado. El H1 ya responde la pregunta.
Aplicado 2026-11-13. Medir 2026-11-27 (14 d).

## 2026-11-10 · Lote 38 (aplicado)

### `/escaleras-de-madera`

- **URL:** https://www.ideamadera.cl/escaleras-de-madera
- **Query objetivo:** escalera de madera
- **Antes:** brief 2026-11-10, bloque de oportunidades: 10 clics / 597 impr / CTR 1,68 % / pos 8,0; 7d 3/258 vs prev7 2/174; «escalera de madera» 0/59 pos 10,3
- **Title:** `Escaleras de Madera: Huellas a Medida | Chile` → `Escalera de Madera: Huellas a Medida | Idea Madera`
- **Meta:** `Fabricamos las huellas de madera de tu escalera, no la estructura ni el montaje. Cotiza peldaños a medida por WhatsApp. Envío a todo Chile.` → `Escalera de madera a medida: fabricamos las huellas, no la estructura ni el montaje. Cotiza por WhatsApp. Taller en Chillán, envío a todo Chile.`
- **H1:** Escaleras de madera: fabricamos las huellas → Escalera de madera: huellas a medida
- **Snippet:** el primer párrafo abre con «La escalera de madera que fabricamos es la huella» y enlaza `/peldanos-a-medida`. Sigue sin escalera armada, zancas ni pasamanos.
- **Enlaces:** el hub `/peldanos-a-medida` ya la enlazaba (congelado, sin edición). Nueva ficha en `/guias`.
- **Medir el:** 2026-11-24
- **Resultado:** (pendiente)

### `/products/mesa-tripode-ratona`

- **URL:** https://www.ideamadera.cl/products/mesa-tripode-ratona
- **Query objetivo:** mesa trípode ratona (el modelo). «mesa ratona» sigue con primaria `/mesas-de-centro`, congelada hasta 2026-11-11.
- **Antes:** brief 2026-11-10: 0 clics / 117 impr / CTR 0 % / pos 5,8; 7d 0/17 vs prev7 0/23; en esta URL «mesa ratona» 0/40 pos 8,2
- **Title:** `Mesa Ratona Trípode 100×60×40 cm | Living | Idea Madera` → `Mesa Trípode Ratona de Madera | 100×60×40 | Idea Madera`
- **Meta:** `Mesa ratona Trípode en madera maciza, 100×60×40 cm, patas inclinadas y barniz natural. Desde $399.990, cotiza por WhatsApp con envío a todo Chile.` → `Mesa trípode ratona de madera maciza, 100×60×40 cm, patas inclinadas y barniz natural. $399.990. Cotiza por WhatsApp, envío a todo Chile.`
- **H1:** Mesa ratona trípode → Mesa trípode ratona de madera
- **Snippet:** pitch «Mesa trípode ratona de madera maciza para el living: patas inclinadas, 100 × 60 × 40 cm y barniz natural. Fabricada en Chillán.»
- **Enlaces:** `/mesas-de-centro` ya enlazaba la ficha (congelada, sin edición). La descripción mantiene el enlace al hub y a la guía de medidas. Nueva ficha en `/guias`. El nombre de catálogo no cambia.
- **Medir el:** 2026-11-24
- **Resultado:** (pendiente)

### `/products/mesa-centro-roma`

- **URL:** https://www.ideamadera.cl/products/mesa-centro-roma
- **Query objetivo:** mesa de centro roma
- **Antes:** brief 2026-11-10: 0 clics / 69 impr / CTR 0 % / pos 4,8; 7d 0/13 vs prev7 0/29; «mesa de centro roma» 0/3 pos 2,0
- **Title:** renderizado `Mesa Centro Roma 120×60 cm | Ratona Madera | Idea Madera` (el `seoTitle` guardado era `Mesa Centro Roma 120×60 cm | Ratona Madera Living` y el tope de 60 recortaba «Living») → `Mesa de Centro Roma de Madera | 120×60×45 | Idea Madera`
- **Meta:** `Mesa de centro Roma en madera maciza, 120 × 60 × 45 cm para living. Mesa ratona con barniz natural. Desde $359.990, cotiza por WhatsApp.` → `Mesa de centro Roma de madera maciza, 120×60×45 cm, para el living. No es la mesa de comedor Roma. Desde $359.990. Cotiza por WhatsApp.`
- **H1:** Mesa de centro Roma → Mesa de centro Roma de madera
- **Snippet:** pitch con 120 × 60 × 45 cm, barniz natural y la aclaración de que no es la mesa de comedor Roma.
- **Enlaces:** `/mesas-de-centro` ya enlazaba la ficha. La descripción ahora también enlaza ese hub. Nueva ficha en `/guias`. El nombre de catálogo no cambia.
- **Medir el:** 2026-11-24
- **Resultado:** (pendiente)

## 2026-11-09 · Lote 37 (aplicado)

### `/products/silla-kentucky`

- **URL:** https://www.ideamadera.cl/products/silla-kentucky
- **Query objetivo:** silla kentucky; sillas kentucky
- **Antes:** 28d (10-12..11-08) 1 clic / 171 impr / CTR 0,58 % / pos 2,0; 7d 0/48; «silla kentucky» 0/66 pos 1,0
- **Title:** `Silla Kentucky de madera | Silla de descanso | Idea Madera` → `Silla Kentucky de madera reclinada | Idea Madera`
- **Meta / H1:** sin cambio
- **Medir el:** 2026-11-23
- **Resultado:** (pendiente)

### `/puertas-correderas`

- **URL:** https://www.ideamadera.cl/puertas-correderas
- **Queries objetivo:** corredera de madera; puertas corredizas de madera; puerta corredera de madera
- **Antes:** 28d 2 clics / 268 impr / CTR 0,75 % / pos 7,6; 7d 2/117 vs prev7 0/124
- **Title:** `Puertas Correderas de Madera a Medida | Chillán` → `Puertas Correderas y Corredizas de Madera a Medida | Chillán`
- **Meta:** «Puertas correderas de madera a medida en Chillán. …» → «Puertas correderas y corredizas de madera a medida en Chillán. Referencia de interior con vidrio. Cotiza la hoja por WhatsApp. Herrajes aparte.»
- **H1:** sin cambio
- **Medir el:** 2026-11-23
- **Resultado:** (pendiente)

## 2026-11-08 · CTR test Opus 5.5

Tres snippets (guía de huella y contrahuella, colección de veladores, guía de medidas de puertas). Title y meta nuevos; H1 igual. Registro con URL, query, métricas de antes y el antes/después: [docs/seo/ctr-tracking.md](docs/seo/ctr-tracking.md). Medir el 2026-11-22.

## 2026-11-08 · CTR test Opus 5.5 · batch 2

Cinco snippets: comedores nórdicos, puertas con vidrio, cubiertas, puertas a medida y peldaños a medida. Title y meta nuevos; H1 igual. Registro: [docs/seo/ctr-tracking.md](docs/seo/ctr-tracking.md). Medir el 2026-11-22.

## 2026-11-07 · Lote 36 (aplicado)

### `/kit-pergola`

- **URL:** https://www.ideamadera.cl/kit-pergola
- **Queries objetivo:** kit pergola; kit pergola madera; kit para pergola; uniones para pergolas
- **Antes:** 90d (pull 2026-11-07, last_day 2026-11-06) 27 clics / 1.244 impr / CTR 2,17 % / pos 7,2; 7d 10/409 pos 7,5
- **Title:** `Kit de Uniones Metálicas para Pérgola 3×3 | Sin Maderas` → `Kit Pérgola 3×3 | Uniones Metálicas, Sin Maderas`
- **Meta:** `Kit de uniones metálicas y bases para pérgola de madera 3×3 (75×75 mm), sin maderas. Soportes para atornillar o cementar. Cotiza por WhatsApp.` → `Kit para pérgola de madera: uniones para pérgolas y bases 3×3 (75×75 mm), sin maderas. Atornillar o cementar. Cotiza por WhatsApp.`
- **H1:** sin cambio
- **Medir el:** 2026-11-21
- **Resultado:** (pendiente)

### `/guias/elegir-sillas-madera-comedor`

- **URL:** https://www.ideamadera.cl/guias/elegir-sillas-madera-comedor
- **Queries objetivo:** sillas de madera para comedor; medida de silla; (dejar «altura mesa comedor» a /guias/medidas-mesa-comedor)
- **Antes:** 90d 1 clic / 640 impr / CTR 0,16 % / pos 9,4; cannib «altura mesa comedor» 0/23 pos 12,4
- **Title:** `Sillas de Madera para Comedor | Altura, Ancho y Cantidad` → `Sillas de Madera para Comedor: Medidas y Cantidad`
- **Meta:** hacia medidas de asiento 45-48 cm y cantidad según largo (sin abrir con altura de mesa)
- **H1:** sin cambio
- **Cannib:** enlace markdown en el párrafo de 75 cm → `/guias/medidas-mesa-comedor` como definición primaria
- **Medir el:** 2026-11-21
- **Resultado:** (pendiente)

## 2026-11-04 · `/tiny-house-dlt`

- **URL:** https://www.ideamadera.cl/tiny-house-dlt
- **Queries objetivo:** tiny house de madera, tiny house prefabricada, tiny house en Chile, tiny house madera, cuánto cuesta una tiny house en Chile, permiso de edificación, con ruedas o sobre fundación, qué incluye, cómo cotizar.
- **Antes (página, informe 2026-11-04):**
  - 28 días: 24 impresiones, 0 clics, posición 9.0
  - 90 días: 39 impresiones, 0 clics, posición 7.4
  - Query tiny registrada en 90 días: «tiny house madera» (1 impresión, posición 4). En el SERP de «tiny house clt» el sitio aparecía #2; fuera del top 10 en el resto de las consultas del estudio.
- **Qué cambió:**
  - Title: `Tiny House en DLT en Chile | Cotiza por WhatsApp` → `Tiny House de Madera en Chile | Prefabricada | Idea Madera` (58). «Llave en mano» no entra: la landing no lo dice.
  - Meta con tiny house de madera, prefabricada, Chile, Chillán, Las Trancas y CTA de WhatsApp (154).
  - H1 `Tiny house de madera en Chile`. DLT pasa al subtítulo. H2 nuevos con lo que la página ya decía: qué es, madera y diferencia con el CLT, ruedas o fundación (consúltanos; no hay modelo publicado), cómo cotizar.
  - FAQ y FAQPage: 7 → 10. Precio sin cifras (depende del tamaño y las terminaciones, cotiza por WhatsApp). Permisos sin trámite inventado. Qué incluye, según el alcance que la página ya describía. Plazos solo en los términos que ya estaban (sin días).
  - Enlaces: ítem «Tiny house» en el menú principal (escritorio y móvil) y en el pie. Ancla «tiny house de madera» en la home. Enlace desde cubiertas, puertas, peldaños, kit pérgola y contacto. Sigue en el sitemap.
- **Qué no se hizo, por falta de dato en la landing:** página `/tiny-house-planos-modelos` (no hay planos ni modelos a la venta; Proyecto Refugio y el 3D se declaran como antecedente y geometría conceptual). Bloque de precios, valor por m², «desde $X», kit vs llave en mano, Offer y landings por ciudad.

## 2026-11-04 · `/guias/medidas-mesa-comedor` — Lote 35 (aplicado)

- **URL:** https://www.ideamadera.cl/guias/medidas-mesa-comedor
- **Queries objetivo:** altura mesa comedor; medidas mesa comedor 6 personas
- **Antes:** 7d (2026-10-27..11-02) 1 clic / 1.380 impr / CTR 0,07 % / pos 7,6; 90d (08-05..11-02) 13/4.329 pos 8,1; «altura mesa comedor» 7d 0/43 pos 12,1; «medidas mesa comedor 6 personas» 0/14 pos 7,6
- **Title:** `Medidas de Mesa de Comedor | Personas y Altura 75 cm` → `Medidas Mesa de Comedor: Altura 75 cm y 6 Personas`
- **Meta:** «¿Qué medidas debe tener tu mesa de comedor? Guía con tabla de referencia según personas, altura ideal (75 cm) y espacio de circulación. Cotiza a medida.» → «Altura estándar de una mesa de comedor: 75 cm, con asiento de silla de 45-48 cm. Para 6 personas, 160 x 90 cm o redonda de Ø 120 cm. Tabla y circulación.»
- **H1:** Cómo elegir las medidas de tu mesa de comedor (sin cambio)
- **Enlaces:** + enlace a /guias/elegir-sillas-madera-comedor
- **Medir el:** 2026-11-18 (7d y 14d posteriores vs. el «antes»)
- **Resultado:** (pendiente)

## 2026-11-04 · `/molduras-a-medida` — Lote 35 (aplicado)

- **URL:** https://www.ideamadera.cl/molduras-a-medida
- **Queries objetivo:** molduras de madera; cornisas de madera
- **Antes:** 7d 9 clics / 667 impr / CTR 1,35 % / pos 9,2; 90d 42/1.290; «molduras de madera» 7d 2/250 pos 10,3; «cornisas de madera» 0/75 pos 10,1
- **Title:** `Molduras de Madera a Medida | Chile` → `Molduras y Cornisas de Madera a Medida | Chile`
- **Meta:** «Molduras de madera a medida: cornisas, guardapolvos y marcos de vanos. Taller en Chillán, por metro lineal. Cotiza el perfil por WhatsApp.» → «Molduras y cornisas de madera a medida para interiores: guardapolvos, zócalos y marcos de vanos. Taller en Chillán, por metro lineal. Envíos a todo Chile.»
- **H1:** Molduras de madera a medida para tu proyecto → Molduras y cornisas de madera a medida para tu proyecto
- **Medir el:** 2026-11-18 (7d y 14d posteriores vs. el «antes»)
- **Resultado:** (pendiente)

## 2026-11-04 · `/guias/medidas-mesa-de-centro` — Lote 35 (aplicado)

- **URL:** https://www.ideamadera.cl/guias/medidas-mesa-de-centro
- **Queries objetivo:** mesa ratona; medidas mesa de centro
- **Antes:** 7d 0 clics / 366 impr / CTR 0 % / pos 7,3; «mesa ratona» 7d 0/23 pos 6,3; «medidas mesa de centro» 0/21 pos 10,1
- **Title:** `Medidas de Mesa de Centro y Mesa Ratona | Living` → `Medidas Mesa de Centro y Mesa Ratona: Largo y Alto`
- **Meta:** «Cómo elegir el tamaño de una mesa de centro o mesa ratona según el sofá: largo, altura del asiento y paso. Medidas del catálogo. Cotiza por WhatsApp.» → «Cuánto debe medir una mesa ratona o mesa de centro: largo entre la mitad y dos tercios del sofá, y superficie cerca de la altura del asiento.»
- **H1:** Cómo elegir las medidas de una mesa de centro → … de una mesa de centro o mesa ratona
- **Medir el:** 2026-11-18 (7d y 14d posteriores vs. el «antes»)
- **Resultado:** (pendiente)

## 2026-11-19 · `/guias/medidas-mesa-comedor` — Lote 42 (aplicado, claude-sonnet-5-5)

- **URL:** https://www.ideamadera.cl/guias/medidas-mesa-comedor
- **Queries objetivo:** altura mesa comedor; cuánto mide una mesa de comedor
- **Antes:** 28d (2026-10-22..11-18) 18 clics / 5.898 impr / CTR 0,31 % / pos 6,8; «altura mesa comedor» 0/129 pos 14,1
- **Title:** `Medidas Mesa de Comedor: Altura 75 cm y 6 Personas` → `Altura mesa comedor: 75 cm y cuánto mide para 6 personas`
- **Meta:** abre con «Cuánto mide una mesa de comedor: la altura estándar es 75 cm…»
- **H1:** Cómo elegir las medidas de tu mesa de comedor → Cuánto mide una mesa de comedor: altura y tamaño según personas
- **Medir el:** 2026-12-03
- **Resultado:** (pendiente)
- **Medición 2026-11-18 de Lote 35:** medidas-mesa-comedor 0,21 % → 0,39 % (pos 7,6 → 6,1); medidas-mesa-de-centro 0 clics (pos 7,2 → 7,7); tiny-house-dlt 0/16 (pos 4,6).
