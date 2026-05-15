import React, { useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { useToast } from '../../../context/ToastContext';

const ProfileSection: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const { showToast } = useToast();
  
  const [profileName, setProfileName] = useState(user?.full_name || '');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (!profileName.trim()) return;
    setIsSaving(true);
    try {
      await updateProfile({ full_name: profileName });
      showToast('Perfil actualizado correctamente');
    } catch (err: any) {
      showToast(err.message || 'Error al actualizar perfil', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted">Nombre Completo</label>
          <input 
            type="text" 
            value={profileName} 
            onChange={(e) => setProfileName(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-primary/50"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted">Correo Electrónico</label>
          <input 
            type="email" 
            disabled 
            value={user?.email} 
            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-muted cursor-not-allowed"
          />
        </div>
      </div>
      <button 
        onClick={handleSave}
        disabled={isSaving || profileName === user?.full_name}
        className="btn-primary w-full sm:w-auto flex items-center justify-center gap-2"
      >
        {isSaving ? 'Guardando...' : 'Guardar Cambios'}
      </button>
    </div>
  );
};

export default ProfileSection;
