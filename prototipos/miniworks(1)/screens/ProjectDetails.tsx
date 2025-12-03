
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { Icon } from '../components/Icon';

export const ProjectDetails: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background-light">
      {/* Header */}
      <header className="sticky top-0 z-20 flex items-center bg-white px-4 md:px-8 py-3 justify-between border-b border-gray-200 shadow-sm">
        <button 
          onClick={() => navigate('/dashboard')}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
        >
          <Icon name="arrow_back" className="text-gray-800 text-xl" />
        </button>
        <h2 className="text-base font-bold text-gray-900 md:hidden">Detalles</h2>
        <div className="hidden md:flex items-center gap-2">
            <span className="text-sm text-gray-500">Publicado hace 2 días</span>
        </div>
        <div className="w-10 md:hidden"></div>
      </header>

      <main className="flex-1 w-full max-w-6xl mx-auto p-4 md:p-8 pb-32 md:pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Main Content Column */}
            <div className="lg:col-span-2 space-y-8">
                <div>
                    <div className="flex items-start justify-between">
                         <h1 className="text-gray-900 text-3xl md:text-4xl font-bold leading-tight mb-4">
                            Diseño de Landing Page
                        </h1>
                         <button className="hidden md:flex items-center justify-center h-10 w-10 rounded-full border border-gray-200 hover:bg-gray-50 text-gray-400 hover:text-red-500 transition-colors">
                            <Icon name="favorite" />
                        </button>
                    </div>

                    <div className="flex gap-2 flex-wrap">
                        <div className="flex h-8 items-center justify-center rounded-full bg-blue-50 px-4 border border-blue-100">
                        <p className="text-primary text-sm font-medium">Diseño UX</p>
                        </div>
                        <div className="flex h-8 items-center justify-center rounded-full bg-blue-50 px-4 border border-blue-100">
                        <p className="text-primary text-sm font-medium">Desarrollo Frontend</p>
                        </div>
                    </div>
                </div>

                <section className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-200">
                    <h3 className="text-gray-900 text-xl font-bold pb-4 border-b border-gray-100 mb-4">Descripción del Proyecto</h3>
                    <p className="text-gray-700 text-lg leading-relaxed space-y-4">
                    Estamos buscando un diseñador y desarrollador talentoso para crear una landing page moderna y responsive para nuestro nuevo producto.
                    <br/><br/>
                    El proyecto incluye:
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>Definición de la experiencia de usuario (UX)</li>
                        <li>Diseño de la interfaz visual (UI) en Figma</li>
                        <li>Desarrollo frontend utilizando React o Vue</li>
                    </ul>
                    <br/>
                    Buscamos a alguien con atención al detalle y capacidad para trabajar de forma autónoma.
                    </p>
                </section>

                 <section className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-200">
                    <h3 className="text-gray-900 text-xl font-bold pb-4 border-b border-gray-100 mb-4">Entregables</h3>
                    <div className="space-y-3">
                         <div className="flex items-center gap-3 text-gray-700">
                            <Icon name="check_circle" className="text-green-500" />
                            <span>Archivo Figma editable</span>
                         </div>
                         <div className="flex items-center gap-3 text-gray-700">
                            <Icon name="check_circle" className="text-green-500" />
                            <span>Código fuente en repositorio Git</span>
                         </div>
                    </div>
                 </section>
            </div>

            {/* Sidebar Column */}
            <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-6">
                    {/* Project Stats Card */}
                    <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-200">
                        <div className="space-y-6">
                             {[
                                { icon: 'event', label: 'Inicio', value: '15 de Agosto' },
                                { icon: 'event_available', label: 'Fin', value: '30 de Agosto' },
                                { icon: 'hourglass_top', label: 'Duración', value: '2 semanas' },
                                { icon: 'payments', label: 'Presupuesto', value: '$500 USD' },
                            ].map((item, idx) => (
                            <div key={idx} className="flex items-center gap-4">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-50 text-gray-600">
                                <Icon name={item.icon} className="text-xl" />
                                </div>
                                <div>
                                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">{item.label}</p>
                                <p className="text-base font-semibold text-gray-900">{item.value}</p>
                                </div>
                            </div>
                            ))}
                        </div>
                        
                        <div className="mt-8 pt-6 border-t border-gray-100">
                             <Button fullWidth className="shadow-lg shadow-blue-500/20 py-3 text-lg rounded-xl">
                                Postular ahora
                            </Button>
                            <p className="text-center text-xs text-gray-400 mt-3">Postulación rápida con tu perfil</p>
                        </div>
                    </div>

                    {/* Client Info (Optional) */}
                    <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-200">
                        <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-4">Sobre el cliente</h4>
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                                TC
                            </div>
                            <div>
                                <p className="font-semibold text-gray-900">TechCorp Inc.</p>
                                <div className="flex items-center text-yellow-400 text-xs">
                                     <Icon name="star" filled className="text-sm"/>
                                     <span className="text-gray-600 ml-1">4.9 (12 reviews)</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
      </main>

      {/* Mobile Sticky Footer */}
      <footer className="lg:hidden fixed bottom-0 left-0 right-0 z-20 bg-white p-4 border-t border-gray-200">
        <Button fullWidth className="shadow-lg shadow-blue-500/20 py-3 text-lg rounded-xl">
          Postular trabajo
        </Button>
      </footer>
    </div>
  );
};
