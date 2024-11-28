import React, { useState } from 'react';
import { VCardFormData } from '../../types/vcard';
import { Phone, Mail, Globe, MapPin, Facebook, Instagram, Youtube } from 'lucide-react';
import OrderDialog from './OrderDialog';
import QRCode from 'qrcode.react';

interface VCardPreviewProps {
  formData: VCardFormData;
  vCardString: string;
}

const VCardPreview: React.FC<VCardPreviewProps> = ({ formData, vCardString }) => {
  const [showOrderDialog, setShowOrderDialog] = useState(false);

  // Generate monogram from name
  const getMonogram = (name: string) => {
    const names = name.trim().split(' ');
    if (names.length >= 2) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const monogram = formData.name ? getMonogram(formData.name) : 'MA';
  const displayName = formData.name || 'Minta Anna';
  const themeColor = formData.backgroundColor || '#6366F1';

  // Generate theme styles
  const getThemeStyles = (opacity: number = 1) => ({
    backgroundColor: `${themeColor}${Math.round(opacity * 255).toString(16).padStart(2, '0')}`,
    color: themeColor,
  });

  // Determine what to display for position and company
  const getPositionCompanyDisplay = () => {
    if (formData.position && formData.company) {
      return `${formData.position} - ${formData.company}`;
    }
    if (formData.position) {
      return formData.position;
    }
    if (formData.company) {
      return formData.company;
    }
    return null;
  };

  const positionCompanyDisplay = getPositionCompanyDisplay();

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
          {/* Card Content */}
          <div className="h-full overflow-y-auto scrollbar-hide">
            {/* Header with Background */}
            <div 
              className="h-[200px] relative"
              style={{ background: `linear-gradient(135deg, ${themeColor}, ${themeColor}22)` }}
            >
              <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
                {formData.profilePicture ? (
                  <img
                    src={formData.profilePicture}
                    alt={displayName}
                    className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full border-4 border-white shadow-lg bg-gradient-to-br from-white to-gray-50 flex items-center justify-center">
                    <span className="text-2xl font-semibold" style={{ color: themeColor }}>{monogram}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-16 px-6 pb-6 space-y-6">
              <div className="text-center">
                <h1 className="text-xl font-bold text-gray-900">{displayName}</h1>
                {positionCompanyDisplay && (
                  <p className="text-sm text-gray-600">{positionCompanyDisplay}</p>
                )}
              </div>

              <p className="text-sm text-gray-600 text-center">
                {formData.description || 'Digitális marketing szakértő'}
              </p>

              {/* Quick Actions */}
              <div className="grid grid-cols-3 gap-3">
                <div className="flex flex-col items-center p-3 rounded-xl" style={getThemeStyles(0.1)}>
                  <Phone className="w-5 h-5 mb-1" style={{ color: themeColor }} />
                  <span className="text-xs">Telefon</span>
                </div>
                <div className="flex flex-col items-center p-3 rounded-xl" style={getThemeStyles(0.1)}>
                  <Mail className="w-5 h-5 mb-1" style={{ color: themeColor }} />
                  <span className="text-xs">Email</span>
                </div>
                <div className="flex flex-col items-center p-3 rounded-xl" style={getThemeStyles(0.1)}>
                  <Globe className="w-5 h-5 mb-1" style={{ color: themeColor }} />
                  <span className="text-xs">Web</span>
                </div>
              </div>

              {/* Contact Details */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center" style={getThemeStyles(0.1)}>
                    <Phone className="w-4 h-4" style={{ color: themeColor }} />
                  </div>
                  <div>
                    <div className="text-sm text-gray-900">
                      {formData.phoneMobile || '+36 30 123 4567'}
                    </div>
                    <div className="text-xs text-gray-500">Mobil</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center" style={getThemeStyles(0.1)}>
                    <Mail className="w-4 h-4" style={{ color: themeColor }} />
                  </div>
                  <div>
                    <div className="text-sm text-gray-900">
                      {formData.email || 'minta.anna@minta.hu'}
                    </div>
                    <div className="text-xs text-gray-500">Email</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center" style={getThemeStyles(0.1)}>
                    <MapPin className="w-4 h-4" style={{ color: themeColor }} />
                  </div>
                  <div>
                    <div className="text-sm text-gray-900">
                      {formData.street && formData.city 
                        ? `${formData.city}, ${formData.street}`
                        : 'Budapest, Minta utca 1.'}
                    </div>
                    <div className="text-xs text-gray-500">Cím</div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex justify-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#1877F222] flex items-center justify-center">
                  <Facebook className="w-5 h-5 text-[#1877F2]" />
                </div>
                <div className="w-10 h-10 rounded-full bg-[#E4405F22] flex items-center justify-center">
                  <Instagram className="w-5 h-5 text-[#E4405F]" />
                </div>
                <div className="w-10 h-10 rounded-full bg-[#FF000022] flex items-center justify-center">
                  <Youtube className="w-5 h-5 text-[#FF0000]" />
                </div>
              </div>

              {/* Sample QR Code */}
              <div className="flex flex-col items-center">
                <div className="bg-white p-4 rounded-xl shadow-sm">
                  <QRCode
                    value={vCardString}
                    size={128}
                    level="M"
                    includeMargin={true}
                  />
                </div>
                <p className="text-sm text-gray-500 mt-2">Szkenneld be a névjegyem</p>
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