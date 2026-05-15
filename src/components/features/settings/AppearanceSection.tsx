import React from 'react';
import { Check, Moon } from 'lucide-react';
import { useSettings, type AccentColor } from '../../../context/SettingsContext';
import { useToast } from '../../../context/ToastContext';

const AppearanceSection: React.FC = () => {
  const { accentColor, setAccentColor } = useSettings();
  const { showToast } = useToast();

  const themes = [
    { id: 'default', name: 'Taveron Green', color: 'bg-[#00f58d]' },
    { id: 'blue', name: 'Ocean Blue', color: 'bg-[#3b82f6]' },
    { id: 'orange', name: 'Sunset Orange', color: 'bg-[#f59e0b]' },
    { id: 'purple', name: 'Deep Purple', color: 'bg-[#a855f7]' },
  ] as const;

  const handleThemeChange = (id: AccentColor) => {
    setAccentColor(id);
    showToast(`Tema ${id === 'default' ? 'Taveron' : id} activado`);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <label className="text-sm font-medium text-muted">Color de Acento</label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {themes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => handleThemeChange(theme.id)}
              className={`
                flex flex-col items-center gap-3 p-4 rounded-2xl border transition-all relative group
                ${accentColor === theme.id 
                  ? 'bg-primary/10 border-primary text-primary' 
                  : 'bg-white/5 border-white/10 text-muted hover:text-white hover:bg-white/10'}
              `}
            >
              <div className={`w-10 h-10 rounded-full ${theme.color} shadow-lg shadow-black/20 relative`}>
                {accentColor === theme.id && (
                  <div className="absolute inset-0 flex items-center justify-center text-background">
                    <Check className="w-6 h-6" />
                  </div>
                )}
              </div>
              <span className="text-xs font-bold">{theme.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Moon className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-sm font-bold text-white">Modo Oscuro</p>
            <p className="text-xs text-muted">Optimizado para pantallas OLED</p>
          </div>
        </div>
        <div className="w-12 h-6 bg-primary rounded-full relative cursor-pointer">
          <div className="absolute right-1 top-1 w-4 h-4 bg-background rounded-full shadow-md" />
        </div>
      </div>
    </div>
  );
};

export default AppearanceSection;
