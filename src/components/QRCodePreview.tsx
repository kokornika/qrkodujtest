import React from 'react';
import QRCode from 'qrcode.react';
import { QROptions } from '../types/qr';
import { Button } from './ui/button';
import { Download, ArrowRight } from 'lucide-react';

interface QRCodePreviewProps {
  options: QROptions;
}

const QRCodePreview: React.FC<QRCodePreviewProps> = ({ options }) => {
  const handleDownload = () => {
    const canvas = document.querySelector('canvas');
    if (!canvas) return;

    const newCanvas = document.createElement('canvas');
    newCanvas.width = options.size;
    newCanvas.height = options.size;
    const context = newCanvas.getContext('2d', { willReadFrequently: true });
    
    if (context) {
      if (options.backgroundColor === 'transparent') {
        context.clearRect(0, 0, newCanvas.width, newCanvas.height);
      } else {
        context.fillStyle = options.backgroundColor;
        context.fillRect(0, 0, newCanvas.width, newCanvas.height);
      }
      
      const qrCanvas = canvas.getContext('2d', { willReadFrequently: true });
      if (qrCanvas) {
        const imageData = qrCanvas.getImageData(0, 0, canvas.width, canvas.height);
        context.putImageData(imageData, 0, 0);
      }
    }

    const link = document.createElement('a');
    link.download = 'qrcode.png';
    link.href = newCanvas.toDataURL('image/png');
    link.click();
  };

  const checkerboardPattern = `
    data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAGElEQVQYlWNgYGCQwoKxgqGgcJA5h3yFAAs8BRWVSwooAAAAAElFTkSuQmCC
  `.trim();

  return (
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
      
      <div className="flex flex-col items-center space-y-4 w-full max-w-sm">
        <Button
          onClick={handleDownload}
          disabled={!options.content}
          className="w-full sm:w-auto px-6"
        >
          <Download className="w-4 h-4 mr-2" />
          Letöltés
        </Button>

        {/* Promotional Card */}
        <div className="w-full p-6 bg-gradient-to-br from-indigo-600 to-indigo-500 rounded-xl text-white text-center">
          <h3 className="text-xl font-semibold mb-3">
            Többet szeretne mint egy QR kód?
          </h3>
          <p className="text-indigo-100 mb-4">
            Próbálja ki prémium digitális névjegykártya szolgáltatásunkat!
          </p>
          <Button
            onClick={() => window.location.href = '/vcard'}
            className="w-full bg-white text-indigo-600 hover:bg-indigo-50"
          >
            <span>Kipróbálom</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QRCodePreview;