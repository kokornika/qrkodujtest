import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle2, ArrowLeft, Loader2 } from 'lucide-react';
import { WebsiteGenerator } from '../lib/website-generator';

const PaymentSuccess: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deployUrl, setDeployUrl] = useState<string | null>(null);
  
  const sessionId = searchParams.get('session_id');
  const orderId = searchParams.get('order_id');

  useEffect(() => {
    const processOrder = async () => {
      if (!sessionId || !orderId) {
        setError('Érvénytelen munkamenet azonosító');
        setIsLoading(false);
        return;
      }

      try {
        // Retrieve session data from local storage
        const orderData = sessionStorage.getItem('orderData');
        if (!orderData) {
          throw new Error('Nem található megrendelési adat');
        }

        const { formData, plan } = JSON.parse(orderData);
        
        // Generate website and send email
        const websiteGenerator = new WebsiteGenerator();
        const result = await websiteGenerator.sendWebsiteCode(formData, plan, orderId);
        
        if (result?.deployUrl) {
          setDeployUrl(result.deployUrl);
        }

        // Clear session storage
        sessionStorage.removeItem('orderData');
        
      } catch (error) {
        console.error('Order processing error:', error);
        setError(error instanceof Error ? error.message : 'Hiba történt a megrendelés feldolgozása során');
      } finally {
        setIsLoading(false);
      }
    };

    processOrder();
  }, [sessionId, orderId]);

  return (
    <div className="max-w-2xl mx-auto pt-8 sm:pt-16">
      <div className="bg-white rounded-lg shadow-sm p-6 sm:p-8 text-center">
        {isLoading ? (
          <div className="py-8">
            <Loader2 className="w-16 h-16 text-blue-500 animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Megrendelés feldolgozása...</p>
          </div>
        ) : error ? (
          <>
            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-6 text-red-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Hiba történt
            </h1>
            <p className="text-gray-600 mb-8">{error}</p>
          </>
        ) : (
          <>
            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-6">
              <CheckCircle2 className="w-full h-full text-green-500" />
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Sikeres fizetés!
            </h1>
            
            <p className="text-gray-600 mb-8">
              Köszönjük a megrendelést! A digitális névjegykártyád elkészült.
              {deployUrl && (
                <>
                  <br />
                  <br />
                  A névjegykártyád elérhető a következő címen:
                  <br />
                  <a
                    href={deployUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    {deployUrl}
                  </a>
                </>
              )}
              <br />
              <br />
              A részleteket emailben is elküldtük neked.
            </p>
          </>
        )}

        <div className="space-y-4">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 text-blue-600 hover:text-blue-700"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Vissza a főoldalra</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;