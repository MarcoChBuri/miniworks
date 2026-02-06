
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase, MapPin, DollarSign, FileText, AlertCircle } from 'lucide-react';
import { api } from '../services/api';

const PostJobPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    salary: '',
    company: '',
    location: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await api.jobs.create({
        ...formData,
        salary: Number(formData.salary)
      });
      navigate('/employer-dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white dark:bg-gray-800 p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 transition-colors">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Publicar oferta</h1>

        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl flex items-center gap-3">
            <AlertCircle className="w-5 h-5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block">Título del Puesto</label>
            <input 
              type="text" required
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none transition text-gray-900 dark:text-white"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block">Nombre de Empresa</label>
            <input 
              type="text" required
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none transition text-gray-900 dark:text-white"
              value={formData.company}
              onChange={(e) => setFormData({...formData, company: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block">Ubicación</label>
              <input 
                type="text" required
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none transition text-gray-900 dark:text-white"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block">Salario</label>
              <input 
                type="number" required
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none transition text-gray-900 dark:text-white"
                value={formData.salary}
                onChange={(e) => setFormData({...formData, salary: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block">Descripción</label>
            <textarea 
              required rows={5}
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none transition text-gray-900 dark:text-white"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            ></textarea>
          </div>

          <button 
            type="submit" disabled={loading}
            className="w-full bg-cyan-500 text-white py-4 rounded-xl font-bold hover:bg-cyan-600 transition"
          >
            {loading ? 'Publicando...' : 'Lanzar Oferta'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostJobPage;
