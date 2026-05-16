import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import { useUI } from '../context/UIContext';
import { useSettings } from '../context/SettingsContext';
import apiClient from '../api/client';
import PaymentMethodCard from '../components/features/PaymentMethodCard';
import { CardSkeleton } from '../components/ui/Skeleton';
import type { PaymentMethod, PaymentMethodType } from '../utils/types';
import { 
  Wallet, 
  CreditCard, 
  Landmark, 
  ArrowUpRight, 
  Plus, 
  AlertCircle,
  Filter,
  Layers
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { currency } = useSettings();
  const { openAddMethodModal, openMethodDetails } = useUI();
  const [filterType, setFilterType] = useState<PaymentMethodType | 'all'>('all');

  const formatValue = (value: number) => {
    const symbols: Record<string, string> = { MXN: '$', USD: 'US$', EUR: '€' };
    return `${symbols[currency] || '$'}${value.toLocaleString('es-MX', { minimumFractionDigits: 2 })}`;
  };

  // Fetch de los métodos de pago usando React Query con soporte de filtros
  const { 
    data: methods = [], 
    isLoading, 
    isError, 
    error 
  } = useQuery<PaymentMethod[]>({
    queryKey: ['payment-methods', filterType],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filterType !== 'all') {
        params.append('type', filterType);
      }
      const response = await apiClient.get('/payment-methods/', { params });
      return response.data;
    }
  });

  const stats = [
    { label: 'Total en Billetera', value: formatValue(12450), icon: Wallet, color: 'text-primary' },
    { label: 'Métodos Activos', value: methods.length.toString(), icon: CreditCard, color: 'text-blue-400' },
    { label: 'Cuentas Bancarias', value: methods.filter(m => m.type === 'bank' || m.type === 'clabe').length.toString(), icon: Landmark, color: 'text-purple-400' },
  ];

  const filterOptions = [
    { id: 'all', label: 'Todos', icon: Layers },
    { id: 'card', label: 'Tarjetas', icon: CreditCard },
    { id: 'clabe', label: 'CLABE', icon: Landmark },
    { id: 'bank', label: 'Cuentas', icon: Landmark },
  ];

  if (isError) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-dark p-10 rounded-2xl border border-red-500/10 flex flex-col items-center text-center space-y-4"
      >
        <AlertCircle className="w-12 h-12 text-red-400" />
        <div className="space-y-1">
          <h3 className="text-xl font-bold text-white">Error al cargar datos</h3>
          <p className="text-muted text-sm">{(error as any)?.message || 'No se pudo conectar con el servidor.'}</p>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="space-y-10 pb-20">
      {/* Welcome Section */}
      <div className="space-y-2">
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-4xl font-bold text-white"
        >
          Dashboard
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="text-muted text-lg"
        >
          Bienvenido de nuevo, {user?.full_name.split(' ')[0]}.
        </motion.p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <motion.div 
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="glass-dark p-6 rounded-2xl border border-white/5 space-y-4 cursor-default"
          >
            <div className="flex items-center justify-between">
              <div className="bg-white/5 p-3 rounded-xl">
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded-md flex items-center gap-1">
                +2.4% <ArrowUpRight className="w-3 h-3" />
              </span>
            </div>
            <div>
              <p className="text-muted text-sm font-medium">{stat.label}</p>
              <h3 className="text-2xl font-bold text-white mt-1">{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Payment Methods Section */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h2 className="text-2xl font-bold text-white">Mis Métodos de Pago</h2>
          
          {/* Filter Bar */}
          <div className="flex items-center gap-2 p-1 bg-white/5 rounded-xl border border-white/10 self-start">
            {filterOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => setFilterType(option.id as any)}
                className={`
                  flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all relative
                  ${filterType === option.id ? 'text-background' : 'text-muted hover:text-white'}
                `}
              >
                {filterType === option.id && (
                  <motion.div 
                    layoutId="activeFilter"
                    className="absolute inset-0 bg-primary rounded-lg shadow-lg shadow-primary/20"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <option.icon className="w-4 h-4" />
                  {option.label}
                </span>
              </button>
            ))}
          </div>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => <CardSkeleton key={i} />)}
          </div>
        ) : methods.length > 0 ? (
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {methods.map((method) => (
                <motion.div
                  key={method.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <PaymentMethodCard 
                    method={method} 
                    onDetail={openMethodDetails}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
            
            <motion.button 
              layout
              onClick={openAddMethodModal}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="h-52 w-full rounded-2xl border-2 border-dashed border-white/10 hover:border-primary/50 hover:bg-primary/5 transition-all flex flex-col items-center justify-center space-y-2 group"
            >
              <div className="p-3 rounded-full bg-white/5 group-hover:bg-primary/20 transition-colors">
                <Plus className="w-6 h-6 text-muted group-hover:text-primary transition-colors" />
              </div>
              <span className="text-muted font-medium text-sm group-hover:text-primary">Añadir Método</span>
            </motion.button>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden glass-dark rounded-[2.5rem] p-12 md:p-20 border border-white/5 flex flex-col items-center justify-center text-center space-y-8"
          >
            {/* Decorative background circle */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 blur-[100px] rounded-full pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />

            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
              <div className="relative bg-linear-to-b from-white/10 to-transparent p-8 rounded-3xl border border-white/10 shadow-2xl">
                <Wallet className="w-16 h-16 text-primary" />
              </div>
            </div>

            <div className="space-y-3 max-w-sm relative z-10">
              <h3 className="text-2xl font-bold text-white tracking-tight">Tu billetera está vacía</h3>
              <p className="text-muted text-base leading-relaxed">
                Parece que aún no has registrado ningún método de pago. Añade tu primera tarjeta o cuenta para comenzar a gestionar tus finanzas con seguridad.
              </p>
            </div>

            <motion.button 
              whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(var(--primary-rgb), 0.3)' }}
              whileTap={{ scale: 0.95 }}
              onClick={openAddMethodModal}
              className="relative z-10 bg-primary text-background px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-primary-hover transition-all flex items-center gap-3 group"
            >
              <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
              Añadir Primer Método
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
