import React, { useState, useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X, Sparkles, TrendingDown, CheckCircle2, Gift, Zap } from 'lucide-react';
import { Button } from '../ui/button';
import { VCardFormData } from '../../types/vcard';
import { stripeService } from '../../lib/services/stripe-service';
import { PaymentPlan } from '../../lib/constants/plans';

interface ExitIntentPopupProps {
  isOpen: boolean;
  onClose: () => void;
  formData: VCardFormData;
}

const DISCOUNT_PLAN: PaymentPlan = {
  id: 'professional-discount',
  name: 'Professzionális csomag - Különleges ajánlat',
  price: 4000,
  period: '1 év',
  features: [
    'Egyedi digitális névjegykártya weboldal',
    'Professzionális QR kód generálás',
    'Korlátlan névjegy megosztás',
    'Azonnali adatfrissítés'
  ],
  comparisonPoints: []
};

const ExitIntentPopup: React.FC<ExitIntentPopupProps> = ({ isOpen, onClose, formData }) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // @ts-ignore
      window.gtag?.('event', 'view_exit_intent_offer', {
        page_location: window.location.href,
        discount_amount: 1990
      });
    }
  }, [isOpen]);

  const handleAcceptOffer = async () => {
    setIsLoading(true);

    try {
      // @ts-ignore
      window.gtag?.('event', 'accept_exit_intent_offer', {
        page_location: window.location.href,
        discount_amount: 1990,
        final_price: 4000
      });

      // Store form data in session storage with discount
      sessionStorage.setItem('orderData', JSON.stringify({
        formData,
        plan: DISCOUNT_PLAN
      }));

      // Create Stripe checkout session with discounted price
      await stripeService.createPaymentSession({
        name: formData.name,
        email: formData.email,
        company: formData.company
      }, DISCOUNT_PLAN);

    } catch (err) {
      console.error('Exit intent order error:', err);
      setIsLoading(false);
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/85 backdrop-blur-sm z-[70] animate-in fade-in duration-300" />
        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[95vw] max-w-2xl bg-white rounded-2xl shadow-2xl z-[70] max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-300" aria-describedby="exit-intent-description">
          <Dialog.Title className="sr-only">Különleges kedvezményes ajánlat</Dialog.Title>
          <Dialog.Description id="exit-intent-description" className="sr-only">
            Különleges kedvezményt biztosítunk Önnek - 4000 Ft helyett az eredeti 5990 Ft-os ár.
          </Dialog.Description>
          
          {/* Close Button */}
          <Dialog.Close 
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 bg-gray-100 rounded-full p-2 transition-all hover:scale-110 z-10"
            onClick={() => {
              // @ts-ignore
              window.gtag?.('event', 'reject_exit_intent_offer', {
                page_location: window.location.href
              });
            }}
          >
            <X className="w-5 h-5" />
          </Dialog.Close>

          <div className="p-6 sm:p-10">
            {/* Urgent Badge */}
            <div className="flex justify-center mb-6">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-2 rounded-full text-sm font-semibold shadow-lg">
                <Gift className="w-4 h-4" />
                <span>KÜLÖNLEGES AJÁNLAT</span>
              </div>
            </div>

            {/* Main Headline */
            }
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 blur-2xl opacity-30"></div>
                  <Sparkles className="w-14 h-14 text-blue-600 relative" />
                </div>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                Egy pillanat!
              </h2>
              <p className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
                Különleges kedvezményt biztosítunk Önnek
              </p>
              <p className="text-base text-gray-600">
                Indulási kedvezmény első vásárlóknak
              </p>
            </div>

            {/* Primary CTA - placed immediately after headline for immediate action */}
            <div className="mb-6">
              <Button
                onClick={handleAcceptOffer}
                disabled={isLoading}
                className="w-full h-14 text-base sm:text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all rounded-xl"
              >
                {isLoading ? (
                  <span>Feldolgozás...</span>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-2" />
                    Elfogadom az ajánlatot - 4.000 Ft
                  </>
                )}
              </Button>
            </div>

            {/* Price Comparison */}
            <div
              className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 sm:p-8 mb-8 border border-blue-100 cursor-pointer hover:shadow-md transition-shadow"
              role="button"
              tabIndex={0}
              onClick={handleAcceptOffer}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleAcceptOffer(); } }}
            >
              <div className="flex items-center justify-center gap-4 sm:gap-8 mb-6">
                {/* Original Price */}
                <div className="text-center relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full h-0.5 bg-red-500 transform"></div>
                  </div>
                  <div className="text-xs sm:text-sm text-gray-500 mb-1">Normál ár</div>
                  <div className="text-2xl sm:text-3xl font-bold text-gray-400 line-through">
                    5.990 Ft
                  </div>
                </div>

                {/* Arrow */}
                <div className="flex flex-col items-center">
                  <TrendingDown className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
                  <div className="text-xs sm:text-sm font-semibold text-green-600 mt-1">-33%</div>
                </div>

                {/* Discount Price */}
                <div className="text-center">
                  <div className="text-xs sm:text-sm text-blue-600 font-semibold mb-1">INDULÁSI ÁR</div>
                  <div className="text-3xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent flex items-center gap-2">
                    4.000 Ft
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600 mt-1">teljes 1 évre</div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-3 sm:p-4 text-center shadow-sm">
                <p className="text-base sm:text-lg font-bold text-gray-900">
                  <Zap className="w-4 h-4 sm:w-5 sm:h-5 inline text-green-600" /> Megtakarítás: <span className="text-green-600">1.990 Ft</span>
                </p>
                <p className="text-xs sm:text-sm text-gray-600 mt-1">Ez csupán 11 Ft/nap</p>
              </div>
            </div>

            {/* Value Proposition */}
            <div className="mb-7">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">
                Miért érdemes élni ezzel az ajánlattal?
              </h3>
              <div className="space-y-2.5">
                {[
                  'Professzionális digitális jelenlét azonnal',
                  'Egy év teljes hozzáférés korlátlan használattal',
                  'Azonnali aktiválás - QR kód másodpercek alatt',
                  'Adatait bármikor frissítheti egyszerűen',
                  'Nincs automatikus megújítás vagy rejtett költség'
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3 bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Legal */}
            <div className="space-y-3">
              <p className="text-center text-xs text-gray-500 leading-relaxed">
                A megrendeléssel elfogadja az{' '}
                <a href="/terms" target="_blank" className="text-blue-600 underline hover:text-blue-700">
                  ÁSZF-et
                </a>
                {' '}és az{' '}
                <a href="/privacy" target="_blank" className="text-blue-600 underline hover:text-blue-700">
                  Adatkezelési tájékoztatót
                </a>
              </p>
            </div>

            {/* Trust Badge */}
            <div className="mt-5 pt-5 border-t border-gray-200">
              <div className="flex items-center justify-center gap-3 text-sm text-gray-600">
                <div className="flex -space-x-2">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-400 to-blue-500 border-2 border-white shadow-sm"></div>
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-500 border-2 border-white shadow-sm"></div>
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-400 to-purple-500 border-2 border-white shadow-sm"></div>
                </div>
                <span className="font-medium">Több mint 100 elégedett ügyfél</span>
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ExitIntentPopup;

