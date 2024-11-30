import React from 'react';
import QRCode from 'qrcode.react';
import { QROptions } from '../../types/qr';

interface QRCodeDisplayProps {
  options: QROptions;
  qrRef: React.RefObject<HTMLDivElement>;
}

const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({ options, qrRef }) => {
  const checkerboardPattern = `
    data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAGElEQVQYlWNgYGCQwoKxgqGgcJA5h3yFAAs8BRWVSwooAAAAAElFTkSuQmCC
  `.trim();

  return (
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
        renderAs="canvas" // Changed to canvas for better mobile performance
      />
    </div>
  );
};

export default QRCodeDisplay;