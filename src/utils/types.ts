export type PaymentMethodType = 'card' | 'bank' | 'clabe' | 'other';

export interface PaymentMethod {
  id: number;
  type: PaymentMethodType;
  alias: string;
  institution: string;
  currency: string;
  identifier_masked: string; // El backend devuelve el dato enmascarado en el listado
  status: 'active' | 'inactive';
  created_at: string;
}

export interface User {
  id: number;
  email: string;
  full_name: string;
}
