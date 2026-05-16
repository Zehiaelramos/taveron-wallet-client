import React from 'react';
import { Outlet } from 'react-router-dom';
import { Wallet } from 'lucide-react';

const AuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 selection:bg-primary/30 relative overflow-hidden">
      {/* Decorative Background Blur */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-md relative">
        <div className="flex flex-col items-center mb-8 space-y-4">
          <div className="glass p-3 rounded-xl shadow-premium">
            <Wallet className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold font-display text-white">
            Taveron <span className="text-gradient">Wallet</span>
          </h1>
        </div>

        <div className="glass-dark p-8 rounded-2xl shadow-2xl">
          <Outlet />
        </div>

        <p className="text-center mt-8 text-muted/40 text-sm">
          &copy; 2026 Taveron Wallet.
        </p>
      </div>
    </div>
  );
};

export default AuthLayout;
