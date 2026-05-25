import React from 'react';
import { ArrowRight, Clock, Calendar } from 'lucide-react';
import BlogCTA from '../components/blog/BlogCTA';
import SEO from '../components/SEO';

const BlogPost11 = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <SEO
        title="QR Kód Névjegykártya Készítés: Útmutató Vállalkozóknak | QRNevjegy"
        description="Hogyan készítsen QR kódos névjegykártyát percek alatt? Lépésről lépésre útmutató vállalkozóknak — költségek, beállítások, tippek."
        article={true}
      />
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Schema.org Article markup */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "QR Kód Névjegykártya Készítés: Útmutató Vállalkozóknak",
            "description": "Hogyan készítsen QR kódos névjegykártyát percek alatt? Lépésről lépésre útmutató vállalkozóknak — költségek, beállítások, tippek.",
            "image": "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&q=70&fm=webp",
            "datePublished": "2026-05-23",
            "dateModified": "2026-05-23",
            "author": {
              "@type": "Organization",
              "name": "QRNevjegy"
            },
            "publisher": {
              "@type": "Organization",
              "name": "QRNevjegy",
              "logo": {
                "@type": "ImageObject",
                "url": "https://qrnevjegy.hu/logo.png"
              }
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://qrnevjegy.hu/blog/qr-kod-nevjegykartya-keszites-utmutato"
            }
          })}
        </script>

        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          QR Kód Névjegykártya Készítés: Útmutató Vállalkozóknak
        </h1>

        <div className="flex items-center text-gray-600 mb-8 space-x-4">
          <div className="flex items-center">
            <Clock className="w-5 h-5 mr-2" />
            <span>8 perc olvasás</span>
          </div>
          <div className="flex items-center">
            <Calendar className="w-5 h-5 mr-2" />
            <span>2026</span>
          </div>
        </div>

        <div className="prose prose-lg max-w-none">
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 border-l-4 border-purple-400 p-6 mb-8">
            <p className="text-lg text-purple-800 font-medium mb-2">
              Egy üzleti találkozón tíz másodperce van arra, hogy első benyomást keltsen.
            </p>
            <p className="text-purple-700">
              A hagyományos papír névjegykártya átadása ebből a tíz másodpercből legalább ötöt elvesz — keresgélés a tárcában, a kártya átnyújtása, esetleges magyarázkodás. A digitális névjegykártya másképp működik: előveszi a telefonját, megmutatja a képernyőt, a másik fél beszkenneli — kész. Az összes adata azonnal a telefonjában van, elmenthető egy kattintással.
            </p>
          </div>

          <p>
            Ez a cikk megmutatja, hogyan készíthet QR kódos névjegykártyát percek alatt, mire figyeljen a beállításoknál, és hogyan használja hatékonyan a mindennapi munkában.
          </p>

          <h2>Mi az a QR kódos digitális névjegykártya?</h2>

          <p>
            A digitális névjegykártya egy egyedi webes profil, ami tartalmazza az összes kapcsolati adatát: nevét, telefonszámát, e-mail címét, weboldalát, közösségi média profiljait. Ehhez a profilhoz tartozik egy egyedi QR kód — ezt megmutatva bárki azonnal eléri az adatait.
          </p>

          <p>
            A különbség a hagyományos papír névjeggyel szemben nem csupán technikai. A digitális verzió:
          </p>

          <ul>
            <li><strong>Mindig naprakész</strong> — ha megváltozik a telefonszáma vagy a pozíciója, egy helyen frissíti, és az összes korábban megosztott QR kód automatikusan az új adatokat fogja mutatni</li>
            <li><strong>Tárolható</strong> — a telefon névjegyzékébe mentve marad, nem gyűrődik össze a pénztárcában</li>
            <li><strong>Mérhető</strong> — látja, hányszor szkennelték be a kódját, mikor és honnan</li>
          </ul>

          <h2>Mennyibe kerül egy QR kódos névjegykártya?</h2>

          <p>
            Sokan azt feltételezik, hogy a digitális névjegykártya drágább, mint a papír. A valóság fordított.
          </p>

          <p>
            Egy 50 darabos papír névjegykártya nyomtatása Magyarországon átlagosan 8&nbsp;000–15&nbsp;000 forintba kerül — és ezt minden egyes alkalommal meg kell ismételni, ha megváltoznak az adatok, vagy elfogy a készlet. Egy aktív networker évente 2-3 alkalommal nyomtat, ami évi 20&nbsp;000–45&nbsp;000 forint.
          </p>

          <p>
            Egy digitális névjegykártya éves előfizetése ennek töredéke — és korlátlan számú megosztást tesz lehetővé.
          </p>

          <img
            src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=70&fm=webp"
            alt="Digitális névjegykártya QR kóddal és hagyományos papír névjegy összehasonlítása"
            className="w-full rounded-xl my-8"
            loading="lazy"
            decoding="async"
          />

          <h2>Hogyan készítsen QR kódos névjegykártyát? Lépésről lépésre</h2>

          <h3>1. lépés: Gyűjtse össze az adatait</h3>

          <p>Mielőtt nekiáll, készítse elő az alábbiakat:</p>

          <ul>
            <li>Teljes neve és pozíciója</li>
            <li>Cégneve (ha releváns)</li>
            <li>Telefonszáma — gondolja át, mobilszámot vagy irodai számot adjon meg</li>
            <li>E-mail cím — lehetőleg vállalati, nem gmail</li>
            <li>Weboldal URL</li>
            <li>LinkedIn profil és egyéb közösségi média, amit szakmailag használ</li>
            <li>Profilfotó — lehetőleg semleges háttér előtt készült, professzionális kép</li>
          </ul>

          <h3>2. lépés: Töltse ki a névjegykártya adatlapot</h3>

          <p>
            A qrnevjegy.hu felületén a névjegykártya-készítő egyetlen oldalon kéri be az összes adatot. Nincs szükség regisztrációra az előnézet megtekintéséhez — azonnal látja, hogyan fog kinézni a kész kártya.
          </p>
          <p>
            A kitöltés közben a jobb oldalon valós időben frissülő előnézet mutatja az eredményt.
          </p>

          <h3>3. lépés: Válasszon színt és stílust</h3>

          <p>
            A megjelenés nem csupán esztétikai kérdés. A szín erős üzenetet hordoz az iparágáról és pozicionálásáról:
          </p>

          <ul>
            <li><strong>Kék árnyalatok</strong> — bizalmat, professzionalizmust sugallnak (pénzügy, jog, tanácsadás)</li>
            <li><strong>Zöld</strong> — egészség, fenntarthatóság, természetes termékek</li>
            <li><strong>Narancssárga, sárga</strong> — kreativitás, energia (marketing, kreatív iparágak)</li>
            <li><strong>Sötétszürke, fekete</strong> — prémium, luxus pozicionálás</li>
          </ul>

          <p>
            Ha van már kialakított arculata, válassza a brand főszínét. Az egyedi színválasztó bármilyen hex kódot elfogad.
          </p>

          <h3>4. lépés: Adja meg a számlázási adatokat és rendelje meg</h3>

          <p>
            A megrendelés után kap egy egyedi URL-t és a hozzá tartozó QR kódot, amit letölthet és azonnal használhat.
          </p>

          <img
            src="https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=70&fm=webp"
            alt="Névjegykártya készítés lépései online felületen"
            className="w-full rounded-xl my-8"
            loading="lazy"
            decoding="async"
          />

          <h2>Hogyan használja hatékonyan a QR kódos névjegykártyát?</h2>

          <h3>Személyes találkozókon</h3>
          <p>
            Ne várja meg, amíg a partnere megkérdezi, van-e névjegykártyája. Mondja proaktívan: „Átküldöm digitálisan" — és mutassa meg a QR kódot a telefonján. Ez azonnal megkülönbözteti a tömegből, és a technológiai magabiztosságát is kommunikálja.
          </p>

          <h3>E-mail aláírásban</h3>
          <p>
            Az e-mail aláírásába illesszen be egy kis méretű QR kódot vagy egy linket a névjegyoldalára. Minden kiküldött e-mail potenciális kapcsolatépítési lehetőség.
          </p>

          <h3>Prezentációk utolsó diáján</h3>
          <p>
            Előadások, webináriumok végén a „Kérdések?" dia helyett vagy mellett jelenítse meg a QR kódját. A résztvevők azonnal el tudják menteni az adatait, amíg még emlékeznek Önre.
          </p>

          <h3>LinkedIn profilban</h3>
          <p>
            A LinkedIn „Kapcsolatfelvétel" szekciójában a weboldal mezőbe illessze be a névjegyoldala URL-jét. Az onnan érkező látogatók egy kattintással elmenthetik a teljes vCard-ját.
          </p>

          <h2>Mire figyeljen a QR kód használatakor?</h2>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 my-8">
            <p className="text-yellow-800 mb-3">
              <strong>Képernyő fényereje</strong> — szkennelés előtt állítsa maximumra a telefon fényerejét. Gyenge fénynél vagy alacsony fényerőn a szkenner nehezen ismeri fel a kódot.
            </p>
            <p className="text-yellow-800 mb-3">
              <strong>Méret</strong> — ha nyomtatva is szeretné használni a QR kódot (például roll-up bannerre, névjegykártyára, matricára), tesztelje le nyomtatás előtt, hogy az adott méretben is beolvasható-e.
            </p>
            <p className="text-yellow-800">
              <strong>Dinamikus vs. statikus kód</strong> — a qrnevjegy.hu dinamikus QR kódot generál, ami azt jelenti, hogy a kód képe nem változik, de a mögötte lévő tartalom igen. Ha frissíti az adatait, a régi kód is az új profilra mutat. Soha nem kell új kódot generálnia.
            </p>
          </div>

          <h2>Gyakori kérdések</h2>

          <div className="space-y-6 my-8">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-2">Kell-e internet a beolvasáshoz?</h3>
              <p className="text-gray-600">
                A beolvasáshoz igen, a másik félnek szüksége van internetkapcsolatra, hogy megnyíljon a névjegyoldal. Az adatok mentéséhez (vCard letöltés) szintén.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-2">Hány ember fér hozzá a névjegyoldalamhoz?</h3>
              <p className="text-gray-600">
                Nincs korlátozás — ugyanazt a QR kódot korlátlan számban lehet beolvasni.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-2">Mi történik, ha lejár az előfizetésem?</h3>
              <p className="text-gray-600">
                Az előfizetés megújításáig a névjegyoldal elérhető marad.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-2">Elmenti a másik fél automatikusan az adataimat, vagy neki kell valamit csinálnia?</h3>
              <p className="text-gray-600">
                A beolvasás után a névjegyoldalon egy „Névjegy mentése" gombra kell kattintania — ez letölti a vCard fájlt, amit a telefon automatikusan felajánl elmenteni a névjegyzékbe.
              </p>
            </div>
          </div>

          <h2>Összefoglalás</h2>

          <p>
            A QR kódos digitális névjegykártya készítése nem bonyolult és nem drága — de az üzleti kapcsolatépítésben komoly előnyt jelent. Naprakész adatok, mérhető eredmények, papírmentesség.
          </p>

          <p>
            Ha eddig halasztotta, most már nincs akadálya: az adatok kitöltésétől a kész QR kódig kevesebb mint öt perc.
          </p>

          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-8 text-white text-center my-12">
            <h3 className="text-2xl font-bold mb-4">Készítse el saját QR kódos névjegykártyáját!</h3>
            <p className="text-purple-100 mb-6">
              Töltse ki az adatait, válasszon színt és pár perc múlva használhatja is.
            </p>
            <a
              href="/vcard"
              className="inline-flex items-center px-8 py-4 bg-white text-purple-600 font-semibold rounded-lg hover:bg-purple-50 transition-colors"
            >
              Kezdje el most
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </div>
        </div>

        <BlogCTA />
      </article>
    </div>
  );
};

export default BlogPost11;
