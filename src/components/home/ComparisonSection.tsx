import React from 'react';
import { Check, X, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';

const ComparisonSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">
          Hagyományos Névjegykártya Alternatívák Összehasonlítása
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold mb-6 text-gray-400">Hagyományos névjegykártya</h3>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3">
                <X className="w-5 h-5 text-red-500" />
                <span>Nyomtatási és újranyomtatási költségek</span>
              </li>
              <li className="flex items-center gap-3">
                <X className="w-5 h-5 text-red-500" />
                <span>Környezetszennyező papír és festék használat</span>
              </li>
              <li className="flex items-center gap-3">
                <X className="w-5 h-5 text-red-500" />
                <span>Statikus információk, nem frissíthető</span>
              </li>
              <li className="flex items-center gap-3">
                <X className="w-5 h-5 text-red-500" />
                <span>Korlátozott információmennyiség</span>
              </li>
            </ul>
          </div>
          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-8 rounded-xl shadow-sm text-white">
            <h3 className="text-xl font-semibold mb-6">Digitális névjegykártya</h3>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-300" />
                <span>Egyszeri befektetés, korlátlan megosztás</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-300" />
                <span>Környezetbarát, papírmentes megoldás</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-300" />
                <span>Részletes üzleti profil és portfólió</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-green-300" />
                <span>Korlátlan tartalom és média lehetőségek</span>
              </li>
            </ul>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-12">
          <Link to="/guide">
            <Button variant="outline" className="w-full sm:w-auto">
              Részletes útmutató
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link to="/vcard">
            <Button className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
              Digitális névjegyet készítek
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;