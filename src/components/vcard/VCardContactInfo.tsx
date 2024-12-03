import React from 'react';
import { VCardFormData } from '../../types/vcard';
import { Input } from '../ui/Input';

interface VCardContactInfoProps {
  formData: VCardFormData;
  onChange: (field: keyof VCardFormData, value: any) => void;
  errors: {
    email?: string;
    phoneMobile?: string;
  };
}

const VCardContactInfo: React.FC<VCardContactInfoProps> = ({ 
  formData, 
  onChange,
  errors
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-700">Elérhetőségek</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-4 md:space-y-0">
          <Input
            label="Mobil telefonszám"
            value={formData.phoneMobile}
            onChange={(e) => onChange('phoneMobile', e.target.value)}
            placeholder="+36 ..."
            type="tel"
            error={errors.phoneMobile}
            required
            className="w-full"
          />

          <Input
            label="Privát telefonszám (opcionális)"
            value={formData.phonePrivate}
            onChange={(e) => onChange('phonePrivate', e.target.value)}
            placeholder="+36 ..."
            type="tel"
            className="w-full"
          />
        </div>

        <div className="space-y-4 md:space-y-0">
          <Input
            label="Munkahelyi telefonszám (opcionális)"
            value={formData.phoneWork}
            onChange={(e) => onChange('phoneWork', e.target.value)}
            placeholder="+36 ..."
            type="tel"
            className="w-full"
          />

          <Input
            label="Email cím"
            value={formData.email}
            onChange={(e) => onChange('email', e.target.value)}
            placeholder="pelda@email.com"
            type="email"
            error={errors.email}
            required
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default VCardContactInfo;