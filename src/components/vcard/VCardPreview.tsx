import React from 'react';
import QRCode from 'qrcode.react';
import { VCardFormData } from '../../types/vcard';
import { Phone, Mail, Globe, MapPin, Save, Share2 } from 'lucide-react';
import { socialColors } from '../../lib/social-colors';
import { socialIcons } from '../../lib/social-icons';
import { generateHungarianMonogram, splitHungarianName } from '../../lib/utils/name-utils';
import { Button } from '../ui/button';

interface VCardPreviewProps {
  formData: VCardFormData;
  vCardString: string;
  isValid: boolean;
  isFloating?: boolean;
}

const VCardPreview: React.FC<VCardPreviewProps> = ({ formData, vCardString, isValid, isFloating }) => {
  // Generate vCard string with proper Hungarian name format
  const generateVCardString = () => {
    const { familyName, givenNames } = splitHungarianName(formData.name);
    
    return `BEGIN:VCARD
VERSION:3.0
N:${familyName};${givenNames};;;
FN:${formData.name}
${formData.company ? `ORG:${formData.company}` : ''}
${formData.position ? `TITLE:${formData.position}` : ''}
${formData.phoneMobile ? `TEL;TYPE=CELL:${formData.phoneMobile}` : ''}
${formData.phoneWork ? `TEL;TYPE=WORK:${formData.phoneWork}` : ''}
${formData.phonePrivate ? `TEL;TYPE=HOME:${formData.phonePrivate}` : ''}
${formData.email ? `EMAIL:${formData.email}` : ''}
${formData.website ? `URL:${formData.website}` : ''}
${formData.street && formData.city ? `ADR:;;${formData.street};${formData.city};${formData.state};${formData.zipcode};${formData.country}` : ''}
${formData.description ? `NOTE:${formData.description}` : ''}
${formData.socialLinks.map(link => `URL;type=${link.platform}:${link.url}`).join('\n')}
END:VCARD`;
  };

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
    <div className={`relative mx-auto w-full ${isFloating ? 'max-w-[400px]' : 'max-w-[320px]'}`}>
      <div className="relative border-[12px] border-black rounded-[3rem] shadow-xl">
        <div className="relative bg-white h-[500px] sm:h-[600px] rounded-[2rem] overflow-hidden">
          <div className="h-full overflow-y-auto scrollbar-hide">
            {/* Top panel (matches generated left-panel on mobile) */}
            <div
              className="pt-8 px-6 pb-6"
              style={{
                background: formData.backgroundType === 'gradient'
                  ? `linear-gradient(135deg, ${formData.backgroundColor}, ${formData.backgroundColor}66)`
                  : formData.backgroundColor,
              }}
            >
              <div className="flex flex-col items-center text-center">
                {formData.profilePicture ? (
                  <div className="w-28 h-28 rounded-full bg-white shadow-lg overflow-hidden mb-4">
                    <img
                      src={formData.profilePicture}
                      alt={formData.name || 'Profile'}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : hasAnyData ? (
                  <div className="w-28 h-28 rounded-full bg-white flex items-center justify-center text-3xl font-semibold shadow-lg mb-4">
                    {formData.name ? generateHungarianMonogram(formData.name) : 'MT'}
                  </div>
                ) : (
                  <div className="w-28 h-28 rounded-full bg-white shadow-lg overflow-hidden mb-4 flex items-center justify-center">
                    <img
                      src="/minta-profil.jpg"
                      alt="Minta profil"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <h1 className="text-white text-2xl font-semibold drop-shadow-sm">
                  {formData.name || (!hasAnyData && 'Minta Tamás')}
                </h1>
                <p className="text-white/90 mt-2">
                  {[formData.position, formData.company].filter(Boolean).join(' - ') || (!hasAnyData && 'Marketingmenedzser - Tech Kft.')}
                </p>

                {/* Contact list styled as glass items */}
                <div className="mt-6 w-full space-y-3">
                  {(formData.phoneMobile || !hasAnyData) && (
                    <a
                      href={formData.phoneMobile ? `tel:${formData.phoneMobile}` : undefined}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/10 backdrop-blur text-white"
                    >
                      <Phone className="w-5 h-5" />
                      <span className="text-sm">{formData.phoneMobile || '+36 30 123 4567'}</span>
                    </a>
                  )}
                  {(formData.email || !hasAnyData) && (
                    <a
                      href={formData.email ? `mailto:${formData.email}` : undefined}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/10 backdrop-blur text-white"
                    >
                      <Mail className="w-5 h-5" />
                      <span className="text-sm">{formData.email || 'minta@minta.hu'}</span>
                    </a>
                  )}
                  {(formData.website || !hasAnyData) && (
                    <a
                      href={formData.website || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/10 backdrop-blur text-white"
                    >
                      <Globe className="w-5 h-5" />
                      <span className="text-sm">{formData.website || 'https://qrnevjegy.hu/'}</span>
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Bottom panel (matches generated right-panel on mobile) */}
            <div className="px-6 py-6">
              {/* Description */}
              {formData.description && (
                <div className="mb-6 pb-6 border-b border-gray-200">
                  <h2 className="text-base font-semibold text-gray-800 mb-3">Bemutatkozás</h2>
                  <p className="text-sm text-gray-600 leading-relaxed">{formData.description}</p>
                </div>
              )}

              {/* Social Media Links */}
              {(formData.socialLinks.length > 0 || !hasAnyData) && (
                <div className="mb-6 pb-6 border-b border-gray-200">
                  <h2 className="text-base font-semibold text-gray-800 mb-3">Közösségi média</h2>
                  <div className="flex flex-wrap gap-3">
                    {formData.socialLinks.length > 0 ? (
                      formData.socialLinks.map((link, index) => {
                        const Icon = socialIcons[link.platform] || Globe;
                        const color = socialColors[link.platform] || '#374151';
                        return (
                          <a
                            key={index}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-12 h-12 rounded-xl flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105"
                            style={{ backgroundColor: `${color}15`, color }}
                          >
                            <Icon className="w-6 h-6" />
                          </a>
                        );
                      })
                    ) : (
                      <>
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-sm" style={{ backgroundColor: `${socialColors['LinkedIn']}15`, color: socialColors['LinkedIn'] }}>
                          {React.createElement(socialIcons['LinkedIn'], { className: "w-6 h-6" })}
                        </div>
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-sm" style={{ backgroundColor: `${socialColors['Facebook']}15`, color: socialColors['Facebook'] }}>
                          {React.createElement(socialIcons['Facebook'], { className: "w-6 h-6" })}
                        </div>
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-sm" style={{ backgroundColor: `${socialColors['Instagram']}15`, color: socialColors['Instagram'] }}>
                          {React.createElement(socialIcons['Instagram'], { className: "w-6 h-6" })}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* QR Code */}
              <div>
                <h2 className="text-base font-semibold text-gray-800 mb-3">Névjegykártya QR kód</h2>
                <div className="flex flex-col items-center">
                  <QRCode value={generateVCardString() || ' '} size={200} level="M" renderAs="svg" className="bg-white p-3 rounded-xl shadow-sm" />
                  <p className="text-xs text-gray-500 mt-3 text-center">Olvassa be a QR kódot a névjegy mentéséhez</p>
                </div>

                {/* Actions */}
                <div className="mt-6 flex flex-col gap-3">
                  <Button
                    className="w-full bg-gradient-to-r from-green-700 to-emerald-700 text-white shadow-lg"
                    onClick={() => {
                      // Példa vCard letöltése marketing célokra
                      const exampleVCard = `BEGIN:VCARD
VERSION:3.0
N:Minta;János;;;
FN:Minta János
ORG:Tech Kft.
TITLE:Marketingmenedzser
TEL;TYPE=CELL:+36301234567
EMAIL:minta@minta.hu
URL:https://qrnevjegy.hu
NOTE:Digitális névjegykártya példa
END:VCARD`;
                      const blob = new Blob([exampleVCard], { type: 'text/vcard;charset=utf-8' });
                      const url = window.URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.style.display = 'none';
                      a.href = url;
                      a.download = 'példa_névjegy.vcf';
                      document.body.appendChild(a);
                      a.click();
                      window.URL.revokeObjectURL(url);
                      document.body.removeChild(a);
                    }}
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Példa letöltése
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={async () => {
                      try {
                        const shareData = {
                          title: 'QRNevjegy - Digitális Névjegykártya Készítés',
                          text: 'Készítse el saját digitális névjegykártyáját QR kóddal! Modern, környezetbarát és költséghatékony megoldás.',
                          url: 'https://qrnevjegy.hu',
                        } as ShareData;
                        // @ts-ignore
                        if (navigator.share) {
                          // @ts-ignore
                          await navigator.share(shareData);
                        } else {
                          await navigator.clipboard.writeText('https://qrnevjegy.hu');
                          alert('A QRNevjegy linkje a vágólapra másolva!');
                        }
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    QRNevjegy megosztása
                  </Button>
                </div>
              </div>
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