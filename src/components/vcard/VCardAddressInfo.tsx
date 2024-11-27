import React from 'react';
import { VCardFormData } from '../../types/vcard';
import { Input } from '../ui/Input';

interface VCardAddressInfoProps {
  formData: VCardFormData;
  onChange: (field: keyof VCardFormData, value: any) => void;
}

const VCardAddressInfo: React.FC<VCardAddressInfoProps> = ({ formData, onChange }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-700">Cím</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Ország"
          value={formData.country}
          onChange={(e) => onChange('country', e.target.value)}
          placeholder="Magyarország"
        />

        <Input
          label="Megye"
          value={formData.state}
          onChange={(e) => onChange('state', e.target.value)}
          placeholder="Pest"
        />

        <Input
          className="sm:col-span-2"
          label="Utca, házszám"
          value={formData.street}
          onChange={(e) => onChange('street', e.target.value)}
          placeholder="Példa utca 123."
        />

        <Input
          label="Város"
          value={formData.city}
          onChange={(e) => onChange('city', e.target.value)}
          placeholder="Budapest"
        />

        <Input
          label="Irányítószám"
          value={formData.zipcode}
          onChange={(e) => onChange('zipcode', e.target.value)}
          placeholder="1234"
        />
      </div>
    </div>
  );
};

export default VCardAddressInfo;