import React from 'react';
import { VCardFormData } from '../../types/vcard';
import { Input } from '../ui/Input';
import { MapPin } from 'lucide-react';

interface VCardAddressInfoProps {
  formData: VCardFormData;
  onChange: (field: keyof VCardFormData, value: any) => void;
}

const VCardAddressInfo: React.FC<VCardAddressInfoProps> = ({ formData, onChange }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-start gap-3">
        <h3 className="text-lg font-medium text-gray-700">Cím (opcionális)</h3>
        <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-md">
          Ajánlott megadni az egy kattintásos útvonaltervezéshez
        </div>
      </div>
      
      <div className="bg-blue-50 p-4 rounded-lg flex items-start gap-3">
        <MapPin className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-blue-600">
          A megadott címre a névjegykártyán egy kattintással elindítható a navigáció 
          Google Maps vagy Apple Maps alkalmazással.
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Irányítószám (opcionális)"
          value={formData.zipcode}
          onChange={(e) => onChange('zipcode', e.target.value)}
          placeholder="1234"
        />

        <Input
          label="Város (opcionális)"
          value={formData.city}
          onChange={(e) => onChange('city', e.target.value)}
          placeholder="Budapest"
        />

        <Input
          className="sm:col-span-2"
          label="Utca, házszám (opcionális)"
          value={formData.street}
          onChange={(e) => onChange('street', e.target.value)}
          placeholder="Példa utca 123."
        />
      </div>
    </div>
  );
};

export default VCardAddressInfo;