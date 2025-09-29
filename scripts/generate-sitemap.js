import { SitemapStream, streamToPromise } from 'sitemap';
import { createWriteStream } from 'fs';
import { resolve } from 'path';

// Define your website URL
const WEBSITE_URL = 'https://qrnevjegy.hu';

// Define all your routes with optimized priorities and frequencies
const routes = [
  // Main pages - highest priority
  { url: '/', changefreq: 'daily', priority: 1.0 },
  { url: '/vcard', changefreq: 'weekly', priority: 0.9 },
  { url: '/guide', changefreq: 'weekly', priority: 0.8 },
  
  // Blog section
  { url: '/blog', changefreq: 'daily', priority: 0.8 },
  
  // Blog posts - optimized for SEO
  { url: '/blog/qr-kod-nevjegykartya-keszites-minden-amit-tudni-kell', changefreq: 'monthly', priority: 0.9 },
  { url: '/blog/digitalis-nevjegykartyak-10-legnagyobb-elonye-vallalkozasoknak', changefreq: 'monthly', priority: 0.9 },
  { url: '/blog/digitalis-nevjegykartya-vs-hagyomanyos-nevjegy-osszehasonlitas', changefreq: 'monthly', priority: 0.9 },
  { url: '/blog/hogyan-keszitsunk-digitalis-nevjegykartyat-lepesrol-lepesre', changefreq: 'monthly', priority: 0.9 },
  { url: '/blog/digitalis-nevjegykartyak-elonyei', changefreq: 'monthly', priority: 0.8 },
  { url: '/blog/qr-kodok-a-modern-uzletben', changefreq: 'monthly', priority: 0.8 },
  { url: '/blog/nevjegykeszites-jovoje-trendek', changefreq: 'monthly', priority: 0.7 },
  { url: '/blog/praktikus-tippek-digitalis-nevjegyekhez', changefreq: 'monthly', priority: 0.7 },
  { url: '/blog/digitalis-nevjegykartya-keszites-vallalkozasoknak', changefreq: 'monthly', priority: 0.9 },
  { url: '/blog/digitalis-nevjegykartya-trendek-2025', changefreq: 'monthly', priority: 0.8 },
  
  // Legal pages - lower priority but still important
  { url: '/privacy', changefreq: 'yearly', priority: 0.3 },
  { url: '/terms', changefreq: 'yearly', priority: 0.3 },
  
  // Additional pages that should be included
  { url: '/success', changefreq: 'yearly', priority: 0.2 },
  { url: '/cancel', changefreq: 'yearly', priority: 0.2 },
];

async function generateSitemap() {
  try {
    // Create a stream to write to
    const smStream = new SitemapStream({ hostname: WEBSITE_URL });
    
    // Add each route to the sitemap
    routes.forEach(route => {
      smStream.write({
        url: route.url,
        changefreq: route.changefreq,
        priority: route.priority,
        lastmod: new Date().toISOString()
      });
    });

    // End the stream
    smStream.end();

    // Generate sitemap XML
    const sitemapXML = await streamToPromise(smStream);

    // Write the sitemap to the public directory
    const writeStream = createWriteStream(resolve('public', 'sitemap.xml'));
    writeStream.write(sitemapXML.toString());
    writeStream.end();

    console.log('✅ Sitemap generated successfully!');
  } catch (error) {
    console.error('Error generating sitemap:', error);
    process.exit(1);
  }
}

generateSitemap();
