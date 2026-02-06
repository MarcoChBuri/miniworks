
import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Job, Review } from '../types';
import { useAuth } from '../App';
import { Link } from 'react-router-dom';
import { LayoutDashboard, History, Star, ArrowRight } from 'lucide-react';

const StudentDashboard = () => {
  const { user } = useAuth();
  const [availableJobs, setAvailableJobs] = useState<Job[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadData();
    }
  }, [user]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [jobsData, reviewsData] = await Promise.all([
        // Fix: api.jobs.getAvailableForStudents does not exist, using api.students.getAvailableJobs instead
        api.students.getAvailableJobs(),
        api.students.getReviews(user!.id)
      ]);
      setAvailableJobs(jobsData);
      setReviews(reviewsData);
    } catch (err) {
      // Dummy data fallback
      setAvailableJobs([
        { id: '1', title: 'Data Entry', company: 'BizCorp', location: 'Quito', description: 'Ayuda con ingreso de facturas.', createdAt: new Date().toISOString() }
      ]);
      setReviews([
        { id: '1', calificacion: 5, comentario: 'Excelente trabajo en el proyecto de backend.', createdAt: new Date().toISOString() }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Hola, {user?.name} 👋</h1>
        <p className="text-gray-500 dark:text-gray-400">Aquí tienes un resumen de tu actividad.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-cyan-500 text-white p-6 rounded-3xl shadow-lg">
          <LayoutDashboard className="w-8 h-8 mb-4" />
          <p className="text-cyan-100 text-sm font-medium">Trabajos Disponibles</p>
          <p className="text-4xl font-black">{availableJobs.length}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
          <History className="text-cyan-500 dark:text-cyan-400 w-8 h-8 mb-4" />
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Postulaciones Activas</p>
          <p className="text-4xl font-black text-gray-900 dark:text-white">3</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
          <Star className="text-yellow-400 w-8 h-8 mb-4" />
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Calificación Promedio</p>
          <p className="text-4xl font-black text-gray-900 dark:text-white">4.8</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recommended Jobs */}
        <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 space-y-6 transition-colors">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Recomendados para ti</h2>
            <Link to="/" className="text-cyan-500 font-bold text-sm flex items-center gap-1 hover:underline">Ver todos <ArrowRight className="w-4 h-4" /></Link>
          </div>
          <div className="space-y-4">
            {availableJobs.slice(0, 4).map(job => (
              <Link key={job.id} to={`/jobs/${job.id}`} className="block p-4 rounded-2xl bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition border border-transparent hover:border-cyan-100 dark:hover:border-cyan-900">
                <h3 className="font-bold text-gray-900 dark:text-white">{job.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{job.company} • {job.location}</p>
              </Link>
            ))}
            {availableJobs.length === 0 && <p className="text-gray-400 dark:text-gray-500 text-center py-4">No hay nuevos empleos recomendados.</p>}
          </div>
        </div>

        {/* Latest Reviews */}
        <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 space-y-6 transition-colors">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Últimas Reseñas</h2>
          <div className="space-y-4">
            {reviews.map(review => (
              <div key={review.id} className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-700 space-y-2">
                <div className="flex text-yellow-400">
                  {Array.from({length: 5}).map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < review.calificacion ? 'fill-current' : 'text-gray-200 dark:text-gray-600'}`} />
                  ))}
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-sm italic">"{review.comentario}"</p>
                <p className="text-xs text-gray-400 dark:text-gray-500">{new Date(review.createdAt).toLocaleDateString()}</p>
              </div>
            ))}
            {reviews.length === 0 && <p className="text-gray-400 dark:text-gray-500 text-center py-4">Aún no tienes reseñas.</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
