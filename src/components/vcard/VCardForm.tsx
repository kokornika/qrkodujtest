import React, { useRef, useEffect } from 'react';
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
import ExitIntentPopup from './ExitIntentPopup';
import { useVCardForm } from '../../lib/hooks/useVCardForm';
import { useExitIntent } from '../../lib/hooks/useExitIntent';
import { generateVCardString } from '../../lib/utils/vcard-generator';
import VCardFormContent from './VCardFormContent';
import VCardMobilePreview from './VCardMobilePreview';

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

  // Debug: Log when OrderDialog state changes
  useEffect(() => {
    console.log('OrderDialog is now:', showOrderDialog ? 'OPEN' : 'CLOSED');
  }, [showOrderDialog]);

  // Exit intent hook - only enabled when order dialog is open
  const { showExitIntent, closeExitIntent, openExitIntent } = useExitIntent({
    enabled: showOrderDialog, // Only active when OrderDialog is visible
    sensitivity: 30,
    delay: 200
  });

  // Debug: Log when exit intent state changes
  useEffect(() => {
    if (showExitIntent) {
      console.log('EXIT INTENT POPUP SHOULD BE VISIBLE NOW!');
    }
  }, [showExitIntent]);

  // Debug helper: Add to window object for testing
  useEffect(() => {
    // @ts-ignore
    window.resetExitIntent = () => {
      sessionStorage.removeItem('exitIntentShown');
      console.log('Exit intent reset! You can now test it again.');
    };
    return () => {
      // @ts-ignore
      delete window.resetExitIntent;
    };
  }, []);

  const scrollToForm = () => {
    if (formRef.current) {
      // Increased offset to scroll higher up
      const offset = 120; // Increased from 80 to 120
      const elementPosition = formRef.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: Math.max(0, offsetPosition), // Ensure we don't scroll past the top
        behavior: 'smooth'
      });
    }
  };

  const vCardString = generateVCardString(formData);

  return (
    <>
      <div className="flex flex-col lg:grid lg:grid-cols-[1fr,400px] gap-4 sm:gap-6 lg:gap-8 px-4">
        <VCardMobilePreview 
          formData={formData}
          vCardString={vCardString}
          isValid={isFormValid()}
          onScrollToForm={scrollToForm}
        />

        <div className="space-y-4 sm:space-y-6 lg:space-y-8" ref={formRef}>
          <VCardFormContent
            formData={formData}
            onChange={handleChange}
            getFieldError={getFieldError}
            onOrder={handleOrderClick}
            showValidationError={showValidationError}
            hasStartedEditing={hasStartedEditing}
            isFormValid={isFormValid()}
          />
        </div>

        <div className="hidden lg:block lg:sticky lg:top-24 h-fit">
          <VCardPreview 
            formData={formData} 
            vCardString={vCardString}
            isValid={isFormValid()}
          />
        </div>
      </div>

      <div className="h-20 lg:hidden" />

      <FloatingPreview 
        formData={formData} 
        isVisible={showFloatingPreview}
      />

      <OrderDialog 
        isOpen={showOrderDialog}
        onOpenChange={(open) => {
          console.log('OrderDialog onOpenChange:', open);
          setShowOrderDialog(open);
          if (!open) {
            // User is closing the order dialog -> show exit intent immediately
            openExitIntent();
          }
          setShowValidationError(false);
        }}
        formData={formData}
      />

      <ExitIntentPopup 
        isOpen={showExitIntent}
        onClose={closeExitIntent}
        formData={formData}
      />
    </>
  );
};

export default VCardForm;