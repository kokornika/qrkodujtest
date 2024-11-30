import React, { useEffect } from 'react';
import { QROptions, WifiEncryption } from '../types/qr';
import ColorPicker from './ui/ColorPicker';
import { Slider } from './ui/Slider';
import { ArrowRight } from 'lucide-react';
import { Button } from './ui/button';

interface QRCodeOptionsProps {
  options: QROptions;
  onChange: (options: QROptions) => void;
}

const backgroundPresets = [
  { color: 'transparent', label: 'Átlátszó' },
  { color: '#FFFFFF', label: 'Fehér' },
  { color: '#000000', label: 'Fekete' },
  { color: '#FFF7ED', label: 'Krém' },
  { color: '#2563EB', label: 'Kék' },
  { color: '#DC2626', label: 'Piros' },
];

const foregroundPresets = [
  { color: '#000000', label: 'Fekete' },
  { color: '#0F172A', label: 'Sötétszürke' },
  { color: '#2563EB', label: 'Kék' },
  { color: '#16A34A', label: 'Zöld' },
  { color: '#DC2626', label: 'Piros' },
  { color: '#FFFFFF', label: 'Fehér' },
];

const encryptionTypes: { value: WifiEncryption; label: string }[] = [
  { value: 'WPA', label: 'WPA/WPA2' },
  { value: 'WEP', label: 'WEP' },
  { value: 'nopass', label: 'Nincs jelszó' },
];

const contentTypeLabels: Record<string, string> = {
  url: 'Weboldal URL átalakítása QR kóddá',
  text: 'Szöveg átalakítása QR kóddá',
  email: 'Email cím átalakítása QR kóddá',
  phone: 'Telefonszám átalakítása QR kóddá',
  wifi: 'WiFi beállítások átalakítása QR kóddá',
  vcard: 'Névjegy átalakítása QR kóddá',
};

const placeholderTexts: Record<string, string> = {
  url: 'Add meg a weboldal címét (pl. https://pelda.hu)...',
  text: 'Írd be a szöveget, amit QR kóddá szeretnél alakítani...',
  email: 'Add meg az email címet...',
  phone: 'Add meg a telefonszámot...',
  wifi: 'Add meg a WiFi hálózat nevét...',
};

const QRCodeOptions: React.FC<QRCodeOptionsProps> = ({ options, onChange }) => {
  useEffect(() => {
    // Set initial QR code size based on screen width
    const isMobile = window.innerWidth < 640;
    if (isMobile && options.size === 256) {
      onChange({ ...options, size: 128 });
    }
  }, []);

  const handleWifiSettingChange = (
    field: keyof WifiSettings,
    value: string
  ) => {
    const newWifiSettings = {
      ...(options.wifiSettings || { ssid: '', password: '', encryption: 'WPA' as WifiEncryption }),
      [field]: value,
    };
    
    if (field === 'encryption' && value === 'nopass') {
      newWifiSettings.password = '';
    }
    
    const wifiString = `WIFI:S:${newWifiSettings.ssid};T:${newWifiSettings.encryption};${newWifiSettings.encryption !== 'nopass' ? `P:${newWifiSettings.password};` : ''};`;
    
    onChange({
      ...options,
      content: wifiString,
      wifiSettings: newWifiSettings,
    });
  };

  if (options.contentType === 'wifi') {
    return (
      <div className="space-y-4 sm:space-y-6">
        <div className="space-y-3 sm:space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              WiFi hálózat neve (SSID) QR kódhoz
            </label>
            <input
              type="text"
              value={options.wifiSettings?.ssid || ''}
              onChange={(e) => handleWifiSettingChange('ssid', e.target.value)}
              className="w-full p-2 sm:p-2.5 border border-gray-300 rounded-md text-sm sm:text-base"
              placeholder="Add meg a hálózat nevét..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              WiFi titkosítás típusa
            </label>
            <select
              value={options.wifiSettings?.encryption || 'WPA'}
              onChange={(e) => handleWifiSettingChange('encryption', e.target.value as WifiEncryption)}
              className="w-full p-2 sm:p-2.5 border border-gray-300 rounded-md text-sm sm:text-base"
            >
              {encryptionTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          {options.wifiSettings?.encryption !== 'nopass' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                WiFi jelszó QR kódhoz
              </label>
              <input
                type="password"
                value={options.wifiSettings?.password || ''}
                onChange={(e) => handleWifiSettingChange('password', e.target.value)}
                className="w-full p-2 sm:p-2.5 border border-gray-300 rounded-md text-sm sm:text-base"
                placeholder="Add meg a jelszót..."
              />
            </div>
          )}
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700">
              QR kód mérete
            </label>
            <span className="text-sm text-gray-600">{options.size}px</span>
          </div>
          <Slider
            value={options.size}
            min={128}
            max={512}
            step={32}
            onChange={(value) => onChange({ ...options, size: value })}
          />
        </div>

        <div className="space-y-3 sm:space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            QR kód színek
          </label>
          <ColorPicker
            label="Háttér"
            value={options.backgroundColor}
            onChange={(color) => onChange({ ...options, backgroundColor: color })}
            presets={backgroundPresets}
          />
          <ColorPicker
            label="QR kód"
            value={options.foregroundColor}
            onChange={(color) => onChange({ ...options, foregroundColor: color })}
            presets={foregroundPresets}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {contentTypeLabels[options.contentType]}
        </label>
        <input
          type={options.contentType === 'email' ? 'email' : options.contentType === 'url' ? 'url' : 'text'}
          value={options.content}
          onChange={(e) => onChange({ ...options, content: e.target.value })}
          className="w-full p-2 sm:p-2.5 border border-gray-300 rounded-md text-sm sm:text-base"
          placeholder={placeholderTexts[options.contentType]}
        />
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-medium text-gray-700">
            QR kód mérete
          </label>
          <span className="text-sm text-gray-600">{options.size}px</span>
        </div>
        <Slider
          value={options.size}
          min={128}
          max={512}
          step={32}
          onChange={(value) => onChange({ ...options, size: value })}
        />
      </div>

      <div className="space-y-3 sm:space-y-4">
        <label className="block text-sm font-medium text-gray-700">
          QR kód színek
        </label>
        <ColorPicker
          label="Háttér"
          value={options.backgroundColor}
          onChange={(color) => onChange({ ...options, backgroundColor: color })}
          presets={backgroundPresets}
        />
        <ColorPicker
          label="QR kód"
          value={options.foregroundColor}
          onChange={(color) => onChange({ ...options, foregroundColor: color })}
          presets={foregroundPresets}
        />
      </div>
    </div>
  );
};

export default QRCodeOptions;