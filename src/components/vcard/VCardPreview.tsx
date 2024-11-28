import React, { useState } from 'react';
import { VCardFormData } from '../../types/vcard';
import { Phone, Mail, Globe, MapPin, Facebook, Instagram, Youtube } from 'lucide-react';
import OrderDialog from './OrderDialog';
import QRCode from 'qrcode.react';

interface VCardPreviewProps {
  formData: VCardFormData;
  vCardString: string;
}

const VCardPreview: React.FC<VCardPreviewProps> = ({ formData }) => {
  const [showOrderDialog, setShowOrderDialog] = useState(false);
  const defaultProfileImage = "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80";

  const backgroundColor = '#6366F1';

  const getIconStyle = () => ({
    backgroundColor: `${backgroundColor}11`,
    color: backgroundColor,
  });

  // Placeholder értékek
  const placeholders = {
    name: 'Minta Anna',
    position: 'Marketing Vezető',
    company: 'Minta Kft.',
    description: 'Digitális marketing szakértő',
    phone: '+36 30 123 4567',
    email: 'minta.anna@minta.hu',
    address: 'Budapest, Minta utca 1.',
  };

  return (
    <div className="space-y-12">
      {/* Phone Frame */}
      <div className={`relative mx-auto w-[300px] ${showOrderDialog ? 'hidden md:block' : ''}`}>
        {/* Phone Border */}
        <div className="absolute inset-[-12px] bg-gray-800 rounded-[48px] shadow-xl">
          {/* Power Button */}
          <div className="absolute right-[-2px] top-[120px] w-[4px] h-[40px] bg-gray-700 rounded-r-lg" />
          {/* Volume Buttons */}
          <div className="absolute left-[-2px] top-[100px] w-[4px] h-[30px] bg-gray-700 rounded-l-lg" />
          <div className="absolute left-[-2px] top-[140px] w-[4px] h-[30px] bg-gray-700 rounded-l-lg" />
        </div>

        {/* Screen Content */}
        <div className="relative w-[300px] h-[600px] overflow-hidden rounded-[40px] bg-white">
          {/* Notch */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[150px] h-[30px] bg-black rounded-b-[20px] z-20" />
          
          {/* Dynamic Status Bar */}
          <div className="absolute top-0 left-0 right-0 h-[48px] flex justify-between items-center px-5 z-10">
            <span className="text-xs text-white">12:30</span>
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 rounded-full border-2 border-white" />
              <div className="w-4 h-4 rounded-full border-2 border-white" />
              <div className="w-4 h-4 rounded-full border-2 border-white" />
            </div>
          </div>

          {/* Card Content */}
          <div className="h-full overflow-y-auto scrollbar-hide">
            {/* Header with Background */}
            <div 
              className="h-[200px] relative"
              style={{ background: `linear-gradient(135deg, ${backgroundColor}, ${backgroundColor}22)` }}
            >
              <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
                <img
                  src={defaultProfileImage}
                  alt="Profilkép"
                  className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover"
                />
              </div>
            </div>

            {/* Profile Info */}
            <div className="pt-16 px-6 pb-6 space-y-6">
              <div className="text-center">
                <h1 className="text-xl font-bold text-gray-900">
                  {formData.name || placeholders.name}
                </h1>
                <p className="text-sm text-gray-600">
                  {formData.position && formData.company 
                    ? `${formData.position} - ${formData.company}`
                    : `${placeholders.position} - ${placeholders.company}`}
                </p>
              </div>

              <p className="text-sm text-gray-600 text-center">
                {formData.description || placeholders.description}
              </p>

              {/* Quick Actions */}
              <div className="grid grid-cols-3 gap-3">
                <div className="flex flex-col items-center p-3 rounded-xl" style={getIconStyle()}>
                  <Phone className="w-5 h-5 mb-1" />
                  <span className="text-xs">Telefon</span>
                </div>
                <div className="flex flex-col items-center p-3 rounded-xl" style={getIconStyle()}>
                  <Mail className="w-5 h-5 mb-1" />
                  <span className="text-xs">Email</span>
                </div>
                <div className="flex flex-col items-center p-3 rounded-xl" style={getIconStyle()}>
                  <Globe className="w-5 h-5 mb-1" />
                  <span className="text-xs">Web</span>
                </div>
              </div>

              {/* Contact Details */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center" style={getIconStyle()}>
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-900">
                      {formData.phoneMobile || placeholders.phone}
                    </div>
                    <div className="text-xs text-gray-500">Mobil</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center" style={getIconStyle()}>
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-900">
                      {formData.email || placeholders.email}
                    </div>
                    <div className="text-xs text-gray-500">Email</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center" style={getIconStyle()}>
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-900">
                      {formData.street && formData.city 
                        ? `${formData.city}, ${formData.street}`
                        : placeholders.address}
                    </div>
                    <div className="text-xs text-gray-500">Cím</div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex justify-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#1877F222', color: '#1877F2' }}>
                  <Facebook className="w-5 h-5" />
                </div>
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#E4405F22', color: '#E4405F' }}>
                  <Instagram className="w-5 h-5" />
                </div>
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#FF000022', color: '#FF0000' }}>
                  <Youtube className="w-5 h-5" />
                </div>
              </div>

              {/* Sample QR Code */}
              <div className="flex flex-col items-center">
                <div className="bg-white p-4 rounded-xl shadow-sm">
                  <QRCode
                    value="https://example.com/preview"
                    size={128}
                    level="M"
                    includeMargin={true}
                  />
                </div>
                <p className="text-sm text-gray-500 mt-2">Minta QR kód</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <div>
        <button
          onClick={() => setShowOrderDialog(true)}
          className="w-full py-4 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl flex items-center justify-center gap-2 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          Megrendelem a digitális névjegyet
        </button>
      </div>

      <OrderDialog 
        isOpen={showOrderDialog}
        onClose={() => setShowOrderDialog(false)}
        formData={formData}
      />
    </div>
  );
};

export default VCardPreview;