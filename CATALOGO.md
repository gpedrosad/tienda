# 📦 Gestión del Catálogo de Productos

Este proyecto ahora utiliza un **catálogo estático** sin necesidad de backend o base de datos.

## 📍 Ubicación del Catálogo

El catálogo se encuentra en: **`src/data/products.ts`**

## ✨ Características

- ✅ **Sin backend**: Todo es estático, no requiere servidor ni base de datos
- ✅ **Búsqueda en tiempo real**: Los usuarios pueden buscar productos por nombre
- ✅ **Filtros por categoría**: Organización automática por categorías
- ✅ **WhatsApp integrado**: Cada producto tiene un botón para consultar directamente
- ✅ **Formato chileno**: Precios formateados automáticamente ($369.000)
- ✅ **Responsive**: Se adapta a móviles, tablets y desktop

## 🔧 Cómo Agregar un Producto

1. Abre el archivo `src/data/products.ts`
2. Copia este formato al final del array `products`:

```typescript
{
  id: "nombre-producto-sin-espacios",
  name: "Nombre del Producto",
  price: 369000,
  category: "Mesas",
  description: "Descripción breve del producto", // Opcional
  imageUrl: "/images/producto.jpg" // Opcional
},
```

3. Guarda el archivo y los cambios se verán automáticamente

### Ejemplo:

```typescript
{
  id: "mesa-centro-moderna",
  name: "Mesa de Centro Moderna",
  price: 450000,
  category: "Mesas",
  description: "Mesa compacta de madera maciza para living o sala de estar.",
  imageUrl: "/images/mesa-centro-moderna.jpg"
},
```

## ✏️ Cómo Editar un Producto

1. Busca el producto en `src/data/products.ts` por su nombre o id
2. Modifica los campos que necesites:
   - `name`: Nombre del producto
   - `price`: Precio (sin puntos ni comas)
   - `category`: Categoría
   - `description`: Descripción del producto (opcional)
   - `imageUrl`: URL de la imagen (opcional)
3. Guarda el archivo

## 🗑️ Cómo Eliminar un Producto

1. Busca el producto en `src/data/products.ts`
2. Elimina todo el objeto `{ ... },` incluyendo la coma
3. Guarda el archivo

## 📂 Categorías Disponibles

Actualmente el catálogo tiene estas categorías:
- Mesas
- Sillas
- Veladores
- Racks
- Repisas
- Percheros
- Bancas
- Sitiales
- Escritorios
- Futon
- Pisos

**Para agregar una nueva categoría**: Simplemente úsala en el campo `category` de un producto y aparecerá automáticamente en los filtros.

## 💰 Formato de Precios

Los precios deben ingresarse como **números enteros sin puntos ni comas**:

- ✅ Correcto: `369000`
- ❌ Incorrecto: `369.000` o `"369000"`

El sistema los formateará automáticamente como `$369.000`

## 🖼️ Imágenes de Productos

### Opción 1: Sin imagen
Si no agregas `imageUrl`, se mostrará un placeholder automático.

### Opción 2: Con imagen
1. Coloca la imagen en la carpeta `public/images/`
2. Referencia la imagen como: `imageUrl: "/images/nombre-imagen.jpg"`

### Opción 3: Imagen externa
Puedes usar URLs completas: `imageUrl: "https://ejemplo.com/imagen.jpg"`

## 📱 Botón de WhatsApp

Cada producto tiene un botón que abre WhatsApp con el mensaje:
```
Hola Idea Madera
Me interesa cotizar: [Nombre del Producto]
Precio referencia: [Precio]
Link: [URL del producto]
Ref: [ID del producto]
```

El número configurado es: **+56 9 9549 7838**

Para cambiar el número o el formato del mensaje, edita `src/lib/whatsapp.ts`:

```typescript
export const WHATSAPP_PHONE = "56995497838";
```

## 🎨 Personalización

### Cambiar el título de la sección
En `src/app/page.tsx`, busca:
```typescript
<h2 className="text-4xl font-bold mb-8 text-left md:text-center font-poppins">
  Nuestro Catálogo
</h2>
```

### Cambiar el diseño del grid
En `src/app/page.tsx`, busca:
```typescript
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
```

Puedes cambiar:
- `grid-cols-1`: Columnas en móvil
- `sm:grid-cols-2`: Columnas en pantallas pequeñas
- `lg:grid-cols-3`: Columnas en pantallas grandes
- `xl:grid-cols-4`: Columnas en pantallas extra grandes
- `gap-6`: Espacio entre productos

## 📊 Estado Actual del Catálogo

- **Total de productos**: 56
- **Categorías**: 11
- **Productos con imagen**: 30

## 🚀 Próximos Pasos Sugeridos

1. **Agregar imágenes**: Sube fotos de los productos a `public/images/`
2. **Más información**: Agrega campo `description` al tipo `Product`
3. **Stock**: Agrega campo `inStock: boolean` para mostrar disponibilidad
4. **Descuentos**: Agrega campo `discount` para mostrar ofertas

## 💡 Tips

- Los cambios en `products.ts` se reflejan inmediatamente (hot reload)
- El id debe ser único para cada producto
- Usa nombres descriptivos en los ids (ej: `mesa-comedor-oslo`)
- Las categorías son case-sensitive ("Mesas" ≠ "mesas")
- Puedes ordenar los productos manualmente en el array

---

¿Necesitas ayuda? Revisa la documentación completa en el archivo `src/data/products.ts`
