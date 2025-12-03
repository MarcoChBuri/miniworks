
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../components/Icon';
import { Project } from '../types';

const MOCK_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Diseño de la Interfaz Principal',
    description: 'Diseñar y prototipar la landing page para el nuevo producto SaaS, enfocándose en la conversión y usabilidad móvil.',
    duration: '8h',
    startDate: '2024-08-15',
    endDate: '2024-08-20',
    budget: '$200',
    tags: ['UI/UX', 'Figma'],
    icon: 'design_services'
  },
  {
    id: '2',
    title: 'Revisión de Prototipos',
    description: 'Realizar pruebas de usabilidad y revisión heurística de los prototipos actuales para identificar puntos de fricción.',
    duration: '4h',
    startDate: '2024-08-21',
    endDate: '2024-08-22',
    budget: '$100',
    tags: ['QA', 'Design'],
    icon: 'rate_review'
  },
  {
    id: '3',
    title: 'Configurar Entorno de Desarrollo',
    description: 'Preparar el repositorio, configurar Docker y asegurar que el CI/CD pipeline esté funcionando correctamente.',
    duration: '2h',
    startDate: '2024-08-23',
    endDate: '2024-08-23',
    budget: '$80',
    tags: ['DevOps', 'Docker'],
    icon: 'terminal'
  },
  {
    id: '4',
    title: 'Investigación de Mercado',
    description: 'Analizar a los 5 competidores principales y entregar un informe comparativo de funcionalidades y precios.',
    duration: '6h',
    startDate: '2024-08-25',
    endDate: '2024-08-28',
    budget: '$150',
    tags: ['Marketing', 'Research'],
    icon: 'monitoring'
  },
];

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background-light">
      {/* Top App Bar */}
      <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 md:px-8 shadow-sm">
        <div className="flex items-center gap-2">
            <div className="rounded-full bg-blue-50 p-1 md:hidden">
              <Icon name="check_circle" className="text-xl text-primary filled" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">Mis MiniWorks</h1>
        </div>
        
        <div className="flex items-center gap-4">
             {/* Desktop Navigation Links Placeholder */}
             <div className="hidden md:flex items-center gap-6 mr-4 text-sm font-medium text-gray-600">
                 <a href="#" className="text-primary hover:text-primary-dark">Proyectos</a>
                 <a href="#" className="hover:text-gray-900">Mensajes</a>
                 <a href="#" className="hover:text-gray-900">Perfil</a>
             </div>

            <button className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-gray-600 hover:bg-gray-100 transition-colors">
            <Icon name="search" className="text-2xl" />
            </button>
            <div className="h-8 w-8 rounded-full bg-gray-200 overflow-hidden cursor-pointer hidden md:block">
                <img src="https://picsum.photos/id/64/100/100" alt="Avatar" />
            </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 pt-6 pb-24 md:px-8 md:pt-8 w-full max-w-7xl mx-auto">
        {/* Stats Row for Desktop */}
        <div className="hidden md:grid grid-cols-4 gap-4 mb-8">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <p className="text-sm text-gray-500">Proyectos Activos</p>
                <p className="text-2xl font-bold text-gray-900">4</p>
            </div>
             <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <p className="text-sm text-gray-500">Horas Totales</p>
                <p className="text-2xl font-bold text-gray-900">20h</p>
            </div>
             <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <p className="text-sm text-gray-500">Presupuesto</p>
                <p className="text-2xl font-bold text-gray-900">$530</p>
            </div>
             <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <p className="text-sm text-gray-500">Completados</p>
                <p className="text-2xl font-bold text-gray-900">12</p>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {MOCK_PROJECTS.map((project) => (
            <div 
              key={project.id}
              onClick={() => navigate(`/project/${project.id}/applicants`)}
              className="group flex flex-col cursor-pointer rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-200/50 transition-all hover:shadow-lg hover:shadow-primary/5 hover:ring-primary/30 md:h-full"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                  <Icon name={project.icon} className="text-2xl" />
                </div>
                <div className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">
                  {project.duration}
                </div>
              </div>

              <div className="mb-4 flex-1">
                 <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-1">{project.title}</h3>
                 <p className="text-sm text-gray-500 line-clamp-2">{project.description}</p>
              </div>
              
              <div className="flex items-center justify-between border-t border-gray-100 pt-4 mt-auto">
                 <div className="flex gap-2">
                    {project.tags.map(tag => (
                        <span key={tag} className="text-[10px] uppercase font-bold tracking-wider text-gray-500 bg-gray-50 px-2 py-1 rounded-md">
                            {tag}
                        </span>
                    ))}
                 </div>
                 <Icon name="arrow_forward" className="text-gray-300 group-hover:text-primary transition-colors" />
              </div>
            </div>
          ))}
        </div>
          
        {/* Helper text for demo */}
        <div className="mt-12 text-center">
             <p className="text-sm text-gray-400">
               Demo Tip: Click on a project card to see Applicants.
               <br/>
               <span 
                 onClick={(e) => { e.stopPropagation(); navigate('/project/1'); }}
                 className="text-primary cursor-pointer hover:underline font-medium"
               >
                 Go to Project Details (Student View)
               </span>
             </p>
        </div>
      </main>

      {/* FAB */}
      <button 
        onClick={() => navigate('/create')}
        className="fixed bottom-6 right-6 md:bottom-10 md:right-10 flex h-14 w-14 md:h-16 md:w-16 cursor-pointer items-center justify-center rounded-full bg-primary text-white shadow-lg shadow-primary/30 transition-transform active:scale-95 hover:bg-primary-dark hover:scale-105"
      >
        <Icon name="add" className="text-3xl md:text-4xl" />
      </button>
    </div>
  );
};
