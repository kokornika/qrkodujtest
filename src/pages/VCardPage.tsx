import React from 'react';
import SEO from '../components/SEO';
import VCardForm from '../components/vcard/VCardForm';

const VCardPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto py-4 sm:py-6 px-4 sm:px-6 lg:px-8">
      <SEO
        title="Digitális Névjegykártya Készítése Online | QRNevjegy"
        description="Hozza létre saját digitális névjegykártyáját QR kóddal pár perc alatt. Egyedi megjelenés, azonnali megosztás."
      />
      <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">
        Digitális Névjegykártya Készítése Online QR Kóddal
      </h1>
      <VCardForm />
    </div>
  );
};

export default VCardPage;
