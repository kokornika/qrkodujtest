import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import HeroSection from './home/HeroSection';
import BusinessAdvantages from './home/BusinessAdvantages';
import ComparisonSection from './home/ComparisonSection';
import BenefitsSection from './BenefitsSection';
import FAQSection from './home/FAQSection';
import ROICalculator from './home/ROICalculator';
import SEO from './SEO';

const latestPosts = [
  {
    slug: 'qr-kod-nevjegykartya-keszites-minden-amit-tudni-kell',
    title: 'QR kód névjegykártya készítés: minden amit tudni kell (2025)',
    excerpt: 'QR kód névjegykártya készítés A-tól Z-ig. Statikus és dinamikus kódok közti döntő különbség.',
    readTime: '20 perc',
  },
  {
    slug: 'digitalis-nevjegykartyak-10-legnagyobb-elonye-vallalkozasoknak',
    title: 'A digitális névjegykártyák 10 legnagyobb előnye vállalkozásoknak',
    excerpt: 'Költségcsökkentés, mérhető ROI, és hatékonyabb marketing egyetlen eszközben.',
    readTime: '18 perc',
  },
  {
    slug: 'digitalis-nevjegykartya-vs-hagyomanyos-nevjegy-osszehasonlitas',
    title: 'Digitális névjegykártya vs. hagyományos névjegy: teljes összehasonlítás',
    excerpt: 'Mélyreható elemzés: költség, ROI, hatékonyság. Döntsön adatok alapján.',
    readTime: '15 perc',
  },
];

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 overflow-hidden">
      <SEO
        title="Digitális Névjegykártya QR Kóddal | QRNevjegy"
        description="Professzionális digitális névjegykártya QR kóddal. Modern, környezetbarát megoldás vállalkozásoknak. Készítse el saját névjegyét most!"
      />
      <HeroSection />
      <BusinessAdvantages />
      <ComparisonSection />
      <ROICalculator />
      <BenefitsSection />
      <FAQSection />

      {/* Legújabb cikkeink */}
      <section className="py-12 sm:py-16 bg-white px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">Legújabb cikkeink</h2>
            <p className="text-gray-600">Hasznos tippek és útmutatók a digitális névjegykártyák világából</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestPosts.map((post) => (
              <article key={post.slug} className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  <Link to={`/blog/${post.slug}`} className="hover:text-indigo-600">
                    {post.title}
                  </Link>
                </h3>
                <p className="text-gray-600 text-sm mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">{post.readTime} olvasás</span>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="text-indigo-600 hover:text-indigo-700 font-medium inline-flex items-center"
                  >
                    Tovább <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/blog" className="text-indigo-600 hover:text-indigo-700 font-medium inline-flex items-center">
              Összes cikk megtekintése <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Mobile-optimized CTA Section */}
      <section className="py-8 sm:py-16 bg-gradient-to-b from-gray-50 to-white px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">
            Készítsen digitális névjegykártyát még ma!
          </h2>
          <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8">
            Csatlakozzon azokhoz, akik már felfedezték a digitális névjegykártyák előnyeit.
            Modern megoldásunk segít az üzleti kapcsolatok hatékony építésében.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center sm:gap-4">
            <Link
              to="/guide"
              className="flex items-center justify-center px-6 py-4 sm:py-3 rounded-xl sm:rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl"
            >
              Részletes útmutató
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/vcard"
              className="flex items-center justify-center px-6 py-4 sm:py-3 rounded-xl sm:rounded-lg border-2 border-blue-600 text-blue-600 font-medium hover:bg-blue-50 transition-all"
            >
              Azonnali névjegykártya készítés
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
