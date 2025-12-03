
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../components/Button';
import { Icon } from '../components/Icon';

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isStudent = location.pathname.includes('student');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="flex min-h-screen w-full flex-col justify-center bg-background-light md:bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
       {/* Background decoration for desktop */}
       <div className="absolute inset-0 z-0 overflow-hidden hidden md:block pointer-events-none">
         <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-primary/5 blur-3xl"></div>
         <div className="absolute bottom-[0%] left-[0%] w-[30%] h-[30%] rounded-full bg-blue-300/10 blur-3xl"></div>
       </div>

      <div className="mx-auto w-full max-w-xl z-10">
        <div className="bg-white md:shadow-xl md:rounded-2xl md:border border-gray-100 overflow-hidden">
          <div className="px-6 py-8 md:p-10">
            <div className="text-center mb-10">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                {isStudent ? 'Registro de Estudiante' : 'Crear una cuenta'}
              </h1>
              <p className="mt-2 text-sm text-gray-600">Completa tus datos para comenzar.</p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="md:col-span-2">
                  <label htmlFor="full-name" className="block text-sm font-medium text-gray-700">
                    Nombre completo
                  </label>
                  <div className="mt-1">
                    <input
                      id="full-name"
                      name="full-name"
                      type="text"
                      required
                      className="block w-full rounded-lg border-gray-300 px-3 py-2.5 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                    />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Correo
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="block w-full rounded-lg border-gray-300 px-3 py-2.5 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                    />
                  </div>
                </div>

                {isStudent && (
                  <>
                    <div>
                      <label htmlFor="university" className="block text-sm font-medium text-gray-700">
                        Universidad
                      </label>
                      <div className="mt-1">
                        <input
                          id="university"
                          name="university"
                          type="text"
                          required
                          className="block w-full rounded-lg border-gray-300 px-3 py-2.5 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="career" className="block text-sm font-medium text-gray-700">
                        Carrera
                      </label>
                      <div className="mt-1">
                        <input
                          id="career"
                          name="career"
                          type="text"
                          required
                          className="block w-full rounded-lg border-gray-300 px-3 py-2.5 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                        />
                      </div>
                    </div>
                  </>
                )}

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Contraseña
                  </label>
                  <div className="mt-1">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      required
                      className="block w-full rounded-lg border-gray-300 px-3 py-2.5 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                    Confirmar
                  </label>
                  <div className="mt-1">
                    <input
                      id="confirm-password"
                      name="confirm-password"
                      type="password"
                      required
                      className="block w-full rounded-lg border-gray-300 px-3 py-2.5 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Button type="submit" fullWidth className="md:h-12 md:text-lg">
                  Crear cuenta
                </Button>
              </div>
            </form>
          </div>
          
          <div className="bg-gray-50 px-6 py-4 text-center border-t border-gray-100">
             <p className="text-sm text-gray-600">
              ¿Ya tienes cuenta?{' '}
              <button onClick={() => navigate('/login')} className="font-medium text-primary hover:text-primary-dark">
                Inicia sesión
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
