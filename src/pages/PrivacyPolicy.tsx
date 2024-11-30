import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article className="bg-white rounded-2xl shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Adatkezelési és Cookie Tájékoztató</h1>

          <div className="prose prose-lg">
            {/* ... existing privacy policy content ... */}

            <h2>Cookie (süti) kezelés</h2>
            <p>
              Weboldalunk cookie-kat (sütiket) használ a felhasználói élmény javítása és 
              bizonyos funkciók biztosítása érdekében.
            </p>

            <h3>Mik azok a cookie-k?</h3>
            <p>
              A cookie-k olyan kis méretű szöveges fájlok, amelyeket a weboldal az Ön 
              eszközén tárol. Ezek segítenek minket abban, hogy:
            </p>
            <ul>
              <li>Megjegyezzük az Ön beállításait</li>
              <li>Javítsuk a weboldal teljesítményét</li>
              <li>Megfelelő felhasználói élményt biztosítsunk</li>
            </ul>

            <h3>Milyen cookie-kat használunk?</h3>
            <p>Weboldalunk az alábbi típusú cookie-kat használja:</p>
            
            <h4>Feltétlenül szükséges cookie-k</h4>
            <p>
              Ezek a cookie-k elengedhetetlenek a weboldal működéséhez. Ide tartoznak 
              például a bejelentkezési adatok és a biztonsági cookie-k.
            </p>

            <h4>Teljesítmény cookie-k</h4>
            <p>
              Ezek segítenek nekünk megérteni, hogyan használják a látogatók a 
              weboldalunkat, és hogyan javíthatjuk a felhasználói élményt.
            </p>

            <h4>Funkcionális cookie-k</h4>
            <p>
              Ezek lehetővé teszik, hogy a weboldal emlékezzen az Ön választásaira 
              (például nyelvi beállítások) és személyre szabottabb funkciókat kínáljon.
            </p>

            <h3>Cookie-k kezelése</h3>
            <p>
              Ön bármikor módosíthatja vagy visszavonhatja a cookie-k használatához 
              adott hozzájárulását. A legtöbb böngésző lehetővé teszi a cookie-k 
              kezelését a beállításokban.
            </p>

            <h3>Cookie-k élettartama</h3>
            <p>
              A cookie-k érvényességi ideje változó. Vannak munkamenet cookie-k, 
              amelyek csak az adott böngészési munkamenet idejére szólnak, és vannak 
              tartós cookie-k, amelyek hosszabb ideig tárolódnak az Ön eszközén.
            </p>
          </div>
        </article>
      </div>
    </div>
  );
};

export default PrivacyPolicy;