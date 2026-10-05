import sharp from 'sharp';
import { writeFileSync } from 'fs';

const LOGO = 'public/logonegro.png';

async function main() {
  console.log('Generando assets SEO...');
  
  const logo = await sharp(LOGO).resize(400, 400, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).toBuffer();
  const svg = '<svg width="1200" height="630"><rect fill="#0a0a0a" width="1200" height="630"/><text x="600" y="480" font-family="sans-serif" font-size="48" fill="#fff" text-anchor="middle">Idea Madera</text><text x="600" y="530" font-family="sans-serif" font-size="28" fill="#d4d4d4" text-anchor="middle">Muebles de madera maciza en Chillán</text></svg>';
  
  await sharp(Buffer.from(svg)).composite([{ input: logo, top: 100, left: 400 }]).jpeg({ quality: 90 }).toFile('public/og-default.jpg');
  console.log('✅ og-default.jpg');
  
  const fav = await sharp(LOGO).resize(32, 32, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } }).png().toBuffer();
  writeFileSync('public/favicon.ico', fav);
  console.log('✅ favicon.ico');
  
  await sharp(LOGO).resize(180, 180, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } }).png().toFile('public/apple-touch-icon.png');
  console.log('✅ apple-touch-icon.png');
  
  console.log('Listo!');
}

main().catch(console.error);
