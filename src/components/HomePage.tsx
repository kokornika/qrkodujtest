import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import HeroSection from './home/HeroSection';
import BusinessAdvantages from './home/BusinessAdvantages';
import ComparisonSection from './home/ComparisonSection';
import BenefitsSection from './BenefitsSection';
import QRCodeTabbedGenerator from './QRCodeTabbedGenerator';
import FAQSection from './home/FAQSection';
import ROICalculator from './home/ROICalculator';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection />
      
      {/* QR Code Generator Section */}
      <section className="py-16 bg-white">
        <QRCodeTabbedGenerator />
      </section>

      <BusinessAdvantages />
      <ComparisonSection />
      <ROICalculator />
      <BenefitsSection />
      <FAQSection />

      {/* SEO Optimized Footer Content */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Készítsen digitális névjegykártyát még ma!
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Csatlakozzon azokhoz, akik már felfedezték a digitális névjegykártyák előnyeit. 
            Modern megoldásunk segít az üzleti kapcsolatok hatékony építésében.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/guide"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
            >
              Részletes útmutató
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/vcard"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg border-2 border-blue-600 text-blue-600 font-medium hover:bg-blue-50 transition-colors"
            >
              Azonnali névjegykártya készítés
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;