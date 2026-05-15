import React from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Landmark, MoreVertical, ShieldCheck, ShieldAlert } from 'lucide-react';
import { PaymentMethod } from '../../utils/types';

interface Props {
  method: PaymentMethod;
  onDetail?: (id: number) => void;
}

const PaymentMethodCard: React.FC<Props> = ({ method, onDetail }) => {
  const isCard = method.type === 'card';
  
  // Colores dinámicos basados en la institución o tipo
  const getCardGradient = () => {
    if (method.type === 'clabe') return 'from-blue-600 to-indigo-900';
    if (method.type === 'bank') return 'from-purple-600 to-purple-900';
    return 'from-emerald-600 to-teal-900';
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`relative h-52 w-full rounded-2xl p-6 text-white shadow-2xl overflow-hidden bg-linear-to-br ${getCardGradient()} group cursor-pointer`}
      onClick={() => onDetail?.(method.id)}
    >
      {/* Background patterns */}
      <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-colors" />
      
      <div className="relative h-full flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <p className="text-xs font-bold uppercase tracking-wider opacity-70">{method.institution}</p>
            <h3 className="text-lg font-bold truncate max-w-[200px]">{method.alias}</h3>
          </div>
          <div className="glass p-2 rounded-lg">
            {isCard ? <CreditCard className="w-6 h-6" /> : <Landmark className="w-6 h-6" />}
          </div>
        </div>

        <div className="space-y-4">
          <div className="font-mono text-xl tracking-[0.2em]">
            {method.identifier_masked}
          </div>

          <div className="flex justify-between items-end">
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${method.status === 'active' ? 'bg-primary' : 'bg-red-400'}`} />
              <span className="text-[10px] font-bold uppercase tracking-widest opacity-80">
                {method.status === 'active' ? 'Activa' : 'Inactiva'}
              </span>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-bold opacity-80 uppercase tracking-widest">
              {method.currency}
              <ShieldCheck className="w-4 h-4 text-white/50" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PaymentMethodCard;
