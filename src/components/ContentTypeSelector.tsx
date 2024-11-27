import React from 'react';
import { QRContentType } from '../types/qr';
import { QrCode, Globe, Type, Mail, Phone, Wifi, UserSquare2 } from 'lucide-react';

interface ContentTypeSelectorProps {
  onSelect: (type: QRContentType) => void;
}

const contentTypes: { value: QRContentType; label: string; icon: React.ReactNode }[] = [
  { value: 'url', label: 'Weboldal URL', icon: <Globe className="w-5 h-5 text-gray-400" /> },
  { value: 'text', label: 'Szöveg', icon: <Type className="w-5 h-5 text-gray-400" /> },
  { value: 'email', label: 'Email cím', icon: <Mail className="w-5 h-5 text-gray-400" /> },
  { value: 'phone', label: 'Telefonszám', icon: <Phone className="w-5 h-5 text-gray-400" /> },
  { value: 'wifi', label: 'WiFi beállítások', icon: <Wifi className="w-5 h-5 text-gray-400" /> },
  { value: 'vcard', label: 'Névjegy (vCard)', icon: <UserSquare2 className="w-5 h-5 text-gray-400" /> },
];

const ContentTypeSelector: React.FC<ContentTypeSelectorProps> = ({ onSelect }) => {
  return (
    <div className="min-h-[80vh] flex items-center py-8 sm:py-12">
      <div className="w-full max-w-5xl mx-auto px-4">
        <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-800 mb-8 sm:mb-12">
          Mit szeretnél QR kóddá alakítani?
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
          <div className="space-y-3 sm:space-y-4">
            {contentTypes.map((type) => (
              <button
                key={type.value}
                onClick={() => onSelect(type.value)}
                className="w-full p-3 sm:p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 flex items-center gap-3 text-left hover:scale-[1.02]"
              >
                <div className="w-10 h-10 rounded-lg flex items-center justify-center">
                  {type.icon}
                </div>
                <span className="text-base sm:text-lg text-gray-700">{type.label}</span>
              </button>
            ))}
          </div>
          <div className="hidden lg:flex items-center justify-center">
            <div className="relative">
              <div className="w-64 h-64 sm:w-72 sm:h-72 bg-gray-50 rounded-2xl flex items-center justify-center">
                <QrCode className="w-40 h-40 sm:w-48 sm:h-48 text-gray-300" strokeWidth={1.5} />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 sm:w-40 sm:h-40 bg-blue-50 rounded-2xl -z-10" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentTypeSelector;