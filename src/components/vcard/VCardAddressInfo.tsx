import React, { useEffect, useState, useRef } from 'react';
import { VCardFormData } from '../../types/vcard';
import { Input } from '../ui/Input';
import { MapPin, Loader2 } from 'lucide-react';
import { fetchCityByZip, ZipLocation } from '../../lib/services/zip-service';
import { Button } from '../ui/button';

interface VCardAddressInfoProps {
  formData: VCardFormData;
  onChange: (field: keyof VCardFormData, value: any) => void;
}

const VCardAddressInfo: React.FC<VCardAddressInfoProps> = ({ formData, onChange }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [cities, setCities] = useState<ZipLocation[]>([]);
  const [showCitySelector, setShowCitySelector] = useState(false);
  const lastZip = useRef<string>('');

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const fetchCities = async (zip: string) => {
      if (zip === lastZip.current) return;
      lastZip.current = zip;
      
      setIsLoading(true);
      try {
        const locations = await fetchCityByZip(zip);
        setCities(locations);
        setShowCitySelector(locations.length > 1);
        
        // Ha csak egy település van, automatikusan kitöltjük
        if (locations.length === 1) {
          onChange('city', locations[0].name);
          setShowCitySelector(false);
        }
      } catch (error) {
        console.error('Hiba a települések lekérése során:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (formData.zipcode && formData.zipcode.length === 4) {
      timeoutId = setTimeout(() => {
        fetchCities(formData.zipcode);
      }, 500);
    } else {
      setCities([]);
      setShowCitySelector(false);
      lastZip.current = '';
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [formData.zipcode, onChange]);

  const handleSelectCity = (city: ZipLocation) => {
    onChange('city', city.name);
    setShowCitySelector(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-start gap-3">
        <h3 className="text-lg font-medium text-gray-700">Cím (opcionális)</h3>
        <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-md">
          Ajánlott megadni az egy kattintásos útvonaltervezéshez
        </div>
      </div>
      
      <div className="bg-blue-50 p-4 rounded-lg flex items-start gap-3">
        <MapPin className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-blue-600">
          A megadott címre a névjegykártyán egy kattintással elindítható a navigáció 
          Google Maps vagy Apple Maps alkalmazással.
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="relative">
          <Input
            label="Irányítószám (opcionális)"
            value={formData.zipcode}
            onChange={(e) => onChange('zipcode', e.target.value)}
            placeholder="1234"
          />
          {isLoading && formData.zipcode.length === 4 && (
            <div className="absolute right-3 top-8">
              <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
            </div>
          )}
        </div>

        <div className="relative">
          <Input
            label="Város (opcionális)"
            value={formData.city}
            onChange={(e) => onChange('city', e.target.value)}
            placeholder="Budapest"
          />
          {showCitySelector && cities.length > 1 && (
            <div className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200">
              <div className="p-2">
                <p className="text-sm text-gray-600 mb-2">
                  Több település tartozik ehhez az irányítószámhoz:
                </p>
                <div className="space-y-1">
                  {cities.map((city) => (
                    <Button
                      key={city.name}
                      variant="ghost"
                      className="w-full justify-start text-left"
                      onClick={() => handleSelectCity(city)}
                    >
                      {city.name}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <Input
          className="sm:col-span-2"
          label="Utca, házszám (opcionális)"
          value={formData.street}
          onChange={(e) => onChange('street', e.target.value)}
          placeholder="Példa utca 123."
        />
      </div>
    </div>
  );
};

export default VCardAddressInfo;