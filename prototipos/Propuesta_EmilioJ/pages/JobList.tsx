import React from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';

const jobs = [
  {
    id: '1',
    department: 'Departamento de Matemática',
    title: 'Tutor de Álgebra',
    description: 'Se busca estudiante avanzado para dar clases de apoyo a ingresantes. Es requisito tener buen manejo de grupos y paciencia.',
    logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBNWqbirqU-g3W1T1esCB8HnSJmh1fWiEXZh8-jjfLpRFQSDwJ2B36fSX_zE2mrRUpN52UlifETxBeCU8SVPHivOJy34hOjdnvJyEaR4KPA5Cdj9GCEyg-zNpSrEjOckc4p4xUyfDOLo6-uABXvJh-ME8MrJ9YLsNI1vzZXE2YxDpxDTcXPndamXRDbNCYqOexnfXHSSc0vHVEziAfiqEpNas5O8ZkcJNaZ4zi1GnqRooKaRFJwAc9edNOfg8lRzIF6N14uAxHXA-kk',
    tags: ['FICH', 'Presencial', '4hs/semana']
  },
  {
    id: '2',
    department: 'Centro de Estudiantes',
    title: 'Diseñador Gráfico para Redes',
    description: 'Creación de contenido visual para las redes sociales del centro de estudiantes. Se requiere manejo de Canva y/o Photoshop.',
    logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuABp7EhQngMCSAG_T2ZrMpKEZ1VgI_Gd9vd3tBc3tiQEJ6Lw56cJEg6b03fMt_aFaYRkSwls8e5cSdjSwCI6ZKOHWJVGRDLaX4oEm3ZMM43JLcSf6pC3Uv50aCyLxrJmsj3X9WdbQlOUxAFHj2j3_IS_9-uXSEO_BY5e2jBQ_xF02YvqUNMPYkw3HlLQ_ArMwhfX5kGxRMmS1C5Y7Gt-65zhdKnTyxz-ui17-OvS7xc06qJG18ajN602zREKdx5bQ8cgz45tlQ20mOC',
    tags: ['FADU', 'Remoto', '6hs/semana']
  },
  {
    id: '3',
    department: 'Startup Tecnológica Local',
    title: 'Desarrollador Frontend Jr.',
    description: 'Buscamos un estudiante de informática para sumar a nuestro equipo. Se valoran conocimientos en React y Tailwind CSS.',
    logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAF_nANTdGr6dgq2Blhi_k0GUHcSCih1tVE5iGqVnLH4vLtcfbg3aoRDXzfoeJawwGb8B6rLQTnctpGnNfUg2CcKBXqgXOqqU5V6kyF4aBYPUahiOFFneBevpSACKJV6BEIktIdpn8u7KFir8PN95_suGyrpLDj5NJWVQo980Na-6fckx7MY7RIW7tVRvcq84mhUTPCetyltyFkv2PGYSowHh7ck3DoLCbuy4q3Y83MiifSaBkSF_hAlWpXrntki-Ojwc7rX6qihZ6O',
    tags: ['FICH', 'Híbrido', '20hs/semana']
  }
];

const JobList: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-background-light dark:bg-background-dark pb-20">
      {/* Top App Bar */}
      <div className="sticky top-0 z-10 bg-background-light dark:bg-background-dark/80 backdrop-blur-sm">
        <div className="flex items-center p-4 pb-2 justify-between">
          <div className="flex size-12 shrink-0 items-center justify-start cursor-pointer">
            <span className="material-symbols-outlined text-3xl text-[#111418] dark:text-white">
              menu
            </span>
          </div>
          <h1 className="text-[#111418] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">
            Lista de Empleos
          </h1>
          <div className="flex size-12 shrink-0 items-center justify-end cursor-pointer">
            <span className="material-symbols-outlined text-3xl text-[#111418] dark:text-white">
              notifications
            </span>
          </div>
        </div>
        {/* Search Bar */}
        <div className="px-4 py-3">
          <label className="flex flex-col min-w-40 h-12 w-full">
            <div className="flex w-full flex-1 items-stretch rounded-lg h-full shadow-sm">
              <div className="text-[#617289] flex border-none bg-white dark:bg-slate-800 items-center justify-center pl-4 rounded-l-lg border-r-0">
                <span className="material-symbols-outlined">search</span>
              </div>
              <input
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-r-lg text-[#111418] dark:text-white focus:outline-0 focus:ring-0 border-none bg-white dark:bg-slate-800 h-full placeholder:text-[#617289] px-4 pl-2 text-base font-normal leading-normal"
                placeholder="Buscar por título, empresa..."
              />
            </div>
          </label>
        </div>
        {/* Chips / Filters */}
        <div className="flex gap-3 px-4 pb-3 overflow-x-auto no-scrollbar">
          <button className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-primary text-white pl-3 pr-3">
            <span className="material-symbols-outlined text-lg">tune</span>
            <p className="text-sm font-medium leading-normal">Filtros</p>
          </button>
          <button className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-white dark:bg-slate-800 border border-transparent dark:border-slate-700 pl-3 pr-3">
            <p className="text-[#111418] dark:text-white text-sm font-medium leading-normal">
              Categoría
            </p>
            <span className="material-symbols-outlined text-lg text-[#111418] dark:text-white">
              expand_more
            </span>
          </button>
          <button className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-white dark:bg-slate-800 border border-transparent dark:border-slate-700 pl-3 pr-3">
            <p className="text-[#111418] dark:text-white text-sm font-medium leading-normal">
              Modalidad
            </p>
            <span className="material-symbols-outlined text-lg text-[#111418] dark:text-white">
              expand_more
            </span>
          </button>
          <button className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-white dark:bg-slate-800 border border-transparent dark:border-slate-700 pl-3 pr-3">
            <p className="text-[#111418] dark:text-white text-sm font-medium leading-normal">
              Facultad
            </p>
            <span className="material-symbols-outlined text-lg text-[#111418] dark:text-white">
              expand_more
            </span>
          </button>
        </div>
      </div>

      {/* Job Cards List */}
      <main className="flex flex-col gap-2 pb-4">
        {jobs.map((job) => (
          <div key={job.id} className="px-4 pt-2" onClick={() => navigate(`/job/${job.id}`)}>
            <div className="flex flex-col items-stretch justify-start rounded-xl bg-white dark:bg-slate-900 shadow-sm cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
              <div className="flex w-full grow flex-col items-stretch justify-center gap-2 p-4">
                <div className="flex items-start justify-between">
                  <div className="flex flex-col">
                    <p className="text-[#617289] dark:text-gray-400 text-sm font-normal leading-normal">
                      {job.department}
                    </p>
                    <p className="text-[#111418] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">
                      {job.title}
                    </p>
                  </div>
                  <img
                    alt={`Logo de ${job.department}`}
                    className="h-10 w-10 rounded-full object-cover"
                    src={job.logo}
                  />
                </div>
                <p className="text-[#617289] dark:text-gray-400 text-base font-normal leading-normal line-clamp-2">
                  {job.description}
                </p>
                <div className="flex items-center gap-2 pt-2 flex-wrap">
                    {job.tags.map((tag, idx) => (
                        <span key={idx} className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${idx === 0 ? 'bg-primary/20 text-primary dark:text-sky-300 dark:bg-sky-500/20' : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}>
                            {tag}
                        </span>
                    ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </main>
      <BottomNav />
    </div>
  );
};

export default JobList;
