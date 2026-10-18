# Specs UX para Grok · 2026-10-17

Origen: 3 auditorías Claude (botones, ficha de producto, estructura/carga cognitiva) verificadas y priorizadas por Claude Opus 5.5.
Ejecutor: Grok (Cursor CLI). Revisor: Opus. Cada lote es independiente y se implementa en su propio worktree.

---

## 0. Reglas para todos los lotes (copiar en cada encargo)

1. **No tocar** `<title>`, `metadataTitle`, `pageTitle`, `seoTitle`, `description`/`pageDescription`/`seoDescription` ni `keywords`: congelados para medición SEO hasta el 5 nov.
2. **No borrar texto indexable** (FAQ, extraSections, guideParagraphs, párrafos de guías) salvo que el lote lo diga explícitamente. Mover y plegar sí; eliminar no.
3. **No tocar** `src/app/components/FabricaVideo.tsx` (cambios del dueño en curso).
4. **Cero datos inventados**: ni precios, ni plazos, ni medidas, ni políticas. Si falta un dato, se deja como está y se anota en "Pendiente de negocio".
5. Plazo canónico: "15 días hábiles en total" (fabricación). Garantía: usar `WARRANTY_MONTHS` de `src/lib/seo.ts`. Antigüedad: helpers de `src/lib/founding.ts`.
6. Tailwind existente; sin dependencias nuevas.
7. Al terminar: `npx tsc --noEmit`, `npm run lint` y `npm run build` sin errores. **No hacer commit.** Entregar resumen de archivos tocados y cómo se verificó cada criterio.
8. Mantener el estilo del archivo (comentarios escasos, español en copy, nombres existentes).

Comando por lote (Opus lo lanza):
```bash
cursor-agent -p --trust --force -w ux-L<N> --model grok-4.7-high "$(cat docs/specs-ux-grok-2026-10-17.md) — Implementa SOLO el lote L<N>."
```

---

## L1 · Sistema de botones (base para el resto)

**Por qué:** la acción "cotizar por WhatsApp" usa 4 colores (verde/blanco, verde/negro, negro, blanco), 3 verdes, 2 radios y 11 labels. Blanco sobre `#25D366` tiene contraste **1,98:1** (no cumple AA); `text-neutral-950` sobre el mismo verde da **9,98:1**. Varios tap targets miden 34–40 px y varios botones no tienen foco visible.

**Crear** `src/app/components/ui/Button.tsx`:

```ts
export type ButtonVariant = "whatsapp" | "primary" | "secondary" | "ghost";
export type ButtonSize = "sm" | "md";
export function buttonClasses(opts?: {
  variant?: ButtonVariant;      // default "primary"
  size?: ButtonSize;            // default "md"
  tone?: "light" | "dark";      // default "light"; dark = fondo oscuro
  fullWidthMobile?: boolean;    // default true → "w-full sm:w-auto"
  className?: string;
}): string;
```

Clases exactas:

| Parte | Clases |
|---|---|
| Base | `inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2` |
| `md` | `min-h-12 px-6 text-sm md:text-base` |
| `sm` | `min-h-11 px-4 text-sm` |
| `whatsapp` | `bg-[#25D366] text-neutral-950 hover:bg-[#1ebe57] focus-visible:ring-[#25D366]` |
| `primary` | `bg-neutral-900 text-white hover:bg-neutral-800 focus-visible:ring-neutral-900` |
| `secondary` light | `border border-neutral-300 bg-white text-neutral-900 hover:border-neutral-900 focus-visible:ring-neutral-900` |
| `secondary` dark | `border border-white/30 bg-transparent text-white hover:border-white focus-visible:ring-white` |
| `ghost` | `min-h-0 px-0 underline underline-offset-4 decoration-neutral-300 hover:decoration-neutral-900` |
| tone dark | añadir `focus-visible:ring-offset-neutral-900` |

**Crear** `src/app/components/ui/WhatsAppCTA.tsx` (client): props `{ href: string; label?: string; placement: string; size?; tone?; fullWidthMobile?; className? }`. Renderiza `<a href target="_blank" rel="noopener noreferrer">` con `buttonClasses({variant:"whatsapp"})`, icono `AiOutlineWhatsApp` size 20 **a la izquierda**, `aria-hidden`, y `onClick` → `trackWhatsAppClick` de `src/lib/whatsapp.ts:54` (emite `whatsapp_click` a GA4) con `placement`.

**Migrar** (mantener hrefs y textos de mensajes; solo estilo, label y tracking):

| Archivo:línea aprox. | Hoy | Después |
|---|---|---|
| `WhatsAppInlineCTA.tsx:44,52` | verde texto blanco | usar `buttonClasses({variant:"whatsapp"})` internamente |
| `WhatsAppButton.tsx:109,118` (sticky) | verde texto blanco | `text-neutral-950`, `min-h-12` |
| `MobileMenu.tsx:290` | `bg-green-600 font-light py-2` | `WhatsAppCTA` label "Escríbenos por WhatsApp", `placement="mobile_menu"` |
| `ServiceLandingPage.tsx:123` (hero) | negro | `WhatsAppCTA` |
| `ServiceLandingPage.tsx:304` (intermedio) | negro | `WhatsAppCTA` |
| `ServiceLandingPage.tsx:379` (final, fondo oscuro) | blanco | `WhatsAppCTA tone="dark"` |
| `ServiceLandingPage.tsx:131` "Ver catálogo" | borde | `buttonClasses({variant:"secondary"})` |
| `GuidePage.tsx:174` | blanco | `WhatsAppCTA tone="dark"` |
| `collections/[handle]/page.tsx:337` | verde/negro suelto | `WhatsAppCTA` |
| `mesas-de-centro/page.tsx:176` y `:309` | borde / verde | secondary / `WhatsAppCTA` |
| `comedores-nordicos/page.tsx:248,418` | negro / blanco | `WhatsAppCTA` / `WhatsAppCTA tone="dark"` |
| `kit-pergola/page.tsx:283,339,570` | verde/negro varios | `WhatsAppCTA` (`:283` con `size="sm"`, `fullWidthMobile={false}`) |
| `HeroBanner.tsx:45-51` | `<Link>` blanco cuadrado "Contáctanos", icono a la derecha | `WhatsAppCTA` label **"Cotizar por WhatsApp"**, `placement="home_hero"` |
| `ProductCard.tsx:82-90` | negro cuadrado `py-2.5` "Consultar", sin tracking | `WhatsAppCTA size="sm"` label **"Cotizar"** (o "Pedir foto" si no hay imagen), `placement="product_card"` |
| `products/[handle]/page.tsx:443` "Llamar" | `hidden sm:inline-flex` | ver L2 |
| `not-found.tsx:41,47`, `guias/page.tsx:174`, `ofertas/page.tsx:97` | sueltos | `buttonClasses` primary/secondary |
| `Footer.tsx:264-269` | `FaWhatsapp` 40 px | `AiOutlineWhatsApp`, `h-11 w-11` |
| `Header.tsx:92,124`, `MobileMenu.tsx:96` | `focus:outline-none` sin reemplazo, 34–38 px | `h-11 w-11 inline-flex items-center justify-center rounded-full focus-visible:ring-2 focus-visible:ring-neutral-400` |
| `ProductGallery.tsx:163,177,188` | `h-10 w-10` | `h-11 w-11` + `focus-visible:ring-2` |

**Labels canónicos:** cotizar → "Cotizar por WhatsApp" (sticky puede ser "Cotizar {cosa}" si coincide con el inline de la misma página); card → "Cotizar"; contacto general (menú, quiénes somos, contacto, guías) → "Escríbenos por WhatsApp". Eliminar "Contáctanos", "Hablar con Idea Madera", "Contactar por WhatsApp", "WhatsApp" a secas. Ajustar `whatsappButtonLabel` en `src/lib/service-landings.ts`, `door-landings.ts` y similares **solo** en esos casos.

**Criterios de aceptación**
- `grep -rn "text-white" src | grep "25D366"` → 0 resultados.
- `grep -rn "bg-green-600" src` → 0.
- Todos los enlaces a `wa.me` abren en pestaña nueva y pasan por `trackWhatsAppClick`.
- Ningún botón/CTA/IconButton bajo 44 px en móvil.
- Tab por la home, una landing y una ficha: el foco siempre se ve.

---

## L2 · Ficha de producto (`src/app/products/[handle]/page.tsx`)

Depende de L1.

| # | Cambio | Detalle |
|---|---|---|
| 2.1 | **CTA dentro del primer pantallazo móvil** | Orden del bloque de ficha: categoría → H1 → **línea de specs** → precio → **CTA** (`WhatsAppInlineCTA`, `placement="product_hero"`) → enlace "Llamar" → trustItems → pitch → features. Hoy las features (hasta 4) van antes del CTA y lo empujan a ~860 px. |
| 2.2 | Línea de specs bajo el H1 | `text-sm text-neutral-600`: `{material} · {ancho}×{fondo}×{alto} cm · {terminación}` con los datos de `product` (`dimensions`, material, finish). Omitir cada parte que no exista. No inventar. |
| 2.3 | "Llamar" visible en móvil | Quitar `hidden sm:inline-flex`; en móvil como `buttonClasses({variant:"ghost"})` "o llámanos al +56 9 9549 7838" con `href="tel:+56995497838"`. |
| 2.4 | Quitar claim sin respaldo | `:462` `product.stockNote ?? "Respondemos en menos de 1 hora hábil."` → fallback `"Fabricación a pedido · Te respondemos por WhatsApp en horario hábil."` |
| 2.5 | Quitar features duplicadas | En la sección Detalles (`~:515`) eliminar la segunda lista de features; dejar descripción + tabla de especificaciones. |
| 2.6 | Sticky sin duplicar | `WhatsAppButton.tsx:40-41`: en la ficha, el sticky aparece solo cuando el CTA del hero sale del viewport. Añadir prop `watchSelector?: string` (p. ej. `"#product-hero-cta"`) y usar el `IntersectionObserver` que ya existe en el archivo; sin la prop, mantener el comportamiento `scrollY > 80` actual. En móvil el sticky muestra el precio a la izquierda (`formatCLP`). |
| 2.7 | Estrella → icono neutro | Píldora del hero (`~:410`) y `SocialProof.tsx:26,44`: reemplazar la estrella por `AiOutlineEnvironment` (ubicación) / `AiOutlineCar` (envío). La estrella sugiere un rating que no existe. |
| 2.8 | Garantía y plazo desde constantes | `Accordion.tsx:22,26` y `SocialProof.tsx:81-83`: usar `WARRANTY_MONTHS` y `productionDays` (prop opcional con default `DEFAULT_PRODUCTION_DAYS`). Texto del plazo: "{n} días hábiles en total." |
| 2.9 | Accesibilidad del Accordion | `aria-expanded` y `aria-controls` en cada botón; icono para "Garantía" (`AiOutlineSafety`); "Envíos" con `AiOutlineCar` en vez del reloj. |
| 2.10 | Relacionados por intención | `RelatedProducts.tsx:27-30`: si el producto está en `COFFEE_TABLE_WITH_SIZES` o `DINING_TABLE_IDS` (`src/lib/mesa-groups.ts`), elegir relacionados del mismo grupo; si es silla, mostrar mesas de comedor con título "Combínala con". Orden determinista (no pseudoaleatorio). Añadir enlace "Ver todas →" a `/mesas-de-centro`, `/collections/mesas` o la colección de la categoría. En las cards de relacionados, el CTA es `secondary` "Ver ficha" (enlace a la ficha), no WhatsApp. |
| 2.11 | Galería móvil | `ProductGallery.tsx:105`: `aspect-square sm:aspect-[4/3]`; indicador de puntos bajo la imagen en móvil (hoy solo contador "1/4"). |
| 2.12 | H1 desktop | `lg:text-6xl` → `lg:text-5xl`. |
| 2.13 | Etiqueta del precio | Bajo el precio, `text-xs text-neutral-500`: **"IVA incluido"** (confirmado por el dueño 2026-10-17). |
| 2.14 | Entrega | En trustItems reemplazar "Envíos a todo Chile" por **"Retiro en taller (Chillán) o envío a todo Chile"** (confirmado 2026-10-17). En el Accordion "Envíos": "Retiro en nuestro taller en Chillán o envío a todo Chile. El despacho se coordina según tu comuna o región al cotizar." No agregar costos ni días de despacho. |

**No hacer en L2:** fusionar Accordion + FAQ (afecta schema FAQ; queda para después del 5 nov), cambiar `trustItems` "Cambios 30 días" (pendiente de negocio), mostrar tiempo/costo de despacho (pendiente de negocio).

**Criterios:** en 390×844 el CTA verde termina antes de y=700 px en `silla-kentucky` y `mesa-tripode-ratona`; nunca hay dos CTA verdes visibles a la vez; build OK.

---

## L3 · Home (`HomePage.tsx`, `HeroBanner.tsx`)

| # | Cambio | Detalle |
|---|---|---|
| 3.1 | Franja SEO tras el hero (`HomePage.tsx:61-97`) | Reemplazar por 4 accesos visuales en grilla 2×2 móvil / 4 col desktop: **Muebles en Chillán** (`/muebles-chillan`), **Puertas a medida** (`/puertas-a-medida`), **Kit pérgola** (`/kit-pergola`), **Cubiertas a medida** (`/cubiertas-a-medida`). Tarjeta `rounded-2xl border border-neutral-200 p-4` con título + 1 línea. Mover el párrafo de texto actual (sin borrarlo) encima de la FAQ de la home. |
| 3.2 | Grilla del catálogo | Mostrar los primeros **12** productos del filtro activo y debajo `buttonClasses({variant:"secondary"})` **"Ver todo el catálogo"** → `/collections/todos-los-productos` (con la categoría activa, si existe, a `/collections/{handle}`). Mantener filtros. |
| 3.3 | Buscador duplicado | Quitar el buscador de la sección catálogo si es el mismo `SearchModal` del Header; dejar las pills. Si no es el mismo componente, no tocar y avisar. |
| 3.4 | Pills | Una sola fila `flex-nowrap overflow-x-auto` en móvil, `min-h-11`, activa `bg-neutral-900 text-white`, inactiva `bg-white text-neutral-700 ring-1 ring-neutral-200`, `aria-pressed`. Misma implementación que L4 (extraer `ui/Chip.tsx`). Eliminar `gray-*` en favor de `neutral-*`. |
| 3.5 | Barra WhatsApp | Quitar `alwaysVisible` (`HomePage.tsx:184`): aparece al pasar el hero. |
| 3.6 | Hero móvil | `min-h-[85vh]` → `min-h-[70vh] md:min-h-[90vh]` (`HeroBanner.tsx:14,29`). Eyebrow con `SINCE_FOUNDING_LABEL` + "· Taller familiar en Chillán" si hoy no está en el hero. |
| 3.7 | H2 "Nuestro Catálogo" | Quitar `font-bold font-poppins` (`:101`); usar `text-2xl md:text-4xl font-light` como el resto. |

**Criterios:** la home en móvil mide < 9.000 px sin footer; FabricaVideo y FAQ alcanzables; no se pierde ningún texto indexable (solo se mueve).

---

## L4 · Colecciones (`src/app/collections/[handle]/page.tsx`)

| # | Cambio | Detalle |
|---|---|---|
| 4.1 | Productos sobre el pliegue | Mostrar en el hero solo la **primera oración** de `collection.intro`; el resto del intro se renderiza **debajo de la grilla**, antes de la guía (no se borra). |
| 4.2 | Pills | Usar `ui/Chip.tsx` de L3 en una fila con scroll horizontal. |
| 4.3 | Enlaces del hero | Mover los 2 `relatedLinks` del hero (`~:174`) a la sección de enlaces relacionados de abajo (si ya están ahí, solo quitarlos del hero). |
| 4.4 | FAQ plegable | Las FAQ de colección con `<details>/<summary>` como en `ServiceLandingPage` (el texto sigue en el DOM y en el schema). |
| 4.5 | CTA final | `WhatsAppCTA` (L1). |

**Criterio:** en `/collections/veladores` la primera tarjeta de producto empieza antes de y=600 px en 390×844.

---

## L5 · Guía `GuidePage.tsx` (aplica a todas las guías; foco en medidas-mesa-comedor)

| # | Cambio | Detalle |
|---|---|---|
| 5.1 | Respuesta primero | Si la guía tiene una sección con `table`, renderizar **esa sección primero** tras la intro (prop/flag en `GuideConfig`: `leadSectionIndex?: number`; en `medidasMesaGuideConfig` apuntar a la tabla por personas). Orden del resto, igual. |
| 5.2 | CTA intermedio | Tras la sección destacada, bloque `WhatsAppCTA` (`placement="guide_mid"`) con `config.ctaTitle`. |
| 5.3 | Productos reales | Tras el CTA intermedio, prop opcional `featuredProductIds?: string[]` → 3 `ProductCard` (solo con foto). En medidas-mesa-comedor: 3 mesas de comedor con foto de `DINING_TABLE_IDS`, elegidas por distinto tamaño. |
| 5.4 | Enlaces en bullets | Renderizar bullets con `InlineLinkedText`. |
| 5.5 | FAQ plegable | `<details>/<summary>` (texto en DOM). |
| 5.6 | Fecha legible | "Actualizado: 17 de octubre de 2026" (`Intl.DateTimeFormat("es-CL", { dateStyle: "long" })`, zona `America/Santiago`) con `<time dateTime="2026-10-17">`. |

**No hacer:** borrar FAQ o párrafos (después del 5 nov).

---

## L6 · Landings de servicio (`ServiceLandingPage.tsx`, `src/lib/service-landings.ts`)

| # | Cambio | Detalle |
|---|---|---|
| 6.1 | Hero sin triple repetición | Mostrar **o** `stats` **o** `badges` (máx. 3), no ambos: si la config tiene `stats`, ocultar badges. `heroHighlights` se renderizan **debajo de la galería**, no en el hero. |
| 6.2 | `bottomHighlights` | No renderizar (`:312-327`); conservar los datos en config. |
| 6.3 | Orden | hero → galería → pasos → CTA intermedio → sectionParagraph + featureCards → extraSections → FAQ → relatedLinks → CTA final. |
| 6.4 | relatedLinks | Grilla `grid-cols-2` en móvil; mostrar 6 y el resto tras un `<details>` "Ver más páginas relacionadas" (siguen en el DOM). |
| 6.5 | Tipografía | heroParagraph y extraSections a `text-base` (hoy `text-sm`); `<h2>` de tarjetas → `<h3>`. |

**No hacer:** recortar FAQ/extraSections de puertas (19 FAQ) hasta después del 5 nov; agregar `heroImage` a `/muebles-chillan` (pendiente de que el dueño commitee `public/images/taller-idea-madera.webp`).

---

## L7 · Kit pérgola (`src/app/kit-pergola/page.tsx`)

| # | Cambio |
|---|---|
| 7.1 | Reemplazar el FAB circular (`:607-615`) por `WhatsAppButton` (barra sticky como el resto del sitio). |
| 7.2 | Subir "Qué incluye" (foto + 4 ítems) a la segunda sección, después del hero. |
| 7.3 | FAQ plegable con `<details>`. |
| 7.4 | Botones según L1. |

**No hacer:** eliminar "Uniones y soportes" ni "Ventajas" (después del 5 nov); tocar title/meta/H1 (va en fase 1 del plan SEO, lote aparte).

---

## L8 · Navegación (`DesktopNav.tsx`, `MobileMenu.tsx`, `Footer.tsx`)

| # | Cambio |
|---|---|
| 8.1 | Nav: quitar "Inicio" (el logo ya lleva a `/`); reemplazar "Peldaños" + "Molduras" por un ítem **"A medida"** con submenú/lista: Muebles en Chillán, Puertas, Peldaños, Cubiertas, Molduras, Muebles de cocina; añadir **"Kit pérgola"**. Mismos ítems en móvil. |
| 8.2 | Footer móvil: columnas plegables (`<details>`) bajo `md`; en desktop sin cambios. Ningún enlace se elimina. |
| 8.3 | Logo: que no desborde la barra de 64 px (`Header.tsx:82` vs `:111`). |

---

## Orden y paralelismo

1. **L1** (todos dependen de él).
2. En paralelo, en worktrees separados: **L2**, **L3+L4** (comparten `Chip`), **L5**, **L6+L7**.
3. **L8** al final.

Opus revisa cada diff contra estas specs y `self-learn/seo/RULES.md`, corre build y hace commit por lote.

## Pendiente de negocio (bloquea partes, no lotes)

Confirmado por el dueño 2026-10-17: **precios con IVA incluido** y **retiro en taller en Chillán**.


| Dato | Desbloquea |
|---|---|
| Medidas de Silla Kentucky (alto total, alto asiento, ancho, fondo) | Línea de specs y tabla en la ficha con más tráfico |
| Política real de cambios (¿30 días aplica a muebles a pedido?) | trustItem "Cambios 30 días", Accordion y `MerchantReturnPolicy` |
| Tiempo y costo de despacho (retiro en taller: **sí**, ya en L2.14) | Línea de despacho en ficha; `shippingRate`/`transitTime` del schema |
| Commit de `public/images/taller-idea-madera.webp` | Foto en `/muebles-chillan` y bloque de taller en la ficha |
