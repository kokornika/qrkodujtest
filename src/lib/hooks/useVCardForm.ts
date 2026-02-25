import { useState, useEffect } from 'react';
import { VCardFormData, defaultVCardData, BillingData, BillingType } from '../../types/vcard';
import { ValidationError, validateVCardForm, validateEmail, validatePhoneNumber } from '../validation/vcard-validation';

const defaultBillingData: BillingData = {
  type: 'individual',
  name: '',
  zipcode: '',
  city: '',
  street: '',
};

export const useVCardForm = () => {
  const [formData, setFormData] = useState<VCardFormData>(defaultVCardData);
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [showOrderDialog, setShowOrderDialog] = useState(false);
  const [showValidationError, setShowValidationError] = useState(false);
  const [hasStartedEditing, setHasStartedEditing] = useState(false);
  const [showFloatingPreview, setShowFloatingPreview] = useState(false);
  const [hasShownPreview, setHasShownPreview] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const [billingData, setBillingData] = useState<BillingData>(defaultBillingData);
  const [billingErrors, setBillingErrors] = useState<Partial<Record<keyof BillingData, string>>>({});

  const isFormValid = () => {
    return (
      formData.name.trim() !== '' &&
      formData.email.trim() !== '' &&
      formData.phoneMobile.trim() !== '' &&
      validateEmail(formData.email) &&
      validatePhoneNumber(formData.phoneMobile)
    );
  };

  const updateBilling = (field: Exclude<keyof BillingData, 'type'>, value: string) => {
    setBillingData(prev => ({ ...prev, [field]: value }));
    if (billingErrors[field]) {
      setBillingErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const switchBillingType = (type: BillingType) => {
    setBillingData(prev => ({ ...prev, type, taxNumber: undefined }));
    setBillingErrors({});
  };

  const validateBilling = (): boolean => {
    const errors: Partial<Record<keyof BillingData, string>> = {};

    if (!billingData.name.trim()) {
      errors.name = billingData.type === 'company'
        ? 'A cégnév megadása kötelező'
        : 'A számlázási név megadása kötelező';
    }

    if (billingData.type === 'company') {
      if (!billingData.taxNumber?.trim()) {
        errors.taxNumber = 'Az adószám megadása kötelező';
      } else if (!/^\d{8}-\d{1}-\d{2}$/.test(billingData.taxNumber.trim())) {
        errors.taxNumber = 'Helytelen formátum (pl. 12345678-1-23)';
      }
    }

    if (!billingData.zipcode.trim()) {
      errors.zipcode = 'Az irányítószám megadása kötelező';
    } else if (!/^\d{4}$/.test(billingData.zipcode.trim())) {
      errors.zipcode = 'Az irányítószám 4 számjegyből áll';
    }

    if (!billingData.city.trim()) {
      errors.city = 'A város megadása kötelező';
    }

    if (!billingData.street.trim()) {
      errors.street = 'A cím megadása kötelező';
    }

    setBillingErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleOrderClick = () => {
    const cardValid = isFormValid();
    const billingValid = validateBilling();

    if (cardValid && billingValid) {
      setShowOrderDialog(true);
      setShowValidationError(false);
    } else {
      setShowValidationError(true);
      if (!cardValid) {
        setTouched(prev => ({
          ...prev,
          name: true,
          email: true,
          phoneMobile: true
        }));
      }
    }
  };

  const handleChange = (field: keyof VCardFormData, value: any) => {
    let processedValue = value;

    // Only try to trim string values
    if (!hasInteracted && typeof value === 'string' && value.trim() !== '') {
      setHasInteracted(true);
      showTemporaryPreview();
    }

    setFormData(prev => ({
      ...prev,
      [field]: processedValue
    }));

    setTouched(prev => ({
      ...prev,
      [field]: true
    }));

    if (!hasStartedEditing && (
      (typeof processedValue === 'string' && processedValue.trim()) ||
      (Array.isArray(processedValue) && processedValue.length > 0)
    )) {
      setHasStartedEditing(true);
    }
  };

  const showTemporaryPreview = () => {
    if (hasShownPreview) return;

    setShowFloatingPreview(true);
    setHasShownPreview(true);

    setTimeout(() => {
      setShowFloatingPreview(false);
    }, 5000);
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

  const getFieldError = (field: string): string | undefined => {
    const error = errors.find(e => e.field === field);
    return touched[field] ? error?.message : undefined;
  };

  return {
    formData,
    errors,
    touched,
    showOrderDialog,
    showValidationError,
    hasStartedEditing,
    showFloatingPreview,
    isFormValid,
    handleOrderClick,
    handleChange,
    getFieldError,
    setShowOrderDialog,
    setShowValidationError,
    billingData,
    billingErrors,
    updateBilling,
    switchBillingType,
  };
};
