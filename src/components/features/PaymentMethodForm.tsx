import React, { useState } from 'react';
import { CreditCard, Landmark, ShieldCheck, Loader2, Info } from 'lucide-react';
import type { PaymentMethodType } from '../../utils/types';
import apiClient from '../../api/client';
import { useToast } from '../../context/ToastContext';

interface Props {
  onSuccess: () => void;
  onCancel: () => void;
}

const PaymentMethodForm: React.FC<Props> = ({ onSuccess, onCancel }) => {
  const { showToast } = useToast();
  const [type, setType] = useState<PaymentMethodType>('card');
  const [alias, setAlias] = useState('');
  const [institution, setInstitution] = useState('');
  const [identifier, setIdentifier] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Validación de Algoritmo de Luhn para Tarjetas
  const validateLuhn = (cardNumber: string) => {
    let sum = 0;
    let shouldDouble = false;
    for (let i = cardNumber.length - 1; i >= 0; i--) {
      let digit = parseInt(cardNumber.charAt(i));
      if (shouldDouble) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      sum += digit;
      shouldDouble = !shouldDouble;
    }
    return sum % 10 === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // Validaciones locales
    if (type === 'card' && !validateLuhn(identifier)) {
      const msg = 'El número de tarjeta no es válido (Fallo de validación Luhn).';
      setError(msg);
      showToast(msg, 'error');
      setIsSubmitting(false);
      return;
    }

    if (type === 'clabe' && identifier.length !== 18) {
      const msg = 'La CLABE debe tener exactamente 18 dígitos.';
      setError(msg);
      showToast(msg, 'error');
      setIsSubmitting(false);
      return;
    }

    try {
      await apiClient.post('/payment-methods/', {
        type,
        alias,
        institution,
        identifier,
        currency: 'MXN',
      });
      showToast('Método de pago guardado exitosamente');
      onSuccess();
    } catch (err: any) {
      const msg = err.message || 'Error al guardar el método de pago.';
      setError(msg);
      showToast(msg, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-xl text-xs flex items-start gap-2">
          <Info className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {/* Selector de Tipo */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {[
          { id: 'card', label: 'Tarjeta', icon: CreditCard },
          { id: 'clabe', label: 'CLABE', icon: Landmark },
          { id: 'bank', label: 'Banco', icon: Landmark },
        ].map((opt) => (
          <button
            key={opt.id}
            type="button"
            onClick={() => setType(opt.id as any)}
            className={`
              flex flex-col items-center gap-2 p-3 sm:p-4 rounded-2xl border transition-all
              ${type === opt.id 
                ? 'bg-primary/10 border-primary text-primary' 
                : 'bg-white/5 border-white/10 text-muted hover:text-white hover:bg-white/10'}
            `}
          >
            <opt.icon className="w-6 h-6" />
            <span className="text-xs font-bold">{opt.label}</span>
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {/* Alias */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted ml-1">Alias del Método</label>
          <input
            type="text"
            required
            value={alias}
            onChange={(e) => setAlias(e.target.value)}
            placeholder="Ej: Mi Tarjeta Personal"
            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all"
          />
        </div>

        {/* Institución */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted ml-1">Institución / Banco</label>
          <input
            type="text"
            required
            value={institution}
            onChange={(e) => setInstitution(e.target.value)}
            placeholder="Ej: BBVA, Santander, Nu"
            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all"
          />
        </div>

        {/* Identificador (Número / CLABE) */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted ml-1">
            {type === 'card' ? 'Número de Tarjeta' : type === 'clabe' ? 'CLABE Interbancaria' : 'Número de Cuenta'}
          </label>
          <div className="relative">
            <input
              type="text"
              required
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value.replace(/\D/g, ''))}
              placeholder={type === 'card' ? '1234123412341234' : '18 dígitos'}
              maxLength={type === 'card' ? 16 : type === 'clabe' ? 18 : 20}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white font-mono tracking-wider focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all"
            />
            <ShieldCheck className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted/30" />
          </div>
          <p className="text-[10px] text-muted/40 ml-1">
            <ShieldCheck className="inline w-3 h-3 mr-1" />
            Tus datos se cifrarán mediante AES-256 en el servidor.
          </p>
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 py-3 px-4 rounded-xl border border-white/10 text-white font-bold hover:bg-white/5 transition-all"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 py-3 px-4 rounded-xl bg-primary text-background font-bold hover:bg-primary-hover transition-all disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Guardar Método'}
        </button>
      </div>
    </form>
  );
};

export default PaymentMethodForm;
