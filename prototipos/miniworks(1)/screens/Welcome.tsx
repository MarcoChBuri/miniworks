
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { Icon } from '../components/Icon';

export const Welcome: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen w-full flex-col bg-background-light overflow-x-hidden">
      <header className="w-full p-4 md:p-6 z-20">
        <div className="flex justify-between items-center max-w-7xl mx-auto w-full">
           <div className="flex items-center gap-2 md:hidden">
              <Icon name="check_circle" className="text-2xl text-primary filled" />
              <span className="text-xl font-bold text-gray-800">MiniWorks</span>
           </div>
          <div className="flex-1 flex justify-end">
            <button 
              onClick={() => navigate('/register-student')}
              className="rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-gray-700 shadow-sm ring-1 ring-inset ring-gray-200 hover:bg-gray-50 transition-colors"
            >
              Soy estudiante
            </button>
          </div>
        </div>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center p-6 md:p-12 w-full max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between w-full gap-12 lg:gap-24">
          
          {/* Left Content (Text) */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left flex-1 max-w-xl">
            <div className="hidden md:flex items-center gap-3 mb-8">
              <div className="rounded-full bg-blue-50 p-2">
                <Icon name="check_circle" className="text-4xl text-primary filled" />
              </div>
              <span className="text-3xl font-bold text-gray-800 tracking-tight">MiniWorks</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
              Organiza tus ideas, <span className="text-primary">crea tus proyectos</span>
            </h1>
            <p className="text-lg text-gray-600 mb-10 max-w-md leading-relaxed">
              La plataforma ideal para conectar estudiantes con mini-proyectos reales. Gestiona, colabora y crece profesionalmente.
            </p>

            <div className="w-full max-w-sm space-y-4 md:space-y-0 md:flex md:gap-4">
              <Button fullWidth onClick={() => navigate('/login')} className="md:w-auto md:px-10">
                Iniciar sesión
              </Button>
              <Button variant="outline" fullWidth onClick={() => navigate('/register')} className="md:w-auto md:px-10">
                Registrarse
              </Button>
            </div>
          </div>
          
          {/* Right Content (Image) */}
          <div className="flex-1 w-full max-w-lg relative order-first md:order-last mb-10 md:mb-0">
             <div className="aspect-square bg-[#E5E0D0] rounded-3xl flex items-center justify-center overflow-hidden shadow-2xl transform rotate-3 transition-transform hover:rotate-0 duration-500">
                <img 
                  src="https://picsum.photos/800/800" 
                  alt="Organization Illustration" 
                  className="w-full h-full object-cover opacity-90 mix-blend-multiply"
                />
             </div>
             {/* Decorative blobs */}
             <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-400/20 rounded-full -z-10 blur-3xl"></div>
             <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary/20 rounded-full -z-10 blur-3xl"></div>
          </div>

        </div>
      </main>
    </div>
  );
};
