import sharp from 'sharp';
import { readdirSync, statSync, renameSync } from 'fs';
import { join } from 'path';

const DIR = 'public/images';
const MAX_SIZE = 200 * 1024;

(async () => {
  const files = readdirSync(DIR).filter(f => f.match(/\.(jpg|jpeg)$/i));
  let processed = 0;
  let savedBytes = 0;
  
  for (const file of files) {
    const path = join(DIR, file);
    const origSize = statSync(path).size;
    
    if (origSize > MAX_SIZE) {
      const img = sharp(path);
      
      for (let quality = 85; quality >= 60; quality -= 5) {
        const output = await img.jpeg({ quality, progressive: true }).toBuffer();
        if (output.length <= MAX_SIZE || quality === 60) {
          await sharp(output).toFile(path + '.tmp');
          renameSync(path + '.tmp', path);
          const saved = origSize - output.length;
          savedBytes += saved;
          console.log(`✓ ${file}: ${(origSize/1024).toFixed(0)}KB → ${(output.length/1024).toFixed(0)}KB (q${quality})`);
          processed++;
          break;
        }
      }
    }
  }
  
  console.log(`\nProcesadas: ${processed} imágenes, ahorro: ${(savedBytes/1024/1024).toFixed(2)}MB`);
})();
