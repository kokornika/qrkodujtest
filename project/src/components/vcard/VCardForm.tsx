import React, { useState } from 'react';
import { VCardFormData, defaultVCardData } from '../../types/vcard';
import VCardPersonalInfo from './VCardPersonalInfo';
import VCardContactInfo from './VCardContactInfo';
import VCardAddressInfo from './VCardAddressInfo';
import VCardAppearance from './VCardAppearance';
import VCardSocialLinks from './VCardSocialLinks';
import VCardPreview from './VCardPreview';

const VCardForm: React.FC = () => {
  const [formData, setFormData] = useState<VCardFormData>(defaultVCardData);

  const handleChange = (field: keyof VCardFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const generateVCardString = () => {
    // Create vCard string with person as the main contact and company as organization
    const vcard = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      `N:${formData.name.split(' ').reverse().join(';')};`,
      `FN:${formData.name}`,
      formData.company && `ORG:${formData.company}`,
      formData.position && `TITLE:${formData.position}`,
      formData.email && `EMAIL:${formData.email}`,
      formData.phoneMobile && `TEL;TYPE=CELL:${formData.phoneMobile}`,
      formData.phoneWork && `TEL;TYPE=WORK:${formData.phoneWork}`,
      formData.phonePrivate && `TEL;TYPE=HOME:${formData.phonePrivate}`,
      formData.website && `URL:${formData.website}`,
      formData.street && formData.city && `ADR:;;${formData.street};${formData.city};${formData.state};${formData.zipcode};${formData.country}`,
      formData.description && `NOTE:${formData.description}`,
      ...formData.socialLinks.map(link => `URL;type=${link.platform}:${link.url}`),
      'END:VCARD'
    ].filter(Boolean).join('\n');

    return vcard;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="space-y-8">
            <VCardPersonalInfo formData={formData} onChange={handleChange} />
            <VCardContactInfo formData={formData} onChange={handleChange} />
            <VCardAddressInfo formData={formData} onChange={handleChange} />
            <VCardAppearance formData={formData} onChange={handleChange} />
            <VCardSocialLinks formData={formData} onChange={handleChange} />
          </div>
        </div>
      </div>

      <div className="lg:sticky lg:top-24 h-fit">
        <VCardPreview formData={formData} vCardString={generateVCardString()} />
      </div>
    </div>
  );
};

export default VCardForm;