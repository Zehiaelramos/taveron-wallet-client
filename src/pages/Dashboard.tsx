import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Wallet, CreditCard, Landmark, ArrowUpRight, ArrowDownLeft } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  // Datos mock para visualización inicial del Dashboard
  const stats = [
    { label: 'Total en Billetera', value: '$12,450.00', icon: Wallet, color: 'text-primary' },
    { label: 'Métodos Activos', value: '3', icon: CreditCard, color: 'text-blue-400' },
    { label: 'Cuentas Bancarias', value: '1', icon: Landmark, color: 'text-purple-400' },
  ];

  return (
    <div className="space-y-10">
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

      {/* Placeholder for Payment Methods List */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Mis Métodos de Pago</h2>
          <button className="text-primary hover:underline text-sm font-semibold flex items-center gap-1">
            Ver todos <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        
        <div className="glass-dark rounded-2xl p-10 border border-white/5 flex flex-col items-center justify-center text-center space-y-4">
          <div className="bg-white/5 p-6 rounded-full">
            <CreditCard className="w-10 h-10 text-muted/40" />
          </div>
          <div className="space-y-2">
            <p className="text-white font-semibold">No hay métodos registrados</p>
            <p className="text-muted text-sm max-w-xs">
              Comienza añadiendo una tarjeta o cuenta bancaria para visualizar tu billetera.
            </p>
          </div>
          <button className="bg-white text-background px-6 py-2 rounded-lg font-bold hover:bg-white/90 transition-colors">
            Añadir Primer Método
          </button>
        </div>
      </div>
    </div>
  );
};

const ArrowRight = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);

export default Dashboard;
