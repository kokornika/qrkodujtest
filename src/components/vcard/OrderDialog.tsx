import React, { useState, useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X, Loader2, Check, CreditCard, Lock, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { VCardFormData, BillingData } from '../../types/vcard';
import { PAYMENT_PLANS } from '../../lib/constants/plans';
import { stripeService } from '../../lib/services/stripe-service';
import { OrderError, ValidationError } from '../../lib/errors/order-errors';

interface OrderDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  formData: VCardFormData;
  billingData: BillingData;
}

const OrderDialog: React.FC<OrderDialogProps> = ({ isOpen, onOpenChange, formData, billingData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const plan = PAYMENT_PLANS[0];

  useEffect(() => {
    if (isOpen) {
      // @ts-ignore
      window.gtag?.('event', 'page_view', {
        page_title: 'Megrendelés',
        page_path: '/order',
        page_location: window.location.href
      });
    } else {
      setError(null);
    }
  }, [isOpen]);

  const handleOrder = async () => {
    setError(null);
    setIsLoading(true);

    try {
      sessionStorage.setItem('orderData', JSON.stringify({ formData, plan, billingData }));
      await stripeService.createPaymentSession({
        name: formData.name,
        email: formData.email,
        company: formData.company
      }, plan);
    } catch (err) {
      let errorMessage = 'Hiba történt a megrendelés során. Kérjük, próbálja újra később.';
      if (err instanceof ValidationError) {
        errorMessage = err.message;
      } else if (err instanceof OrderError) {
        errorMessage = err.message;
      }
      setError(errorMessage);
      console.error('Order error:', err);
      setIsLoading(false);
    }
  };

  const billingLabel = billingData.type === 'company' ? 'Cégnév' : 'Számlázási név';
  const billingAddress = `${billingData.zipcode} ${billingData.city}, ${billingData.street}`;

  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60]" />
        <Dialog.Content className="fixed inset-x-0 bottom-0 sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 w-full sm:max-w-md bg-white rounded-t-2xl sm:rounded-2xl shadow-xl z-[60] max-h-[90vh] flex flex-col">

          <div className="flex-shrink-0 bg-white px-4 py-3 border-b border-gray-100 flex justify-between items-center rounded-t-2xl">
            <Dialog.Title className="text-lg font-semibold text-gray-900">
              Digitális névjegykártya megrendelése
            </Dialog.Title>
            <Dialog.Close className="text-gray-400 hover:text-gray-500">
              <X className="w-4 h-4" />
            </Dialog.Close>
          </div>

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto px-4 pt-3 pb-2 space-y-3 bg-white min-h-0">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            {/* Plan card */}
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-3 text-white">
              <div className="flex justify-between items-center mb-1.5">
                <div>
                  <h3 className="text-sm font-semibold">{plan.name}</h3>
                  <p className="text-indigo-100 text-xs">Minden, amire szüksége lehet</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold">{plan.price.toLocaleString()} Ft</div>
                  <div className="text-indigo-100 text-xs">/{plan.period}</div>
                </div>
              </div>
              <div className="flex flex-wrap gap-x-3 gap-y-1">
                {plan.features.slice(0, 2).map((feature, index) => (
                  <div key={index} className="flex items-center gap-1">
                    <Check className="w-3 h-3 text-indigo-200 flex-shrink-0" />
                    <span className="text-xs">{feature}</span>
                  </div>
                ))}
                {plan.features.length > 2 && (
                  <span className="text-[11px] text-indigo-200">+{plan.features.length - 2} további</span>
                )}
              </div>
            </div>

            {/* Billing summary – compact */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-600 space-y-0.5">
              <p className="font-medium text-gray-400 uppercase tracking-wide text-[10px] mb-1">Számlázási adatok</p>
              <p><span className="text-gray-500">{billingLabel}:</span> <span className="text-gray-800 font-medium">{billingData.name}</span></p>
              {billingData.type === 'company' && billingData.taxNumber && (
                <p><span className="text-gray-500">Adószám:</span> <span className="text-gray-800 font-medium">{billingData.taxNumber}</span></p>
              )}
              <p><span className="text-gray-500">Cím:</span> <span className="text-gray-800 font-medium">{billingAddress}</span></p>
            </div>

            {/* Terms */}
            <p className="text-[11px] text-gray-500 leading-snug">
              A megrendeléssel elfogadja az{' '}
              <Link to="/terms" target="_blank" className="text-blue-600 underline" onClick={e => e.stopPropagation()}>
                ÁSZF-et
              </Link>
              {' '}és az{' '}
              <Link to="/privacy" target="_blank" className="text-blue-600 underline" onClick={e => e.stopPropagation()}>
                Adatkezelési tájékoztatót
              </Link>.
            </p>
          </div>

          {/* Fixed bottom – always visible */}
          <div className="flex-shrink-0 px-4 pb-4 pt-3 bg-white border-t border-gray-100 space-y-2">
            <Button
              onClick={handleOrder}
              className="w-full h-12 text-base font-semibold bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 shadow-lg hover:shadow-xl transition-all rounded-xl"
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
                  Megrendelem – {plan.price.toLocaleString()} Ft
                </>
              )}
            </Button>

            <div className="flex items-center justify-between text-[11px] text-gray-400 px-1">
              <div className="flex items-center gap-1">
                <Lock className="w-3 h-3" />
                <span>Biztonságos Stripe fizetés</span>
              </div>
              <div className="flex items-center gap-2">
                <img src="https://upload.wikimedia.org/wikipedia/commons/b/b0/Apple_Pay_logo.svg" alt="Apple Pay" className="h-3.5 opacity-60" loading="lazy" decoding="async" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/f/f2/Google_Pay_Logo.svg" alt="Google Pay" className="h-3.5 opacity-60" loading="lazy" decoding="async" />
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default OrderDialog;
