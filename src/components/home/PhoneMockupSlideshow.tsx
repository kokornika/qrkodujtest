import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode.react';
import {
  QrCode,
  Edit3,
  Share2,
  Check,
  CheckCircle,
  Battery,
  Wifi,
  Signal,
  Phone,
  Mail,
  ChevronDown,
} from 'lucide-react';

type Slide = {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  iconBackground: string;
  title: string;
  subtitle: string;
};

const slides: Slide[] = [
  {
    icon: Edit3,
    iconBackground: 'linear-gradient(135deg, #4F46E5 0%, #2563EB 100%)',
    title: 'Hozd létre a kártyádat',
    subtitle: 'Add meg az adataidat, válassz színt — kész a digitális névjegyed',
  },
  {
    icon: QrCode,
    iconBackground: '#2563EB',
    title: 'Megkapod a digitális névjegyed',
    subtitle: 'Egyedi QR kóddal ellátott névjegy, amit bárhol megmutathatsz',
  },
  {
    icon: Share2,
    iconBackground: '#16A34A',
    title: 'Mutasd fel, ők beolvassák',
    subtitle: 'Találkozókon, eseményeken egy mozdulattal megoszthatod',
  },
  {
    icon: Check,
    iconBackground: 'linear-gradient(135deg, #F97316 0%, #EAB308 100%)',
    title: 'Kapcsolat elmentve',
    subtitle: 'A másik fél azonnal elmenti a kontaktod — papír nélkül, örökre',
  },
];

const PhoneMockupSlideshow: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        setIsAnimating(false);
      }, 300);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const activeSlide = slides[currentSlide];
  const ActiveIcon = activeSlide.icon;

  return (
    <div className="relative">
      {/* Phone mockup */}
      <div className="relative w-80 h-[600px] bg-gray-900 rounded-[3rem] p-2 shadow-2xl">
        <div className="w-full h-full bg-black rounded-[2.5rem] overflow-hidden relative">
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
              {/* Slide indicator */}
              <div className="flex justify-center mb-6">
                <div className="flex space-x-2">
                  {slides.map((_, index) => (
                    <div
                      key={index}
                      className={`h-2 rounded-full transition-all duration-500 ${
                        index === currentSlide ? 'w-6 bg-blue-500' : 'w-2 bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Animated slide content */}
              <div
                className={`text-center space-y-4 transition-all duration-300 ease-out ${
                  isAnimating ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
                }`}
              >
                <div
                  className="w-20 h-20 mx-auto rounded-full flex items-center justify-center shadow-lg"
                  style={{ background: activeSlide.iconBackground }}
                >
                  <ActiveIcon className="w-10 h-10 text-white" strokeWidth={2.5} />
                </div>

                <div className="space-y-1.5 px-2">
                  <h3 className="text-lg font-bold text-gray-900 leading-snug">
                    {activeSlide.title}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{activeSlide.subtitle}</p>
                </div>

                <div className="pt-2">
                  {currentSlide === 0 && (
                    <div className="space-y-1.5">
                      <div className="bg-white rounded-xl shadow-md px-3 py-2 border border-gray-100 text-left">
                        <div className="text-[9px] text-gray-400 uppercase tracking-wider font-semibold mb-1">
                          Név
                        </div>
                        <div className="flex items-center px-2 py-1 bg-indigo-50/60 rounded-md border border-indigo-300 ring-2 ring-indigo-100">
                          <span className="text-xs text-gray-800 font-medium">Kovács József</span>
                          <span className="ml-0.5 w-[2px] h-3 bg-indigo-600 animate-pulse" />
                        </div>
                      </div>

                      <div className="flex justify-center">
                        <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center">
                          <ChevronDown className="w-3.5 h-3.5 text-indigo-600" strokeWidth={2.5} />
                        </div>
                      </div>

                      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
                        <div
                          className="px-3 py-3 text-center"
                          style={{ background: 'linear-gradient(135deg, #4F46E5 0%, #2563EB 100%)' }}
                        >
                          <div className="w-10 h-10 mx-auto rounded-full bg-white shadow-md flex items-center justify-center text-indigo-700 font-bold text-sm mb-1">
                            KJ
                          </div>
                          <h4 className="text-white font-semibold text-xs leading-tight">
                            Kovács József
                          </h4>
                          <p className="text-white/85 text-[10px] leading-tight">
                            Ügyvezető · Tech Kft.
                          </p>
                        </div>
                        <div className="px-2.5 py-2 space-y-1">
                          <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-indigo-50">
                            <Phone className="w-2.5 h-2.5 text-indigo-600 shrink-0" />
                            <span className="text-[9px] text-gray-700">+36 30 123 4567</span>
                          </div>
                          <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-indigo-50">
                            <Mail className="w-2.5 h-2.5 text-indigo-600 shrink-0" />
                            <span className="text-[9px] text-gray-700">jozsef@techkft.hu</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {currentSlide === 1 && (
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
                      <div
                        className="px-3 py-2.5 text-center"
                        style={{ background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)' }}
                      >
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-white shadow flex items-center justify-center text-blue-700 font-bold text-[10px]">
                            KJ
                          </div>
                          <div className="text-left">
                            <h4 className="text-white font-semibold text-[11px] leading-tight">
                              Kovács József
                            </h4>
                            <p className="text-white/85 text-[9px] leading-tight">
                              Ügyvezető · Tech Kft.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="px-4 py-3 flex flex-col items-center">
                        <div className="p-2 bg-white rounded-lg ring-1 ring-gray-200">
                          <QRCode
                            value="https://qrnevjegy.hu"
                            size={96}
                            level="M"
                            renderAs="svg"
                            fgColor="#1F2937"
                            bgColor="#FFFFFF"
                          />
                        </div>
                        <p className="text-[9px] text-gray-500 mt-2">
                          Olvasd be a névjegy mentéséhez
                        </p>
                      </div>
                    </div>
                  )}

                  {currentSlide === 2 && (
                    <div className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100">
                      <div className="relative w-28 h-28 mx-auto bg-gray-900 rounded-lg overflow-hidden mb-3">
                        <QrCode
                          className="absolute inset-3 w-[calc(100%-1.5rem)] h-[calc(100%-1.5rem)] text-white/25"
                          strokeWidth={1.5}
                        />
                        <div className="absolute top-1.5 left-1.5 w-4 h-4 border-t-2 border-l-2 border-green-400" />
                        <div className="absolute top-1.5 right-1.5 w-4 h-4 border-t-2 border-r-2 border-green-400" />
                        <div className="absolute bottom-1.5 left-1.5 w-4 h-4 border-b-2 border-l-2 border-green-400" />
                        <div className="absolute bottom-1.5 right-1.5 w-4 h-4 border-b-2 border-r-2 border-green-400" />
                        <div
                          className="absolute left-2 right-2 h-0.5 bg-green-400 animate-hero-scan"
                          style={{ boxShadow: '0 0 8px rgba(74, 222, 128, 0.9)' }}
                        />
                      </div>
                      <p className="text-gray-800 text-sm font-semibold">Beolvasás folyamatban...</p>
                    </div>
                  )}

                  {currentSlide === 3 && (
                    <div className="bg-white rounded-2xl p-5 shadow-lg border border-gray-100">
                      <div className="w-14 h-14 bg-green-500 rounded-full mx-auto mb-3 flex items-center justify-center shadow-md">
                        <Check className="w-8 h-8 text-white" strokeWidth={3} />
                      </div>
                      <p className="text-gray-900 font-bold text-sm">Sikeres!</p>
                      <p className="text-gray-500 text-xs mt-0.5">Kapcsolat mentve</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating element */}
      <div className="absolute top-2 right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center animate-bounce shadow-lg">
        <CheckCircle className="w-5 h-5 text-white" />
      </div>
    </div>
  );
};

export default PhoneMockupSlideshow;
