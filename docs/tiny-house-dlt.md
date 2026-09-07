# Landing tiny house en DLT

Ruta: `/tiny-house-dlt`. Canónico: `https://www.ideamadera.cl/tiny-house-dlt`.

## Contenido y conversión

- Viviendas compactas en DLT, madera renovable, prefabricación y montaje.
- Proyecto Refugio como antecedente de Idea Madera; no se presenta como modelo de tiny house disponible ni se extrapolan plazos.
- Cotización por WhatsApp con comuna, superficie y uso opcionales. Los datos ingresados se incorporan al enlace, no a los eventos de medición. El usuario revisa y envía el mensaje.
- Siete preguntas frecuentes; enlaces a muebles, puertas, cubiertas y quiénes somos.
- Entrada en sitemap y enlace desde el footer compartido.
- Metadata propia, Open Graph, Twitter, Service, BreadcrumbList y FAQPage. No se prometen resultados enriquecidos ni posiciones de búsqueda.

## Fuentes e imágenes

- [Madera21: Proyecto Refugio](https://www.madera21.cl/proyecto-refugio-una-vivienda-a-los-pies-del-volcan-chillan-con-dlt-para-resistir-las-bajas-temperaturas/): contexto del proyecto y participación de Idea Madera con Jorge Calderón. La publicación relata el comienzo de obra en marzo de 2020.
- [Think Wood: DLT](https://www.thinkwood.com/mass-timber/dowel-laminated-timber-dlt): definición, tarugos y aplicaciones del sistema.
- `public/images/tiny-house-dlt-madera.webp`: conversión WebP de `https://www.madera21.cl/wp-content/uploads/2020/04/Jorge-Calderon-DLT.jpg`.
- `public/images/proyecto-refugio-fabricacion-dlt.webp`: conversión WebP de `https://www.madera21.cl/wp-content/uploads/2020/04/Jorge-Calderon-DLT-2.jpg`.
- `public/images/tiny-house-montaje-obra-hq.webp`: versión de mayor definición (1536×1024) generada a partir de la fotografía de montaje en terreno. El pie de foto lo declara. No se atribuye a Madera21 ni se presenta como vivienda terminada.
- Fotografías de Proyecto Refugio acreditadas a Jorge Calderón / Madera21. Son imágenes de fabricación, no de una vivienda terminada.

## Validación local

- `npm run build`: correcto, ruta prerenderizada estática. Advertencias preexistentes por múltiples lockfiles y `img` en SearchModal.
- ESLint de archivos modificados: correcto.
- HTTP 200 de la landing y de todos sus destinos internos relacionados.
- Canónico correcto, un H1, JSON-LD parseable, siete FAQ y entrada en sitemap.
- Navegador a 1280, 390 y 320 px, sin desbordamiento horizontal; fotografías cargadas.
- Mensaje de WhatsApp actualizado con comuna, m² y uso; FAQ desplegable operativa.
- No se enviaron consultas de prueba ni se publicó a producción desde esta tarea.
