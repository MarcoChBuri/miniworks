
import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Job, Application } from '../types';
import { useAuth } from '../App';
import { Link } from 'react-router-dom';
import { Plus, Users, Briefcase, Check, AlertCircle } from 'lucide-react';

const EmployerDashboard = () => {
  const { user } = useAuth();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      const data = await api.employers.getMyJobs();
      setJobs(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadApplications = async (job: Job) => {
  setSelectedJob(job);
  try {
    const data = await api.employers.getApplications(job._id);
    setApplications(data);
  } catch (err: any) {
    alert(err.message);
  }
};


  const handleAccept = async (appId: string) => {
    if (!selectedJob) return;
    try {
      await api.postulations.accept(selectedJob.id, appId);
      setApplications(apps => apps.map(a => a.id === appId ? {...a, status: 'ACEPTADO'} : a));
    } catch (err: any) {
      alert(err.message);
    }
  };

  if (loading) return <div className="text-center py-20">Cargando...</div>;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Gestión de Empleos</h1>
        <Link to="/post-job" className="bg-cyan-500 text-white px-6 py-3 rounded-2xl font-bold hover:bg-cyan-600 transition flex items-center gap-2">
          <Plus className="w-5 h-5" /> Nueva Oferta
        </Link>
      </div>

      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl flex items-center gap-3">
          <AlertCircle className="w-5 h-5" />
          <span>{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Briefcase className="text-cyan-500 dark:text-cyan-400 w-5 h-5" /> Mis Ofertas
          </h2>
          <div className="space-y-3">
            {jobs.map(job => (
              <button 
                key={job.id} 
                onClick={() => loadApplications(job)}
                className={`w-full p-4 rounded-2xl text-left transition ${selectedJob?.id === job.id ? 'bg-cyan-500 text-white' : 'bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-900 dark:text-white'}`}
              >
                <p className="font-bold truncate">{job.title}</p>
                <p className={`text-xs mt-1 ${selectedJob?.id === job.id ? 'text-cyan-100' : 'text-gray-400 dark:text-gray-500'}`}>
                  {job.applications?.length || 0} postulantes
                </p>
              </button>
            ))}
            {jobs.length === 0 && <p className="text-gray-400 dark:text-gray-500 italic">No tienes ofertas creadas.</p>}
          </div>
        </div>

        <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Users className="text-cyan-500 dark:text-cyan-400 w-5 h-5" /> Postulaciones {selectedJob ? `para ${selectedJob.title}` : ''}
          </h2>
          {!selectedJob ? (
            <div className="py-20 text-center text-gray-400 dark:text-gray-500">Selecciona un trabajo para ver sus postulantes.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-gray-400 dark:text-gray-500 text-sm uppercase font-bold border-b border-gray-100 dark:border-gray-700">
                    <th className="pb-4 text-left">Estudiante</th>
                    <th className="pb-4 text-left">Estado</th>
                    <th className="pb-4 text-right">Acción</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                  {applications.map(app => (
                    <tr key={app.id}>
                      <td className="py-4">
                        <div className="flex flex-col">
                          <span className="font-bold text-gray-900 dark:text-white">{app.student?.name}</span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">{app.student?.email}</span>
                        </div>
                      </td>
                      <td className="py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${app.status === 'ACEPTADO' ? 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400' : 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400'}`}>
                          {app.status}
                        </span>
                      </td>
                      <td className="py-4 text-right">
                        {app.status === 'PENDIENTE' && (
                          <button onClick={() => handleAccept(app.id)} className="p-2 bg-cyan-50 dark:bg-cyan-900/20 text-cyan-500 dark:text-cyan-400 rounded-xl hover:bg-cyan-500 hover:text-white dark:hover:bg-cyan-500 dark:hover:text-white transition">
                            <Check className="w-5 h-5" />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                  {applications.length === 0 && (
                    <tr><td colSpan={3} className="py-12 text-center text-gray-400 dark:text-gray-500">No hay postulaciones.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployerDashboard;
