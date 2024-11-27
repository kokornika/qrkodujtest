import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X, Loader2, Check, CreditCard, Shield, AlertCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { VCardFormData } from '../../types/vcard';
import { PAYMENT_PLANS } from '../../lib/constants/plans';
import { processOrder } from '../../lib/services/order-service';
import { OrderError, ValidationError, PaymentError } from '../../lib/errors/order-errors';

interface OrderDialogProps {
  isOpen: boolean;
  onClose: () => void;
  formData: VCardFormData;
}

const OrderDialog: React.FC<OrderDialogProps> = ({ isOpen, onClose, formData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleOrder = async (planId: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const plan = PAYMENT_PLANS.find(p => p.id === planId);
      if (!plan) {
        throw new ValidationError('Érvénytelen csomag kiválasztva');
      }

      await processOrder(formData, plan);
    } catch (err) {
      let errorMessage = 'Hiba történt a megrendelés során. Kérjük, próbálja újra később.';
      
      if (err instanceof ValidationError) {
        errorMessage = err.message;
      } else if (err instanceof PaymentError) {
        errorMessage = 'Hiba történt a fizetés során. Kérjük, próbálja újra később.';
      } else if (err instanceof OrderError) {
        errorMessage = err.message;
      }

      setError(errorMessage);
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
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h4 className="font-medium text-red-600 mb-1">Hiba történt</h4>
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PAYMENT_PLANS.map((plan) => (
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
                      <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
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
                    <>
                      <CreditCard className="w-4 h-4 mr-2" />
                      Megrendelem
                    </>
                  )}
                </Button>
              </div>
            ))}
          </div>

          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
              <Shield className="w-4 h-4" />
              Biztonságos fizetés a Stripe rendszerén keresztül
            </div>
            <div className="text-center text-sm text-gray-500">
              A megrendelés után átirányítjuk a biztonságos fizetési oldalra.
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default OrderDialog;