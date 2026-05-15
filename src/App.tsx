import { useState } from 'react'
import { Wallet, ShieldCheck, TrendingUp, ArrowRight } from 'lucide-react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-background selection:bg-primary/30">
      {/* Background Decorative Element */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

      <main className="relative w-full max-w-xl space-y-8 text-center">
        {/* Logo/Icon Section */}
        <div className="flex justify-center">
          <div className="glass p-4 rounded-2xl shadow-premium">
            <Wallet className="w-12 h-12 text-primary" />
          </div>
        </div>

        {/* Hero Text */}
        <div className="space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            Taveron <span className="text-gradient">Wallet</span>
          </h1>
          <p className="text-lg text-muted max-w-md mx-auto">
            La plataforma segura para gestionar tus métodos de pago con tecnología de vanguardia y diseño premium.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-2 gap-4 pt-4">
          <div className="glass-dark p-6 rounded-2xl text-left space-y-2 hover:bg-white/5 transition-colors group">
            <ShieldCheck className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
            <h3 className="font-semibold text-white">Seguridad Total</h3>
            <p className="text-sm text-muted">Cifrado AES-256 de extremo a extremo.</p>
          </div>
          <div className="glass-dark p-6 rounded-2xl text-left space-y-2 hover:bg-white/5 transition-colors group">
            <TrendingUp className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
            <h3 className="font-semibold text-white">UX Fluida</h3>
            <p className="text-sm text-muted">Micro-animaciones y diseño optimizado.</p>
          </div>
        </div>

        {/* Interactive Section */}
        <div className="pt-8">
          <button 
            onClick={() => setCount(c => c + 1)}
            className="group relative px-8 py-4 bg-primary text-background font-bold rounded-xl hover:bg-primary-hover transition-all active:scale-95 shadow-lg shadow-primary/20"
          >
            <span className="flex items-center gap-2">
              Ver Demo de Componentes
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
          <p className="mt-4 text-xs text-muted/60 font-mono">
            Interacciones registradas: {count}
          </p>
        </div>
      </main>

      <footer className="mt-20 text-muted/40 text-sm">
        &copy; 2026 Taveron Wallet. Made with 💚 for Fintech.
      </footer>
    </div>
  )
}

export default App
