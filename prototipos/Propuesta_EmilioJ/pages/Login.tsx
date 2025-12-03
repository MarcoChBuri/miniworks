import React from 'react';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col items-center bg-background-light dark:bg-background-dark overflow-x-hidden">
      <div className="flex flex-col items-center justify-center p-4 w-full max-w-md mx-auto">
        <div className="pt-16 pb-8">
          <img
            alt="Logo de la Universidad Nacional del Litoral"
            className="h-20 w-auto"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBLlLSM0e6CF-0uVco7YDthlTceMJd5mthHBM5JiNG-JmLIjv-5oRUNVY34bcT2-ae8KDDuSG5fPEwxohvG5u0JxwhcXjrAcOu43nJ5tG7aonNwqU55BWOAFJ4oEwbSKnKhzjEoqXk5XKEBKIgaPmdLJ8NNE4vsFFNEQDi95wXv_t_1lJa7TxYE4I-NQug-cBoYhLvw_WYjqS2hyewbXSuPV6gRL3-MAObn_GXteNg6HF7F_bx3bUxJ9SXMrzmnte2Sl5Zu6EQJf2tj"
          />
        </div>
        <h1 className="text-[#111418] dark:text-white tracking-tight text-[32px] font-bold leading-tight text-center pb-8 pt-6">
          Bienvenido de Vuelta
        </h1>
        <div className="w-full space-y-4">
          <div className="flex w-full flex-col">
            <label className="flex flex-col min-w-40 flex-1">
              <p className="text-[#111418] dark:text-gray-300 text-base font-medium leading-normal pb-2">
                Email o Usuario
              </p>
              <input
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111418] dark:text-white focus:outline-0 focus:ring-0 border border-[#dbe0e6] dark:border-gray-700 bg-white dark:bg-background-dark focus:border-primary dark:focus:border-primary h-14 placeholder:text-[#617289] dark:placeholder:text-gray-500 p-[15px] text-base font-normal leading-normal"
                placeholder="Ingresa tu email o usuario"
              />
            </label>
          </div>
          <div className="flex w-full flex-col">
            <label className="flex flex-col min-w-40 flex-1">
              <p className="text-[#111418] dark:text-gray-300 text-base font-medium leading-normal pb-2">
                Contraseña
              </p>
              <div className="relative flex w-full flex-1 items-stretch">
                <input
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111418] dark:text-white focus:outline-0 focus:ring-0 border border-[#dbe0e6] dark:border-gray-700 bg-white dark:bg-background-dark focus:border-primary dark:focus:border-primary h-14 placeholder:text-[#617289] dark:placeholder:text-gray-500 p-[15px] pr-12 text-base font-normal leading-normal"
                  placeholder="Ingresa tu contraseña"
                  type="password"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-[#617289] dark:text-gray-400">
                  <span className="material-symbols-outlined cursor-pointer">
                    visibility
                  </span>
                </div>
              </div>
            </label>
          </div>
        </div>
        <div className="w-full text-right mt-2">
          <p className="text-primary dark:text-primary/90 text-sm font-medium leading-normal underline cursor-pointer">
            Olvidé mi contraseña
          </p>
        </div>
        <div className="flex w-full px-0 py-6">
          <button
            onClick={() => navigate('/feed')}
            className="flex min-w-[84px] w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-14 px-5 flex-1 bg-primary text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 dark:focus:ring-offset-background-dark"
          >
            <span className="truncate">Iniciar Sesión</span>
          </button>
        </div>
        <div className="flex flex-col items-center justify-center w-full mt-10">
          <p className="text-[#617289] dark:text-gray-400 text-sm font-normal leading-normal">
            ¿No tienes una cuenta?
          </p>
          <p
            onClick={() => navigate('/register')}
            className="text-primary dark:text-primary/90 text-sm font-bold leading-normal underline mt-1 cursor-pointer"
          >
            Regístrate ahora
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
