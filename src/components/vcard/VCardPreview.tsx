import React, { useState } from 'react';
import { VCardFormData } from '../../types/vcard';
import { Phone, Mail, Globe, MapPin, Share2, Download, AlertCircle } from 'lucide-react';
import OrderDialog from './OrderDialog';
import QRCode from 'qrcode.react';
import { socialIcons } from '../../lib/social-icons';
import { socialColors } from '../../lib/social-colors';
import { Button } from '../ui/button';

interface VCardPreviewProps {
  formData: VCardFormData;
  vCardString: string;
  isValid: boolean;
}

const VCardPreview: React.FC<VCardPreviewProps> = ({ formData, vCardString, isValid }) => {
  const [showOrderDialog, setShowOrderDialog] = useState(false);

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

  const getThemeStyles = (opacity: number = 1) => ({
    backgroundColor: `${themeColor}${Math.round(opacity * 255).toString(16).padStart(2, '0')}`,
    color: themeColor,
  });

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
    return 'Digitális marketing szakértő';
  };

  const positionCompanyDisplay = getPositionCompanyDisplay();

  return (
    <div className="space-y-8 sm:space-y-12">
      {/* Phone Frame */}
      <div className={`relative mx-auto w-[280px] sm:w-[300px] ${showOrderDialog ? 'hidden lg:block' : ''}`}>
        {/* Phone Border */}
        <div className="absolute inset-[-12px] bg-gray-900 rounded-[48px] shadow-[0_0_40px_rgba(0,0,0,0.15)] overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[32px] bg-black rounded-b-[24px] flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-gray-800 mr-8" />
            <div className="w-2 h-2 rounded-full bg-gray-800" />
          </div>
          <div className="absolute right-[-2px] top-[120px] w-[4px] h-[80px] bg-gray-800 rounded-r-lg" />
          <div className="absolute left-[-2px] top-[100px] w-[4px] h-[40px] bg-gray-800 rounded-l-lg" />
          <div className="absolute left-[-2px] top-[150px] w-[4px] h-[40px] bg-gray-800 rounded-l-lg" />
          <div className="absolute left-[-2px] top-[60px] w-[4px] h-[24px] bg-gray-800 rounded-l-lg" />
        </div>

        {/* Screen Content */}
        <div className="relative w-full h-[600px] overflow-hidden rounded-[40px] bg-white">
          {/* Status Bar */}
          <div className="h-12 bg-black flex items-center justify-between px-6 text-white text-xs">
            <span>9:41</span>
            <div className="flex items-center gap-1">
              <div className="w-4 h-4">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 20.9l-1.4-1.4C5.4 15.5 2 12.1 2 8.5 2 5.5 4.5 3 7.5 3c1.7 0 3.4.8 4.5 2.1C13.1 3.8 14.8 3 16.5 3 19.5 3 22 5.5 22 8.5c0 3.6-3.4 7-10.6 11l-1.4 1.4z"/>
                </svg>
              </div>
              <div className="w-4 h-4">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/>
                </svg>
              </div>
              <div className="flex items-center">
                <div className="h-3.5 w-0.5 bg-white rounded-sm mr-0.5" />
                <div className="h-2.5 w-0.5 bg-white/60 rounded-sm mr-0.5" />
                <div className="h-1.5 w-0.5 bg-white/40 rounded-sm mr-0.5" />
                <div className="h-1 w-0.5 bg-white/20 rounded-sm" />
              </div>
            </div>
          </div>

          {/* Card Content */}
          <div className="h-[calc(100%-3rem)] overflow-y-auto scrollbar-hide">
            {/* Header with Background */}
            <div 
              className="h-[160px] relative"
              style={{ background: formData.backgroundType === 'gradient' 
                ? `linear-gradient(135deg, ${themeColor}, ${themeColor}22)`
                : themeColor 
              }}
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

              {formData.description && (
                <p className="text-sm text-gray-600 text-center">
                  {formData.description}
                </p>
              )}

              {/* Quick Actions */}
              <div className="grid grid-cols-3 gap-3">
                {formData.phoneMobile && (
                  <div className="flex flex-col items-center p-3 rounded-xl transition-all hover:scale-105 active:scale-95" 
                       style={getThemeStyles(0.1)}>
                    <Phone className="w-5 h-5 mb-1" style={{ color: themeColor }} />
                    <span className="text-xs">Telefon</span>
                  </div>
                )}
                {formData.email && (
                  <div className="flex flex-col items-center p-3 rounded-xl transition-all hover:scale-105 active:scale-95" 
                       style={getThemeStyles(0.1)}>
                    <Mail className="w-5 h-5 mb-1" style={{ color: themeColor }} />
                    <span className="text-xs">Email</span>
                  </div>
                )}
                {formData.website && (
                  <div className="flex flex-col items-center p-3 rounded-xl transition-all hover:scale-105 active:scale-95" 
                       style={getThemeStyles(0.1)}>
                    <Globe className="w-5 h-5 mb-1" style={{ color: themeColor }} />
                    <span className="text-xs">Web</span>
                  </div>
                )}
              </div>

              {/* Contact Details */}
              <div className="space-y-3">
                {formData.phoneMobile && (
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl transition-all hover:bg-gray-100">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center" style={getThemeStyles(0.1)}>
                      <Phone className="w-4 h-4" style={{ color: themeColor }} />
                    </div>
                    <div>
                      <div className="text-sm text-gray-900">{formData.phoneMobile}</div>
                      <div className="text-xs text-gray-500">Mobil</div>
                    </div>
                  </div>
                )}

                {formData.phoneWork && (
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl transition-all hover:bg-gray-100">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center" style={getThemeStyles(0.1)}>
                      <Phone className="w-4 h-4" style={{ color: themeColor }} />
                    </div>
                    <div>
                      <div className="text-sm text-gray-900">{formData.phoneWork}</div>
                      <div className="text-xs text-gray-500">Munkahelyi</div>
                    </div>
                  </div>
                )}

                {formData.phonePrivate && (
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl transition-all hover:bg-gray-100">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center" style={getThemeStyles(0.1)}>
                      <Phone className="w-4 h-4" style={{ color: themeColor }} />
                    </div>
                    <div>
                      <div className="text-sm text-gray-900">{formData.phonePrivate}</div>
                      <div className="text-xs text-gray-500">Privát</div>
                    </div>
                  </div>
                )}

                {formData.email && (
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl transition-all hover:bg-gray-100">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center" style={getThemeStyles(0.1)}>
                      <Mail className="w-4 h-4" style={{ color: themeColor }} />
                    </div>
                    <div>
                      <div className="text-sm text-gray-900">{formData.email}</div>
                      <div className="text-xs text-gray-500">Email</div>
                    </div>
                  </div>
                )}

                {(formData.street || formData.city) && (
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl transition-all hover:bg-gray-100">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center" style={getThemeStyles(0.1)}>
                      <MapPin className="w-4 h-4" style={{ color: themeColor }} />
                    </div>
                    <div>
                      <div className="text-sm text-gray-900">
                        {[formData.city, formData.street].filter(Boolean).join(', ')}
                      </div>
                      <div className="text-xs text-gray-500">Cím</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Social Links */}
              {formData.socialLinks.length > 0 && (
                <div className="flex flex-wrap justify-center gap-3">
                  {formData.socialLinks.map((link, index) => {
                    const Icon = socialIcons[link.platform];
                    const color = socialColors[link.platform];
                    
                    if (!Icon) return null;

                    return (
                      <div 
                        key={index}
                        className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95"
                        style={{ 
                          backgroundColor: `${color}22`,
                        }}
                      >
                        <Icon className="w-5 h-5" style={{ color }} />
                      </div>
                    );
                  })}
                </div>
              )}

              {/* QR Code */}
              <div className="flex flex-col items-center">
                <div className="bg-white p-4 rounded-xl shadow-sm transition-all hover:shadow-md">
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

          {/* Home Indicator */}
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-32 h-1 bg-black rounded-full" />
        </div>
      </div>

      {/* CTA Button */}
      <div className="space-y-4">
        {!isValid && (
          <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-xl">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
            <p className="text-sm text-red-600">
              Töltse ki a kötelező mezőket a folytatáshoz (név, email, mobil telefonszám)
            </p>
          </div>
        )}
        
        <Button
          onClick={() => setShowOrderDialog(true)}
          disabled={!isValid}
          className={`
            w-full py-6 text-base
            ${isValid 
              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed border border-red-200'
            }
          `}
        >
          {isValid 
            ? 'Megrendelem a digitális névjegyet'
            : 'Töltse ki a kötelező mezőket'
          }
        </Button>
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