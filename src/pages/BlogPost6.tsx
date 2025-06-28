import React from 'react';
import { Smartphone } from 'lucide-react';
import BlogCTA from '../components/blog/BlogCTA';

const BlogPost6 = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          Digitális Névjegykártya és QR Kód Trendek 2025-ben
        </h1>

        <div className="flex items-center text-gray-600 mb-8">
          <Smartphone className="w-5 h-5 mr-2" />
          <span>7 perc olvasás</span>
        </div>

        <div className="prose prose-lg max-w-none">
          <img
            src="https://images.unsplash.com/photo-1581094651308-968f0c8385e9?auto=format&fit=crop&q=80&w=1200&h=600"
            alt="2025 digitális trendek"
            className="w-full rounded-xl mb-8"
          />

          <h2>Új technológiák és lehetőségek</h2>
          <p>
            A következő években a digitális névjegykártyák és a QR kódok szerepe tovább erősödik.
            A felhőalapú megoldások és a mobilfizetési integrációk mind hozzájárulnak ahhoz,
            hogy a kapcsolatépítés még egyszerűbb és hatékonyabb legyen.
          </p>

          <h2>Miért fontos követni a trendeket?</h2>
          <p>
            Azok a vállalkozások, amelyek időben alkalmazkodnak az újításokhoz,
            versenyelőnyre tehetnek szert. A 2025-ös trendek bemutatják, hogyan használhatjuk ki
            a legújabb technológiákat a márkaépítés és a networking területén.
          </p>
        </div>

        <BlogCTA />
      </article>
    </div>
  );
};

export default BlogPost6;
