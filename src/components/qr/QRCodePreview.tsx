import React, { useRef } from 'react';
import { QROptions } from '../../types/qr';
import QRCode from 'qrcode.react';
import { Button } from '../ui/button';
import { Download } from 'lucide-react';
import PromotionalCard from '../ui/PromotionalCard';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';

interface QRCodePreviewProps {
  options: QROptions;
}

const QRCodePreview: React.FC<QRCodePreviewProps> = ({ options }) => {
  const qrRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!qrRef.current) return;

    try {
      // Convert QR code div to canvas
      const canvas = await html2canvas(qrRef.current, {
        backgroundColor: null,
        scale: 2, // Higher quality
        logging: false,
      });

      // Convert canvas to blob
      canvas.toBlob((blob) => {
        if (blob) {
          saveAs(blob, 'qrcode.png');
        }
      }, 'image/png');
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
          ref={qrRef}
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
            includeMargin={true}
            renderAs="svg"
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