import React from 'react';
import { VCardFormData } from '../../types/vcard';
import { Input } from '../ui/Input';

interface VCardContactInfoProps {
  formData: VCardFormData;
  onChange: (field: keyof VCardFormData, value: any) => void;
}

const VCardContactInfo: React.FC<VCardContactInfoProps> = ({ formData, onChange }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-700">Elérhetőségek</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Mobil telefonszám"
          value={formData.phoneMobile}
          onChange={(e) => onChange('phoneMobile', e.target.value)}
          placeholder="+36 ..."
          type="tel"
        />

        <Input
          label="Munkahelyi telefonszám"
          value={formData.phoneWork}
          onChange={(e) => onChange('phoneWork', e.target.value)}
          placeholder="+36 ..."
          type="tel"
        />

        <Input
          label="Privát telefonszám"
          value={formData.phonePrivate}
          onChange={(e) => onChange('phonePrivate', e.target.value)}
          placeholder="+36 ..."
          type="tel"
        />

        <Input
          label="Fax"
          value={formData.fax}
          onChange={(e) => onChange('fax', e.target.value)}
          placeholder="+36 ..."
          type="tel"
        />

        <Input
          className="sm:col-span-2"
          label="Email cím"
          value={formData.email}
          onChange={(e) => onChange('email', e.target.value)}
          placeholder="pelda@email.com"
          type="email"
        />
      </div>
    </div>
  );
};

export default VCardContactInfo;