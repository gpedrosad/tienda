# Merchant Center y Bing · pasos del dueño (2026-10-19)

## Por qué

En GSC (28d al 19 oct), el sitio aparece casi solo como resultado común con precio:

| Aparición | Impresiones | Clics | CTR |
|---|---:|---:|---:|
| Product snippet (resultado con precio) | 1.613 | 27 | 1,7% |
| **Merchant listing (Shopping gratis)** | 15 | 4 | **26,7%** |

En búsquedas de compra (`veladores de madera`: 958 imp. móviles en pos. 2,7 con 0,2% CTR; `mesa ratona`: 330 imp., 0 clics) la grilla de Shopping va arriba y no estamos en ella. Merchant Center nos mete ahí sin pagar.

ChatGPT ya trae visitas que cotizan (GA4 17–18 oct: 7 sesiones, 1 de los 2 clics a WhatsApp) y busca sobre el índice de **Bing**, donde el sitio no está verificado.

---

## A. Google Merchant Center (≈ 25 min)

El feed ya está publicado y se actualiza solo en cada deploy:
**`https://www.ideamadera.cl/feed/google.xml`** (29 productos con foto, precio con IVA, fotos adicionales, medidas y material).

1. Entrar a [merchants.google.com](https://merchants.google.com) con la misma cuenta de Search Console → **Crear cuenta**.
   - País: **Chile** · Idioma: **español** · Moneda: **CLP**.
   - Dónde venden: **"En mi sitio web"** → `https://www.ideamadera.cl`.
2. **Verificar el sitio**: elegir *Google Search Console* (ya somos propietarios de `sc-domain:ideamadera.cl`). Luego **Reclamar** el sitio.
3. **Información de la empresa**: nombre `Idea Madera`, dirección Boyén Sector 01, Chillán, teléfono +56 9 9549 7838.
4. **Envío** (*Configuración → Envío y devoluciones → Envío*):
   - Servicio: `Envío a todo Chile` · Área: Chile.
   - Tiempo de preparación: **15 días hábiles** (fabricación). Tránsito: según lo que realmente uses.
   - Costo: si no hay tarifa fija, usar **"Tarifa según transportista"** o un valor que se cumpla; **no poner $0 si no es gratis**.
   - Agregar **Retiro en tienda** (Chillán) si la opción aparece.
5. **Devoluciones** (obligatorio): ⚠️ el sitio hoy dice *"Cambios 30 días"* y el schema publica una política de 30 días. **Confirmar si aplica a muebles hechos a pedido** antes de cargarla. Si no aplica, avisar: hay que cambiar el sitio y el schema primero, para que coincidan.
6. **Productos → Agregar productos → Feed de datos** (o *Fuentes de datos → Agregar fuente → Archivo programado*):
   - URL del archivo: `https://www.ideamadera.cl/feed/google.xml`
   - Frecuencia: **diaria**.
7. Activar **Fichas gratuitas** (*Programas / Superficies de Google → Fichas gratuitas*).
8. Esperar 3–5 días la revisión. En **Diagnóstico** revisar avisos; mandar captura si hay rechazos.

> Si Merchant Center ofrece "detectar productos automáticamente desde el sitio", se puede usar, pero el feed es más completo (fotos adicionales y medidas).

## B. Bing Webmaster Tools (≈ 5 min)

1. Entrar a [bing.com/webmasters](https://www.bing.com/webmasters) con una cuenta Microsoft o Google.
2. **Importar desde Google Search Console** → autorizar → elegir `ideamadera.cl`. Importa sitio, verificación y sitemap.
3. Comprobar en **Sitemaps** que esté `https://www.ideamadera.cl/sitemap.xml`.

IndexNow ya está activo en el sitio (clave en `public/<clave>.txt`). Tras cada deploy con contenido nuevo, el agente corre `npm run indexnow` para avisar a Bing.

## C. Google Business Profile

Kit completo en [`google-business-profile.md`](./google-business-profile.md).
