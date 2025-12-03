
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../components/Icon';

const APPLICANTS = [
  { id: '1', name: 'Elena García', role: 'Diseñadora UX/UI', date: 'Hace 1h' },
  { id: '2', name: 'Carlos Rodríguez', role: 'Frontend Dev', date: 'Hace 3h' },
  { id: '3', name: 'Sofía Martínez', role: 'Full Stack', date: 'Hace 5h' },
  { id: '4', name: 'David López', role: 'Diseñador Gráfico', date: 'Ayer' },
  { id: '5', name: 'Laura Sánchez', role: 'Product Designer', date: 'Ayer' },
];

export const ApplicantsList: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background-light">
      <header className="sticky top-0 z-10 flex items-center bg-white px-4 md:px-8 py-3 justify-between border-b border-gray-200 shadow-sm">
        <button 
          onClick={() => navigate('/dashboard')}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
        >
          <Icon name="arrow_back" className="text-gray-800 text-xl" />
        </button>
        <h2 className="flex-1 text-center text-lg font-bold text-gray-900 md:text-left md:flex-none md:ml-4">Postulantes</h2>
        <div className="w-10 md:w-auto"></div>
      </header>

      <main className="flex-1 p-5 md:p-8 w-full max-w-5xl mx-auto">
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">Diseño de Landing Page</h1>
                <p className="text-gray-500 mt-1">5 postulantes pendientes de revisión.</p>
            </div>
             <div className="flex gap-2">
                 <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                    Filtrar
                 </button>
                 <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                    Ordenar
                 </button>
             </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {APPLICANTS.map((applicant) => (
            <div 
              key={applicant.id} 
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between rounded-xl bg-white p-5 shadow-sm border border-gray-200 hover:border-primary/50 transition-colors cursor-pointer group"
              onClick={() => navigate(`/applicant/${applicant.id}`)}
            >
              <div className="flex items-center gap-4 mb-4 sm:mb-0">
                <div className="relative">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-blue-100 text-primary-dark font-bold text-xl">
                        {applicant.name.charAt(0)}
                    </div>
                    <div className="absolute -bottom-1 -right-1 bg-green-500 h-4 w-4 rounded-full border-2 border-white"></div>
                </div>
                <div>
                  <p className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors">{applicant.name}</p>
                  <p className="text-sm text-gray-500">{applicant.role}</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between w-full sm:w-auto gap-6">
                 <span className="text-xs text-gray-400 font-medium">{applicant.date}</span>
                 <button 
                    className="flex h-9 items-center justify-center rounded-lg bg-gray-50 border border-gray-200 px-4 text-sm font-semibold text-gray-700 shadow-sm transition-colors hover:bg-white hover:border-primary hover:text-primary"
                >
                    Ver Perfil
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};
