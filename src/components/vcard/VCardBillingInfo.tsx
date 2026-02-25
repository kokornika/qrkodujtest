import React from 'react';
import { Building2, User, Receipt } from 'lucide-react';
import { BillingData, BillingType } from '../../types/vcard';

interface Props {
  billingData: BillingData;
  billingErrors: Partial<Record<keyof BillingData, string>>;
  onUpdate: (field: Exclude<keyof BillingData, 'type'>, value: string) => void;
  onTypeChange: (type: BillingType) => void;
}

const VCardBillingInfo: React.FC<Props> = ({ billingData, billingErrors, onUpdate, onTypeChange }) => {
  const inputClass = (error?: string) =>
    `w-full px-3 py-2 text-sm border rounded-lg outline-none transition-colors ${
      error
        ? 'border-red-400 bg-red-50 focus:border-red-500'
        : 'border-gray-200 focus:border-indigo-400'
    }`;

  return (
    <div className="space-y-4">
      <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">
        <Receipt className="w-4 h-4 text-indigo-500" />
        Számlázási adatok
      </h3>

      {/* Type toggle */}
      <div className="flex rounded-lg border border-gray-200 p-0.5 gap-0.5 bg-gray-50">
        <button
          type="button"
          onClick={() => onTypeChange('individual')}
          className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-sm font-medium transition-colors ${
            billingData.type === 'individual'
              ? 'bg-white text-indigo-700 shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <User className="w-4 h-4" />
          Magánszemély
        </button>
        <button
          type="button"
          onClick={() => onTypeChange('company')}
          className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-sm font-medium transition-colors ${
            billingData.type === 'company'
              ? 'bg-white text-indigo-700 shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <Building2 className="w-4 h-4" />
          Cég
        </button>
      </div>

      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {billingData.type === 'company' ? 'Cégnév' : 'Számlázási név'} *
        </label>
        <input
          type="text"
          value={billingData.name}
          onChange={e => onUpdate('name', e.target.value)}
          placeholder={billingData.type === 'company' ? 'Példa Kft.' : 'Teljes neve'}
          className={inputClass(billingErrors.name)}
        />
        {billingErrors.name && <p className="text-xs text-red-500 mt-1">{billingErrors.name}</p>}
      </div>

      {/* Tax number (company only) */}
      {billingData.type === 'company' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Adószám *</label>
          <input
            type="text"
            value={billingData.taxNumber || ''}
            onChange={e => onUpdate('taxNumber', e.target.value)}
            placeholder="12345678-1-23"
            className={inputClass(billingErrors.taxNumber)}
          />
          {billingErrors.taxNumber && (
            <p className="text-xs text-red-500 mt-1">{billingErrors.taxNumber}</p>
          )}
        </div>
      )}

      {/* Zip + City */}
      <div className="flex gap-3">
        <div className="w-28 flex-shrink-0">
          <label className="block text-sm font-medium text-gray-700 mb-1">Irányítószám *</label>
          <input
            type="text"
            value={billingData.zipcode}
            onChange={e => onUpdate('zipcode', e.target.value)}
            placeholder="1234"
            maxLength={4}
            className={inputClass(billingErrors.zipcode)}
          />
          {billingErrors.zipcode && (
            <p className="text-xs text-red-500 mt-1">{billingErrors.zipcode}</p>
          )}
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Város *</label>
          <input
            type="text"
            value={billingData.city}
            onChange={e => onUpdate('city', e.target.value)}
            placeholder="Budapest"
            className={inputClass(billingErrors.city)}
          />
          {billingErrors.city && <p className="text-xs text-red-500 mt-1">{billingErrors.city}</p>}
        </div>
      </div>

      {/* Street */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Utca, házszám *</label>
        <input
          type="text"
          value={billingData.street}
          onChange={e => onUpdate('street', e.target.value)}
          placeholder="Példa utca 1."
          className={inputClass(billingErrors.street)}
        />
        {billingErrors.street && <p className="text-xs text-red-500 mt-1">{billingErrors.street}</p>}
      </div>
    </div>
  );
};

export default VCardBillingInfo;
