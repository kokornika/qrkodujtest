import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { VCardFormData, defaultVCardData } from '../../types/vcard';
import VCardPersonalInfo from './VCardPersonalInfo';
import VCardContactInfo from './VCardContactInfo';
import VCardAddressInfo from './VCardAddressInfo';
import VCardAppearance from './VCardAppearance';
import VCardSocialLinks from './VCardSocialLinks';
import VCardPreview from './VCardPreview';
import FloatingPreview from './FloatingPreview';
import { ValidationError, validateVCardForm, formatPhone, validateEmail, validatePhoneNumber } from '../../lib/validation/vcard-validation';
import { ArrowDown } from 'lucide-react';
import OrderDialog from './OrderDialog';

const VCardForm: React.FC = () => {
  const [formData, setFormData] = useState<VCardFormData>(defaultVCardData);
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [showOrderDialog, setShowOrderDialog] = useState(false);
  const [showValidationError, setShowValidationError] = useState(false);
  const [hasStartedEditing, setHasStartedEditing] = useState(false);
  const [showFloatingPreview, setShowFloatingPreview] = useState(false);
  const [hasShownPreview, setHasShownPreview] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const showTemporaryPreview = () => {
    if (hasShownPreview) return;
    
    setShowFloatingPreview(true);
    setHasShownPreview(true);

    setTimeout(() => {
      setShowFloatingPreview(false);
    }, 5000);
  };


  const isFormValid = () => {
    return (
      formData.name.trim() !== '' &&
      formData.email.trim() !== '' &&
      formData.phoneMobile.trim() !== '' &&
      validateEmail(formData.email) &&
      validatePhoneNumber(formData.phoneMobile)
    );
  };

  const handleOrderClick = () => {
    if (isFormValid()) {
      setShowOrderDialog(true);
      setShowValidationError(false);
    } else {
      setShowValidationError(true);
      // Érintettnek jelöljük a kötelező mezőket
      setTouched(prev => ({
        ...prev,
        name: true,
        email: true,
        phoneMobile: true
      }));
    }
  };

  const handleChange = (field: keyof VCardFormData, value: any) => {
    let processedValue = value;

    // Show preview on first interaction with any field
    if (!hasInteracted && value.trim() !== '') {
      setHasInteracted(true);
      showTemporaryPreview();
    }

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
              {/* Required fields first */}
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
              
              {/* Optional sections */}
              <VCardAppearance formData={formData} onChange={handleChange} />
              <VCardAddressInfo formData={formData} onChange={handleChange} />
              <VCardSocialLinks formData={formData} onChange={handleChange} />
            </div>
            {/* Single Sticky CTA Button */}
            <div className={`fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 shadow-lg lg:static lg:mt-8 lg:p-0 lg:border-0 lg:shadow-none z-20 transition-all duration-300 ${hasStartedEditing ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 lg:translate-y-0 lg:opacity-100'}`}>
              <div className="space-y-3">
                {showValidationError && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-600">
                    Kérjük, töltse ki a kötelező mezőket (név, email, telefonszám) a folytatáshoz!
                  </div>
                )}
                <button
                  onClick={handleOrderClick}
                  className={`w-full h-14 text-lg font-semibold text-white shadow-xl hover:shadow-2xl transition-all rounded-xl border-2 border-white/30 hover:scale-[1.02] ${
                    isFormValid()
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 animate-pulse'
                      : 'bg-gray-400 hover:bg-gray-500 cursor-not-allowed'
                  }`}
                >
                  <span className="mr-2">🎁</span>
                  Digitális névjegykártya elkészítése
                  <ArrowRight className="ml-2 h-5 w-5 inline-block" />
                </button>
              </div>
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
      <FloatingPreview 
        formData={formData} 
        isVisible={showFloatingPreview}
      />
      <OrderDialog 
        isOpen={showOrderDialog}
        onClose={() => {
          setShowOrderDialog(false);
          setShowValidationError(false);
        }}
        formData={formData}
        vCardString={generateVCardString()}
        isValid={errors.length === 0}
      />
    </>
  );
};

export default VCardForm;
