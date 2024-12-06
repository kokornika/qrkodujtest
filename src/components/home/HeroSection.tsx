import React from 'react';
import { QrCode, ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-b from-white to-gray-50 pt-12 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
            Digitális Névjegykártya Készítés QR Kóddal
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 leading-relaxed mb-8">
            Lépjen a digitális korba: Váltsa le hagyományos névjegykártyáit modern, 
            környezetbarát és költséghatékony digitális alternatívára. Legyen sikeresebb 
            vállalkozó innovatív üzleti megoldásainkkal!
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/guide">
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 w-full sm:w-auto">
                Részletes útmutató
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/vcard">
              <Button variant="outline" className="border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 w-full sm:w-auto">
                Azonnali névjegykártya készítés
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;