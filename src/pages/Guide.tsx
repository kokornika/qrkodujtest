import React from 'react';
import { Link } from 'react-router-dom';
import { 
  QrCode, 
  Zap, 
  Clock, 
  Save, 
  Check, 
  Phone, 
  Mail, 
  MapPin,
  ArrowRight,
  Globe,
  Shield,
  RefreshCw,
  Share2
} from 'lucide-react';
import { Button } from '../components/ui/button';

const Guide = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white to-gray-50 pt-12 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              Hogyan működik a digitális névjegykártya?
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Részletes útmutató a digitális névjegykártya használatához és előnyeihez
            </p>
            <div className="flex justify-center gap-4">
              <Link to="/vcard">
                <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                  Digitális névjegyet készítek
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Process Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              Digitális névjegykártya: A modern kapcsolatépítés eszköze
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Hozza létre saját digitális névjegykártyáját, amely azonnal elérhető az interneten és QR kóddal pillanatok alatt beolvasható
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Globe className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Online névjegykártya</h3>
                    <p className="text-gray-600">
                      Adja meg adatait, és mi létrehozunk egy professzionális online névjegykártyát, 
                      amely bármikor elérhető az interneten keresztül.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Share2 className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Egyszerű megosztás</h3>
                    <p className="text-gray-600">
                      Ossza meg névjegyét e-mailben, közösségi médián vagy személyesen 
                      a beépített QR kód segítségével.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <RefreshCw className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Mindig naprakész</h3>
                    <p className="text-gray-600">
                      Frissítse adatait bármikor, és a változások azonnal megjelennek 
                      minden megosztott névjegyen.
                    </p>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <Link to="/vcard">
                  <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                    Elkészítem a névjegyem
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Phone Preview */}
            <div className="relative mx-auto" style={{ maxWidth: '320px' }}>
              <div className="relative border-[12px] border-black rounded-[3rem] shadow-xl">
                <div className="relative bg-gray-50 h-[600px] overflow-hidden rounded-[2rem]">
                  <div className="animate-scan-steps">
                    {/* Step 1: QR Code Scanner */}
                    <div className="scan-step">
                      <div className="bg-black p-4">
                        <div className="text-center text-sm font-medium text-white">QR Kód Beolvasása</div>
                      </div>
                      <div className="relative p-4">
                        <div className="w-full aspect-square bg-black/5 rounded-lg flex items-center justify-center">
                          <QrCode className="w-32 h-32 text-gray-400" />
                          <div className="absolute inset-0 animate-scanning-line"></div>
                        </div>
                      </div>
                    </div>

                    {/* Step 2: Contact Preview */}
                    <div className="scan-step">
                      <div className="bg-black p-4">
                        <div className="text-center text-sm font-medium text-white">Névjegy Előnézet</div>
                      </div>
                      <div className="p-4">
                        <div className="bg-white rounded-xl p-4 shadow-sm">
                          <div className="flex items-center gap-4 mb-4">
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-50 rounded-full flex items-center justify-center">
                              <span className="text-2xl font-semibold text-blue-600">MJ</span>
                            </div>
                            <div>
                              <div className="font-medium">Minta János</div>
                              <div className="text-sm text-gray-500">Ügyvezető</div>
                            </div>
                          </div>
                          <div className="space-y-3">
                            <div className="flex items-center gap-2 text-sm">
                              <Phone className="w-4 h-4 text-gray-400" />
                              <span>+36 30 123 4567</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Mail className="w-4 h-4 text-gray-400" />
                              <span>janos@minta.hu</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <MapPin className="w-4 h-4 text-gray-400" />
                              <span>Budapest, Minta u. 1.</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Step 3: Save Contact */}
                    <div className="scan-step">
                      <div className="bg-black p-4">
                        <div className="text-center text-sm font-medium text-white">Névjegy Mentése</div>
                      </div>
                      <div className="p-8">
                        <div className="text-center">
                          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Check className="w-10 h-10 text-green-500" />
                          </div>
                          <div className="font-medium text-lg mb-2">Névjegy sikeresen mentve!</div>
                          <p className="text-sm text-gray-500 mb-6">
                            Az összes kapcsolati adat mentésre került a telefonkönyvbe
                          </p>
                          <button className="w-full bg-black text-white py-3 rounded-xl font-medium">
                            Rendben
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Phone Buttons */}
              <div className="absolute right-0 top-24 w-1 h-12 bg-black rounded-l-lg"></div>
              <div className="absolute left-0 top-20 w-1 h-8 bg-black rounded-r-lg"></div>
              <div className="absolute left-0 top-32 w-1 h-8 bg-black rounded-r-lg"></div>
            </div>
          </div>
        </div>
      </section>

      {/* QR Code Scanning Steps */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Villámgyors névjegy importálás QR kóddal
            </h2>
            <p className="text-lg text-gray-600">
              Egyetlen szkennelés, és az összes kapcsolati adat azonnal mentésre kerül
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">1. Szkennelje be a QR kódot</h3>
              <p className="text-gray-600 mb-4">
                Nyissa meg telefonja kameráját és irányítsa a QR kódra
              </p>
              <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded">
                &lt; 1 másodperc
              </span>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">2. Automatikus felismerés</h3>
              <p className="text-gray-600 mb-4">
                A telefon azonnal felismeri és feldolgozza a névjegykártya adatait
              </p>
              <span className="inline-block bg-green-100 text-green-800 text-xs font-medium px-2.5 py-1 rounded">
                1-2 másodperc
              </span>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Save className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">3. Azonnali mentés</h3>
              <p className="text-gray-600 mb-4">
                Egy kattintással mentse el a kapcsolatot a telefonjába
              </p>
              <span className="inline-block bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-1 rounded">
                2-3 másodperc
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Készítse el saját digitális névjegykártyáját most!
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Csatlakozzon a modern üzleti világhoz és tegye egyszerűbbé kapcsolatai kezelését
          </p>
          <Link to="/vcard">
            <Button className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-8 py-3">
              Névjegykártya készítése
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Guide;