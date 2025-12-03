
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { Icon } from '../components/Icon';

export const CreateProject: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background-light">
       {/* Desktop Header */}
       <header className="sticky top-0 z-20 flex h-16 items-center border-b border-gray-200 bg-white px-4 md:px-8 shadow-sm">
            <button 
            onClick={() => navigate('/dashboard')}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full hover:bg-gray-100 transition-colors mr-4"
            >
            <Icon name="close" className="text-gray-600 text-xl" />
            </button>
            <h1 className="text-lg font-bold text-gray-900">Crear Proyecto</h1>
      </header>

      <div className="flex-1 w-full max-w-4xl mx-auto p-4 md:p-8">
        <div className="text-center mb-8 md:text-left md:mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Detalles del MiniWork</h2>
          <p className="text-gray-500 mt-2">Define el alcance, la duración y el presupuesto.</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-10">
          <form className="space-y-6 md:space-y-8" onSubmit={(e) => { e.preventDefault(); navigate('/dashboard'); }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <div className="md:col-span-2">
                    <label htmlFor="project-name" className="block text-sm font-medium text-gray-700 mb-1">
                        Nombre del proyecto
                    </label>
                    <input
                        type="text"
                        id="project-name"
                        name="project-name"
                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                        placeholder="Ej: Lanzamiento App Móvil"
                        required
                    />
                </div>

                <div className="md:col-span-2">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                        Descripción
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        rows={6}
                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all resize-none"
                        placeholder="Añade una breve descripción del proyecto..."
                        required
                    ></textarea>
                </div>

                <div>
                    <label htmlFor="start-date" className="block text-sm font-medium text-gray-700 mb-1">
                    Fecha de inicio
                    </label>
                    <input
                    type="date"
                    id="start-date"
                    name="start-date"
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                    required
                    />
                </div>

                <div>
                    <label htmlFor="end-date" className="block text-sm font-medium text-gray-700 mb-1">
                    Fecha de finalización
                    </label>
                    <input
                    type="date"
                    id="end-date"
                    name="end-date"
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                    required
                    />
                </div>
                
                 <div>
                    <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-1">
                    Presupuesto Estimado
                    </label>
                     <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-gray-500 sm:text-sm">$</span>
                        </div>
                        <input
                        type="text"
                        id="budget"
                        name="budget"
                        className="w-full rounded-lg border border-gray-300 bg-white pl-7 pr-4 py-3 text-gray-900 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                        placeholder="0.00"
                        />
                    </div>
                </div>
            </div>

            <div className="pt-4 flex flex-col md:flex-row gap-4 md:justify-end border-t border-gray-100 mt-6">
               <Button type="button" variant="secondary" className="md:order-1 md:w-32" onClick={() => navigate('/dashboard')}>
                Cancelar
              </Button>
              <Button type="submit" className="md:order-2 md:w-48">
                Guardar proyecto
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
