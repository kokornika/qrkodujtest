import React from 'react';

const TermsOfService: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article className="bg-white rounded-2xl shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Általános Szerződési Feltételek</h1>

          <div className="prose prose-lg">
            <p className="text-lg text-gray-600 mb-8">
              Hatályos: {new Date().toLocaleDateString('hu-HU')} napjától
            </p>

            <h2>1. Szolgáltató adatai</h2>
            <p>
              Név: Kovács Kornél János E.V.<br />
              Székhely: 7171 Sióagárd, Deák u. 6.<br />
              Adószám: 483484-1-17<br />
              Email: ideiglenes@qr.hu<br />
              Telefon: +36303551793
            </p>

            <h2>2. Általános rendelkezések</h2>
            <p>
              Jelen Általános Szerződési Feltételek (továbbiakban: ÁSZF) tartalmazza a QRNevjegy 
              szolgáltatás használatának feltételeit. A szolgáltatás megrendelésével Ön elfogadja 
              az alábbi feltételeket.
            </p>

            <h2>3. A szolgáltatás leírása</h2>
            <p>
              A QRNevjegy egy digitális névjegykártya szolgáltatás, amely lehetővé teszi:
            </p>
            <ul>
              <li>Digitális névjegykártyák létrehozását</li>
              <li>QR kódok generálását</li>
              <li>Névjegykártyák online tárolását és megosztását</li>
              <li>Névjegykártyák adatainak frissítését</li>
            </ul>

            <h2>4. A szolgáltatás igénybevétele</h2>
            <p>
              A szolgáltatás igénybevételéhez a megrendelés során az ÁSZF és az Adatkezelési 
              tájékoztató elfogadása szükséges. A megrendelés során megadott adatok valódiságáért 
              a felhasználó felel. Hamis vagy valótlan adatok megadása esetén a szolgáltató 
              jogosult a szolgáltatás megtagadására vagy megszüntetésére.
            </p>

            <h2>5. Díjak és fizetési feltételek</h2>
            <p>
              A szolgáltatás díjszabása a weboldalon található. A fizetés online bankkártyás 
              fizetéssel történik. A szolgáltatás az éves díj megfizetése után vehető igénybe.
            </p>

            <h2>6. A szolgáltatás használata</h2>
            <p>
              A felhasználó köteles a szolgáltatást rendeltetésszerűen használni. Tilos:
            </p>
            <ul>
              <li>Jogszabályba ütköző tartalmak közzététele</li>
              <li>Más felhasználók adatainak jogosulatlan felhasználása</li>
              <li>A szolgáltatás működésének akadályozása</li>
              <li>Kéretlen reklámüzenetek küldése</li>
              <li>A szolgáltatás visszafejtése, módosítása</li>
              <li>Automatizált eszközök használata a szolgáltatás elérésére</li>
            </ul>

            <h2>7. Szellemi tulajdon</h2>
            <p>
              A szolgáltatás és annak minden eleme a szolgáltató szellemi tulajdonát képezi. 
              A felhasználó a szolgáltatás használatával nem szerez jogot ezek felhasználására.
            </p>

            <h2>8. Felelősség korlátozása</h2>
            <p>
              A szolgáltató nem vállal felelősséget az alábbiakért:
            </p>
            <ul>
              <li>A felhasználó által megadott adatok helyességéért vagy teljességéért</li>
              <li>A szolgáltatás használatából eredő közvetlen vagy közvetett károkért</li>
              <li>A szolgáltatás használatának következményeiért</li>
              <li>A szolgáltatás esetleges technikai hibáiért vagy kimaradásaiért</li>
              <li>Az internetkapcsolat vagy más technikai feltételek hiányából eredő problémákért</li>
              <li>A felhasználó eszközeiben keletkezett károkért</li>
              <li>Harmadik fél által okozott károkért</li>
              <li>A névjegykártyák jogosulatlan felhasználásáért</li>
              <li>Az adatok elvesztéséért vagy sérüléséért</li>
              <li>A szolgáltatás használatából eredő üzleti döntésekért</li>
              <li>A szolgáltatás használatának eredményességéért</li>
              <li>A szolgáltatás használatából származó bevételkiesésért</li>
              <li>Vis maior események következményeiért</li>
              <li>A szolgáltatás kompatibilitási problémáiért</li>
              <li>A felhasználó által feltöltött tartalmak jogszerűségéért</li>
              <li>A szolgáltatás használatából eredő reputációs károkért</li>
              <li>A szolgáltatás használatával kapcsolatos félreértésekért</li>
              <li>A szolgáltatás használatából eredő adatvesztésért</li>
              <li>A szolgáltatás használatával kapcsolatos harmadik fél általi igényekért</li>
            </ul>

            <h2>9. A szerződés megszűnése</h2>
            <p>
              A szolgáltatási szerződés megszűnik:
            </p>
            <ul>
              <li>A felhasználó kérésére</li>
              <li>A szolgáltatási díj meg nem fizetése esetén</li>
              <li>A felhasználó súlyos szerződésszegése esetén</li>
              <li>A szolgáltató egyoldalú döntése alapján</li>
              <li>A szolgáltatás megszüntetése esetén</li>
            </ul>

            <h2>10. Egyéb rendelkezések</h2>
            <p>
              A jelen ÁSZF-ben nem szabályozott kérdésekben a magyar jog, különösen a Polgári 
              Törvénykönyv rendelkezései az irányadók. A szolgáltató fenntartja a jogot az 
              ÁSZF egyoldalú módosítására.
            </p>

            <h2>11. Kapcsolatfelvétel</h2>
            <p>
              Az ÁSZF-fel kapcsolatos kérdéseivel forduljon hozzánk bizalommal az alábbi 
              elérhetőségeken:
            </p>
            <ul>
              <li>Email: ideiglenes@qr.hu</li>
              <li>Telefon: +36303551793</li>
              <li>Levelezési cím: 7171 Sióagárd, Deák u. 6.</li>
            </ul>
          </div>
        </article>
      </div>
    </div>
  );
};

export default TermsOfService;