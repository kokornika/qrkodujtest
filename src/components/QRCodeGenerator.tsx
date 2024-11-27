import React, { useState } from 'react';
import { QRContentType, QROptions } from '../types/qr';
import ContentTypeSelector from './ContentTypeSelector';
import QRCodeOptions from './QRCodeOptions';
import QRCodePreview from './QRCodePreview';
import VCardForm from './vcard/VCardForm';

const QRCodeGenerator: React.FC = () => {
  const [step, setStep] = useState<1 | 2>(1);
  const [options, setOptions] = useState<QROptions>({
    contentType: 'url',
    content: '',
    backgroundColor: '#ffffff',
    foregroundColor: '#000000',
    size: 256,
    wifiSettings: {
      ssid: '',
      password: '',
      encryption: 'WPA',
    },
  });

  const handleContentTypeSelect = (type: QRContentType) => {
    setOptions(prev => ({ ...prev, contentType: type }));
    setStep(2);
  };

  if (step === 1) {
    return <ContentTypeSelector onSelect={handleContentTypeSelect} />;
  }

  // Ha a vCard opciót választották
  if (options.contentType === 'vcard') {
    return (
      <div className="max-w-7xl mx-auto py-4 sm:py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => setStep(1)}
            className="text-blue-600 hover:text-blue-700 text-sm sm:text-base"
          >
            ← Vissza
          </button>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
            Digitális névjegykártya készítése
          </h2>
        </div>
        <VCardForm />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <button
          onClick={() => setStep(1)}
          className="text-blue-600 hover:text-blue-700 text-sm sm:text-base"
        >
          ← Vissza
        </button>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
          QR kód generálása
        </h2>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
        <div className="order-2 lg:order-1">
          <QRCodeOptions options={options} onChange={setOptions} />
        </div>
        <div className="order-1 lg:order-2">
          <QRCodePreview options={options} />
        </div>
      </div>
    </div>
  );
};

export default QRCodeGenerator;