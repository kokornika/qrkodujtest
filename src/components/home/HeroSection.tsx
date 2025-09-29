import React, { useEffect, useState } from 'react';
import { CreditCard, ArrowRight, Star, Users, Leaf, QrCode, Smartphone, Share2, CheckCircle, Battery, Wifi, Signal } from 'lucide-react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';

const HeroSection = () => {
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
    <section className="relative min-h-[100vh] flex items-center justify-center pt-16 pb-8 overflow-hidden">
      {/* Background with overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat bg-fixed"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80')"
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/95 via-blue-900/98 to-purple-900/95" />
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03]" />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}
          <div className="text-center lg:text-left space-y-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-white/90 text-sm">Több mint 300+ elégedett ügyfél</span>
            </div>
            
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Digitális Névjegykártya<br/>
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
                  QR Kóddal
                </span>
              </h1>
              
              <p className="text-lg sm:text-xl text-indigo-100/90 leading-relaxed">
                Modern, környezetbarát alternatíva a hagyományos névjegykártyáknak. 
                Egy QR kód beolvasásával azonnal megoszthatja kapcsolati adatait.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/vcard">
                <Button 
                  className="w-full sm:w-auto h-14 px-8 text-lg font-semibold bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-xl hover:shadow-2xl transition-all rounded-xl border-2 border-white/30 hover:scale-[1.02]"
                >
                  <QrCode className="mr-2 h-5 w-5" />
                  Készítse el most!
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/guide">
                <Button 
                  className="w-full sm:w-auto h-14 text-base text-white/90 hover:text-white bg-white/10 hover:bg-white/20 border border-white/30 rounded-xl transition-all"
                >
                  Hogyan működik?
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>

            <div className="pt-8 border-t border-white/10">
              <p className="text-white/80 text-sm mb-4">Csatlakozzon elégedett ügyfeleinkhez</p>
              <div className="flex flex-wrap gap-6 text-white/60 text-sm">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span>4.9/5 értékelés</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>300+ aktív felhasználó</span>
                </div>
                <div className="flex items-center gap-2">
                  <Leaf className="w-4 h-4 text-green-400" />
                  <span>100% környezetbarát</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Interactive phone animation */}
          <div className="relative flex justify-center lg:justify-end">
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
        </div>
      </div>
    </section>
  );
};

export default HeroSection;