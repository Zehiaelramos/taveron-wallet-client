import React from 'react';
import { motion } from 'framer-motion';
import { Check, Moon, Sun } from 'lucide-react';
import { useSettings, type AccentColor } from '../../../context/SettingsContext';
import { useToast } from '../../../context/ToastContext';

const AppearanceSection: React.FC = () => {
  const { accentColor, setAccentColor, darkMode, toggleDarkMode } = useSettings();
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

  const handleToggleDark = () => {
    toggleDarkMode();
    showToast(`Modo ${!darkMode ? 'oscuro' : 'claro'} activado`);
  };

  return (
    <div className="space-y-8">
      {/* Selector de Color de Acento */}
      <div className="space-y-4">
        <label className="text-sm font-medium text-muted uppercase tracking-widest">Color de Acento</label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {themes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => handleThemeChange(theme.id)}
              className={`
                flex flex-col items-center gap-3 p-5 rounded-3xl border transition-all relative group
                ${accentColor === theme.id 
                  ? 'bg-primary/10 border-primary shadow-lg shadow-primary/5 text-primary' 
                  : 'bg-white/5 border-white/5 text-muted hover:text-white hover:bg-white/10'}
              `}
            >
              <div className={`w-12 h-12 rounded-full ${theme.color} shadow-2xl shadow-black/20 relative flex items-center justify-center`}>
                {accentColor === theme.id && (
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-background"
                  >
                    <Check className="w-7 h-7" />
                  </motion.div>
                )}
              </div>
              <span className="text-[10px] font-black uppercase tracking-tighter">{theme.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Toggle de Modo Oscuro */}
      <div className="flex items-center justify-between p-6 rounded-3xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-primary/10 border border-primary/20">
            {darkMode ? <Moon className="w-6 h-6 text-primary" /> : <Sun className="w-6 h-6 text-primary" />}
          </div>
          <div>
            <p className="text-sm font-bold text-white">Modo Oscuro</p>
            <p className="text-xs text-muted">Optimizado para una experiencia inmersiva</p>
          </div>
        </div>
        
        <button 
          onClick={handleToggleDark}
          className={`
            w-14 h-8 rounded-full relative transition-all duration-300 p-1
            ${darkMode ? 'bg-primary' : 'bg-muted'}
          `}
        >
          <motion.div 
            animate={{ x: darkMode ? 24 : 0 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            className="w-6 h-6 bg-white rounded-full shadow-lg"
          />
        </button>
      </div>

      {!darkMode && (
        <div className="p-4 rounded-2xl bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs">
          ⚠️ <strong>Aviso:</strong> El modo claro está en fase experimental. Algunos elementos visuales podrían no visualizarse correctamente.
        </div>
      )}
    </div>
  );
};

export default AppearanceSection;
