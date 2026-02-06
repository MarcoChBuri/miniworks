
import React, { useState } from 'react';
import { useAuth } from '../App';
import { api } from '../services/api';
import { UserRole } from '../types';
import { User, Mail, Shield, Building, MapPin, CheckCircle } from 'lucide-react';

const ProfilePage = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    company: user?.company || '',
    location: user?.location || '',
    description: user?.description || ''
  });

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    try {
      if (user?.role === UserRole.EMPLOYER) {
        await api.employers.updateProfile(user.id, {
          nombre: formData.name,
          empresa: formData.company,
          ubicacion: formData.location,
          descripcion: formData.description
        });
        setSuccess(true);
      }
      // Student profile update would go here
    } catch (err) {
      alert('Error al actualizar perfil');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="md:col-span-1 space-y-6">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 text-center transition-colors">
          <div className="w-24 h-24 bg-cyan-100 dark:bg-cyan-900 text-cyan-600 dark:text-cyan-400 rounded-full mx-auto flex items-center justify-center font-black text-3xl mb-4">
            {user?.name.charAt(0)}
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">{user?.name}</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 uppercase font-bold tracking-widest mt-1">{user?.role}</p>
          
          <div className="mt-8 pt-8 border-t border-gray-50 dark:border-gray-700 space-y-4 text-left text-sm">
            <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
              <Mail className="w-4 h-4 text-cyan-400" /> {user?.email}
            </div>
            <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
              <Shield className="w-4 h-4 text-green-400" /> Cuenta Verificada
            </div>
          </div>
        </div>
      </div>

      <div className="md:col-span-2">
        <div className="bg-white dark:bg-gray-800 p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Información de Perfil</h2>
          
          {success && (
            <div className="mb-8 p-4 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-2xl flex items-center gap-3 font-medium">
              <CheckCircle className="w-5 h-5" /> Perfil actualizado correctamente.
            </div>
          )}

          <form onSubmit={handleUpdate} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block">Nombre Completo</label>
              <input 
                type="text" 
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none transition text-gray-900 dark:text-white"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>

            {user?.role === UserRole.EMPLOYER && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block">Empresa</label>
                    <div className="relative">
                      <Building className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
                      <input 
                        type="text"
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none transition text-gray-900 dark:text-white"
                        value={formData.company}
                        onChange={(e) => setFormData({...formData, company: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block">Ubicación</label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
                      <input 
                        type="text"
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none transition text-gray-900 dark:text-white"
                        value={formData.location}
                        onChange={(e) => setFormData({...formData, location: e.target.value})}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block">Sobre la Empresa</label>
                  <textarea 
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none transition text-gray-900 dark:text-white"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                  ></textarea>
                </div>
              </>
            )}

            <button 
              type="submit" 
              disabled={loading}
              className="w-full md:w-auto px-8 bg-cyan-500 text-white py-3 rounded-xl font-bold hover:bg-cyan-600 transition"
            >
              {loading ? 'Guardando...' : 'Guardar Cambios'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
