import React from 'react';
import HeroSection from './home/HeroSection';
import BusinessAdvantages from './home/BusinessAdvantages';
import ComparisonSection from './home/ComparisonSection';
import BenefitsSection from './BenefitsSection';
import QRCodeTabbedGenerator from './QRCodeTabbedGenerator';

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
      <BenefitsSection />

      {/* SEO Optimized Footer Content */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Készítsen QR kódot még ma!
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Csatlakozzon azokhoz, akik már felfedezték a QR kódok előnyeit. 
            Modern megoldásunk segít az információk gyors és hatékony megosztásában.
          </p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;