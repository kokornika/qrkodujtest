export interface VCardFormData {
  name: string;
  company: string;
  position: string;
  website: string;
  phoneMobile: string;
  phoneWork: string;
  phonePrivate: string;
  fax: string;
  email: string;
  country: string;
  state: string;
  street: string;
  city: string;
  zipcode: string;
  description: string;
  profilePicture?: string;
  backgroundColor: string;
  backgroundType: 'solid' | 'gradient';
  socialLinks: {
    platform: string;
    url: string;
  }[];
}

export const defaultVCardData: VCardFormData = {
  name: '',
  company: '',
  position: '',
  website: '',
  phoneMobile: '',
  phoneWork: '',
  phonePrivate: '',
  fax: '',
  email: '',
  country: '',
  state: '',
  street: '',
  city: '',
  zipcode: '',
  description: '',
  profilePicture: '',
  backgroundColor: '#6366F1', // Modern indigo szín
  backgroundType: 'gradient', // Alapértelmezetten gradient
  socialLinks: []
};