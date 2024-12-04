import sharp from 'sharp';
import { readFileSync } from 'fs';
import { resolve } from 'path';

const sizes = {
  'favicon-16x16.png': 16,
  'favicon-32x32.png': 32,
  'apple-touch-icon.png': 180,
  'android-chrome-192x192.png': 192,
  'android-chrome-512x512.png': 512
};

async function generateFavicons() {
  try {
    const svgBuffer = readFileSync(resolve('public', 'favicon.svg'));

    // Generate PNG favicons
    for (const [filename, size] of Object.entries(sizes)) {
      await sharp(svgBuffer)
        .resize(size, size)
        .png()
        .toFile(resolve('public', filename));
      
      console.log(`✅ Generated ${filename}`);
    }

    // Generate ICO file
    await sharp(svgBuffer)
      .resize(32, 32)
      .toFormat('ico')
      .toFile(resolve('public', 'favicon.ico'));
    
    console.log('✅ Generated favicon.ico');

  } catch (error) {
    console.error('Error generating favicons:', error);
    process.exit(1);
  }
}

generateFavicons();