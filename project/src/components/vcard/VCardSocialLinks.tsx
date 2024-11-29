import React from 'react';
import { VCardFormData } from '../../types/vcard';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '../ui/button';

interface VCardSocialLinksProps {
  formData: VCardFormData;
  onChange: (field: keyof VCardFormData, value: any) => void;
}

const socialPlatforms = [
  'Facebook',
  'Instagram',
  'Twitter',
  'LinkedIn',
  'YouTube',
  'GitHub',
  'TikTok',
  'Pinterest',
  'Snapchat',
  'WhatsApp',
  'Telegram',
  'Discord',
];

const VCardSocialLinks: React.FC<VCardSocialLinksProps> = ({ formData, onChange }) => {
  const addSocialLink = () => {
    onChange('socialLinks', [
      ...formData.socialLinks,
      { platform: socialPlatforms[0], url: '' }
    ]);
  };

  const removeSocialLink = (index: number) => {
    const newLinks = formData.socialLinks.filter((_, i) => i !== index);
    onChange('socialLinks', newLinks);
  };

  const updateSocialLink = (index: number, field: 'platform' | 'url', value: string) => {
    const newLinks = formData.socialLinks.map((link, i) => {
      if (i === index) {
        return { ...link, [field]: value };
      }
      return link;
    });
    onChange('socialLinks', newLinks);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-700">Közösségi média</h3>
      
      <div className="space-y-4">
        {formData.socialLinks.map((link, index) => (
          <div key={index} className="flex gap-4">
            <select
              value={link.platform}
              onChange={(e) => updateSocialLink(index, 'platform', e.target.value)}
              className="flex-1 p-2 border border-gray-300 rounded-md text-sm"
            >
              {socialPlatforms.map((platform) => (
                <option key={platform} value={platform}>
                  {platform}
                </option>
              ))}
            </select>
            <input
              type="url"
              value={link.url}
              onChange={(e) => updateSocialLink(index, 'url', e.target.value)}
              placeholder="https://"
              className="flex-[2] p-2 border border-gray-300 rounded-md text-sm"
            />
            <button
              onClick={() => removeSocialLink(index)}
              className="p-2 text-red-500 hover:bg-red-50 rounded-md transition-colors"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        ))}

        <Button
          onClick={addSocialLink}
          variant="outline"
          className="w-full"
        >
          <Plus className="w-4 h-4 mr-2" />
          Közösségi média hozzáadása
        </Button>
      </div>
    </div>
  );
};

export default VCardSocialLinks;