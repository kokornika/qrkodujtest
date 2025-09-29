import React, { useState } from 'react';
import { VCardFormData } from '../../types/vcard';
import { Input } from '../ui/Input';
import { formatWebsiteUrl, formatWebsiteDisplay } from '../../lib/utils/url-utils';

interface VCardOptionalInfoProps {
  formData: VCardFormData;
  onChange: (field: keyof VCardFormData, value: any) => void;
}

const VCardOptionalInfo: React.FC<VCardOptionalInfoProps> = ({ 
  formData, 
  onChange
}) => {
  const [websiteInput, setWebsiteInput] = useState(formatWebsiteDisplay(formData.website));

  const handleWebsiteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setWebsiteInput(value);
    
    // Only format and update the main form data when input is valid
    if (value.includes('.')) {
      const formattedUrl = formatWebsiteUrl(value);
      onChange('website', formattedUrl);
    } else {
      onChange('website', value);
    }
  };

  const handleWebsiteBlur = () => {
    if (websiteInput) {
      const formattedUrl = formatWebsiteUrl(websiteInput);
      onChange('website', formattedUrl);
      setWebsiteInput(formatWebsiteDisplay(formattedUrl));
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-700 mb-6">
        További információk
      </h3>
      
      <div className="grid grid-cols-1 gap-4">
        <Input
          label="Cégnév"
          value={formData.company}
          onChange={(e) => onChange('company', e.target.value)}
          placeholder="Add meg a cég nevét..."
          className="w-full text-center sm:text-left"
        />

        <Input
          label="Pozíció"
          value={formData.position}
          onChange={(e) => onChange('position', e.target.value)}
          placeholder="Add meg a pozíciód..."
          className="w-full text-center sm:text-left"
        />

        <Input
          label="Weboldal"
          value={websiteInput}
          onChange={handleWebsiteChange}
          onBlur={handleWebsiteBlur}
          placeholder="www.pelda.hu"
          type="text"
          className="w-full text-center sm:text-left"
        />

        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Bemutatkozás
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => onChange('description', e.target.value)}
            placeholder="Írj egy rövid bemutatkozást..."
            className="w-full p-4 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center sm:text-left min-h-[120px] transition-all duration-200"
            rows={4}
          />
        </div>
      </div>
    </div>
  );
};

export default VCardOptionalInfo;