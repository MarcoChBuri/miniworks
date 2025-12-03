
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { Icon } from '../components/Icon';

export const Login: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-background-light md:bg-gray-50 items-center justify-center relative overflow-hidden">
       {/* Desktop Background Decorations */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-primary/5 -skew-y-3 transform origin-top-left -z-0 hidden md:block"></div>
      <div className="absolute bottom-0 right-0 w-full h-1/2 bg-blue-100/10 -skew-y-3 transform origin-bottom-right -z-0 hidden md:block"></div>

      <main className="w-full max-w-md p-6 z-10">
        <div className="bg-white md:shadow-xl md:rounded-3xl md:p-10 w-full">
          <div className="mb-8 text-center">
            <div className="mx-auto h-14 w-14 bg-blue-50 rounded-xl flex items-center justify-center mb-6">
               <Icon name="lock" className="text-3xl text-primary" filled />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Bienvenido de nuevo</h1>
            <p className="mt-2 text-base text-gray-600">Inicia sesión para continuar</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 ml-1 mb-1">
                Correo electrónico
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full rounded-xl border-gray-200 bg-gray-50 px-4 py-3.5 focus:bg-white shadow-sm text-gray-900 placeholder:text-gray-400 focus:border-primary focus:ring-primary sm:text-sm transition-all"
                placeholder="tu@email.com"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1 ml-1">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Contraseña
                </label>
                <a href="#" className="text-sm font-medium text-primary hover:text-primary-dark">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full rounded-xl border-gray-200 bg-gray-50 px-4 py-3.5 focus:bg-white shadow-sm text-gray-900 placeholder:text-gray-400 focus:border-primary focus:ring-primary sm:text-sm transition-all"
                placeholder="••••••••"
              />
            </div>

            <div className="pt-4">
              <Button type="submit" fullWidth className="md:h-12 md:text-lg">
                Iniciar sesión
              </Button>
            </div>
          </form>

          <div className="mt-8 border-t border-gray-100 pt-6 text-center">
            <p className="text-sm text-gray-500">
              ¿No tienes cuenta?{' '}
              <button 
                onClick={() => navigate('/register')}
                className="font-semibold text-primary hover:text-primary-dark transition-colors"
              >
                Regístrate
              </button>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};
