import React from 'react';
import { TrendingUp, PiggyBank, Users } from 'lucide-react';

const BusinessAdvantages = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">
          Hogyan legyek sikeresebb vállalkozó digitális névjegykártyával?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
              <TrendingUp className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Növekvő üzleti lehetőségek</h3>
            <p className="text-gray-600">Azonnali kapcsolatfelvétel és professzionális megjelenés</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
              <PiggyBank className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Költséghatékony megoldás</h3>
            <p className="text-gray-600">Nincs több nyomtatási és újranyomtatási költség</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
              <Users className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Hatékonyabb networking</h3>
            <p className="text-gray-600">Egyszerű megosztás és azonnali mentés</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessAdvantages;