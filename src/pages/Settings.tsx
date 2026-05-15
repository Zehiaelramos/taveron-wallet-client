import React from 'react';
import { motion } from 'framer-motion';
import { 
  Palette, 
  Check, 
  Moon, 
  Sun, 
  Globe, 
  Shield, 
  Bell, 
  User as UserIcon,
  CreditCard
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useToast } from '../context/ToastContext';
import { useAuth } from '../hooks/useAuth';

const Settings: React.FC = () => {
  const { accentColor, setAccentColor } = useTheme();
  const { showToast } = useToast();
  const { user } = useAuth();

  const themes = [
    { id: 'default', name: 'Taveron Green', color: 'bg-[#00f58d]' },
    { id: 'blue', name: 'Ocean Blue', color: 'bg-[#3b82f6]' },
    { id: 'orange', name: 'Sunset Orange', color: 'bg-[#f59e0b]' },
    { id: 'purple', name: 'Deep Purple', color: 'bg-[#a855f7]' },
  ] as const;

  const handleThemeChange = (id: typeof themes[number]['id']) => {
    setAccentColor(id);
    showToast(`Tema ${id === 'default' ? 'Taveron' : id} activado`);
  };

  const sections = [
    {
      title: 'Personalización',
      icon: Palette,
      description: 'Ajusta la apariencia visual de tu billetera.',
      content: (
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
            <div className="w-12 h-6 bg-primary rounded-full relative">
              <div className="absolute right-1 top-1 w-4 h-4 bg-background rounded-full shadow-md" />
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Perfil y Cuenta',
      icon: UserIcon,
      description: 'Información básica de tu identidad en Taveron.',
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted">Nombre Completo</label>
              <input 
                type="text" 
                defaultValue={user?.full_name} 
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary/50"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted">Correo Electrónico</label>
              <input 
                type="email" 
                disabled 
                value={user?.email} 
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-muted cursor-not-allowed"
              />
            </div>
          </div>
          <button className="btn-primary w-full sm:w-auto">Guardar Cambios</button>
        </div>
      )
    },
    {
      title: 'Preferencias Regionales',
      icon: Globe,
      description: 'Configura tu moneda y formatos locales.',
      content: (
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted">Moneda Predeterminada</label>
            <select className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary/50">
              <option value="MXN">Peso Mexicano (MXN)</option>
              <option value="USD">Dólar Estadounidense (USD)</option>
              <option value="EUR">Euro (EUR)</option>
            </select>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-10 pb-20">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-white">Configuración</h1>
        <p className="text-muted text-lg">Gestiona tu experiencia y seguridad en la plataforma.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Navigation Sidebar (Mobile Horizontal / Desktop Vertical) */}
        <div className="lg:col-span-1 space-y-2 overflow-x-auto flex lg:flex-col pb-4 lg:pb-0 gap-2">
          {sections.map((section, idx) => (
            <button
              key={section.title}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left whitespace-nowrap lg:whitespace-normal
                ${idx === 0 ? 'bg-primary/10 text-primary border border-primary/20' : 'text-muted hover:text-white hover:bg-white/5'}
              `}
            >
              <section.icon className="w-5 h-5 shrink-0" />
              <div className="hidden sm:block">
                <p className="text-sm font-bold">{section.title}</p>
                <p className="text-[10px] opacity-60 line-clamp-1">{section.description}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="lg:col-span-2 space-y-8">
          {sections.map((section, idx) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="glass-dark p-8 rounded-3xl border border-white/5 space-y-6"
            >
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-white/5">
                  <section.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{section.title}</h3>
                  <p className="text-sm text-muted">{section.description}</p>
                </div>
              </div>
              <div className="pt-4 border-t border-white/5">
                {section.content}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Settings;
