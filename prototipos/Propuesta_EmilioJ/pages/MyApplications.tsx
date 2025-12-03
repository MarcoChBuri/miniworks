import React from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import { ApplicationStatus } from '../types';

const applications = [
  {
    id: '1',
    title: 'Asistente de Cátedra de Programación',
    department: 'Facultad de Ingeniería y Cs. Hídricas',
    status: ApplicationStatus.SUBMITTED
  },
  {
    id: '2',
    title: 'Desarrollador para App de Eventos',
    department: 'InfoTech UNL',
    status: ApplicationStatus.REVIEWING
  },
  {
    id: '3',
    title: 'Tutor de Apoyo Escolar',
    department: 'Programa de Tutorías Académicas',
    status: ApplicationStatus.TESTING
  },
  {
    id: '4',
    title: 'Ayudante de Laboratorio Químico',
    department: 'FIQ - Departamento de Química',
    status: ApplicationStatus.ACCEPTED
  },
  {
    id: '5',
    title: 'Digitalizador de Archivos Históricos',
    department: 'Archivo Histórico UNL',
    status: ApplicationStatus.REJECTED
  }
];

const MyApplications: React.FC = () => {
  const navigate = useNavigate();

  const getStatusColor = (status: ApplicationStatus) => {
      switch(status) {
          case ApplicationStatus.SUBMITTED: return 'bg-blue-100 text-primary dark:bg-blue-900/50 dark:text-blue-300';
          case ApplicationStatus.REVIEWING: return 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/50 dark:text-yellow-300';
          case ApplicationStatus.TESTING: return 'bg-purple-100 text-purple-600 dark:bg-purple-900/50 dark:text-purple-300';
          case ApplicationStatus.ACCEPTED: return 'bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-300';
          case ApplicationStatus.REJECTED: return 'bg-red-100 text-red-600 dark:bg-red-900/50 dark:text-red-300';
          default: return 'bg-gray-100 text-gray-600';
      }
  }

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-background-light dark:bg-background-dark pb-20">
      <div className="flex items-center bg-white dark:bg-background-dark p-4 pb-3 justify-between sticky top-0 z-10 border-b border-slate-200/80 dark:border-slate-800/80">
        <button
          onClick={() => navigate('/feed')}
          className="text-slate-900 dark:text-white flex size-10 shrink-0 items-center justify-center -ml-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full"
        >
          <span className="material-symbols-outlined text-2xl">arrow_back</span>
        </button>
        <h1 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">
          Postulaciones Activas
        </h1>
        <div className="flex size-10 shrink-0 items-center justify-center"></div>
      </div>
      <div className="flex w-full flex-col p-4 gap-4">
        {applications.map((app) => (
          <div
            key={app.id}
            className="flex flex-col gap-3 rounded-xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 p-4 transition-colors duration-200 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer"
          >
            <div className="flex items-start justify-between">
              <div className="flex flex-col">
                <p className="text-slate-900 dark:text-white text-base font-bold leading-normal">
                  {app.title}
                </p>
                <p className="text-slate-500 dark:text-slate-400 text-sm font-normal leading-normal">
                  {app.department}
                </p>
              </div>
              <span className="material-symbols-outlined text-slate-400 dark:text-slate-500">
                chevron_right
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`flex items-center justify-center rounded-full px-3 py-1 ${getStatusColor(app.status)}`}>
                <p className="text-xs font-medium leading-normal">{app.status}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <BottomNav />
    </div>
  );
};

export default MyApplications;
