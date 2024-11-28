import React, { useState } from 'react';
import { VCardFormData } from '../../types/vcard';
import { Phone, Mail, Globe, User } from 'lucide-react';
import { Button } from '../ui/button';
import OrderDialog from './OrderDialog';
import { socialIcons } from '../../lib/social-icons';
import { socialColors } from '../../lib/social-colors';

interface VCardPreviewProps {
  formData: VCardFormData;
  vCardString: string;
}

const VCardPreview: React.FC<VCardPreviewProps> = ({ formData, vCardString }) => {
  const [showOrderDialog, setShowOrderDialog] = useState(false);
  const defaultProfileImage = "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80";

  const getBackgroundStyle = () => {
    if (formData.backgroundType === 'gradient') {
      return `linear-gradient(135deg, ${formData.backgroundColor}, ${formData.backgroundColor}22)`;
    }
    return formData.backgroundColor;
  };

  const getIconStyle = () => {
    return {
      backgroundColor: formData.backgroundType === 'gradient' 
        ? `${formData.backgroundColor}11`
        : `${formData.backgroundColor}22`,
      color: formData.backgroundColor,
    };
  };

  return (
    <div className="space-y-6">
      {/* Phone Frame */}
      <div className="relative mx-auto w-[300px]">
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

          {/* Scrollable Content */}
          <div 
            className="h-full overflow-y-auto scrollbar-hide"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {/* Header Section with Curved Design */}
            <div className="sticky top-0 z-10">
              <div
                className="relative h-[240px]"
                style={{
                  background: getBackgroundStyle()
                }}
              >
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-white rounded-t-[32px]" />
                
                {/* Profile Picture */}
                <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
                  <div className="relative">
                    <img
                      src={formData.profilePicture || defaultProfileImage}
                      alt={formData.name || "Profilkép"}
                      className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="px-6 pt-14 pb-6 space-y-6">
              {/* Name and Title */}
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-800">
                  {formData.name || "Az Ön neve"}
                </h3>
                <p className="text-sm text-gray-600">
                  {formData.position && formData.company
                    ? `${formData.position} - ${formData.company}`
                    : formData.position || formData.company || "Pozíció - Cég neve"}
                </p>
              </div>

              {/* Description */}
              {(formData.description || !formData.name) && (
                <p className="text-sm text-gray-600 text-center">
                  {formData.description || "Rövid bemutatkozó szöveg helye"}
                </p>
              )}

              {/* Contact Buttons */}
              <div className="grid grid-cols-3 gap-3">
                <a 
                  href={formData.phoneMobile ? `tel:${formData.phoneMobile}` : "#"} 
                  className="flex flex-col items-center p-3 rounded-xl bg-white shadow-sm"
                  style={getIconStyle()}
                >
                  <Phone className="w-5 h-5 mb-1" />
                  <span className="text-xs">Telefon</span>
                </a>
                <a 
                  href={formData.email ? `mailto:${formData.email}` : "#"}
                  className="flex flex-col items-center p-3 rounded-xl bg-white shadow-sm"
                  style={getIconStyle()}
                >
                  <Mail className="w-5 h-5 mb-1" />
                  <span className="text-xs">Email</span>
                </a>
                <a 
                  href={formData.website || "#"}
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex flex-col items-center p-3 rounded-xl bg-white shadow-sm"
                  style={getIconStyle()}
                >
                  <Globe className="w-5 h-5 mb-1" />
                  <span className="text-xs">Web</span>
                </a>
              </div>

              {/* Contact Details */}
              <div className="space-y-2">
                <div className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm">
                  <div 
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={getIconStyle()}
                  >
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-gray-600">
                      {formData.phoneMobile || "+36 XX XXX XXXX"}
                    </div>
                    <div className="text-xs text-gray-400">Mobil</div>
                  </div>
                </div>

                {/* Address Information */}
                {(formData.street || formData.city || formData.country || !formData.name) && (
                  <div className="p-3 bg-white rounded-xl shadow-sm space-y-1">
                    <div className="text-sm font-medium text-gray-700">Cím</div>
                    <div className="text-sm text-gray-600">
                      {[
                        formData.street || "Utca, házszám",
                        formData.city && formData.zipcode ? `${formData.city}, ${formData.zipcode}` : (formData.city || formData.zipcode || "Város, irányítószám"),
                        formData.state || "Megye",
                        formData.country || "Ország"
                      ].filter(Boolean).join(', ')}
                    </div>
                  </div>
                )}

                {/* Social Links */}
                {formData.socialLinks.length > 0 && (
                  <div className="p-3 bg-white rounded-xl shadow-sm space-y-2">
                    <div className="text-sm font-medium text-gray-700">Közösségi média</div>
                    <div className="flex flex-wrap justify-center gap-3">
                      {formData.socialLinks.map((link, index) => {
                        const IconComponent = socialIcons[link.platform];
                        const brandColor = socialColors[link.platform];
                        return IconComponent ? (
                          <a
                            key={index}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 rounded-full flex items-center justify-center hover:opacity-80 transition-opacity"
                            style={{
                              backgroundColor: `${brandColor}22`,
                              color: brandColor
                            }}
                            title={link.platform}
                          >
                            <IconComponent className="w-5 h-5" />
                          </a>
                        ) : null;
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <div className="mt-8">
        <button
          onClick={() => setShowOrderDialog(true)}
          className="w-full py-3 px-4 bg-blue-600 text-white rounded-xl flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors shadow-sm font-medium"
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