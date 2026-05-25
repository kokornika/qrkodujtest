import { ArrowRight, Star, Users, Leaf, QrCode } from 'lucide-react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';
import PhoneMockupSlideshow from './PhoneMockupSlideshow';

const HeroSection = () => {
  return (
    <section className="relative min-h-[100vh] flex items-center justify-center pt-16 pb-8 overflow-hidden">
      {/* Background gradient */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 50%, #2563EB 100%)'
        }}
      >
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
            <PhoneMockupSlideshow />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;