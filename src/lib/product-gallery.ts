import type { Product } from "@/data/products";

/**
 * Fotos que renderiza la ficha (galería del PDP).
 * Si el producto no está en el mapa, la ficha usa `imageUrl`.
 */
export const productImagesById: Record<string, string[]> = {
  "mesa-nordica": [
    "/images/mesa-nordica-1.jpg",
    "/images/mesa-nordica-2.jpg",
    "/images/mesa-nordica-3.jpg",
    "/images/mesa-nordica-4.jpg",
    "/images/mesa-nordica-5.jpg",
  ],
  "silla-kentucky": [
    "/images/silla-kentucky-1.jpg",
    "/images/silla-kentucky-2.jpg",
    "/images/silla-kentucky-3.jpg",
    "/images/silla-kentucky-4.jpg",
  ],
  "mesa-comedor-tripode": [
    "/images/mesa-tripode-1.jpg",
    "/images/mesa-tripode-2.jpg",
    "/images/mesa-tripode-3.jpg",
    "/images/mesa-tripode-4.jpg",
    "/images/mesa-tripode-5.jpg",
    "/images/mesa-tripode-6.jpg",
    "/images/mesa-tripode-7.jpg",
    "/images/mesa-tripode-8.jpg",
    "/images/mesa-tripode-9.jpg",
    "/images/mesa-tripode-10.jpg",
    "/images/mesa-tripode-11.jpg",
  ],
  "silla-milan-lenga": [
    "/images/silla-milan-lenga-main.jpg",
  ],
  "perchero-madera-verona": [
    "/images/perchero-verona-1.jpg",
    "/images/perchero-verona-2.png",
    "/images/perchero-verona-3.png",
    "/images/perchero-verona-4.jpg",
    "/images/perchero-verona-5.jpg",
  ],
  "mesa-comedor-redonda-ferrara": [
    "/images/mesa-ferrara-redonda-3.jpg",
    "/images/mesa-ferrara-redonda-2.jpg",
    "/images/mesa-ferrara-redonda-4.jpg",
  ],
  "arrimo-griego": ["/images/arrimo-griego-vista-1.jpg", "/images/arrimo-griego-vista-2.jpg"],
  "mesa-centro-roma": [
    "/images/mesa-centro-roma-vista-1.jpg",
    "/images/mesa-centro-roma-vista-2.jpg",
    "/images/mesa-centro-roma-vista-3.jpg",
    "/images/mesa-centro-roma-vista-4.jpg",
  ],
  "banca-capri": ["/images/banca-capri-vista-1.jpg", "/images/banca-capri-vista-2.jpg"],
  "banca-capri-negra": ["/images/banca-capri-negra-vista-1.jpg", "/images/banca-capri-negra-vista-2.jpg"],
  "mesa-tripode-redonda-negra": [
    "/images/mesa-roma-redonda-patas-negras-vista-1.jpg",
    "/images/mesa-roma-redonda-patas-negras-vista-2.jpg",
    "/images/mesa-roma-redonda-patas-negras-vista-3.jpg",
  ],
  "banca-griega": [
    "/images/banca-griega-vista-1.jpg",
    "/images/banca-griega-vista-2.jpg",
    "/images/banca-griega-vista-3.jpg",
    "/images/banca-griega-vista-4.jpg",
  ],
  "mesa-frida-redonda": [
    "/images/mesa-frida-redonda-vista-1.jpg",
    "/images/mesa-frida-redonda-vista-2.jpg",
    "/images/mesa-frida-redonda-vista-3.jpg",
  ],
  "mesa-tripode-ratona": [
    "/images/mesa-tripode-ratona-vista-1.jpg",
    "/images/mesa-tripode-ratona-vista-2.jpg",
    "/images/mesa-tripode-ratona-vista-3.jpg",
  ],
  "mesa-centro-ferrara": ["/images/mesa-centro-ferrara-vista-1.jpg", "/images/mesa-centro-ferrara-vista-2.jpg"],
  "mesa-comedor-tripode-redonda": [
    "/images/mesa-tripode-redonda-vista-1.jpg",
    "/images/mesa-tripode-redonda-vista-2.jpg",
    "/images/mesa-tripode-redonda-vista-3.jpg",
  ],
  "mesa-comedor-tripode-negra": [
    "/images/mesa-tripode-negra-2.jpg",
    "/images/mesa-tripode-negra-3.jpg",
    "/images/mesa-tripode-negra-4.jpg",
    "/images/mesa-tripode-negra-5.jpg",
  ],
  "mesa-comedor-roma-negra": ["/images/mesa-roma-negra-main.jpg"],
  "mesa-comedor-roma-natural": [
    "/images/mesa-comedor-roma-madera-main.jpg",
    "/images/mesa-roma-madera-2.webp",
  ],
  "mesa-comedor-cantabria": [
    "/images/mesa-comedor-madera-modelo-cantabria-main.jpg",
    "/images/mesa-cantabria-2.jpg",
    "/images/mesa-cantabria-3.jpg",
    "/images/mesa-cantabria-4.jpg",
    "/images/mesa-cantabria-5.jpg",
    "/images/mesa-cantabria-6.jpg",
  ],
  "mesa-comedor-redonda-novara": [
    "/images/mesa-comedor-redonda-modelo-novara-main.jpg",
    "/images/mesa-novara-2.jpg",
    "/images/mesa-novara-3.jpg",
    "/images/mesa-novara-4.jpg",
  ],
};

export function galleryImagesForProduct(product: Product): string[] {
  const productId = product.handle || product.id;
  return productImagesById[productId] ?? (product.imageUrl ? [product.imageUrl] : []);
}
