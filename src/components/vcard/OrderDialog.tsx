import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X, Loader2 } from 'lucide-react';
import { Button } from '../ui/button';
import { VCardFormData } from '../../types/vcard';
import { WebsiteGenerator } from '../../lib/website-generator';

interface OrderDialogProps {
  isOpen: boolean;
  onClose: () => void;
  formData: VCardFormData;
}

const PLANS = [
  {
    id: 'basic',
    name: 'Alap csomag',
    price: 9900,
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

const OrderDialog: React.FC<OrderDialogProps> = ({ isOpen, onClose, formData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const validateOrder = (planId: string) => {
    if (!formData.name?.trim()) {
      throw new Error('Név megadása kötelező a megrendeléshez');
    }
    if (!formData.email?.trim()) {
      throw new Error('Email cím megadása kötelező a megrendeléshez');
    }
    const plan = PLANS.find(p => p.id === planId);
    if (!plan) {
      throw new Error('Érvénytelen csomag kiválasztva');
    }
    return plan;
  };

  const handleOrder = async (planId: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const plan = validateOrder(planId);
      const generator = new WebsiteGenerator();
      
      await generator.sendWebsiteCode(formData, {
        name: plan.name,
        price: plan.price,
        period: plan.period
      });

      setSuccess(true);
      setTimeout(() => {
        onClose();
        setSuccess(false);
      }, 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Hiba történt a megrendelés során. Kérjük, próbálja újra később.');
      console.error('Order error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl max-h-[90vh] overflow-auto bg-white rounded-xl shadow-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <Dialog.Title className="text-2xl font-bold text-gray-900">
              Válassz csomagot
            </Dialog.Title>
            <Dialog.Close className="text-gray-400 hover:text-gray-500">
              <X className="w-5 h-5" />
            </Dialog.Close>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
              {error}
            </div>
          )}

          {success ? (
            <div className="p-8 text-center">
              <div className="mb-4 text-green-500">
                <svg
                  className="w-16 h-16 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Sikeres megrendelés!
              </h3>
              <p className="text-gray-600">
                A megrendelés részleteit és a weboldal forráskódját elküldtük emailben. Hamarosan felvesszük Önnel a kapcsolatot.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {PLANS.map((plan) => (
                <div
                  key={plan.id}
                  className="relative bg-white border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {plan.name}
                  </h3>
                  <div className="text-3xl font-bold text-gray-900 mb-4">
                    {plan.price.toLocaleString()} Ft
                    <span className="text-base font-normal text-gray-500">
                      /{plan.period}
                    </span>
                  </div>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-gray-600">
                        <svg
                          className="w-5 h-5 text-green-500 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                    onClick={() => handleOrder(plan.id)}
                    className="w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Feldolgozás...
                      </>
                    ) : (
                      'Megrendelem'
                    )}
                  </Button>
                </div>
              ))}
            </div>
          )}

          <div className="mt-6 text-center text-sm text-gray-500">
            A megrendelés után emailben elküldjük a további teendőket és a fizetési információkat.
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default OrderDialog;