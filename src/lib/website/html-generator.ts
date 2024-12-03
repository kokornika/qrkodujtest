import { VCardFormData } from '../../types/vcard';
import { generateCSS } from './css-generator';
import { socialIcons } from '../social-icons';
import { socialColors } from '../social-colors';
import { generateHungarianMonogram, splitHungarianName } from '../utils/name-utils';
import * as QRCode from 'qrcode';

export async function generateHTML(data: VCardFormData): Promise<string> {
  // Generate vCard string with proper Hungarian name format
  const { familyName, givenNames } = splitHungarianName(data.name);
  
  const vcard = `BEGIN:VCARD
VERSION:3.0
N:${familyName};${givenNames};;;
FN:${data.name}
${data.company ? `ORG:${data.company}` : ''}
${data.position ? `TITLE:${data.position}` : ''}
${data.phoneMobile ? `TEL;TYPE=CELL:${data.phoneMobile}` : ''}
${data.phoneWork ? `TEL;TYPE=WORK:${data.phoneWork}` : ''}
${data.phonePrivate ? `TEL;TYPE=HOME:${data.phonePrivate}` : ''}
${data.email ? `EMAIL:${data.email}` : ''}
${data.website ? `URL:${data.website}` : ''}
${data.street && data.city ? `ADR:;;${data.street};${data.city};${data.state};${data.zipcode};${data.country}` : ''}
${data.description ? `NOTE:${data.description}` : ''}
${data.socialLinks.map(link => `URL;type=${link.platform}:${link.url}`).join('\n')}
END:VCARD`;

  // Generate QR code as data URL
  const qrCodeDataUrl = await QRCode.toDataURL(vcard, {
    width: 240,
    margin: 1,
    color: {
      dark: '#000000',
      light: '#ffffff'
    }
  });

  const socialLinks = data.socialLinks
    .map(link => {
      const brandColor = socialColors[link.platform];
      return `
        <a href="${link.url}" 
           target="_blank" 
           rel="noopener noreferrer" 
           class="social-link"
           style="--brand-color: ${brandColor}"
           title="${link.platform}">
          <i class="fab fa-${link.platform.toLowerCase()}"></i>
        </a>
      `;
    })
    .join('');

  return `
<!DOCTYPE html>
<html lang="hu">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.name} - Digitális Névjegykártya</title>
    <meta name="description" content="${data.description || `${data.name} digitális névjegykártyája`}">
    
    <!-- PWA Support -->
    <link rel="manifest" href="data:application/json;base64,${btoa(JSON.stringify({
      name: `${data.name} - Digitális Névjegykártya`,
      short_name: data.name,
      start_url: '.',
      display: 'standalone',
      background_color: '#ffffff',
      theme_color: data.backgroundColor,
      icons: [{
        src: data.profilePicture || qrCodeDataUrl,
        sizes: '192x192',
        type: 'image/png'
      }]
    }))}">
    
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>${generateCSS(data)}</style>
</head>
<body>
    <div class="card-container">
        <div class="digital-card">
            <!-- Left Panel -->
            <div class="left-panel">
                <div class="profile-section">
                    ${data.profilePicture 
                      ? `<img src="${data.profilePicture}" alt="${data.name}" class="profile-image">`
                      : `<div class="profile-placeholder">
                           <span class="monogram">${generateHungarianMonogram(data.name) || 'MT'}</span>
                         </div>`
                    }
                    <h1>${data.name}</h1>
                    ${data.position && data.company 
                      ? `<p>${data.position} - ${data.company}</p>`
                      : data.position || data.company 
                      ? `<p>${data.position || data.company}</p>`
                      : ''}
                </div>

                <div class="contact-section">
                    ${data.phoneMobile ? `
                    <a href="tel:${data.phoneMobile}" class="contact-item">
                        <i class="fas fa-mobile-alt"></i>
                        <span>${data.phoneMobile}</span>
                    </a>
                    ` : ''}
                    
                    ${data.phoneWork ? `
                    <a href="tel:${data.phoneWork}" class="contact-item">
                        <i class="fas fa-phone"></i>
                        <span>${data.phoneWork}</span>
                    </a>
                    ` : ''}
                    
                    ${data.email ? `
                    <a href="mailto:${data.email}" class="contact-item">
                        <i class="fas fa-envelope"></i>
                        <span>${data.email}</span>
                    </a>
                    ` : ''}
                    
                    ${data.website ? `
                    <a href="${data.website}" target="_blank" class="contact-item">
                        <i class="fas fa-globe"></i>
                        <span>${data.website}</span>
                    </a>
                    ` : ''}
                    
                    ${(data.street || data.city) ? `
                    <div class="contact-item">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${[data.street, data.city, data.zipcode, data.state, data.country]
                          .filter(Boolean)
                          .join(', ')}</span>
                    </div>
                    ` : ''}
                </div>
            </div>

            <!-- Right Panel -->
            <div class="right-panel">
                ${data.description ? `
                <div class="section">
                    <h2>Bemutatkozás</h2>
                    <p>${data.description}</p>
                </div>
                ` : ''}

                ${data.socialLinks.length > 0 ? `
                <div class="section">
                    <h2>Közösségi média</h2>
                    <div class="social-links">
                        ${socialLinks}
                    </div>
                </div>
                ` : ''}

                <div class="section qr-section">
                    <h2>Névjegykártya QR kód</h2>
                    <div class="qr-code">
                        <img src="${qrCodeDataUrl}" alt="QR kód" id="qr-code">
                    </div>
                    <p>Olvassa be a QR kódot a névjegy mentéséhez</p>
                </div>

                <div class="actions">
                    <button onclick="downloadVCard()" class="action-button primary">
                        <i class="fas fa-address-card"></i>
                        Névjegy mentése
                    </button>
                    <button onclick="shareCard()" class="action-button secondary">
                        <i class="fas fa-share-alt"></i>
                        Megosztás
                    </button>
                </div>
            </div>
        </div>
    </div>

    <script>
    // Service Worker Registration
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('data:application/javascript;base64,${btoa(`
        const CACHE_NAME = '${data.name}-v1';
        const urlsToCache = [
          '/',
          '${data.profilePicture || ''}',
          '${qrCodeDataUrl}',
          'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css',
          'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'
        ].filter(Boolean);

        self.addEventListener('install', (event) => {
          event.waitUntil(
            caches.open(CACHE_NAME)
              .then((cache) => cache.addAll(urlsToCache))
          );
        });

        self.addEventListener('fetch', (event) => {
          event.respondWith(
            caches.match(event.request)
              .then((response) => response || fetch(event.request))
          );
        });
      `)}')
        .then(registration => console.log('ServiceWorker registered'))
        .catch(error => console.log('ServiceWorker registration failed:', error));
    }

    // Save vCard data to IndexedDB
    const dbName = 'DigitalBusinessCard';
    const storeName = 'vcard';
    const vCardData = \`${vcard}\`;
    const request = indexedDB.open(dbName, 1);

    request.onerror = (event) => {
      console.error('IndexedDB error:', event.target.error);
    };

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName, { keyPath: 'id' });
      }
    };

    request.onsuccess = (event) => {
      const db = event.target.result;
      const transaction = db.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      
      store.put({
        id: '${data.name}',
        vcard: vCardData,
        timestamp: new Date().toISOString()
      });
    };

    function downloadVCard() {
        const vcard = \`${vcard}\`;
        const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = '${data.name.replace(/\\s+/g, '_')}.vcf';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
    }

    async function shareCard() {
        const shareData = {
            title: '${data.name} - Digitális Névjegykártya',
            text: '${data.name} digitális névjegykártyája',
            url: window.location.href
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                await navigator.clipboard.writeText(window.location.href);
                alert('A névjegykártya linkje a vágólapra másolva!');
            }
        } catch (err) {
            console.error('Megosztás sikertelen:', err);
        }
    }

    // Download QR code as PNG
    const qrImg = document.getElementById('qr-code');
    if (qrImg) {
      qrImg.addEventListener('click', () => {
        const canvas = document.createElement('canvas');
        canvas.width = qrImg.width;
        canvas.height = qrImg.height;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(qrImg, 0, 0);
        
        const link = document.createElement('a');
        link.download = '${data.name.replace(/\\s+/g, '_')}_qr.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
      });
    }
    </script>
</body>
</html>`;
}