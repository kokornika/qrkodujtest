export interface PaymentPlan {
  id: string;
  name: string;
  price: number;
  period: string;
  features: string[];
}

export const PAYMENT_PLANS: PaymentPlan[] = [
  {
    id: 'basic',
    name: 'Alap csomag',
    price: 100,
    period: '3 hónap',
    features: [
      'Egyedi digitális névjegykártya',
      'QR kód generálás',
      'Egyedi URL cím',
      'Email támogatás'
    ]
  },
  {
    id: 'premium',
    name: 'Prémium csomag',
    price: 29900,
    period: '1 év',
    features: [
      'Minden az Alap csomagban',
      'Egyedi domain név',
      'Korlátlan módosítás',
      'Prioritás támogatás',
      'Látogatottsági statisztikák'
    ]
  }
];