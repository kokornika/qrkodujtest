import React, { useState, useEffect } from 'react';
import { VCardFormData, defaultVCardData } from '../../types/vcard';
import VCardPersonalInfo from './VCardPersonalInfo';
import VCardContactInfo from './VCardContactInfo';
import VCardAddressInfo from './VCardAddressInfo';
import VCardAppearance from './VCardAppearance';
import VCardSocialLinks from './VCardSocialLinks';
import VCardPreview from './VCardPreview';
import { ValidationError, validateVCardForm, formatPhone } from '../../lib/validation/vcard-validation';
import { ArrowDown } from 'lucide-react';

const VCardForm: React.FC = () => {
  const [formData, setFormData] = useState<VCardFormData>(defaultVCardData);
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleChange = (field: keyof VCardFormData, value: any) => {
    let processedValue = value;

    if (field === 'phoneMobile' || field === 'phoneWork' || field === 'phonePrivate') {
      processedValue = formatPhone(value);
    }

    setFormData(prev => ({
      ...prev,
      [field]: processedValue
    }));

    setTouched(prev => ({
      ...prev,
      [field]: true
    }));
  };

  useEffect(() => {
    const touchedFields = Object.keys(touched).filter(key => touched[key]);
    if (touchedFields.length > 0) {
      const validationErrors = validateVCardForm(formData);
      setErrors(validationErrors.filter(error => 
        touchedFields.includes(error.field)
      ));
    }
  }, [formData, touched]);

  const generateVCardString = () => {
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
      formData.street && formData.city && `ADR:;;${formData.street};${formData.city};;${formData.zipcode};`,
      formData.description && `NOTE:${formData.description}`,
      ...formData.socialLinks.map(link => `URL;type=${link.platform}:${link.url}`),
      'END:VCARD'
    ].filter(Boolean).join('\n');

    return vcard;
  };

  const getFieldError = (field: string): string | undefined => {
    const error = errors.find(e => e.field === field);
    return touched[field] ? error?.message : undefined;
  };

  const isFormEmpty = !formData.name && 
                     !formData.company && 
                     !formData.position && 
                     !formData.website && 
                     !formData.phoneMobile && 
                     !formData.phoneWork && 
                     !formData.phonePrivate && 
                     !formData.email && 
                     !formData.description && 
                     !formData.profilePicture && 
                     formData.socialLinks.length === 0;

  return (
    <>
      {/* Mobile Empty Form Message */}
      {isFormEmpty && (
        <div className="lg:hidden bg-blue-50 border border-blue-100 rounded-lg p-4 mb-4 mx-4">
          <div className="flex flex-col items-center text-center">
            <p className="text-blue-700 mb-2">
              Kezdje el kitölteni az adatlapot, és az elkészült digitális névjegykártyája 
              előnézete megjelenik lent a telefonos nézetben
            </p>
            <ArrowDown className="w-5 h-5 text-blue-500 animate-bounce" />
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 px-4 sm:px-6 lg:px-8">
        <div className="space-y-4 sm:space-y-6 lg:space-y-8">
          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 lg:p-8">
            <div className="space-y-6 sm:space-y-8">
              <VCardPersonalInfo 
                formData={formData} 
                onChange={handleChange}
                error={getFieldError('name')}
              />
              <VCardContactInfo 
                formData={formData} 
                onChange={handleChange}
                errors={{
                  email: getFieldError('email'),
                  phoneMobile: getFieldError('phoneMobile')
                }}
              />
              <VCardAddressInfo formData={formData} onChange={handleChange} />
              <VCardAppearance formData={formData} onChange={handleChange} />
              <VCardSocialLinks formData={formData} onChange={handleChange} />
            </div>
          </div>
        </div>

        <div className="lg:sticky lg:top-24 h-fit">
          {/* Desktop Empty Form Message */}
          {isFormEmpty && (
            <div className="hidden lg:block bg-blue-50 border border-blue-100 rounded-lg p-4 mb-4">
              <p className="text-blue-700 text-center">
                Kezdje el kitölteni az adatlapot a bal oldalon, és itt azonnal megjelenik 
                a digitális névjegykártyája előnézete
              </p>
            </div>
          )}
          <VCardPreview 
            formData={formData} 
            vCardString={generateVCardString()}
            isValid={errors.length === 0}
          />
        </div>
      </div>
    </>
  );
};

export default VCardForm;