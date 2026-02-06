
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Briefcase, Mail, Lock, AlertCircle } from 'lucide-react';
import { api } from '../services/api';
import { useAuth } from '../App';
import { UserRole } from '../types';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await api.auth.login({ email, password });
      // El backend devuelve { message, user: { id, email, name, role, token } }
      const userData = response.user;
      
      login({
        id: userData.id,
        name: userData.name,
        email: userData.email,
        role: userData.role,
        token: userData.token
      });
      
      if (userData.role === UserRole.EMPLOYER) navigate('/employer-dashboard');
      else if (userData.role === UserRole.ADMIN) navigate('/admin-dashboard');
      else navigate('/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 transition-colors">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-cyan-500 font-bold text-3xl mb-4">
            <Briefcase className="w-10 h-10" />
            <span>MiniWorks</span>
          </Link>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Bienvenido</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2">Ingresa a tu cuenta para continuar</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl flex items-center gap-3 text-sm">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block">Correo Electrónico</label>
            <div className="relative">
              <Mail className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
              <input 
                type="email" 
                required
                className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-cyan-500 transition outline-none text-gray-900 dark:text-white"
                placeholder="usuario@miniworks.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block">Contraseña</label>
            <div className="relative">
              <Lock className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
              <input 
                type="password" 
                required
                className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-cyan-500 transition outline-none text-gray-900 dark:text-white"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-cyan-500 text-white py-3 rounded-xl font-bold hover:bg-cyan-600 transition disabled:opacity-50"
          >
            {loading ? 'Iniciando sesión...' : 'Entrar'}
          </button>
        </form>

        <p className="mt-8 text-center text-gray-500 dark:text-gray-400 text-sm">
          ¿No tienes una cuenta? {' '}
          <Link to="/register" className="text-cyan-500 font-bold hover:underline">Regístrate aquí</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
