import React from 'react';
import { useSettings, type Currency } from '../../../context/SettingsContext';
import { useToast } from '../../../context/ToastContext';

const RegionalSection: React.FC = () => {
  const { currency, setCurrency } = useSettings();
  const { showToast } = useToast();

  const currencies = [
    { id: 'MXN', name: 'Peso Mexicano', symbol: '$' },
    { id: 'USD', name: 'Dólar Estadounidense', symbol: 'US$' },
    { id: 'EUR', name: 'Euro', symbol: '€' },
  ] as const;

  const handleCurrencyChange = (id: Currency) => {
    setCurrency(id);
    showToast(`Moneda cambiada a ${id}`);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <label className="text-sm font-medium text-muted">Moneda Predeterminada</label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {currencies.map((curr) => (
            <button
              key={curr.id}
              onClick={() => handleCurrencyChange(curr.id)}
              className={`
                flex items-center justify-between p-4 rounded-2xl border transition-all
                ${currency === curr.id 
                  ? 'bg-primary/10 border-primary text-primary' 
                  : 'bg-white/5 border-white/10 text-muted hover:text-white hover:bg-white/10'}
              `}
            >
              <div className="flex flex-col items-start">
                <span className="text-xs font-bold uppercase">{curr.id}</span>
                <span className="text-[10px] opacity-60">{curr.name}</span>
              </div>
              <span className="text-lg font-bold">{curr.symbol}</span>
            </button>
          ))}
        </div>
      </div>
      
      <div className="p-4 rounded-2xl bg-primary/5 border border-primary/10">
        <p className="text-[10px] text-primary font-bold uppercase tracking-widest mb-1">Nota</p>
        <p className="text-xs text-muted">Los valores en el Dashboard se mostrarán en la moneda seleccionada utilizando el símbolo correspondiente.</p>
      </div>
    </div>
  );
};

export default RegionalSection;
