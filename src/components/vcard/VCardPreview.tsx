import React from 'react';
import QRCode from 'qrcode.react';
import { VCardFormData } from '../../types/vcard';
import { Phone, Mail, Globe, MapPin } from 'lucide-react';

interface VCardPreviewProps {
  formData: VCardFormData;
  vCardString: string;
  isValid: boolean;
}

const VCardPreview: React.FC<VCardPreviewProps> = ({ formData, vCardString, isValid }) => {
  const hasAnyData = Boolean(
    formData.name ||
    formData.company ||
    formData.position ||
    formData.website ||
    formData.phoneMobile ||
    formData.phoneWork ||
    formData.phonePrivate ||
    formData.email ||
    formData.street ||
    formData.city ||
    formData.description ||
    formData.socialLinks.length > 0
  );

  return (
    <div className="relative mx-auto" style={{ maxWidth: '320px' }}>
      <div className="relative border-[12px] border-black rounded-[3rem] shadow-xl">
        <div className="relative bg-white h-[600px] rounded-[2rem] overflow-hidden">
          {/* Header with gradient background */}
          <div 
            className="h-24 w-full relative"
            style={{
              background: formData.backgroundType === 'gradient' 
                ? `linear-gradient(135deg, ${formData.backgroundColor}, ${formData.backgroundColor}22)` 
                : formData.backgroundColor,
              borderBottomLeftRadius: '2rem',
              borderBottomRightRadius: '2rem'
            }}
          >
            {/* Profile Circle - Positioned absolutely within header */}
            <div className="absolute left-1/2 -translate-x-1/2 top-full -translate-y-1/2">
              {formData.profilePicture ? (
                <div className="w-20 h-20 rounded-full bg-white shadow-lg overflow-hidden">
                  <img 
                    src={formData.profilePicture} 
                    alt={formData.name || 'Profile'} 
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center text-2xl font-semibold shadow-lg">
                  {formData.name ? formData.name.split(' ').map(n => n[0]).join('') : 'MT'}
                </div>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="px-6 py-4 h-[calc(600px-6rem)] overflow-y-auto scrollbar-hide">
            {/* Name and Position */}
            <div className="text-center mt-12 mb-8">
              <h1 className="text-xl font-semibold">
                {formData.name || (!hasAnyData && 'Minta Tamás')}
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                {[formData.position, formData.company].filter(Boolean).join(' - ') || (!hasAnyData && 'Marketingmenedzser - Tech Kft.')}
              </p>
            </div>

            {/* Quick Actions */}
            {(formData.phoneMobile || formData.email || formData.website || !hasAnyData) && (
              <div className="flex justify-center gap-4 mb-8">
                {(formData.phoneMobile || !hasAnyData) && (
                  <div 
                    className="w-16 h-16 rounded-xl flex flex-col items-center justify-center"
                    style={{
                      backgroundColor: `${formData.backgroundColor}11`
                    }}
                  >
                    <Phone 
                      className="w-5 h-5 mb-1" 
                      style={{ color: formData.backgroundColor }}
                    />
                    <span 
                      className="text-xs"
                      style={{ color: formData.backgroundColor }}
                    >
                      Telefon
                    </span>
                  </div>
                )}
                {(formData.email || !hasAnyData) && (
                  <div 
                    className="w-16 h-16 rounded-xl flex flex-col items-center justify-center"
                    style={{
                      backgroundColor: `${formData.backgroundColor}11`
                    }}
                  >
                    <Mail 
                      className="w-5 h-5 mb-1"
                      style={{ color: formData.backgroundColor }}
                    />
                    <span 
                      className="text-xs"
                      style={{ color: formData.backgroundColor }}
                    >
                      Email
                    </span>
                  </div>
                )}
                {(formData.website || !hasAnyData) && (
                  <div 
                    className="w-16 h-16 rounded-xl flex flex-col items-center justify-center"
                    style={{
                      backgroundColor: `${formData.backgroundColor}11`
                    }}
                  >
                    <Globe 
                      className="w-5 h-5 mb-1"
                      style={{ color: formData.backgroundColor }}
                    />
                    <span 
                      className="text-xs"
                      style={{ color: formData.backgroundColor }}
                    >
                      Web
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Contact Details */}
            <div className="space-y-4">
              {formData.phoneMobile && (
                <div 
                  className="flex items-center gap-3 p-3 rounded-lg transition-colors"
                  style={{
                    backgroundColor: `${formData.backgroundColor}11`
                  }}
                >
                  <Phone 
                    className="w-5 h-5"
                    style={{ color: formData.backgroundColor }}
                  />
                  <div>
                    <div className="text-sm">{formData.phoneMobile}</div>
                    <div className="text-xs text-gray-500">Mobil</div>
                  </div>
                </div>
              )}
              {!hasAnyData && !formData.phoneMobile && (
                <div 
                  className="flex items-center gap-3 p-3 rounded-lg transition-colors"
                  style={{
                    backgroundColor: `${formData.backgroundColor}11`
                  }}
                >
                  <Phone 
                    className="w-5 h-5"
                    style={{ color: formData.backgroundColor }}
                  />
                  <div>
                    <div className="text-sm">+36 30 123 4567</div>
                    <div className="text-xs text-gray-500">Mobil</div>
                  </div>
                </div>
              )}
              {formData.phoneWork && (
                <div 
                  className="flex items-center gap-3 p-3 rounded-lg transition-colors"
                  style={{
                    backgroundColor: `${formData.backgroundColor}11`
                  }}
                >
                  <Phone 
                    className="w-5 h-5"
                    style={{ color: formData.backgroundColor }}
                  />
                  <div>
                    <div className="text-sm">{formData.phoneWork}</div>
                    <div className="text-xs text-gray-500">Munkahelyi</div>
                  </div>
                </div>
              )}
              {!hasAnyData && !formData.phoneWork && (
                <div 
                  className="flex items-center gap-3 p-3 rounded-lg transition-colors"
                  style={{
                    backgroundColor: `${formData.backgroundColor}11`
                  }}
                >
                  <Phone 
                    className="w-5 h-5"
                    style={{ color: formData.backgroundColor }}
                  />
                  <div>
                    <div className="text-sm">+36 1 234 5678</div>
                    <div className="text-xs text-gray-500">Munkahelyi</div>
                  </div>
                </div>
              )}
              {formData.email && (
                <div 
                  className="flex items-center gap-3 p-3 rounded-lg transition-colors"
                  style={{
                    backgroundColor: `${formData.backgroundColor}11`
                  }}
                >
                  <Mail 
                    className="w-5 h-5"
                    style={{ color: formData.backgroundColor }}
                  />
                  <div>
                    <div className="text-sm">{formData.email}</div>
                    <div className="text-xs text-gray-500">Email</div>
                  </div>
                </div>
              )}
              {!hasAnyData && !formData.email && (
                <div 
                  className="flex items-center gap-3 p-3 rounded-lg transition-colors"
                  style={{
                    backgroundColor: `${formData.backgroundColor}11`
                  }}
                >
                  <Mail 
                    className="w-5 h-5"
                    style={{ color: formData.backgroundColor }}
                  />
                  <div>
                    <div className="text-sm">minta@minta.hu</div>
                    <div className="text-xs text-gray-500">Email</div>
                  </div>
                </div>
              )}
              {(formData.street || formData.city) && (
                <div 
                  className="flex items-center gap-3 p-3 rounded-lg transition-colors"
                  style={{
                    backgroundColor: `${formData.backgroundColor}11`
                  }}
                >
                  <MapPin 
                    className="w-5 h-5"
                    style={{ color: formData.backgroundColor }}
                  />
                  <div>
                    <div className="text-sm">
                      {[formData.street, formData.city].filter(Boolean).join(', ')}
                    </div>
                    <div className="text-xs text-gray-500">Cím</div>
                  </div>
                </div>
              )}
              {!hasAnyData && !formData.street && !formData.city && (
                <div 
                  className="flex items-center gap-3 p-3 rounded-lg transition-colors"
                  style={{
                    backgroundColor: `${formData.backgroundColor}11`
                  }}
                >
                  <MapPin 
                    className="w-5 h-5"
                    style={{ color: formData.backgroundColor }}
                  />
                  <div>
                    <div className="text-sm">Budapest, Minta u. 1</div>
                    <div className="text-xs text-gray-500">Cím</div>
                  </div>
                </div>
              )}
            </div>

            {/* QR Code */}
            <div className="mt-6 flex flex-col items-center">
              <QRCode
                value={vCardString || ' '}
                size={160}
                level="M"
                renderAs="svg"
                className="bg-white p-2 rounded-lg"
              />
              <p className="text-xs text-gray-500 mt-2">
                Szkenneld be a névjegyem
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Phone Buttons */}
      <div className="absolute right-0 top-24 w-1 h-12 bg-black rounded-l-lg"></div>
      <div className="absolute left-0 top-20 w-1 h-8 bg-black rounded-r-lg"></div>
      <div className="absolute left-0 top-32 w-1 h-8 bg-black rounded-r-lg"></div>
    </div>
  );
};

export default VCardPreview;