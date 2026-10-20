# Kit Google Business Profile · Idea Madera (2026-10-19)

Textos listos para copiar en [business.google.com](https://business.google.com). Todos los datos salen del sitio publicado (`src/lib/seo.ts`, `src/lib/founding.ts`, `src/data/products.ts`): si algo cambió, corregirlo primero en el sitio para que la ficha y la web digan lo mismo.

**Por qué:** las búsquedas locales son las que mejor convierten del sitio (GSC 28d al 19 oct: `muebles chillan` 9,84% CTR, `mueblerias en chillan` 7,41%, `fabrica de muebles chillán` 5,56%). Sin ficha no aparecemos en el mapa ni en el bloque local de Google.

---

## 1. Datos básicos

| Campo | Valor |
|---|---|
| Nombre | `Idea Madera` (sin palabras clave agregadas: Google lo penaliza) |
| Categoría principal | **Fabricante de muebles** |
| Categorías adicionales | **Tienda de muebles** · **Ebanista** · **Carpintería** |
| Dirección | Boyén Sector 01, Chillán, Ñuble |
| Zona de servicio | Chillán, Chillán Viejo, San Carlos, Bulnes, Concepción, Los Ángeles y todo Chile (envíos) |
| Teléfono | +56 9 9549 7838 |
| Sitio web | `https://www.ideamadera.cl/?utm_source=google&utm_medium=organic&utm_campaign=gbp` (el `utm` separa en GA4 las visitas que vienen de la ficha) |
| Horario | Lunes a viernes 09:00–18:00 · Sábado 09:00–14:00 · Domingo cerrado |
| Año de apertura | 1993 |
| Atributos | Retiro en tienda: sí · Entrega a domicilio: sí · Cotización por WhatsApp/chat |

> Si el taller no atiende público en la dirección (solo retiros coordinados), marcar en Google **"Ofrezco entregas o visitas a domicilio"** y ocultar la dirección; dejar solo la zona de servicio.

## 2. Descripción (máx. 750 caracteres)

```
Idea Madera es un taller familiar de Chillán que fabrica muebles de madera desde 1993. Hacemos mesas de comedor, mesas de centro, sillas, bancas, veladores y racks, además de proyectos a medida: puertas, peldaños para escaleras, cubiertas para mesones y quinchos, molduras y muebles de cocina. Cada mueble se fabrica a pedido en nuestro taller, con la madera, medida y terminación que acordamos contigo. La fabricación toma 15 días hábiles. Precios con IVA incluido. Puedes retirar en el taller en Chillán o recibir tu pedido con envío a todo Chile. Cotiza por WhatsApp con las medidas que necesitas y te respondemos con la propuesta.
```

## 3. Servicios (sección "Servicios")

| Servicio | Descripción corta | Enlace |
|---|---|---|
| Muebles a medida | Muebles de madera fabricados según tus medidas en Chillán. | /muebles-chillan |
| Puertas a medida | Puertas de madera interiores y de entrada, según el vano. | /puertas-a-medida |
| Peldaños para escaleras | Peldaños de madera en largo, ancho y espesor a medida. | /peldanos-a-medida |
| Cubiertas para mesones y quinchos | Cubiertas de madera a medida para cocina, barra y quincho. | /cubiertas-a-medida |
| Molduras de madera | Molduras a medida para terminaciones. | /molduras-a-medida |
| Muebles de cocina | Mesones y muebles de cocina a medida en Chillán. | /muebles-de-cocina-chillan |
| Kit de uniones para pérgola | Uniones metálicas para madera 3×3", sin maderas. | /kit-pergola |

## 4. Productos (sección "Productos")

Subir con su foto principal (`public/images/…`), precio y botón **"Pedir en línea" → enlace a la ficha**.

| Producto | Precio | Ficha |
|---|---:|---|
| Mesa Nórdica 160×90×75 cm | $369.000 | /products/mesa-nordica |
| Mesa de comedor Trípode 220×100×75 cm | $699.000 | /products/mesa-comedor-tripode |
| Mesa Comedor Niza 200×100×75 cm | $689.900 | /products/mesa-comedor-niza |
| Mesa ratona trípode 100×60×40 cm | $399.990 | /products/mesa-tripode-ratona |
| Mesa de centro Roma 120×60×45 cm | $359.990 | /products/mesa-centro-roma |
| Silla Kentucky (silla de descanso) | $279.000 | /products/silla-kentucky |
| Silla Milán Lenga | $199.000 | /products/silla-milan-lenga |
| Banca Griega 130×40×45 cm | $279.000 | /products/banca-griega |
| Velador Cubo 45×45×50 cm | $270.000 | /products/velador-cubo |
| Perchero Verona | $149.990 | /products/perchero-madera-verona |

Precios al 2026-10-19 desde `src/data/products.ts`; si cambian en el sitio, actualizarlos aquí también.

## 5. Fotos (lo que más mueve una ficha)

1. **Logo** (`public/logonegro.png`) y **portada**: el taller o un mueble terminado (`public/images/taller-idea-madera.webp`).
2. **Taller y equipo**: 3–5 fotos reales trabajando (no hay en el repo: tomarlas).
3. **Productos**: 10 fotos de la tabla anterior.
4. **Obras a medida**: puertas, peldaños y cubiertas instaladas (las de `/peldanos-a-medida` y `/puertas-a-medida`).

Subir 2–3 fotos nuevas por mes: Google prioriza fichas activas.

## 6. Primeras 3 publicaciones ("Novedades")

**1 · Presentación**
```
Somos un taller familiar de Chillán y fabricamos muebles de madera desde 1993. Mesas, sillas, bancas y proyectos a medida, con retiro en el taller o envío a todo Chile. Cotiza por WhatsApp.
```
Botón: *Más información* → `https://www.ideamadera.cl/?utm_source=google&utm_medium=organic&utm_campaign=gbp_post`

**2 · Mesas de comedor**
```
¿Buscas mesa de comedor? Mesa Nórdica 160×90 cm desde $369.000, IVA incluido. También fabricamos a la medida de tu comedor. Escríbenos con el largo y el ancho que necesitas.
```
Botón: *Pedir en línea* → `https://www.ideamadera.cl/collections/mesas?utm_source=google&utm_medium=organic&utm_campaign=gbp_post`

**3 · Peldaños y puertas a medida**
```
Fabricamos peldaños para escaleras y puertas de madera a medida en Chillán. Envíanos las medidas por WhatsApp y te respondemos con la propuesta.
```
Botón: *Más información* → `https://www.ideamadera.cl/peldanos-a-medida?utm_source=google&utm_medium=organic&utm_campaign=gbp_post`

## 7. Preguntas y respuestas (publicarlas desde la propia ficha)

| Pregunta | Respuesta |
|---|---|
| ¿Los precios incluyen IVA? | Sí, todos los precios publicados incluyen IVA. |
| ¿Puedo retirar en el taller? | Sí, puedes retirar en nuestro taller en Chillán o recibir tu pedido con envío a todo Chile. |
| ¿Cuánto demora la fabricación? | La fabricación toma 15 días hábiles en total. El despacho se coordina según tu comuna. |
| ¿Hacen muebles a medida? | Sí. Escríbenos por WhatsApp con las medidas, la madera o la terminación que buscas y te cotizamos. |
| ¿Qué garantía tienen? | 2 meses contra defectos de fabricación, desde la entrega. |

## 8. Pedir reseñas (reales, nunca compradas ni escritas por nosotros)

Tras cada entrega, enviar por WhatsApp (reemplazar `ENLACE` por el de **"Pedir reseñas"** de la ficha):

```
¡Hola! Gracias por confiar en Idea Madera. Si quedaste contento con tu mueble, nos ayudaría mucho que dejes tu opinión aquí: ENLACE
Te toma un minuto y ayuda a otras personas de Chillán a encontrarnos. ¡Gracias!
```

- Responder **todas** las reseñas (buenas y malas) en menos de 48 h.
- Meta: 10 reseñas reales en 60 días. Cuando existan, se podrán mostrar en el sitio (hoy el schema no publica ratings porque no hay reseñas verificables).

## 9. Después de publicarla

- Verificar con el código que manda Google (video, llamada o carta).
- En GA4, las visitas de la ficha aparecerán con `utm_campaign=gbp` / `gbp_post`.
- Avisar para enlazar la ficha desde el sitio (`sameAs` en el schema de la organización y enlace en el footer).
