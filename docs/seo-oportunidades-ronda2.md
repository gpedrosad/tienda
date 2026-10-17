# Oportunidades SEO · ronda 2

Fecha: 2026-10-17. Sitio: `https://www.ideamadera.cl`. Objetivo comercial: cotización por WhatsApp.

Esta nota no trae métricas nuevas de tráfico. Los números de Search Console siguen en los informes fechados de `docs/`. No se publican precios. La única antigüedad permitida es «desde 2001» (año de fundación 2001; no se cambia `foundingDate`).

## Qué quedó publicado en el código

Páginas nuevas, solo de encargos que el sitio ya describe. Cada una tiene cotización por WhatsApp, enlaces al resto de su grupo y entra al sitemap porque `src/app/sitemap.ts` descubre cada `page.tsx`.

| URL | Hueco que ninguna página cubría como tema principal |
|---|---|
| `/puertas-de-madera-con-vidrio` | Hoja con vidrio que abre con bisagras. Las correderas ya tenían su URL; la entrada solo mencionaba el vidrio de las fotos. |
| `/puertas-para-locales` | Hoja para local, oficina o bodega. El hub de puertas lo nombraba dentro de la página general. |
| `/peldanos-flotantes` | Huella para escalera abierta. `/escaleras-de-madera` lo tenía como una tarjeta, no como página. |
| `/mesas-de-comedor-a-medida` | Mesa de comedor fuera de las medidas del catálogo. La colección publica precios; la guía explica medidas; faltaba la página de cotización. |

Enlaces: el grupo de puertas, el de peldaños, `/muebles-a-medida`, la colección de mesas, la guía de medidas de comedor y el pie de página (muebles a medida).

Imágenes: textos alternativos más claros en colecciones y en la barra de WhatsApp; carga diferida en galerías y bloques que no son la primera pantalla; 28 fotos de catálogo pasaron de nombres `1MESA…` / `1BANCA…` a nombres legibles (`mesa-centro-roma-vista-1.jpg`, etc.), con redirección permanente desde la ruta antigua.

## Temas que cubren competidores y que este sitio no debe copiar todavía

Revisión de sitios chilenos que rankean cerca de puertas, peldaños y muebles a medida. Sirve para decidir contenido futuro. No es una lista de páginas por crear: varias líneas no están en el taller.

### Puertas

- [CONMADERAS](https://conmaderas.cl/) separa acceso, interior, vidriadas y corredera, y además ofrece puertas de closet, acústicas, enchapadas, para pintura y de exterior en madera sólida.
- [HOL Chile](https://holchile.cl/puertas/) (La Granja y showroom en Las Condes) suma pivotantes, plegables, acústicas, de seguridad, quincallería, vidrios, barnizado e instalación.
- [Puertas Correderas](https://puertascorrederas.cl/soluciones-puertas-correderas/) vende sistemas de riel para hoja oculta o vista, incluso en muro que no se puede picar.

Idea Madera ya tiene interiores, entrada, corredera, madera nativa, vidrio y locales. Sigue fuera del sitio —y no hay que abrirlo hasta que el taller lo confirme por escrito—: closet, acústica, cortafuego, seguridad certificada, pivotante, plegable, granero, kit de riel y instalación incluida. La página de correderas ya dice que el riel no viene por defecto.

### Peldaños y escaleras

- [Kalafquen](https://kalafquen.cl/gradas-y-peldanos/) fabrica peldaños y pasamanos en Santiago, con formas rectas, triangulares o irregulares y cotizador en línea.
- [WMaderas](https://wmaderas.cl/products/peldano-escalera-cipres) ofrece peldaños, limones y contrahuellas, y nombra muchas especies.
- [Schwarzhaus](https://schwarzhaus.cl/products/grada) vende gradas y contrahuellas para revestir estructuras flotantes, con espesores publicados.
- [Casa Zaru](https://cotizador.casazaru.cl/) cotiza peldaños, cubiertas, repisas, mesas y puertas (incluye granero) con precio en el cotizador.

El taller publica huellas, no la escalera armada. Ya existen Chillán, concreto y escaleras de madera, más las guías de medida y de madera, y ahora peldaños flotantes. No abrir URL de pasamanos, limones, contrahuella como línea ni espesores fijos: el repo ya rechazó pasamanos como producto y quitó rangos de centímetros que no estaban confirmados.

### Muebles a medida en Chillán y en Chile

- [Decoform](https://decoform.cl/) (Chillán Viejo) ofrece closets, dormitorios, escritorios, baño e instalación.
- [BÚTOR](https://butor.cl/) fabrica cocinas, closets, walk-in y oficina, con presencia en Chillán.
- [Constructora Deluxe](https://constructoradeluxe.cl/muebles-a-medida/) habla de muebles a medida en Chillán, con diseño e instalación.
- En vidrio de obra, [Vidrios Puyaral](https://vidriospuyaral.cl/) instala puertas vidriadas (templado o termopanel) en Chillán. Es otro oficio: no mezclarlo con la hoja de madera.

Idea Madera ya cubre cubiertas, puertas, peldaños, molduras, cocina en Chillán, catálogo (mesas, sillas, bancas, veladores) y, desde esta ronda, la mesa de comedor a medida. Closet, walk-in, mueble de baño, cocina integral con instalación y escritorio corporativo son temas de la competencia local. No hay página porque el sitio no los ofrece como línea. Si más adelante el taller los fabrica, cada uno necesita fotos y un alcance explícito (qué incluye y qué no), no un texto genérico de “muebles a medida”.

Otras búsquedas que conviene no perseguir con URLs nuevas por comuna: el propio backlog (`self-learn/seo/NEXT.md`) marca el SEO programático por ciudad como riesgo de contenido fino mientras la autoridad sigue baja.

## Google Business Profile

Alinear la ficha con lo que el sitio ya publica, sin reseñas inventadas. La única antigüedad que se puede decir es desde 2001.

- Nombre: Idea Madera. Sitio: `https://www.ideamadera.cl` (con www).
- Teléfono y correo ya públicos: +56 9 9549 7838 y hola@ideamadera.cl.
- Dirección ya en el schema del sitio: Boyén Sector 01, Chillán, Ñuble.
- Categoría principal de mueblería o carpintería, y una secundaria de fabricación, solo si Google las ofrece y coinciden con el taller.
- Descripción corta: fabricación en Chillán, envío a Chile, cotización por WhatsApp. Servicios que existan en una URL (catálogo, cubiertas, puertas, peldaños, molduras, cocina, mesa de comedor a medida).
- Fotos reales de obra y de taller (puertas, huellas, mesas). Las mismas reglas que el sitio: la foto de una escalera flotante no implica que vendamos el metal; la de una puerta no incluye marco ni instalación.
- Horario: el que cumpla el taller. No hay un horario publicado en el código; no inventar uno en la ficha.
- Área: Chillán y envíos al resto de Chile, dicho como despacho, no como sucursales.
- Mensajes: WhatsApp al número ya publicado.
- Reseñas: pedirlas a clientes que ya compraron. No cargar opiniones ni notas que el sitio no pueda mostrar.
- Publicaciones: cuando las páginas nuevas estén en producción, enlazarlas desde la ficha para que la cotización no quede solo en el perfil.

## Backlinks

Ideas de citación. Ninguna está hecha en este cambio y ninguna se compra.

### Directorios

- Cámara de Comercio de Chillán o de Ñuble, si el taller es socio o puede inscribirse con la misma dirección y el mismo teléfono.
- Directorio de proveedores o de emprendedores de la municipalidad de Chillán, si existe y acepta ficha con enlace al sitio.
- Páginas Amarillas u otros directorios locales con ficha NAP (nombre, dirección, teléfono) idéntica a la del sitio. Evitar granjas de directorios.

### Prensa local y oficios de la madera

- La Discusión u otro medio de Ñuble: una nota de taller o de una obra real, no un texto con antigüedad o cifras distintas de las ya publicadas.
- [Madera21](https://www.madera21.cl/proyecto-refugio-una-vivienda-a-los-pies-del-volcan-chillan-con-dlt-para-resistir-las-bajas-temperaturas/) ya documenta Proyecto Refugio, obra que la página de tiny house atribuye en parte a Idea Madera. Una ficha o un enlace nuevo solo tiene sentido si el medio lo publica; no hace falta un comunicado para esta ronda.
- Arquitectos y constructoras de Ñuble que ya encargaron puertas o huellas: un crédito en su portafolio de obra, con enlace a la página del encargo.

### Proveedores

- Aserraderos o distribuidores de lenga austral y pino premium con los que el taller ya compra, si tienen una galería de clientes o de proyectos. El enlace vale cuando la relación es real.
- No pedir reseña ni logo a un proveedor con el que no hay compra.

## Qué no hacer en la siguiente ronda

- Precios en páginas de cotización. El catálogo ya muestra el precio en la ficha.
- Inventar una antigüedad distinta de «desde 2001».
- URLs de pasamanos, contrahuella como producto, puerta acústica, granero, closet o una comuna por página.
- Productos sin foto en el sitemap.
