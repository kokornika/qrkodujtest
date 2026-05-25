import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import CookieBanner from './components/CookieBanner';
import HomePage from './components/HomePage';
import VCardPage from './pages/VCardPage';
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentCancel from './pages/PaymentCancel';
import Blog from './pages/Blog';
import BlogPost4 from './pages/BlogPost4';
import BlogPost5 from './pages/BlogPost5';
import BlogPost6 from './pages/BlogPost6';
import BlogPost7 from './pages/BlogPost7';
import BlogPost8 from './pages/BlogPost8';
import BlogPost9 from './pages/BlogPost9';
import BlogPost10 from './pages/BlogPost10';
import BlogPost11 from './pages/BlogPost11';
import BlogPost12 from './pages/BlogPost12';
import Guide from './pages/Guide';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import NotFound from './pages/NotFound';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Helmet>
            <html lang="hu" />
            <meta name="theme-color" content="#6366F1" />
            <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
            <link rel="manifest" href="/site.webmanifest" />
          </Helmet>
          
          <Header />
          <main className="flex-grow pt-16">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/guide" element={<Guide />} />
              <Route path="/vcard" element={<VCardPage />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/praktikus-tippek-digitalis-nevjegyekhez" element={<BlogPost4 />} />
              <Route path="/blog/digitalis-nevjegykartya-keszites-vallalkozasoknak" element={<BlogPost5 />} />
              <Route path="/blog/digitalis-nevjegykartya-trendek-2025" element={<BlogPost6 />} />
              <Route path="/blog/hogyan-keszitsunk-digitalis-nevjegykartyat-lepesrol-lepesre" element={<BlogPost7 />} />
              <Route path="/blog/digitalis-nevjegykartya-vs-hagyomanyos-nevjegy-osszehasonlitas" element={<BlogPost8 />} />
              <Route path="/blog/digitalis-nevjegykartyak-10-legnagyobb-elonye-vallalkozasoknak" element={<BlogPost9 />} />
              <Route path="/blog/qr-kod-nevjegykartya-keszites-minden-amit-tudni-kell" element={<BlogPost10 />} />
              <Route path="/blog/qr-kod-nevjegykartya-keszites-utmutato" element={<BlogPost11 />} />
              <Route path="/blog/digitalis-nevjegykartya-szakmaknak" element={<BlogPost12 />} />
              <Route path="/success" element={<PaymentSuccess />} />
              <Route path="/cancel" element={<PaymentCancel />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsOfService />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
          <CookieBanner />
        </div>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;