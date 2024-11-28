import React from 'react';
import { QrCode, ArrowRight, Zap, Leaf, Globe } from 'lucide-react';
import ContentTypeSelector from './ContentTypeSelector';
import BenefitsSection from './BenefitsSection';
import { Button } from './ui/button';
import { QRContentType } from '../types/qr';

interface HomePageProps {
  onSelectType: (type: QRContentType) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onSelectType }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white to-gray-50 pt-12 pb-20 sm:pt-16 sm:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left Column - Content Type Selector */}
            <div className="space-y-10">
              <div className="space-y-6">
                <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
                  QR kód generálás egyszerűen és gyorsan
                </h1>
                <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
                  Készítsen professzionális QR kódokat vagy digitális névjegykártyát másodpercek alatt.
                  Ingyenes, regisztráció nélkül!
                </p>
              </div>
              
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-8">
                  Mit szeretne QR kóddá alakítani?
                </h2>
                <ContentTypeSelector onSelect={onSelectType} />
              </div>
            </div>

            {/* Right Column - Benefits Preview */}
            <div className="lg:sticky lg:top-8">
              <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-2xl p-8 sm:p-10 text-white relative overflow-hidden shadow-xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-32 translate-x-32" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-5 rounded-full translate-y-24 -translate-x-24" />
                
                <div className="relative z-10 space-y-8">
                  <div className="space-y-4">
                    <h2 className="text-2xl sm:text-3xl font-bold">
                      Digitális névjegykártya szolgáltatás
                    </h2>
                    <p className="text-lg text-white/90 leading-relaxed">
                      Lépjen be a modern üzleti világba egy professzionális digitális névjegykártyával!
                    </p>
                  </div>

                  <ul className="space-y-4">
                    <li className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                        <Zap className="w-5 h-5" />
                      </div>
                      <span className="text-lg">Beépített QR kód</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                        <Leaf className="w-5 h-5" />
                      </div>
                      <span className="text-lg">Környezetbarát megoldás</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                        <Globe className="w-5 h-5" />
                      </div>
                      <span className="text-lg">Azonnal frissíthető</span>
                    </li>
                  </ul>

                  <Button
                    onClick={() => onSelectType('vcard')}
                    className="w-full sm:w-auto bg-white hover:bg-white/90 text-gray-900 border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
                  >
                    <span>Kipróbálom</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <BenefitsSection />
    </div>
  );
};

export default HomePage;