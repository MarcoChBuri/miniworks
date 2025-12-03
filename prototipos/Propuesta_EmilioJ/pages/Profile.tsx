import React from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';

const Profile: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-background-light dark:bg-background-dark pb-20">
      {/* Top App Bar */}
      <div className="flex items-center bg-white dark:bg-background-dark p-4 pb-2 justify-between sticky top-0 z-10 border-b border-slate-200/80 dark:border-slate-800/80">
        <div
          onClick={() => navigate(-1)}
          className="text-slate-900 dark:text-white flex size-10 shrink-0 items-center justify-center cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full"
        >
          <span className="material-symbols-outlined text-2xl">arrow_back</span>
        </div>
        <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">
          Mi Perfil
        </h2>
        <div className="flex size-10 shrink-0 items-center justify-center"></div>
      </div>
      {/* Profile Header */}
      <div className="bg-white dark:bg-background-dark p-4">
        <div className="flex w-full flex-col gap-4 items-center">
          <div className="flex gap-4 flex-col items-center">
            <div
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-32 w-32 border-4 border-white dark:border-slate-700 shadow-md"
              style={{
                backgroundImage:
                  'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDJBlRWvtp6p3wbkxzKfiU5IZELes9C1dZxRj9tk8vZpG29adfLgz2eYzOs3K6vLWR5ruYiRDdIiGNQkGbAfAT07DtGZBPfxvlS9IH5jHlb-4Z8HFFjsDcnYpPUKKJpuvMigEvVCVGoZtU9Am4JAzt3T9ZJl_XuBMYQ00iBF032IxMsUplQdjaYLaQRov7GSjpiESL1tEycKWao15NoOEqsB6m9QPtJwIY-mhZ26WQhx52SxpY60IbJ60OXyKBdozAJNi-OsV6coUbc")',
              }}
            ></div>
            <div className="flex flex-col items-center justify-center">
              <p className="text-slate-900 dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em] text-center">
                Alejandro Martinez
              </p>
              <p className="text-slate-500 dark:text-slate-400 text-base font-normal leading-normal text-center">
                Estudiante
              </p>
            </div>
          </div>
          <button className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-5 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] w-full max-w-[480px]">
            <span className="truncate">Editar Perfil</span>
          </button>
        </div>
      </div>
      {/* Stats */}
      <div className="flex flex-wrap gap-4 p-4 bg-white dark:bg-background-dark">
        <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-4 bg-background-light dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
          <p className="text-slate-600 dark:text-slate-300 text-sm font-medium leading-normal">
            Trabajos Completados
          </p>
          <p className="text-slate-900 dark:text-white tracking-light text-2xl font-bold leading-tight">
            12
          </p>
        </div>
        <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-4 bg-background-light dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
          <p className="text-slate-600 dark:text-slate-300 text-sm font-medium leading-normal">
            Calificación
          </p>
          <p className="text-slate-900 dark:text-white tracking-light text-2xl font-bold leading-tight flex items-center gap-1">
            4.8{' '}
            <span
              className="material-symbols-outlined text-yellow-500 !text-2xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              star
            </span>
          </p>
        </div>
        <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-4 bg-background-light dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
          <p className="text-slate-600 dark:text-slate-300 text-sm font-medium leading-normal">
            Postulaciones
          </p>
          <p className="text-slate-900 dark:text-white tracking-light text-2xl font-bold leading-tight">
            3
          </p>
        </div>
      </div>
      {/* Tabs */}
      <div className="bg-white dark:bg-background-dark pt-2 sticky top-[72px] z-10">
        <div className="flex border-b border-slate-200 dark:border-slate-800 px-4 justify-between">
          <button className="flex flex-col items-center justify-center border-b-[3px] border-b-primary pb-[13px] pt-4 flex-1">
            <p className="text-primary text-sm font-bold leading-normal tracking-[0.015em]">
              Información
            </p>
          </button>
          <button className="flex flex-col items-center justify-center border-b-[3px] border-b-transparent text-slate-500 dark:text-slate-400 pb-[13px] pt-4 flex-1">
            <p className="text-sm font-bold leading-normal tracking-[0.015em]">
              Historial
            </p>
          </button>
          <button className="flex flex-col items-center justify-center border-b-[3px] border-b-transparent text-slate-500 dark:text-slate-400 pb-[13px] pt-4 flex-1">
            <p className="text-sm font-bold leading-normal tracking-[0.015em]">
              Valoraciones
            </p>
          </button>
        </div>
      </div>
      {/* Tab Content: Información */}
      <div className="flex flex-col bg-white dark:bg-background-dark p-4 gap-2 flex-1">
        {/* List Item: Correo Electrónico */}
        <div className="flex items-center gap-4 bg-white dark:bg-background-dark min-h-[72px] py-2 justify-between">
          <div className="flex items-center gap-4">
            <div className="text-slate-500 dark:text-slate-400 flex items-center justify-center rounded-lg bg-background-light dark:bg-slate-800/50 shrink-0 size-12">
              <span className="material-symbols-outlined">mail</span>
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-slate-900 dark:text-white text-base font-medium leading-normal line-clamp-1">
                Correo Electrónico
              </p>
              <p className="text-slate-500 dark:text-slate-400 text-sm font-normal leading-normal line-clamp-2">
                a.martinez@email.unl.edu.ar
              </p>
            </div>
          </div>
          <div className="shrink-0">
            <div className="text-slate-400 dark:text-slate-500 flex size-7 items-center justify-center">
              <span className="material-symbols-outlined">chevron_right</span>
            </div>
          </div>
        </div>
        {/* List Item: Teléfono */}
        <div className="flex items-center gap-4 bg-white dark:bg-background-dark min-h-[72px] py-2 justify-between">
          <div className="flex items-center gap-4">
            <div className="text-slate-500 dark:text-slate-400 flex items-center justify-center rounded-lg bg-background-light dark:bg-slate-800/50 shrink-0 size-12">
              <span className="material-symbols-outlined">phone</span>
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-slate-900 dark:text-white text-base font-medium leading-normal line-clamp-1">
                Teléfono
              </p>
              <p className="text-slate-500 dark:text-slate-400 text-sm font-normal leading-normal line-clamp-2">
                +54 9 342 123-4567
              </p>
            </div>
          </div>
          <div className="shrink-0">
            <div className="text-slate-400 dark:text-slate-500 flex size-7 items-center justify-center">
              <span className="material-symbols-outlined">chevron_right</span>
            </div>
          </div>
        </div>
        {/* List Item: Facultad */}
        <div className="flex items-center gap-4 bg-white dark:bg-background-dark min-h-[72px] py-2 justify-between">
          <div className="flex items-center gap-4">
            <div className="text-slate-500 dark:text-slate-400 flex items-center justify-center rounded-lg bg-background-light dark:bg-slate-800/50 shrink-0 size-12">
              <span className="material-symbols-outlined">school</span>
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-slate-900 dark:text-white text-base font-medium leading-normal line-clamp-1">
                Facultad y Carrera
              </p>
              <p className="text-slate-500 dark:text-slate-400 text-sm font-normal leading-normal line-clamp-2">
                Facultad de Ingeniería y Ciencias Hídricas
              </p>
            </div>
          </div>
          <div className="shrink-0">
            <div className="text-slate-400 dark:text-slate-500 flex size-7 items-center justify-center">
              <span className="material-symbols-outlined">chevron_right</span>
            </div>
          </div>
        </div>
        {/* About Me Section */}
        <div className="flex flex-col gap-2 rounded-xl bg-background-light dark:bg-slate-800/50 p-4 mt-4">
          <h3 className="text-slate-900 dark:text-white text-base font-bold leading-normal">
            Sobre mí
          </h3>
          <p className="text-slate-600 dark:text-slate-300 text-sm font-normal leading-relaxed">
            Estudiante avanzado de Ingeniería Informática con experiencia en
            desarrollo web y con ganas de seguir aprendiendo. Responsable y
            proactivo, busco oportunidades para aplicar mis conocimientos.
          </p>
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default Profile;
