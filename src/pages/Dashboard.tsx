import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../hooks/useAuth';
import apiClient from '../api/client';
import PaymentMethodCard from '../components/features/PaymentMethodCard';
import { PaymentMethod } from '../utils/types';
import { 
  Wallet, 
  CreditCard, 
  Landmark, 
  ArrowUpRight, 
  Plus, 
  Loader2,
  AlertCircle
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  // Fetch de los métodos de pago usando React Query
  const { 
    data: methods = [], 
    isLoading, 
    isError, 
    error 
  } = useQuery<PaymentMethod[]>({
    queryKey: ['payment-methods'],
    queryFn: async () => {
      const response = await apiClient.get('/payment-methods/');
      return response.data;
    }
  });

  // Métricas calculadas (simuladas o basadas en datos reales si existieran montos)
  const stats = [
    { label: 'Total en Billetera', value: '$12,450.00', icon: Wallet, color: 'text-primary' },
    { label: 'Métodos Activos', value: methods.length.toString(), icon: CreditCard, color: 'text-blue-400' },
    { label: 'Cuentas Bancarias', value: methods.filter(m => m.type === 'bank' || m.type === 'clabe').length.toString(), icon: Landmark, color: 'text-purple-400' },
  ];

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
        <p className="text-muted font-medium">Cargando tus métodos de pago...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="glass-dark p-10 rounded-2xl border border-red-500/10 flex flex-col items-center text-center space-y-4">
        <AlertCircle className="w-12 h-12 text-red-400" />
        <div className="space-y-1">
          <h3 className="text-xl font-bold text-white">Error al cargar datos</h3>
          <p className="text-muted text-sm">{(error as any)?.message || 'No se pudo conectar con el servidor.'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10 pb-20">
      {/* Welcome Section */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-white">Dashboard</h1>
        <p className="text-muted text-lg">Bienvenido de nuevo, {user?.full_name.split(' ')[0]}. Gestiona tus métodos de pago con seguridad.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="glass-dark p-6 rounded-2xl border border-white/5 space-y-4">
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
          </div>
        ))}
      </div>

      {/* Payment Methods Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Mis Métodos de Pago</h2>
          <button className="text-primary hover:underline text-sm font-semibold flex items-center gap-1">
            Ver todos
          </button>
        </div>
        
        {methods.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {methods.map((method) => (
              <PaymentMethodCard key={method.id} method={method} />
            ))}
            
            {/* Add New Card Placeholder */}
            <button className="h-52 w-full rounded-2xl border-2 border-dashed border-white/10 hover:border-primary/50 hover:bg-primary/5 transition-all flex flex-col items-center justify-center space-y-2 group">
              <div className="p-3 rounded-full bg-white/5 group-hover:bg-primary/20 transition-colors">
                <Plus className="w-6 h-6 text-muted group-hover:text-primary transition-colors" />
              </div>
              <span className="text-muted font-medium text-sm group-hover:text-primary">Añadir Método</span>
            </button>
          </div>
        ) : (
          <div className="glass-dark rounded-2xl p-16 border border-white/5 flex flex-col items-center justify-center text-center space-y-4">
            <div className="bg-white/5 p-6 rounded-full">
              <CreditCard className="w-10 h-10 text-muted/40" />
            </div>
            <div className="space-y-2">
              <p className="text-white font-semibold">No hay métodos registrados</p>
              <p className="text-muted text-sm max-w-xs">
                Comienza añadiendo una tarjeta o cuenta bancaria para visualizar tu billetera.
              </p>
            </div>
            <button className="bg-primary text-background px-6 py-2 rounded-lg font-bold hover:bg-primary-hover transition-colors flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Añadir Primer Método
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
