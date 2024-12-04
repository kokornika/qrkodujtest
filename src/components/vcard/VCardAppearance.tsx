import React from 'react';
import { VCardFormData } from '../../types/vcard';
import { Trash2 } from 'lucide-react';
import ImageUploader from './ImageUploader';

interface VCardAppearanceProps {
  formData: VCardFormData;
  onChange: (field: keyof VCardFormData, value: any) => void;
}

const colorPresets = [
  { color: '#6366F1', name: 'Indigo' },
  { color: '#14B8A6', name: 'Türkiz' },
  { color: '#F43F5E', name: 'Rózsaszín' },
  { color: '#8B5CF6', name: 'Lila' },
  { color: '#22C55E', name: 'Zöld' },
  { color: '#3B82F6', name: 'Kék' },
  { color: '#EC4899', name: 'Pink' },
  { color: '#F97316', name: 'Narancs' },
];

const VCardAppearance: React.FC<VCardAppearanceProps> = ({ formData, onChange }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-700">Megjelenés</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Profilkép
          </label>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <ImageUploader
                value={formData.profilePicture}
                onChange={(value) => onChange('profilePicture', value)}
              />
            </div>
            {formData.profilePicture && (
              <button
                onClick={() => onChange('profilePicture', '')}
                className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Háttér típusa
            </label>
            <div className="flex flex-wrap gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  checked={formData.backgroundType === 'solid'}
                  onChange={() => onChange('backgroundType', 'solid')}
                  className="mr-2"
                />
                Egyszínű
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  checked={formData.backgroundType === 'gradient'}
                  onChange={() => onChange('backgroundType', 'gradient')}
                  className="mr-2"
                />
                Gradiens
              </label>
            </div>
          </div>

          {/* Color Presets */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Előre beállított színek
            </label>
            <div className="grid grid-cols-4 gap-2 max-w-[240px]">
              {colorPresets.map((preset) => (
                <button
                  key={preset.color}
                  onClick={() => onChange('backgroundColor', preset.color)}
                  className={`w-full aspect-square rounded-lg transition-all duration-200 hover:scale-110 ${
                    formData.backgroundColor === preset.color ? 'ring-2 ring-blue-500 ring-offset-2' : ''
                  }`}
                  style={{ backgroundColor: preset.color }}
                  title={preset.name}
                />
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Egyedi háttérszín
            </label>
            <input
              type="color"
              value={formData.backgroundColor}
              onChange={(e) => onChange('backgroundColor', e.target.value)}
              className="w-full h-10 rounded-md cursor-pointer max-w-[240px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VCardAppearance;