import React, { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { 
  Eye, 
  EyeOff, 
  Trash2, 
  Power, 
  PowerOff, 
  Loader2, 
  AlertCircle,
  Copy,
  Check
} from 'lucide-react';
import apiClient from '../../api/client';
import type { PaymentMethod } from '../../utils/types';
import { useToast } from '../../context/ToastContext';

interface Props {
  id: number;
  onClose: () => void;
}

const MethodDetails: React.FC<Props> = ({ id, onClose }) => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const [isRevealed, setIsRevealed] = useState(false);
  const [revealedValue, setRevealedValue] = useState<string | null>(null);
  const [isRevealing, setIsRevealing] = useState(false);
  const [isActionLoading, setIsActionLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  // Fetch de los datos base
  const { data: method, isLoading, isError } = useQuery<PaymentMethod>({
    queryKey: ['payment-method', id],
    queryFn: async () => {
      const cached = queryClient.getQueryData<PaymentMethod[]>(['payment-methods']);
      const found = cached?.find(m => m.id === id);
      if (found) return found;

      const response = await apiClient.get(`/payment-methods/`);
      return response.data.find((m: PaymentMethod) => m.id === id);
    }
  });

  // Función para revelar el dato real
  const handleReveal = async () => {
    if (isRevealed) {
      setIsRevealed(false);
      return;
    }

    setIsRevealing(true);
    try {
      const response = await apiClient.get(`/payment-methods/${id}`);
      setRevealedValue(response.data.identifier);
      setIsRevealed(true);
      showToast('Datos descifrados correctamente', 'info');
    } catch (err: any) {
      showToast(err.message || 'Error al revelar datos', 'error');
    } finally {
      setIsRevealing(false);
    }
  };

  // Función para cambiar estatus
  const handleToggleStatus = async () => {
    if (!method) return;
    setIsActionLoading(true);
    const newStatus = method.status === 'active' ? 'inactive' : 'active';
    try {
      await apiClient.patch(`/payment-methods/${id}/status?status=${newStatus}`);
      queryClient.invalidateQueries({ queryKey: ['payment-methods'] });
      queryClient.invalidateQueries({ queryKey: ['payment-method', id] });
      showToast(`Método ${newStatus === 'active' ? 'activado' : 'desactivado'} correctamente`);
    } catch (err: any) {
      showToast(err.message || 'Error al cambiar estatus', 'error');
    } finally {
      setIsActionLoading(false);
    }
  };

  // Función para eliminar
  const handleDelete = async () => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar este método de pago?')) return;
    setIsActionLoading(true);
    try {
      await apiClient.delete(`/payment-methods/${id}`);
      queryClient.invalidateQueries({ queryKey: ['payment-methods'] });
      showToast('Método de pago eliminado');
      onClose();
    } catch (err: any) {
      showToast(err.message || 'Error al eliminar método', 'error');
    } finally {
      setIsActionLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (revealedValue) {
      navigator.clipboard.writeText(revealedValue);
      setCopied(true);
      showToast('Copiado al portapapeles');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (isLoading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin text-primary" /></div>;
  if (isError || !method) return <div className="text-red-400 p-10 flex items-center gap-2"><AlertCircle /> Error al cargar detalles.</div>;

  return (
    <div className="space-y-8">
      {/* Header Info */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-xs font-bold text-primary uppercase tracking-widest">{method.institution}</p>
          <h2 className="text-2xl font-bold text-white">{method.alias}</h2>
        </div>
        <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${method.status === 'active' ? 'bg-primary/10 text-primary border border-primary/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
          {method.status === 'active' ? 'Activo' : 'Inactivo'}
        </div>
      </div>

      {/* Sensitive Data Box */}
      <div className="glass-dark p-6 rounded-2xl border border-white/5 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-muted uppercase tracking-wider">
            {method.type === 'card' ? 'Número de Tarjeta' : 'Identificador / CLABE'}
          </span>
          {isRevealed && (
            <button 
              onClick={copyToClipboard}
              className="text-muted hover:text-white transition-colors"
              title="Copiar"
            >
              {copied ? <Check className="w-4 h-4 text-primary" /> : <Copy className="w-4 h-4" />}
            </button>
          )}
        </div>
        
        <div className="flex items-center justify-between gap-4">
          <div className="font-mono text-2xl tracking-[0.15em] text-white flex-1 overflow-hidden truncate">
            {isRevealed ? revealedValue : method.identifier_masked}
          </div>
          <button
            onClick={handleReveal}
            disabled={isRevealing}
            className={`p-3 rounded-xl transition-all ${isRevealed ? 'bg-primary/10 text-primary' : 'bg-white/5 text-muted hover:text-white'}`}
          >
            {isRevealing ? <Loader2 className="w-6 h-6 animate-spin" /> : isRevealed ? <EyeOff className="w-6 h-6" /> : <Eye className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={handleToggleStatus}
          disabled={isActionLoading}
          className={`flex items-center justify-center gap-2 py-4 rounded-2xl font-bold transition-all border ${method.status === 'active' ? 'border-red-500/20 text-red-400 hover:bg-red-500/10' : 'border-primary/20 text-primary hover:bg-primary/10'}`}
        >
          {isActionLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : method.status === 'active' ? <><PowerOff className="w-5 h-5" /> Desactivar</> : <><Power className="w-5 h-5" /> Activar</>}
        </button>
        
        <button
          onClick={handleDelete}
          disabled={isActionLoading}
          className="flex items-center justify-center gap-2 py-4 rounded-2xl font-bold bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition-all"
        >
          {isActionLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Trash2 className="w-5 h-5" /> Eliminar</>}
        </button>
      </div>

      <p className="text-[10px] text-muted/30 text-center uppercase tracking-widest">
        ID: {method.id} • Creado el {new Date(method.created_at).toLocaleDateString()}
      </p>
    </div>
  );
};

export default MethodDetails;
