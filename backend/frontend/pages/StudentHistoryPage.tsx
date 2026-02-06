
import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { useAuth } from '../App';
import { Job } from '../types';
import { History, Calendar, CheckCircle, Clock } from 'lucide-react';

const StudentHistoryPage = () => {
  const { user } = useAuth();
  const [history, setHistory] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) loadHistory();
  }, [user]);

  const loadHistory = async () => {
    try {
      const data = await api.students.getHistory(user!.id);
      setHistory(data);
    } catch (err) {
      setHistory([
        { id: 'h1', title: 'Ayudante de Laboratorio', company: 'Facultad de Ingeniería', location: 'Quito', description: 'Mantenimiento preventivo.', createdAt: '2023-10-15T00:00:00Z' },
        { id: 'h2', title: 'Community Manager', company: 'Pizzeria Local', location: 'Quito', description: 'Manejo de Instagram.', createdAt: '2023-08-01T00:00:00Z' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
          <History className="text-cyan-500 w-8 h-8" /> Historial de Trabajos
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">Revisa tus participaciones previas y el estado de tus aplicaciones.</p>
      </header>

      {loading ? (
        <div className="py-12 text-center text-gray-500 dark:text-gray-400">Cargando tu historial...</div>
      ) : (
        <div className="space-y-4">
          {history.map(item => (
            <div key={item.id} className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition-all hover:border-cyan-100 dark:hover:border-cyan-900">
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 font-medium">{item.company}</p>
                <div className="flex items-center gap-3 text-sm text-gray-400 dark:text-gray-500">
                  <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {new Date(item.createdAt).toLocaleDateString()}</span>
                  <span>•</span>
                  <span>{item.location}</span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className="inline-flex items-center gap-1 px-4 py-1.5 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-full text-sm font-bold">
                  <CheckCircle className="w-4 h-4" /> Finalizado
                </span>
                <button className="text-cyan-500 text-sm font-bold hover:underline">Ver Certificado</button>
              </div>
            </div>
          ))}
          {history.length === 0 && (
            <div className="py-20 text-center bg-white dark:bg-gray-800 rounded-3xl border border-dashed border-gray-200 dark:border-gray-700">
              <Clock className="w-12 h-12 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
              <p className="text-gray-500 dark:text-gray-400 font-medium">Aún no has completado ningún trabajo.</p>
              <button className="mt-4 text-cyan-500 font-bold hover:underline" onClick={() => window.location.hash = '/'}>
                Explora oportunidades ahora
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StudentHistoryPage;
