import React, { useState } from 'react';
import { Calculator, TrendingUp, PiggyBank, Printer } from 'lucide-react';

const ROICalculator = () => {
  const [employees, setEmployees] = useState(1);
  const [cardsPerYear, setCardsPerYear] = useState(100);

  // Költségek
  const traditionalCosts = {
    cardPrice: 100, // 100 Ft/db
    shippingPrice: 2000, // 2000 Ft/csomag
    yearlyShipments: Math.ceil((employees * cardsPerYear) / 100) // Feltételezzük, hogy egy csomag 100 db kártyát tartalmaz
  };

  // Hagyományos névjegyek éves költsége
  const yearlyTraditionalCost = 
    (employees * cardsPerYear * traditionalCosts.cardPrice) + 
    (traditionalCosts.shippingPrice * traditionalCosts.yearlyShipments);

  // Digitális névjegy éves költsége (5990 Ft/fő/év)
  const yearlyDigitalCost = employees * 5990;

  // Éves megtakarítás
  const yearlySavings = yearlyTraditionalCost - yearlyDigitalCost;

  // Környezeti hatás (becsült értékek)
  const environmentalImpact = {
    paper: cardsPerYear * employees * 0.004, // kg papír (4g/kártya)
    co2: cardsPerYear * employees * 0.01 // kg CO2 (nyomtatás + szállítás)
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Költségkalkulátor
          </h2>
          <p className="text-lg text-gray-600">
            Számolja ki, mennyit spórolhat a digitális névjegykártyával
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Kalkulátor */}
          <div className="bg-gray-50 p-6 rounded-xl">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hány munkatársnak van szüksége névjegykártyára?
                </label>
                <input
                  type="number"
                  min="1"
                  value={employees}
                  onChange={(e) => setEmployees(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Átlagosan hány névjegykártyára van szükség évente személyenként?
                </label>
                <input
                  type="number"
                  min="1"
                  value={cardsPerYear}
                  onChange={(e) => setCardsPerYear(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>

          {/* Eredmények */}
          <div className="space-y-6">
            {/* Költségek összehasonlítása */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-red-50 p-4 rounded-xl">
                <div className="flex items-center gap-3 mb-2">
                  <Printer className="w-5 h-5 text-red-600" />
                  <h3 className="font-semibold text-gray-900">Hagyományos</h3>
                </div>
                <p className="text-2xl font-bold text-red-600">
                  {yearlyTraditionalCost.toLocaleString()} Ft
                </p>
                <p className="text-sm text-gray-600">évente</p>
              </div>

              <div className="bg-green-50 p-4 rounded-xl">
                <div className="flex items-center gap-3 mb-2">
                  <Calculator className="w-5 h-5 text-green-600" />
                  <h3 className="font-semibold text-gray-900">Digitális</h3>
                </div>
                <p className="text-2xl font-bold text-green-600">
                  {yearlyDigitalCost.toLocaleString()} Ft
                </p>
                <p className="text-sm text-gray-600">évente</p>
              </div>
            </div>

            {/* Megtakarítás */}
            <div className="bg-blue-50 p-6 rounded-xl">
              <div className="flex items-center gap-3 mb-4">
                <PiggyBank className="w-6 h-6 text-blue-600" />
                <h3 className="font-semibold text-gray-900">Éves megtakarítás</h3>
              </div>
              <p className="text-3xl font-bold text-blue-600 mb-2">
                {yearlySavings.toLocaleString()} Ft
              </p>
              <div className="space-y-2">
                <p className="text-sm text-gray-600 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  {environmentalImpact.paper.toFixed(1)} kg papír megtakarítás
                </p>
                <p className="text-sm text-gray-600 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  {environmentalImpact.co2.toFixed(1)} kg CO₂ kibocsátás csökkentés
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ROICalculator;