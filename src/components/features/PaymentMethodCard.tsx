import React from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Landmark, ShieldCheck, Copy } from 'lucide-react';
import type { PaymentMethod } from '../../utils/types';
import { useToast } from '../../context/ToastContext';

interface Props {
  method: PaymentMethod;
  onDetail: (id: number) => void;
}

const PaymentMethodCard: React.FC<Props> = ({ method, onDetail }) => {
  const { showToast } = useToast();
  const isCard = method.type === 'card';
  
  const getCardStyle = () => {
    if (isCard) return "from-primary/20 via-surface to-accent-end/10";
    return "from-blue-500/10 via-surface to-purple-500/10";
  };

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(method.masked_identifier);
    showToast('Identificador copiado al portapapeles', 'info');
  };

  return (
    <motion.div
      layout
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onDetail(method.id)}
      className="h-52 w-full glass-dark p-8 rounded-3xl border border-white/5 flex flex-col justify-between overflow-hidden relative cursor-pointer group transition-all hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10"
    >
      {/* Dynamic Background Effect */}
      <div className={`absolute top-0 right-0 w-full h-full bg-linear-to-br ${getCardStyle()} pointer-events-none -z-10`} />
      
      <div className="flex justify-between items-start relative z-10">
        <div className="bg-white/5 p-3 rounded-2xl group-hover:bg-primary/20 transition-colors">
          {isCard ? <CreditCard className="w-6 h-6 text-primary" /> : <Landmark className="w-6 h-6 text-blue-400" />}
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 group-hover:opacity-100 transition-opacity">
            {method.institution}
          </span>
          <button
            onClick={handleCopy}
            className="p-2 rounded-lg bg-white/5 hover:bg-primary/20 text-muted hover:text-primary transition-all opacity-0 group-hover:opacity-100"
            title="Copiar Identificador"
          >
            <Copy className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="space-y-4 relative z-10">
        <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors truncate">
          {method.alias}
        </h3>
        
        <div className="flex items-center justify-between gap-4">
          <div className="font-mono text-lg sm:text-xl tracking-[0.2em] text-white flex-1 overflow-hidden truncate">
            {method.masked_identifier}
          </div>
          <div className="bg-white/10 p-2 rounded-lg group-hover:bg-primary/20 transition-colors">
            <ShieldCheck className="w-4 h-4 text-primary" />
          </div>
        </div>

        <div className="flex justify-between items-center pt-2">
          <div className="flex items-center gap-2">
            <div className={`w-1.5 h-1.5 rounded-full ${method.status === 'active' ? 'bg-primary' : 'bg-red-500'}`} />
            <span className="text-[9px] font-bold uppercase tracking-widest opacity-60">
              {method.status === 'active' ? 'Activa' : 'Inactiva'}
            </span>
          </div>
          <span className="text-[9px] font-bold opacity-40 uppercase tracking-widest">
            {method.currency}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default PaymentMethodCard;
