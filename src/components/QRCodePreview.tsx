import React from 'react';
import QRCode from 'qrcode.react';
import { QROptions } from '../types/qr';
import { Button } from './ui/button';
import { Download } from 'lucide-react';
import PromotionalCard from './ui/PromotionalCard';

interface QRCodePreviewProps {
  options: QROptions;
}

const QRCodePreview: React.FC<QRCodePreviewProps> = ({ options }) => {
  const handleDownload = () => {
    try {
      // Get the QR code canvas
      const canvas = document.querySelector('canvas');
      if (!canvas) return;

      // Create a new canvas with the correct size and background
      const newCanvas = document.createElement('canvas');
      newCanvas.width = options.size;
      newCanvas.height = options.size;
      const context = newCanvas.getContext('2d');
      
      if (context) {
        // Fill background
        if (options.backgroundColor === 'transparent') {
          context.clearRect(0, 0, newCanvas.width, newCanvas.height);
        } else {
          context.fillStyle = options.backgroundColor;
          context.fillRect(0, 0, newCanvas.width, newCanvas.height);
        }
        
        // Copy QR code onto new canvas
        const qrContext = canvas.getContext('2d');
        if (qrContext) {
          const imageData = qrContext.getImageData(0, 0, canvas.width, canvas.height);
          context.putImageData(imageData, 0, 0);
        }

        // For mobile devices, create a temporary link and trigger download
        const dataUrl = newCanvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = 'qrcode.png';
        link.href = dataUrl;
        
        // Create a blob for better mobile compatibility
        fetch(dataUrl)
          .then(res => res.blob())
          .then(blob => {
            const blobUrl = window.URL.createObjectURL(blob);
            link.href = blobUrl;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(blobUrl);
          });
      }
    } catch (error) {
      console.error('Error downloading QR code:', error);
    }
  };

  const checkerboardPattern = `
    data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAGElEQVQYlWNgYGCQwoKxgqGgcJA5h3yFAAs8BRWVSwooAAAAAElFTkSuQmCC
  `.trim();

  return (
    <div className="flex flex-col space-y-8">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">
        QR kód generálása
      </h2>
      
      <div className="flex flex-col items-center space-y-6">
        <div 
          className="flex justify-center items-center rounded-lg p-4 sm:p-6"
          style={{
            background: options.backgroundColor === 'transparent' 
              ? `url(${checkerboardPattern}) repeat`
              : options.backgroundColor
          }}
        >
          <QRCode
            value={options.content || ' '}
            size={options.size}
            level="M"
            bgColor={options.backgroundColor === 'transparent' ? 'transparent' : options.backgroundColor}
            fgColor={options.foregroundColor}
          />
        </div>
        
        <Button
          onClick={handleDownload}
          disabled={!options.content}
          className="w-full sm:w-auto px-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          <Download className="w-4 h-4 mr-2" />
          Letöltés
        </Button>
      </div>

      <div className="w-full mt-8">
        <PromotionalCard
          title="Többet szeretne mint egy QR kód?"
          description="Próbálja ki prémium digitális névjegykártya szolgáltatásunkat!"
          buttonText="Kipróbálom"
          onClick={() => window.location.href = '/vcard'}
        />
      </div>
    </div>
  );
};

export default QRCodePreview;