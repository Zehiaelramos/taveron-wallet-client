import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  Wallet, 
  LayoutDashboard, 
  User as UserIcon, 
  Settings, 
  LogOut, 
  PlusCircle, 
  Menu
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import { useUI } from '../context/UIContext';
import { useQueryClient } from '@tanstack/react-query';
import Modal from '../components/ui/Modal';
import PaymentMethodForm from '../components/features/PaymentMethodForm';
import MethodDetails from '../components/features/MethodDetails';
import PageTransition from '../components/ui/PageTransition';

const MainLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const { 
    isAddMethodModalOpen, 
    openAddMethodModal, 
    closeAddMethodModal,
    selectedMethodId,
    closeMethodDetails
  } = useUI();
  
  const queryClient = useQueryClient();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const handleAddSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ['payment-methods'] });
    closeAddMethodModal();
  };

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: UserIcon, label: 'Mi Perfil', path: '/profile' },
    { icon: Settings, label: 'Configuración', path: '/settings' },
  ];

  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="min-h-screen bg-background flex text-secondary">
      {/* Mobile Backdrop */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            onClick={closeSidebar}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-surface border-r border-border transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="h-full flex flex-col p-6">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-10 px-2">
            <div className="glass p-2 rounded-lg">
              <Wallet className="w-6 h-6 text-primary" />
            </div>
            <span className="text-xl font-bold font-display text-white">Taveron</span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={closeSidebar}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl transition-all group
                  ${location.pathname === item.path 
                    ? 'bg-primary/10 text-primary border border-primary/20' 
                    : 'text-muted hover:bg-white/5 hover:text-white'}
                `}
              >
                <item.icon className={`w-5 h-5 ${location.pathname === item.path ? 'text-primary' : 'group-hover:scale-110 transition-transform'}`} />
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* User Section (Bottom) */}
          <div className="pt-6 border-t border-border space-y-4">
            <div className="flex items-center gap-3 px-2">
              <div className="w-10 h-10 rounded-full bg-linear-to-br from-primary/20 to-accent-end/20 border border-white/10 flex items-center justify-center text-primary font-bold">
                {user?.full_name?.charAt(0) || 'U'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white truncate">{user?.full_name}</p>
                <p className="text-xs text-muted truncate">{user?.email}</p>
              </div>
            </div>
            <button
              onClick={logout}
              className="flex items-center gap-3 w-full px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Cerrar Sesión</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-20 border-b border-border bg-background/50 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-30">
          <button 
            className="lg:hidden p-2 text-muted hover:text-white transition-colors"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>

          <h2 className="text-lg font-semibold text-white hidden lg:block">
            {menuItems.find(item => item.path === location.pathname)?.label || 'Wallet'}
          </h2>

          <div className="flex items-center gap-4">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={openAddMethodModal}
              className="flex items-center gap-2 bg-primary text-background px-4 py-2 rounded-lg font-bold text-sm hover:bg-primary-hover transition-colors shadow-lg shadow-primary/10"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Nuevo Método</span>
            </motion.button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 md:p-10 relative">
          {/* Background Decorative Gradient */}
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-primary/5 blur-[120px] rounded-full pointer-events-none -z-10" />
          
          <div className="max-w-6xl mx-auto">
            <AnimatePresence mode="wait">
              <PageTransition key={location.pathname}>
                <Outlet />
              </PageTransition>
            </AnimatePresence>
          </div>
        </main>
      </div>

      {/* Modal for adding payment methods */}
      <Modal 
        isOpen={isAddMethodModalOpen} 
        onClose={closeAddMethodModal} 
        title="Añadir Método de Pago"
      >
        <PaymentMethodForm 
          onSuccess={handleAddSuccess} 
          onCancel={closeAddMethodModal} 
        />
      </Modal>

      {/* Modal for viewing/managing method details */}
      <Modal
        isOpen={!!selectedMethodId}
        onClose={closeMethodDetails}
        title="Detalle del Método"
      >
        {selectedMethodId && (
          <MethodDetails 
            id={selectedMethodId} 
            onClose={closeMethodDetails} 
          />
        )}
      </Modal>
    </div>
  );
};

export default MainLayout;
