import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserRole } from '../types';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState<UserRole>(UserRole.STUDENT);

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-background-light dark:bg-background-dark overflow-x-hidden">
      <div className="flex items-center bg-background-light dark:bg-background-dark p-4 pb-2 justify-between">
        <div
          onClick={() => navigate('/')}
          className="text-[#111418] dark:text-white flex size-12 shrink-0 items-center justify-center cursor-pointer"
        >
          <span className="material-symbols-outlined text-2xl">arrow_back</span>
        </div>
        <h2 className="text-[#111418] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-12">
          Crear Cuenta
        </h2>
      </div>
      <h1 className="text-[#111418] dark:text-white tracking-tight text-[32px] font-bold leading-tight px-4 text-left pb-3 pt-6">
        Registro de Usuarios
      </h1>
      <p className="text-[#617289] dark:text-slate-400 text-base font-normal leading-normal pb-3 pt-1 px-4">
        Selecciona tu perfil
      </p>
      <div className="flex px-4 py-3">
        <div className="flex h-10 flex-1 items-center justify-center rounded-lg bg-slate-200 dark:bg-slate-800 p-1">
          <label
            onClick={() => setRole(UserRole.STUDENT)}
            className={`flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-lg px-2 text-sm font-medium leading-normal transition-colors duration-200 ${
              role === UserRole.STUDENT
                ? 'bg-white dark:bg-slate-700 shadow-[0_0_4px_rgba(0,0,0,0.1)] text-primary dark:text-white'
                : 'text-[#617289] dark:text-slate-400'
            }`}
          >
            <span className="truncate">Estudiante</span>
          </label>
          <label
            onClick={() => setRole(UserRole.EMPLOYER)}
            className={`flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-lg px-2 text-sm font-medium leading-normal transition-colors duration-200 ${
              role === UserRole.EMPLOYER
                ? 'bg-white dark:bg-slate-700 shadow-[0_0_4px_rgba(0,0,0,0.1)] text-primary dark:text-white'
                : 'text-[#617289] dark:text-slate-400'
            }`}
          >
            <span className="truncate">Empleador</span>
          </label>
        </div>
      </div>
      <div className="flex max-w-[480px] flex-col gap-4 px-4 py-3">
        <label className="flex flex-col w-full">
          <p className="text-[#111418] dark:text-white text-base font-medium leading-normal pb-2">
            Nombre y Apellido
          </p>
          <input
            className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111418] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#dbe0e6] dark:border-slate-700 bg-white dark:bg-slate-800 focus:border-primary dark:focus:border-primary h-14 placeholder:text-[#617289] p-[15px] text-base font-normal leading-normal"
            placeholder="Ingresa tu nombre completo"
          />
        </label>
        <label className="flex flex-col w-full">
          <p className="text-[#111418] dark:text-white text-base font-medium leading-normal pb-2">
            Correo Electrónico
          </p>
          <input
            className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111418] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#dbe0e6] dark:border-slate-700 bg-white dark:bg-slate-800 focus:border-primary dark:focus:border-primary h-14 placeholder:text-[#617289] p-[15px] text-base font-normal leading-normal"
            placeholder="tunombre@unl.edu.ar"
            type="email"
          />
        </label>
        <label className="flex flex-col w-full">
          <p className="text-[#111418] dark:text-white text-base font-medium leading-normal pb-2">
            Contraseña
          </p>
          <div className="relative w-full">
            <input
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111418] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#dbe0e6] dark:border-slate-700 bg-white dark:bg-slate-800 focus:border-primary dark:focus:border-primary h-14 placeholder:text-[#617289] p-[15px] pr-12 text-base font-normal leading-normal"
              placeholder="Crea una contraseña segura"
              type="password"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-4 text-[#617289] dark:text-slate-400 cursor-pointer">
              <span className="material-symbols-outlined">visibility_off</span>
            </div>
          </div>
        </label>
      </div>
      <div className="flex flex-col gap-4 px-4 py-3 mt-auto pb-8">
        <p className="text-xs text-[#617289] dark:text-slate-400 text-center">
          Al registrarte, aceptas nuestros{' '}
          <span className="font-medium text-primary cursor-pointer">
            Términos y Condiciones
          </span>{' '}
          y{' '}
          <span className="font-medium text-primary cursor-pointer">
            Política de Privacidad
          </span>
          .
        </p>
        <button
            onClick={() => {
                if(role === UserRole.EMPLOYER) {
                    navigate('/create-job');
                } else {
                    navigate('/feed');
                }
            }}
            className="flex items-center justify-center w-full h-14 px-6 bg-primary text-white rounded-xl text-base font-bold leading-normal shadow-[0_4px_10px_rgba(19,109,236,0.3)] hover:bg-opacity-90 transition-opacity"
        >
          Registrarse
        </button>
        <p className="text-sm text-[#617289] dark:text-slate-400 text-center">
          ¿Ya tienes una cuenta?{' '}
          <span
            onClick={() => navigate('/')}
            className="font-bold text-primary cursor-pointer"
          >
            Inicia Sesión
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
