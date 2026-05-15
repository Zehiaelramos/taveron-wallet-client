import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Palette, 
  Globe, 
  User as UserIcon,
  ChevronRight
} from 'lucide-react';
import AppearanceSection from '../components/features/settings/AppearanceSection';
import RegionalSection from '../components/features/settings/RegionalSection';
import ProfileSection from '../components/features/settings/ProfileSection';

type TabId = 'appearance' | 'regional' | 'profile';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>('appearance');

  const tabs = [
    {
      id: 'appearance',
      title: 'Personalización',
      icon: Palette,
      description: 'Ajusta la apariencia visual de tu billetera.',
      component: AppearanceSection
    },
    {
      id: 'regional',
      title: 'Preferencias Regionales',
      icon: Globe,
      description: 'Configura tu moneda y formatos locales.',
      component: RegionalSection
    },
    {
      id: 'profile',
      title: 'Perfil y Cuenta',
      icon: UserIcon,
      description: 'Información básica de tu identidad en Taveron.',
      component: ProfileSection
    }
  ] as const;

  const activeTabData = tabs.find(t => t.id === activeTab)!;

  return (
    <div className="space-y-10 pb-20">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-white">Configuración</h1>
        <p className="text-muted text-lg">Gestiona tu experiencia y seguridad en la plataforma.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-1 space-y-2 overflow-x-auto flex lg:flex-col pb-4 lg:pb-0 gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabId)}
              className={`
                flex items-center justify-between gap-3 px-5 py-4 rounded-2xl transition-all text-left whitespace-nowrap lg:whitespace-normal group border
                ${activeTab === tab.id 
                  ? 'bg-primary/10 text-primary border-primary/20 shadow-lg shadow-primary/5' 
                  : 'text-muted border-transparent hover:text-white hover:bg-white/5'}
              `}
            >
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-lg transition-colors ${activeTab === tab.id ? 'bg-primary/20' : 'bg-white/5 group-hover:bg-white/10'}`}>
                  <tab.icon className="w-5 h-5 shrink-0" />
                </div>
                <div>
                  <p className="text-sm font-bold">{tab.title}</p>
                  <p className="text-[10px] opacity-60 hidden lg:block line-clamp-1">{tab.description}</p>
                </div>
              </div>
              <ChevronRight className={`w-4 h-4 hidden lg:block transition-all ${activeTab === tab.id ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100'}`} />
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="glass-dark p-8 rounded-3xl border border-white/5 space-y-8"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-primary/10 border border-primary/20">
                  <activeTabData.icon className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">{activeTabData.title}</h3>
                  <p className="text-sm text-muted">{activeTabData.description}</p>
                </div>
              </div>
              
              <div className="pt-6 border-t border-white/5">
                <activeTabData.component />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Settings;
