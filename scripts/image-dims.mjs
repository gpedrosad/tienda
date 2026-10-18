// Mide las fotos de public/images y guarda ancho/alto en src/data/image-dimensions.json.
// Lo usa src/lib/image-fit.ts para decidir si una foto llena el marco o se muestra completa.
// Correr después de agregar o reemplazar fotos: npm run images:dims
import { readdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const imagesDir = path.join(root, "public/images");
const outPath = path.join(root, "src/data/image-dimensions.json");
const IMAGE_EXT = /\.(jpe?g|png|webp|avif)$/i;

const dimensions = {};
for (const file of readdirSync(imagesDir).filter((name) => IMAGE_EXT.test(name)).sort()) {
  const { width, height } = await sharp(path.join(imagesDir, file)).metadata();
  if (width && height) dimensions[`/images/${file}`] = [width, height];
}

const lines = Object.entries(dimensions).map(([src, size]) => `  ${JSON.stringify(src)}: ${JSON.stringify(size)}`);
writeFileSync(outPath, `{\n${lines.join(",\n")}\n}\n`, "utf8");
console.log(`${Object.keys(dimensions).length} imágenes → ${path.relative(root, outPath)}`);
