import React from 'react';
import { useNavigate } from 'react-router-dom';

const CreateJob: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden antialiased bg-background-light dark:bg-background-dark">
      {/* Top App Bar */}
      <header className="sticky top-0 z-10 flex h-16 items-center bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm px-4 justify-between border-b border-slate-200 dark:border-slate-800">
        <button
          onClick={() => navigate('/feed')}
          className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-normal shrink-0"
        >
          Cancelar
        </button>
        <h1 className="text-slate-900 dark:text-slate-50 text-lg font-bold leading-tight tracking-tight flex-1 text-center">
          Publicar Empleo
        </h1>
        <div className="w-[66px]"></div> {/* Spacer for centering title */}
      </header>
      {/* Form Content */}
      <main className="flex-1 px-4 py-6">
        <div className="flex flex-col gap-6">
          {/* Título del Empleo */}
          <label className="flex flex-col w-full">
            <p className="text-slate-800 dark:text-slate-200 text-base font-medium leading-normal pb-2">
              Título del Empleo
            </p>
            <input
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-900 dark:text-slate-50 focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 focus:border-primary h-14 placeholder:text-slate-400 dark:placeholder:text-slate-500 p-[15px] text-base font-normal leading-normal"
              placeholder="Ej: Asistente de marketing digital"
            />
          </label>
          {/* Descripción */}
          <label className="flex flex-col w-full">
            <p className="text-slate-800 dark:text-slate-200 text-base font-medium leading-normal pb-2">
              Descripción
            </p>
            <textarea
              className="form-textarea flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-900 dark:text-slate-50 focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 focus:border-primary min-h-36 placeholder:text-slate-400 dark:placeholder:text-slate-500 p-[15px] text-base font-normal leading-normal"
              placeholder="Describe las responsabilidades, tareas diarias y objetivos del puesto..."
            ></textarea>
          </label>
          {/* Requisitos */}
          <label className="flex flex-col w-full">
            <p className="text-slate-800 dark:text-slate-200 text-base font-medium leading-normal pb-2">
              Requisitos
            </p>
            <textarea
              className="form-textarea flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-900 dark:text-slate-50 focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 focus:border-primary min-h-36 placeholder:text-slate-400 dark:placeholder:text-slate-500 p-[15px] text-base font-normal leading-normal"
              placeholder="Enumera las habilidades, experiencia o cualificaciones requeridas..."
            ></textarea>
          </label>
          {/* Ubicación */}
          <label className="flex flex-col w-full">
            <p className="text-slate-800 dark:text-slate-200 text-base font-medium leading-normal pb-2">
              Ubicación
            </p>
            <div className="relative flex w-full items-center">
              <input
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-900 dark:text-slate-50 focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 focus:border-primary h-14 placeholder:text-slate-400 dark:placeholder:text-slate-500 p-[15px] text-base font-normal leading-normal pr-12"
                placeholder="Ej: Remoto o Santa Fe, Argentina"
              />
              <span className="material-symbols-outlined absolute right-4 text-slate-400 dark:text-slate-500 pointer-events-none">
                location_on
              </span>
            </div>
          </label>
          {/* Salario */}
          <label className="flex flex-col w-full">
            <p className="text-slate-800 dark:text-slate-200 text-base font-medium leading-normal pb-2">
              Salario
            </p>
            <div className="relative flex w-full items-center">
              <span className="absolute left-4 text-slate-400 dark:text-slate-500 pointer-events-none text-base">
                $
              </span>
              <input
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-900 dark:text-slate-50 focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 focus:border-primary h-14 placeholder:text-slate-400 dark:placeholder:text-slate-500 pl-8 pr-[15px] py-[15px] text-base font-normal leading-normal"
                placeholder="Ej: 50.000 (Opcional)"
                type="number"
              />
            </div>
          </label>
        </div>
      </main>
      {/* Bottom Action Bar */}
      <footer className="sticky bottom-0 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm p-4 border-t border-slate-200 dark:border-slate-800">
        <button
          onClick={() => navigate('/feed')}
          className="flex w-full items-center justify-center rounded-xl bg-primary h-14 text-white text-lg font-bold leading-tight tracking-tight hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background-light dark:focus:ring-offset-background-dark focus:ring-primary"
        >
          Publicar Empleo
        </button>
      </footer>
    </div>
  );
};

export default CreateJob;
