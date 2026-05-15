import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import AuthLayout from './layouts/AuthLayout';
import Login from './pages/Login';
import Register from './pages/Register';
import { Loader2, LogOut, Wallet } from 'lucide-react';

/**
 * Componente para proteger rutas privadas.
 * Redirige al login si el usuario no está autenticado.
 */
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

/**
 * Vista temporal del Dashboard para validar el flujo de autenticación.
 */
const DashboardPlaceholder = () => {
  const { user, logout } = useAuth();
  
  return (
    <div className="min-h-screen bg-background p-8 flex flex-col items-center justify-center space-y-6">
      <div className="glass p-6 rounded-2xl flex items-center gap-4 border-primary/20 shadow-lg shadow-primary/5">
        <div className="bg-primary/20 p-3 rounded-xl">
          <Wallet className="w-8 h-8 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">Hola, {user?.full_name || 'Usuario'}</h1>
          <p className="text-muted text-sm">{user?.email}</p>
        </div>
      </div>
      
      <p className="text-muted max-w-sm text-center">
        Has iniciado sesión correctamente. Esta es la vista protegida del Dashboard.
      </p>

      <button 
        onClick={logout}
        className="flex items-center gap-2 px-6 py-3 bg-red-500/10 text-red-400 rounded-xl border border-red-500/20 hover:bg-red-500/20 transition-all"
      >
        <LogOut className="w-5 h-5" />
        Cerrar Sesión
      </button>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Rutas Públicas (Auth) */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Rutas Privadas */}
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <DashboardPlaceholder />
            </ProtectedRoute>
          } 
        />

        {/* Redirección por defecto */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
