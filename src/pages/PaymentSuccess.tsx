import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle2, ArrowLeft } from 'lucide-react';

const PaymentSuccess: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    // Itt később implementálhatjuk a session ellenőrzését
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [sessionId]);

  return (
    <div className="max-w-2xl mx-auto pt-8 sm:pt-16">
      <div className="bg-white rounded-lg shadow-sm p-6 sm:p-8 text-center">
        <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-6">
          <CheckCircle2 className="w-full h-full text-green-500" />
        </div>
        
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
          Sikeres fizetés!
        </h1>
        
        <p className="text-gray-600 mb-8">
          Köszönjük a megrendelést! A digitális névjegykártyád hamarosan elkészül.
          A részleteket emailben küldjük el.
        </p>

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
}

export default PaymentSuccess;