
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Briefcase, Mail, User as UserIcon, ShieldCheck, UserCheck, CreditCard } from 'lucide-react';
import { api } from '../services/api';
import { UserRole } from '../types';

const RegisterPage = () => {
  const [role, setRole] = useState<UserRole>(UserRole.STUDENT);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    cedula: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await api.auth.register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: role,
        cedula: formData.cedula
      });
      navigate('/login');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 transition-colors">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-cyan-500 font-bold text-3xl mb-4">
            <Briefcase className="w-10 h-10" />
            <span>MiniWorks</span>
          </Link>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Crea tu cuenta</h2>
        </div>

        <div className="flex p-1 bg-gray-100 dark:bg-gray-700 rounded-2xl mb-8">
          <button 
            type="button"
            onClick={() => setRole(UserRole.STUDENT)}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition ${role === UserRole.STUDENT ? 'bg-white dark:bg-gray-600 text-cyan-500 shadow-sm' : 'text-gray-500 dark:text-gray-400'}`}
          >
            <UserCheck className="w-5 h-5" /> Estudiante
          </button>
          <button 
            type="button"
            onClick={() => setRole(UserRole.EMPLOYER)}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition ${role === UserRole.EMPLOYER ? 'bg-white dark:bg-gray-600 text-cyan-500 shadow-sm' : 'text-gray-500 dark:text-gray-400'}`}
          >
            <Briefcase className="w-5 h-5" /> Empleador
          </button>
        </div>

        {error && <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl text-sm font-medium">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block">Nombre Completo</label>
              <input 
                type="text" required
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none transition text-gray-900 dark:text-white"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block">Cédula</label>
              <div className="relative">
                <CreditCard className="absolute left-4 top-3.5 text-gray-400 w-4 h-4" />
                <input 
                  type="text" required
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none transition text-gray-900 dark:text-white"
                  value={formData.cedula}
                  onChange={(e) => setFormData({...formData, cedula: e.target.value})}
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block">Correo {role === UserRole.STUDENT ? 'Universitario' : 'Electrónico'}</label>
            <input 
              type="email" required
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none transition text-gray-900 dark:text-white"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block">Contraseña</label>
            <input 
              type="password" required
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none transition text-gray-900 dark:text-white"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-cyan-500 text-white py-4 rounded-xl font-bold hover:bg-cyan-600 transition"
          >
            {loading ? 'Registrando...' : 'Crear Cuenta'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
