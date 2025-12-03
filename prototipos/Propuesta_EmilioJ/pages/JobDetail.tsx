import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const JobDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Mock data fetching based on ID could happen here
  // For now using static content matching the screenshot

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-background-light dark:bg-background-dark overflow-x-hidden">
      <header className="sticky top-0 z-10 flex h-16 w-full items-center justify-between bg-background-light/80 dark:bg-background-dark/80 px-4 backdrop-blur-sm">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center justify-center p-2 text-[#111418] dark:text-white rounded-full hover:bg-slate-200 dark:hover:bg-slate-800"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="text-lg font-bold text-[#111418] dark:text-white">
          Detalles del Empleo
        </h1>
        <div className="w-9"></div>
      </header>
      <main className="flex flex-1 flex-col p-6 text-[#111418] dark:text-white">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-white dark:bg-slate-800 shadow-sm">
            <img
              alt="Logo de la empresa"
              className="h-10 w-10"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC-C8y98iSOucsIlMANo36y--FpTz4M2pnH-tbBN781KztUvmSpQQrZfiQ5WlNObpHCZ2RAZpxX5kDXY99qdRsPkCVDv97jqvOq6PNHbqD9D9Oxj2-okQyj_IbSoaU70ghnlO4ND7Vd0BAlBdMGcjVM4O4RzaYmFXOlF0Q-5qWjy2PtK8BJ2B2_U9Vft4lARsocak_Ysq4EtrSbQzRJlNLingaHlTqzo6cmcOe0ML9iSrLEVMtlFQhzAN7-pbSoqsmWhIrPnwTVBnh1"
            />
          </div>
          <div>
            <h2 className="text-xl font-bold leading-tight">
              Desarrollador Frontend React
            </h2>
            <p className="text-base text-[#617289] dark:text-gray-400">
              Tech Solutions Inc.
            </p>
          </div>
        </div>
        <div className="mt-8 space-y-6">
          <div>
            <h3 className="text-lg font-semibold">Descripción del Puesto</h3>
            <p className="mt-2 text-base font-normal text-[#617289] dark:text-gray-400">
              Estamos buscando un desarrollador Frontend apasionado para unirse a
              nuestro equipo. Serás responsable de desarrollar y mantener
              aplicaciones web utilizando React.js y otras tecnologías
              relacionadas.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Requisitos</h3>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-base font-normal text-[#617289] dark:text-gray-400">
              <li>Experiencia con React.js y Redux.</li>
              <li>Conocimiento de HTML5, CSS3 y JavaScript (ES6+).</li>
              <li>
                Familiaridad con herramientas de construcción como Webpack.
              </li>
              <li>Ser estudiante activo de la UNL.</li>
            </ul>
          </div>
          <div className="flex items-start gap-3">
            <span className="material-symbols-outlined mt-1 text-primary">
              location_on
            </span>
            <div>
              <h4 className="font-medium text-[#111418] dark:text-white">
                Ubicación
              </h4>
              <p className="text-[#617289] dark:text-gray-400">
                Santa Fe, Argentina (Remoto)
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="material-symbols-outlined mt-1 text-primary">
              payments
            </span>
            <div>
              <h4 className="font-medium text-[#111418] dark:text-white">
                Salario
              </h4>
              <p className="text-[#617289] dark:text-gray-400">
                $150.000 ARS/mes (Part-time)
              </p>
            </div>
          </div>
        </div>
      </main>
      <footer className="sticky bottom-0 w-full bg-white dark:bg-background-dark p-4 shadow-[0_-2px_10px_rgba(0,0,0,0.05)] dark:shadow-[0_-2px_10px_rgba(0,0,0,0.2)]">
        <div className="flex w-full">
          <button
            onClick={() => navigate(`/apply/${id || '1'}`)}
            className="flex min-w-[84px] w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-14 px-5 flex-1 bg-primary text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 dark:focus:ring-offset-background-dark"
          >
            <span className="truncate">Postularse</span>
          </button>
        </div>
      </footer>
    </div>
  );
};

export default JobDetail;
