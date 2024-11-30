export interface ValidationError {
  field: string;
  message: string;
}

export function validatePhone(phone: string): boolean {
  // Allow +36 or 06 prefix, followed by 2 digits for carrier (20,30,70 etc), then 7 digits
  const phoneRegex = /^(\+36|06)[ -]?(20|30|31|50|70)[ -]?\d{3}[ -]?\d{4}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
}

export function formatPhone(phone: string): string {
  // Remove all non-digit characters except + at the start
  const cleaned = phone.replace(/[^\d+]/g, '');
  
  // If the string is empty after cleaning, return empty string
  if (!cleaned) return '';
  
  // Handle backspace and deletion by checking length
  if (cleaned.length <= 2) return cleaned;
  
  // Format based on the input pattern
  if (cleaned.startsWith('+36')) {
    // Split into groups: +36 XX XXX XXXX
    const groups = [
      '+36',
      cleaned.slice(3, 5),
      cleaned.slice(5, 8),
      cleaned.slice(8, 12)
    ].filter(group => group.length > 0);
    return groups.join(' ');
  } else if (cleaned.startsWith('06')) {
    // Split into groups: 06 XX XXX XXXX
    const groups = [
      '06',
      cleaned.slice(2, 4),
      cleaned.slice(4, 7),
      cleaned.slice(7, 11)
    ].filter(group => group.length > 0);
    return groups.join(' ');
  }
  
  // If no pattern matches, return the cleaned input as is
  return cleaned;
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validateVCardForm(formData: {
  name: string;
  email: string;
  phoneMobile: string;
}): ValidationError[] {
  const errors: ValidationError[] = [];

  if (!formData.name.trim()) {
    errors.push({
      field: 'name',
      message: 'A név megadása kötelező'
    });
  }

  if (!formData.email.trim()) {
    errors.push({
      field: 'email',
      message: 'Az email cím megadása kötelező'
    });
  } else if (!validateEmail(formData.email)) {
    errors.push({
      field: 'email',
      message: 'Érvénytelen email cím formátum'
    });
  }

  if (!formData.phoneMobile.trim()) {
    errors.push({
      field: 'phoneMobile',
      message: 'A mobil telefonszám megadása kötelező'
    });
  } else if (!validatePhone(formData.phoneMobile)) {
    errors.push({
      field: 'phoneMobile',
      message: 'Érvénytelen telefonszám formátum (pl. +36 30 123 4567)'
    });
  }

  return errors;
}