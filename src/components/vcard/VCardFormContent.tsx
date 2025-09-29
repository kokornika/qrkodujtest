import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';
import VCardPersonalInfo from './VCardPersonalInfo';
import VCardContactInfo from './VCardContactInfo';
import VCardOptionalInfo from './VCardOptionalInfo';
import VCardAddressInfo from './VCardAddressInfo';
import VCardAppearance from './VCardAppearance';
import VCardSocialLinks from './VCardSocialLinks';
import { VCardFormData } from '../../types/vcard';

interface VCardFormContentProps {
  formData: VCardFormData;
  onChange: (field: keyof VCardFormData, value: any) => void;
  getFieldError: (field: string) => string | undefined;
  onOrder: () => void;
  showValidationError: boolean;
  hasStartedEditing: boolean;
  isFormValid: boolean;
}

const VCardFormContent: React.FC<VCardFormContentProps> = ({
  formData,
  onChange,
  getFieldError,
  onOrder,
  showValidationError,
  hasStartedEditing,
  isFormValid
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 relative">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gray-100 rounded-t-xl overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-300"
          style={{ width: `${Math.min(((Object.keys(formData).filter(k => formData[k as keyof VCardFormData]).length) / 5) * 100, 100)}%` }}
        />
      </div>

      <div className="space-y-6 sm:space-y-8">
        {/* Kötelező adatok előre */}
        <VCardPersonalInfo 
          formData={formData} 
          onChange={onChange}
          error={getFieldError('name')}
        />
        
        <VCardContactInfo 
          formData={formData} 
          onChange={onChange}
          errors={{
            email: getFieldError('email'),
            phoneMobile: getFieldError('phoneMobile')
          }}
        />
        
        {/* Opcionális adatok utána */}
        <VCardOptionalInfo formData={formData} onChange={onChange} />
        <VCardAppearance formData={formData} onChange={onChange} />
        <VCardAddressInfo formData={formData} onChange={onChange} />
        <VCardSocialLinks formData={formData} onChange={onChange} />
      </div>

      <div className={`fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 shadow-lg lg:static lg:mt-8 lg:p-0 lg:border-0 lg:shadow-none z-20 transition-all duration-300 ${hasStartedEditing ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 lg:translate-y-0 lg:opacity-100'}`}>
        <div className="space-y-3">
          {showValidationError && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-600">
              Kérjük, töltse ki a kötelező mezőket (név, email, telefonszám) a folytatáshoz!
            </div>
          )}
          <Button
            onClick={onOrder}
            className={`w-full h-14 text-lg font-semibold text-white shadow-xl hover:shadow-2xl transition-all rounded-xl border-2 border-white/30 hover:scale-[1.02] ${
              isFormValid
                ? 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600'
                : 'bg-gray-400 hover:bg-gray-500 cursor-not-allowed'
            }`}
          >
            Digitális névjegykártya elkészítése
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VCardFormContent;