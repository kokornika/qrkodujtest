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
import OrderDialog from './OrderDialog';

const VCardForm: React.FC = () => {
  const [formData, setFormData] = useState<VCardFormData>(defaultVCardData);
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [showOrderDialog, setShowOrderDialog] = useState(false);
  const [hasStartedEditing, setHasStartedEditing] = useState(false);

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

    // Set hasStartedEditing to true when any field is modified
    if (!hasStartedEditing && processedValue) {
      setHasStartedEditing(true);
    }
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
      <div className="flex flex-col lg:grid lg:grid-cols-[1fr,400px] gap-4 sm:gap-6 lg:gap-8 px-4">
        {/* Mobile Preview at the top */}
        <div className="block lg:hidden mb-6">
          <div className="bg-gray-50 p-4 rounded-xl">
            <VCardPreview 
              formData={formData} 
              vCardString={generateVCardString()}
              isValid={errors.length === 0}
            />
          </div>
        </div>

        <div className="space-y-4 sm:space-y-6 lg:space-y-8">
          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 relative">
            {/* Form Progress Indicator */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gray-100 rounded-t-xl overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-300"
                style={{ 
                  width: `${Math.min(
                    ((Object.keys(touched).length / 5) * 100),
                    100
                  )}%` 
                }}
              />
            </div>
            {/* Form Progress Indicator */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gray-100 rounded-t-xl overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-300"
                style={{ 
                  width: `${Math.min(
                    ((Object.keys(touched).length / 5) * 100),
                    100
                  )}%` 
                }}
              />
            </div>

            <div className="space-y-6 sm:space-y-8">
              {/* Reordered sections for better mobile flow */}
              <VCardAppearance formData={formData} onChange={handleChange} />
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
              <VCardSocialLinks formData={formData} onChange={handleChange} />
            </div>
            {/* Single Sticky CTA Button */}
            <div className={`fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 shadow-lg lg:static lg:mt-8 lg:p-0 lg:border-0 lg:shadow-none z-20 transition-all duration-300 ${hasStartedEditing ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 lg:translate-y-0 lg:opacity-100'}`}>
              <button
                onClick={() => setShowOrderDialog(true)}
                className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-xl hover:shadow-2xl transition-all rounded-xl border-2 border-white/30 hover:scale-[1.02] animate-pulse"
              >
                <span className="mr-2">🎁</span>
                Digitális névjegykártya elkészítése
              </button>
            </div>
          </div>
        </div>

        <div className="hidden lg:block lg:sticky lg:top-24 h-fit">
          <VCardPreview 
            formData={formData} 
            vCardString={generateVCardString()}
            isValid={errors.length === 0}
          />
        </div>
      </div>
      {/* Add padding at bottom for mobile fixed CTA */}
      <div className="h-20 lg:hidden" />
      {/* Add padding at bottom for mobile fixed CTA */}
      <div className="h-20 lg:hidden" />
      <OrderDialog 
        isOpen={showOrderDialog}
        onClose={() => setShowOrderDialog(false)}
        formData={formData}
      />
    </>
  );
};

export default VCardForm;
