import React, { useState } from 'react';
import { VCardFormData } from '../../types/vcard';
import { Input } from '../ui/Input';
import { formatWebsiteUrl, formatWebsiteDisplay } from '../../lib/utils/url-utils';
import ImageUploader from './ImageUploader';
import { Trash2 } from 'lucide-react';

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
        Kötelező adatok <span className="text-red-500">*</span>
      </h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Név mező */}
        <div className="space-y-2">
          <Input
            label="Teljes név"
            value={formData.name}
            onChange={(e) => onChange('name', e.target.value)}
            placeholder="Add meg a teljes neved... *"
            error={error}
            className="w-full text-center sm:text-left"
            required
          />
        </div>

        {/* Profilkép feltöltés */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 text-center">
            Profilkép (opcionális)
          </label>
          <div className="flex justify-center">
            <div className="w-24 h-24">
              <ImageUploader
                value={formData.profilePicture}
                onChange={(value) => onChange('profilePicture', value)}
              />
            </div>
          </div>
          {formData.profilePicture && (
            <div className="flex justify-center">
              <button
                onClick={() => onChange('profilePicture', '')}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VCardPersonalInfo;