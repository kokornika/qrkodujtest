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
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
              Digitális megoldások az üzleti élethez
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
              Válassza ki az Önnek megfelelő szolgáltatást és lépjen be a modern üzleti világba!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* QR Code Generator Card */}
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow flex flex-col">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                  <QrCode className="w-6 h-6 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">QR kód generálás</h2>
              </div>
              <p className="text-gray-600 mb-8">
                Készítsen professzionális QR kódokat másodpercek alatt. 
                Ingyenes, regisztráció nélkül!
              </p>
              <div className="mt-auto">
                <ContentTypeSelector onSelect={onSelectType} />
              </div>
            </div>

            {/* Digital Business Card Card */}
            <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-2xl p-8 text-white relative overflow-hidden shadow-xl flex flex-col">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-32 translate-x-32" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-5 rounded-full translate-y-24 -translate-x-24" />
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center">
                    <Globe className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold">Digitális névjegykártya</h2>
                </div>

                <p className="text-lg text-white/90 mb-8 leading-relaxed">
                  Professzionális online jelenlét egyetlen kattintással. 
                  Modern megoldás a hatékony kapcsolatépítéshez.
                </p>

                <ul className="space-y-4 mb-8 flex-grow">
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
      </section>

      {/* Benefits Section */}
      <BenefitsSection />
    </div>
  );
};

export default HomePage;