
import React, { useState, useEffect } from 'react';
import { Search, MapPin, Calendar, Briefcase, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import { Job } from '../types';

const HomePage = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await api.jobs.getAll();
      setJobs(Array.isArray(data) ? data : []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!search.trim()) {
      loadJobs();
      return;
    }
    try {
      setLoading(true);
      setError('');
      const data = await api.jobs.search(search);
      setJobs(Array.isArray(data) ? data : []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <section className="bg-cyan-500 text-white rounded-3xl p-8 md:p-16 text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">MiniWorks</h1>
        <p className="text-xl text-cyan-100 max-w-2xl mx-auto">La red que conecta a universitarios con el mundo laboral real.</p>
        
        <form onSubmit={handleSearch} className="max-w-2xl mx-auto flex gap-2 p-2 bg-white dark:bg-gray-900 rounded-2xl shadow-xl">
          <div className="flex-grow flex items-center px-4 gap-3">
            <Search className="text-gray-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Buscar por cargo o empresa..." 
              className="w-full py-3 text-gray-900 dark:text-white outline-none bg-transparent"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button type="submit" className="bg-cyan-500 text-white px-8 py-3 rounded-xl font-bold hover:bg-cyan-600 transition">
            Buscar
          </button>
        </form>
      </section>

      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl flex items-center gap-3">
          <AlertCircle className="w-5 h-5" />
          <span>Error al cargar empleos: {error}</span>
        </div>
      )}

      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Oportunidades de hoy</h2>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => <div key={i} className="h-48 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-2xl"></div>)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map(job => (
              <Link key={job.id} to={`/jobs/${job.id}`} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{job.title}</h3>
                <p className="text-cyan-500 font-semibold mb-3">{job.company}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                  <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {job.location}</span>
                  <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {new Date(job.createdAt).toLocaleDateString()}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default HomePage;
