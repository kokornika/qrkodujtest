import { VCardFormData, BillingData } from '../../types/vcard';

export function generateOrderSummary(data: VCardFormData, billingData?: BillingData): string {
  return JSON.stringify({
    personalInfo: {
      name: data.name,
      company: data.company,
      position: data.position,
      website: data.website,
      description: data.description
    },
    contactInfo: {
      email: data.email,
      phoneMobile: data.phoneMobile,
      phoneWork: data.phoneWork,
      phonePrivate: data.phonePrivate,
      fax: data.fax
    },
    address: {
      street: data.street,
      city: data.city,
      state: data.state,
      zipcode: data.zipcode,
      country: 'Magyarország'
    },
    appearance: {
      backgroundColor: data.backgroundColor,
      backgroundType: data.backgroundType,
      profilePicture: data.profilePicture ? 'Van' : 'Nincs'
    },
    socialLinks: data.socialLinks,
    billingInfo: billingData ? {
      type: billingData.type === 'company' ? 'Cég' : 'Magánszemély',
      name: billingData.name,
      ...(billingData.type === 'company' && billingData.taxNumber ? { taxNumber: billingData.taxNumber } : {}),
      address: `${billingData.zipcode} ${billingData.city}, ${billingData.street}`
    } : 'Nincs megadva'
  }, null, 2);
}