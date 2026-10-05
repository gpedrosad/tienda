import sharp from 'sharp';
import { statSync } from 'fs';

(async () => {
  const input = 'public/hero-bg.jpg';
  await sharp(input)
    .resize(1920, null, { fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile('public/hero-bg.webp');
  
  const orig = statSync(input).size;
  const webp = statSync('public/hero-bg.webp').size;
  console.log(`Original: ${(orig/1024).toFixed(0)}KB → WebP: ${(webp/1024).toFixed(0)}KB`);
})();
