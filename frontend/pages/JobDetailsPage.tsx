
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Building, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { api } from '../services/api';
import { useAuth } from '../App';
import { Job, UserRole } from '../types';

const JobDetailsPage = () => {
  const { id } = useParams();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [applied, setApplied] = useState(false);
  const [error, setError] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) loadJob();
  }, [id]);

  const loadJob = async () => {
    try {
      const data = await api.jobs.getById(id!);
      setJob(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async () => {
    console.log('handleApply called, user:', user);
    if (!user) {
      navigate('/login');
      return;
    }
    console.log('user.role:', user.role, 'UserRole.STUDENT:', UserRole.STUDENT);
    if (user.role !== UserRole.STUDENT) {
      alert('Solo los estudiantes pueden postularse.');
      return;
    }

    setApplying(true);
    try {
      await api.postulations.apply(id!);
      setApplied(true);
    } catch (err: any) {
      console.error('Apply error:', err);
      alert(err.message || 'Error al enviar postulación');
    } finally {
      setApplying(false);
    }
  };

  if (loading) return <div className="text-center py-20 text-gray-500 dark:text-gray-400">Cargando detalles...</div>;
  if (error) return (
    <div className="max-w-md mx-auto py-20 text-center">
      <AlertCircle className="w-12 h-12 mx-auto text-red-500 mb-4" />
      <p className="text-gray-900 dark:text-white font-bold">{error}</p>
      <button onClick={() => navigate('/')} className="mt-4 text-cyan-500 underline">Volver al inicio</button>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto py-10">
      <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 dark:border-gray-700 transition-colors">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{job?.title}</h1>
        <p className="text-cyan-500 text-xl font-bold mb-6">{job?.company}</p>
        
        <div className="flex flex-wrap gap-6 text-gray-600 dark:text-gray-400 mb-8 border-y py-4 border-gray-100 dark:border-gray-700">
          <span className="flex items-center gap-2"><MapPin className="w-5 h-5" /> {job?.location}</span>
          <span className="flex items-center gap-2"><Calendar className="w-5 h-5" />Publicado el {new Date(job?.createdAt || '').toLocaleDateString()}</span>
          {job?.salary && <span className="font-bold text-green-600 dark:text-green-400">Presupuesto: ${job.salary}</span>}
        </div>

        <div className="prose max-w-none mb-10">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Descripción del puesto</h2>
          <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">{job?.description}</p>
        </div>

        {user?.role === UserRole.STUDENT || !user ? (
          applied ? (
            <div className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 py-4 rounded-2xl font-bold flex items-center justify-center gap-2">
              <CheckCircle className="w-5 h-5" /> Postulación Enviada Correctamente
            </div>
          ) : (
            <button 
              onClick={handleApply}
              disabled={applying}
              className="w-full bg-cyan-500 text-white py-4 rounded-2xl font-bold hover:bg-cyan-600 transition flex items-center justify-center gap-2"
            >
              {applying ? 'Enviando...' : <><Send className="w-5 h-5" /> Enviar mi postulación</>}
            </button>
          )
        ) : (
          <p className="text-gray-500 dark:text-gray-400 italic text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">Inicia sesión como estudiante para postularte.</p>
        )}
      </div>
    </div>
  );
};

export default JobDetailsPage;
