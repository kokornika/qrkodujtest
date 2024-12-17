import React, { useRef } from 'react';
import { ArrowDown } from 'lucide-react';
import { Button } from '../ui/button';
import VCardPersonalInfo from './VCardPersonalInfo';
import VCardContactInfo from './VCardContactInfo';
import VCardAddressInfo from './VCardAddressInfo';
import VCardAppearance from './VCardAppearance';
import VCardSocialLinks from './VCardSocialLinks';
import VCardPreview from './VCardPreview';
import FloatingPreview from './FloatingPreview';
import OrderDialog from './OrderDialog';
import { useVCardForm } from '../../lib/hooks/useVCardForm';
import { generateVCardString } from '../../lib/utils/vcard-generator';

const VCardForm: React.FC = () => {
  const formRef = useRef<HTMLDivElement>(null);
  const {
    formData,
    showOrderDialog,
    showValidationError,
    hasStartedEditing,
    showFloatingPreview,
    handleOrderClick,
    handleChange,
    getFieldError,
    setShowOrderDialog,
    setShowValidationError,
    isFormValid
  } = useVCardForm();

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  const vCardString = generateVCardString(formData);

  return (
    <>
      <div className="flex flex-col lg:grid lg:grid-cols-[1fr,400px] gap-4 sm:gap-6 lg:gap-8 px-4">
        {/* Mobile Preview */}
        <div className="block lg:hidden mb-6">
          <div className="bg-gray-50 p-4 rounded-xl">
            <div className="mb-6">
              <Button
                onClick={scrollToForm}
                className="w-full h-14 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 rounded-xl border-2 border-white/20 hover:scale-[1.02] group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <div className="relative flex items-center justify-center gap-2">
                  <ArrowDown className="w-5 h-5 animate-bounce" />
                  <span>Kitöltés megkezdése</span>
                </div>
              </Button>
            </div>
            <VCardPreview 
              formData={formData} 
              vCardString={vCardString}
              isValid={isFormValid()}
            />
          </div>
        </div>

        <div className="space-y-4 sm:space-y-6 lg:space-y-8" ref={formRef}>
          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 relative">
            {/* Form Progress Indicator */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gray-100 rounded-t-xl overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-300"
                style={{ 
                  width: `${Math.min(
                    ((Object.keys(formData).filter(key => formData[key as keyof typeof formData]).length / 5) * 100),
                    100
                  )}%` 
                }}
              />
            </div>

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
              
              <VCardAppearance formData={formData} onChange={handleChange} />
              <VCardAddressInfo formData={formData} onChange={handleChange} />
              <VCardSocialLinks formData={formData} onChange={handleChange} />
            </div>

            {/* Sticky CTA Button */}
            <div className={`fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 shadow-lg lg:static lg:mt-8 lg:p-0 lg:border-0 lg:shadow-none z-20 transition-all duration-300 ${hasStartedEditing ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 lg:translate-y-0 lg:opacity-100'}`}>
              <div className="space-y-3">
                {showValidationError && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-600">
                    Kérjük, töltse ki a kötelező mezőket (név, email, telefonszám) a folytatáshoz!
                  </div>
                )}
                <Button
                  onClick={handleOrderClick}
                  className={`w-full h-14 text-lg font-semibold text-white shadow-xl hover:shadow-2xl transition-all rounded-xl border-2 border-white/30 hover:scale-[1.02] ${
                    isFormValid()
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 animate-pulse'
                      : 'bg-gray-400 hover:bg-gray-500 cursor-not-allowed'
                  }`}
                >
                  <span className="mr-2">🎁</span>
                  Digitális névjegykártya elkészítése
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden lg:block lg:sticky lg:top-24 h-fit">
          <VCardPreview 
            formData={formData} 
            vCardString={vCardString}
            isValid={isFormValid()}
          />
        </div>
      </div>

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
      />
    </>
  );
};

export default VCardForm;