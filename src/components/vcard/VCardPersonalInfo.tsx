import React from 'react';
import { VCardFormData } from '../../types/vcard';
import { Input } from '../ui/Input';

interface VCardPersonalInfoProps {
  formData: VCardFormData;
  onChange: (field: keyof VCardFormData, value: any) => void;
  error?: string;
}

const VCardPersonalInfo: React.FC<VCardPersonalInfoProps> = ({ 
  formData, 
  onChange,
  error 
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-700">Személyes adatok</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Teljes név"
          value={formData.name}
          onChange={(e) => onChange('name', e.target.value)}
          placeholder="Add meg a teljes neved..."
          error={error}
          required
        />

        <Input
          label="Cég neve (opcionális)"
          value={formData.company}
          onChange={(e) => onChange('company', e.target.value)}
          placeholder="Add meg a cég nevét..."
        />

        <Input
          label="Pozíció (opcionális)"
          value={formData.position}
          onChange={(e) => onChange('position', e.target.value)}
          placeholder="Add meg a pozíciód..."
        />

        <Input
          label="Weboldal (opcionális)"
          value={formData.website}
          onChange={(e) => onChange('website', e.target.value)}
          placeholder="https://"
          type="url"
        />

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Bemutatkozás (opcionális)
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => onChange('description', e.target.value)}
            placeholder="Írj egy rövid bemutatkozást..."
            className="w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={4}
          />
        </div>
      </div>
    </div>
  );
};

export default VCardPersonalInfo;