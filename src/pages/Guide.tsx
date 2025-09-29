import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  QrCode, 
  Save, 
  ArrowRight,
  Globe,
  Shield,
  RefreshCw,
  Share2,
  MessageSquare,
  Send,
  Smartphone,
  Users,
  Briefcase,
  CheckCircle,
  Battery,
  Wifi,
  Signal
} from 'lucide-react';
import { Button } from '../components/ui/button';

const Guide = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const steps = [
    { icon: QrCode, text: "QR kód beolvasása", color: "from-blue-500 to-cyan-500" },
    { icon: Smartphone, text: "Digitális névjegy megnyitása", color: "from-purple-500 to-pink-500" },
    { icon: Share2, text: "Kapcsolatok megosztása", color: "from-green-500 to-emerald-500" },
    { icon: CheckCircle, text: "Sikeres kapcsolatfelvétel", color: "from-yellow-500 to-orange-500" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep((prev) => (prev + 1) % steps.length);
        setIsAnimating(false);
      }, 300);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pt-0">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-white to-gray-50 pt-12 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-left max-w-3xl">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              Hogyan működik a digitális névjegykártya?
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Ismerje meg a modern névjegykezelés két egyszerű módját!
            </p>
          </div>
        </div>
      </section>

      {/* Two Methods Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-left mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Hogyan osztható meg a digitális névjegykártya?
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Personal Meeting Method */}
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold">1. Személyes találkozón</h3>
                </div>

                <div className="space-y-6">
                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <QrCode className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Mutassa meg QR kódját</h4>
                        <p className="text-gray-600 text-sm">
                          Nyissa meg digitális névjegyét és mutassa meg a QR kódot partnerének.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Smartphone className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Ügyfele/Partnere beolvassa azt</h4>
                        <p className="text-gray-600 text-sm">
                          Partnere telefonja kamerájával beolvassa a QR kódot.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Save className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Azonnali mentés</h4>
                        <p className="text-gray-600 text-sm">
                          Egy kattintással elmenti névjegyét a telefonkönyvébe.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Online Sharing Method */}
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <Globe className="w-6 h-6 text-indigo-600" />
                  </div>
                  <h3 className="text-xl font-semibold">2. Online megosztás</h3>
                </div>

                <div className="space-y-6">
                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Share2 className="w-5 h-5 text-indigo-600" />
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Válasszon csatornát (Megosztás gomb)</h4>
                        <div className="grid grid-cols-3 gap-3 mt-3">
                          <div className="text-center">
                            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mx-auto mb-1">
                              <MessageSquare className="w-5 h-5 text-blue-600" />
                            </div>
                            <span className="text-xs text-gray-600">SMS</span>
                          </div>
                          <div className="text-center">
                            <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center mx-auto mb-1">
                              <Send className="w-5 h-5 text-purple-600" />
                            </div>
                            <span className="text-xs text-gray-600">Email</span>
                          </div>
                          <div className="text-center">
                            <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center mx-auto mb-1">
                              <Share2 className="w-5 h-5 text-green-600" />
                            </div>
                            <span className="text-xs text-gray-600">Közösségi</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Globe className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Partner megnyitja a kapott linket</h4>
                        <p className="text-gray-600 text-sm">
                          A kapott linkre kattintva megnyílik digitális névjegye.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Save className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Egy kattintásos mentés</h4>
                        <p className="text-gray-600 text-sm">
                          Partnere azonnal elmentheti névjegyét a telefonkönyvébe.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Desktop CTA - Hidden on mobile */}
              <div className="hidden lg:block bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-8 text-white">
                <h3 className="text-xl font-semibold mb-4">
                  Készítse el saját digitális névjegykártyáját most!
                </h3>
                <p className="text-blue-100 mb-6">
                  Próbálja ki professzionális névjegykártya készítő szolgáltatásunkat és tegye egyszerűbbé üzleti kapcsolatépítését.
                </p>
                <Link to="/vcard">
                  <Button className="w-full sm:w-auto bg-white text-blue-600 hover:bg-blue-50">
                    Névjegykártya készítése
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Phone Preview */}
            <div className="lg:sticky lg:top-16 lg:self-start h-fit">
              <div className="lg:ml-auto lg:w-80 lg:z-10">
                <div className="relative">
                  {/* Phone mockup */}
                  <div className="relative w-80 h-[600px] bg-gray-900 rounded-[3rem] p-2 shadow-2xl">
                    <div className="w-full h-full bg-black rounded-[2.5rem] overflow-hidden relative">
                      {/* Phone screen content */}
                      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-gray-100">
                        {/* Status bar */}
                        <div className="flex justify-between items-center px-6 py-3 text-black text-sm font-medium">
                          <span>9:41</span>
                          <div className="flex items-center gap-1">
                            <Signal className="w-4 h-3" />
                            <Wifi className="w-4 h-3" />
                            <Battery className="w-6 h-3" />
                          </div>
                        </div>

                        {/* Main content area */}
                        <div className="px-6 py-4 h-full">
                          {/* Step indicator */}
                          <div className="flex justify-center mb-8">
                            <div className="flex space-x-2">
                              {steps.map((_, index) => (
                                <div
                                  key={index}
                                  className={`w-3 h-3 rounded-full transition-all duration-500 ${
                                    index === currentStep 
                                      ? 'bg-blue-500 scale-125' 
                                      : index < currentStep 
                                        ? 'bg-green-500' 
                                        : 'bg-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>

                          {/* Animated content */}
                          <div className="text-center space-y-6">
                            {/* Current step icon and text */}
                            <div className={`transition-all duration-500 ${isAnimating ? 'scale-110 opacity-70' : 'scale-100 opacity-100'}`}>
                              <div className={`w-24 h-24 mx-auto rounded-full bg-gradient-to-r ${steps[currentStep].color} flex items-center justify-center mb-4 shadow-lg`}>
                                {React.createElement(steps[currentStep].icon, { 
                                  className: "w-12 h-12 text-white" 
                                })}
                              </div>
                              <h3 className="text-xl font-bold text-gray-800 mb-2">
                                {steps[currentStep].text}
                              </h3>
                            </div>

                            {/* Phone mockup content based on step */}
                            {currentStep === 0 && (
                              <div className="bg-white rounded-2xl p-6 shadow-lg">
                                <div className="w-32 h-32 mx-auto bg-black rounded-lg flex items-center justify-center mb-4">
                                  <QrCode className="w-16 h-16 text-white" />
                                </div>
                                <p className="text-gray-600 text-sm">QR kód beolvasása...</p>
                              </div>
                            )}

                            {currentStep === 1 && (
                              <div className="bg-white rounded-2xl p-6 shadow-lg">
                                <div className="w-16 h-16 bg-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                                  <span className="text-white font-bold text-lg">JD</span>
                                </div>
                                <h4 className="font-bold text-gray-800 mb-1">János Dobos</h4>
                                <p className="text-gray-600 text-sm mb-3">Marketing Manager</p>
                                <div className="space-y-2">
                                  <div className="flex items-center justify-center gap-2 text-sm">
                                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                    <span className="text-gray-600">+36 30 123 4567</span>
                                  </div>
                                  <div className="flex items-center justify-center gap-2 text-sm">
                                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                    <span className="text-gray-600">janos@cegem.hu</span>
                                  </div>
                                </div>
                              </div>
                            )}

                            {currentStep === 2 && (
                              <div className="bg-white rounded-2xl p-6 shadow-lg">
                                <div className="flex justify-center space-x-4 mb-4">
                                  {/* LinkedIn */}
                                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                    </svg>
                                  </div>
                                  {/* Facebook */}
                                  <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                    </svg>
                                  </div>
                                  {/* Instagram */}
                                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 rounded-lg flex items-center justify-center">
                                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                    </svg>
                                  </div>
                                </div>
                                <p className="text-gray-600 text-sm">Közösségi média linkek</p>
                              </div>
                            )}

                            {currentStep === 3 && (
                              <div className="bg-white rounded-2xl p-6 shadow-lg">
                                <div className="w-16 h-16 bg-green-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                                  <CheckCircle className="w-8 h-8 text-white" />
                                </div>
                                <h4 className="font-bold text-gray-800 mb-1">Sikeres!</h4>
                                <p className="text-gray-600 text-sm">Kapcsolat mentve</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Floating elements */}
                  <div className="absolute top-2 right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center animate-bounce shadow-lg">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>
              
              {/* Mobile CTA - Only visible on mobile */}
              <div className="lg:hidden mt-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-8 text-white">
                <h3 className="text-xl font-semibold mb-4">
                  Készítse el saját digitális névjegykártyáját most!
                </h3>
                <p className="text-blue-100 mb-6">
                  Próbálja ki professzionális névjegykártya készítő szolgáltatásunkat és tegye egyszerűbbé üzleti kapcsolatépítését.
                </p>
                <Link to="/vcard">
                  <Button className="w-full sm:w-auto bg-white text-blue-600 hover:bg-blue-50">
                    Névjegykártya készítése
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Impact Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-left mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Professzionális megjelenés minden helyzetben
            </h2>
            <p className="text-lg text-gray-600">
              Tegye egyedivé és hatékonnyá üzleti kapcsolatépítését
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Briefcase className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Modern üzleti megjelenés</h3>
              <p className="text-gray-600">
                Tükrözze vállalkozása innovatív szemléletét digitális névjegyével
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <RefreshCw className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Mindig naprakész</h3>
              <p className="text-gray-600">
                Frissítse adatait bármikor, partnerei mindig az aktuális információkat látják
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Megbízható tárolás</h3>
              <p className="text-gray-600">
                Biztonságos és professzionális megoldás üzleti kapcsolatai kezelésére
              </p>
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