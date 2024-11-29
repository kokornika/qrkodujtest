import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import QRCodeGenerator from './components/QRCodeGenerator';
import VCardForm from './components/vcard/VCardForm';
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentCancel from './pages/PaymentCancel';
import Blog from './pages/Blog';
import BlogPost1 from './pages/BlogPost1';
import BlogPost2 from './pages/BlogPost2';
import BlogPost3 from './pages/BlogPost3';
import BlogPost4 from './pages/BlogPost4';
import Guide from './pages/Guide';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="pt-16">
          <Routes>
            <Route path="/" element={<QRCodeGenerator />} />
            <Route path="/guide" element={<Guide />} />
            <Route path="/vcard" element={
              <div className="max-w-7xl mx-auto py-4 sm:py-6 px-4 sm:px-6 lg:px-8">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">
                  Digitális névjegykártya készítése
                </h2>
                <VCardForm />
              </div>
            } />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/1" element={<BlogPost1 />} />
            <Route path="/blog/2" element={<BlogPost2 />} />
            <Route path="/blog/3" element={<BlogPost3 />} />
            <Route path="/blog/4" element={<BlogPost4 />} />
            <Route path="/success" element={<PaymentSuccess />} />
            <Route path="/cancel" element={<PaymentCancel />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;