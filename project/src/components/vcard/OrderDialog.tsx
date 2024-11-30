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
  const plan = PAYMENT_PLANS[0];

  const handleOrder = async () => {
    setIsLoading(true);
    setError(null);

    try {
      sessionStorage.setItem('orderData', JSON.stringify({ formData, plan }));
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
        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg max-h-[85vh] overflow-auto bg-white rounded-xl shadow-xl">
          <div className="sticky top-0 bg-white px-6 py-4 border-b border-gray-100 flex justify-between items-center">
            <Dialog.Title className="text-xl font-bold text-gray-900">
              Digitális névjegykártya megrendelése
            </Dialog.Title>
            <Dialog.Close className="text-gray-400 hover:text-gray-500">
              <X className="w-5 h-5" />
            </Dialog.Close>
          </div>

          <div className="p-6 space-y-6">
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-medium text-red-600 mb-1">Hiba történt</h4>
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              </div>
            )}

            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-6 text-white">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-xl font-bold">{plan.name}</h3>
                  <p className="text-indigo-100">Minden, amire szüksége lehet</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold">{plan.price.toLocaleString()} Ft</div>
                  <div className="text-indigo-100">/{plan.period}</div>
                </div>
              </div>
              
              <div className="space-y-2">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-indigo-200 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-4">
              <h4 className="font-medium text-gray-900 mb-3">
                Előnyök a hagyományos névjegyekkel szemben
              </h4>
              <div className="space-y-2">
                {plan.comparisonPoints.map((point, index) => (
                  <div key={index} className="flex items-start gap-2 text-gray-600">
                    <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-1" />
                    <span className="text-sm">{point}</span>
                  </div>
                ))}
              </div>
            </div>

            <Button
              onClick={handleOrder}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
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

            <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
              <Shield className="w-4 h-4" />
              Biztonságos fizetés a Stripe rendszerén keresztül
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default OrderDialog;