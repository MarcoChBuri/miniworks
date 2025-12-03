
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../components/Icon';
import { Button } from '../components/Button';

export const ApplicantProfile: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background-light">
      <div className="sticky top-0 z-20 w-full bg-white border-b border-gray-200 shadow-sm">
        <div className="flex items-center px-4 md:px-8 py-3 max-w-7xl mx-auto w-full">
          <button 
            onClick={() => navigate(-1)}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          >
            <Icon name="arrow_back" className="text-gray-800 text-xl" />
          </button>
          <h1 className="text-lg font-bold ml-4 text-gray-900">Perfil del Postulante</h1>
        </div>
      </div>

      <main className="flex-grow w-full max-w-6xl mx-auto p-4 md:p-8 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            
            {/* Left Column: Profile Card */}
            <div className="lg:col-span-1">
                <div className="flex w-full flex-col items-center gap-4 rounded-2xl bg-white p-8 shadow-sm border border-gray-200 sticky top-24">
                    <div className="relative">
                    <img 
                        src="https://picsum.photos/id/64/300/300" 
                        alt="Juan Pérez" 
                        className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md"
                    />
                     <div className="absolute bottom-1 right-1 h-7 w-7 rounded-full bg-green-500 border-4 border-white"></div>
                    </div>
                    
                    <div className="flex flex-col justify-center text-center w-full pb-6 border-b border-gray-100">
                        <h2 className="text-2xl font-bold text-gray-900">Juan Pérez</h2>
                        <p className="text-primary font-medium mt-1">Diseñador Gráfico</p>
                    </div>

                    <div className="w-full space-y-4 text-sm">
                        <div className="flex justify-between">
                            <span className="text-gray-500">Edad</span>
                            <span className="font-medium text-gray-900">22 años</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Educación</span>
                            <span className="font-medium text-gray-900 text-right">UBA, Diseño</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Proyectos</span>
                            <span className="font-medium text-gray-900">14 completados</span>
                        </div>
                         <div className="flex justify-between">
                            <span className="text-gray-500">Calificación</span>
                            <div className="flex items-center text-yellow-500">
                                <span className="font-bold mr-1">4.8</span>
                                <Icon name="star" filled className="text-base" />
                            </div>
                        </div>
                    </div>

                    <div className="w-full pt-4 flex flex-col gap-3">
                        <Button className="w-full rounded-xl">Contactar</Button>
                        <Button variant="outline" className="w-full rounded-xl">Ver Portfolio</Button>
                    </div>
                </div>
            </div>

            {/* Right Column: Reviews & Details */}
            <div className="lg:col-span-2 space-y-8">
                 {/* About Section */}
                 <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-200">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Sobre mí</h3>
                    <p className="text-gray-600 leading-relaxed">
                        Estudiante apasionado por el diseño visual y la experiencia de usuario. Me especializo en crear interfaces limpias y funcionales. Tengo experiencia trabajando con herramientas como Figma, Adobe XD y Photoshop. Busco oportunidades para aplicar mis conocimientos en proyectos reales.
                    </p>
                 </div>

                {/* Reviews Section */}
                <div className="">
                    <div className="flex items-center justify-between mb-6 px-1">
                         <h3 className="text-xl font-bold text-gray-900">Reseñas Recibidas</h3>
                         <span className="text-sm text-gray-500">2 reseñas</span>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-4">
                        {/* Review 1 */}
                        <div className="flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-sm border border-gray-200">
                        <div className="flex items-center gap-4">
                            <img 
                            src="https://picsum.photos/id/65/100/100" 
                            alt="Maria" 
                            className="h-12 w-12 rounded-full object-cover"
                            />
                            <div className="flex-1">
                                <h4 className="text-base font-bold text-gray-900">Maria Rodriguez</h4>
                                <div className="flex items-center gap-2">
                                     <div className="flex text-yellow-400">
                                        {[1,2,3,4,5].map(i => <Icon key={i} name="star" className="text-sm" filled />)}
                                    </div>
                                    <span className="text-xs text-gray-400">• hace 2 semanas</span>
                                </div>
                            </div>
                        </div>
                        <p className="text-gray-700 text-sm leading-relaxed bg-gray-50 p-4 rounded-xl">
                            "Juan es un diseñador muy talentoso y proactivo. Entregó todo a tiempo y con una calidad excepcional. ¡Totalmente recomendado!"
                        </p>
                        </div>

                        {/* Review 2 */}
                        <div className="flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-sm border border-gray-200">
                         <div className="flex items-center gap-4">
                            <img 
                            src="https://picsum.photos/id/91/100/100" 
                            alt="Carlos" 
                            className="h-12 w-12 rounded-full object-cover"
                            />
                            <div className="flex-1">
                                <h4 className="text-base font-bold text-gray-900">Carlos Gomez</h4>
                                <div className="flex items-center gap-2">
                                     <div className="flex text-yellow-400">
                                        {[1,2,3,4].map(i => <Icon key={i} name="star" className="text-sm" filled />)}
                                        <Icon name="star" className="text-gray-300 text-sm" filled />
                                    </div>
                                    <span className="text-xs text-gray-400">• hace 1 mes</span>
                                </div>
                            </div>
                        </div>
                        <p className="text-gray-700 text-sm leading-relaxed bg-gray-50 p-4 rounded-xl">
                            "Excelente comunicación y habilidades de diseño. Aportó ideas creativas que mejoraron mucho el proyecto."
                        </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </main>

      {/* Action Bar (Fixed at bottom for mobile, floating card or sidebar for desktop? keeping sticky bottom for simplicity across sizes) */}
      <div className="fixed bottom-0 left-0 right-0 z-30 w-full bg-white/95 backdrop-blur-md border-t border-gray-200 p-4 md:p-6 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <div className="flex gap-4 max-w-4xl mx-auto items-center justify-between">
            <div className="hidden md:block">
                 <p className="text-sm text-gray-500">¿Quieres trabajar con Juan?</p>
                 <p className="font-bold text-gray-900">Toma una decisión para avanzar.</p>
            </div>
          <div className="flex gap-4 flex-1 md:flex-none md:w-96">
            <Button variant="secondary" className="flex-1 font-bold rounded-xl h-12 border border-gray-200">
                Rechazar
            </Button>
            <Button className="flex-1 font-bold rounded-xl h-12 shadow-lg shadow-blue-500/20">
                Aceptar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
