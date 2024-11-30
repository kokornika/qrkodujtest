import React from 'react';
import { Download } from 'lucide-react';
import { Button } from '../ui/button';
import { saveAs } from 'file-saver';

interface QRCodeDownloaderProps {
  qrRef: React.RefObject<HTMLDivElement>;
  disabled: boolean;
}

const QRCodeDownloader: React.FC<QRCodeDownloaderProps> = ({ qrRef, disabled }) => {
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

  return (
    <Button
      onClick={handleDownload}
      disabled={disabled}
      className="w-full sm:w-auto px-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl"
    >
      <Download className="w-4 h-4 mr-2" />
      Letöltés
    </Button>
  );
};

export default QRCodeDownloader;