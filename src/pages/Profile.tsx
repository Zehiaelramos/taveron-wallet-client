import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { User as UserIcon, Mail, Shield, Calendar } from 'lucide-react';

const Profile: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-10">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-white">Mi Perfil</h1>
        <p className="text-muted text-lg">Información de tu cuenta y preferencias de seguridad.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass-dark p-8 rounded-3xl border border-white/5 flex flex-col items-center text-center space-y-4">
            <div className="w-24 h-24 rounded-full bg-linear-to-br from-primary/20 to-accent-end/20 border-2 border-primary/30 flex items-center justify-center text-primary text-3xl font-bold shadow-lg shadow-primary/10">
              {user?.full_name?.charAt(0)}
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">{user?.full_name}</h2>
              <p className="text-primary text-sm font-medium">Usuario Verificado</p>
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-dark rounded-3xl border border-white/5 divide-y divide-white/5">
            <div className="p-6 flex items-center gap-4">
              <div className="bg-white/5 p-3 rounded-xl">
                <Mail className="w-5 h-5 text-muted" />
              </div>
              <div>
                <p className="text-xs text-muted font-medium uppercase tracking-wider">Correo Electrónico</p>
                <p className="text-white font-medium">{user?.email}</p>
              </div>
            </div>
            
            <div className="p-6 flex items-center gap-4">
              <div className="bg-white/5 p-3 rounded-xl">
                <UserIcon className="w-5 h-5 text-muted" />
              </div>
              <div>
                <p className="text-xs text-muted font-medium uppercase tracking-wider">Nombre Completo</p>
                <p className="text-white font-medium">{user?.full_name}</p>
              </div>
            </div>

            <div className="p-6 flex items-center gap-4">
              <div className="bg-white/5 p-3 rounded-xl">
                <Shield className="w-5 h-5 text-muted" />
              </div>
              <div>
                <p className="text-xs text-muted font-medium uppercase tracking-wider">Seguridad</p>
                <p className="text-white font-medium">Autenticación por Token Activa</p>
              </div>
            </div>

            <div className="p-6 flex items-center gap-4">
              <div className="bg-white/5 p-3 rounded-xl">
                <Calendar className="w-5 h-5 text-muted" />
              </div>
              <div>
                <p className="text-xs text-muted font-medium uppercase tracking-wider">Miembro desde</p>
                <p className="text-white font-medium">Mayo 2026</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
