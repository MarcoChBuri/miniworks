import React, { useEffect, useState } from 'react';
import { ShieldCheck, Users } from 'lucide-react';
import { api } from '../services/api';

interface ManagedUser {
  _id: string;
  name: string;
  email: string;
  role: string;
  cedula: string;
  isValidated: boolean;
}

const AdminDashboard = () => {
  const [users, setUsers] = useState<ManagedUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api.auth.getUsers()
      .then(setUsers)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <header className="flex items-center gap-3">
        <ShieldCheck className="w-8 h-8 text-cyan-500" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Administracion</h1>
          <p className="text-gray-500 dark:text-gray-400">Usuarios registrados en MiniWorks</p>
        </div>
      </header>

      {error && (
        <div className="p-4 rounded-xl bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400">
          {error}
        </div>
      )}

      {loading ? (
        <p className="text-gray-500 dark:text-gray-400">Cargando usuarios...</p>
      ) : (
        <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700">
          <table className="w-full text-left">
            <thead className="border-b border-gray-100 dark:border-gray-700">
              <tr>
                <th className="px-5 py-4"><Users className="w-5 h-5" /></th>
                <th className="px-5 py-4">Nombre</th>
                <th className="px-5 py-4">Correo</th>
                <th className="px-5 py-4">Rol</th>
                <th className="px-5 py-4">Cedula</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user._id} className="border-b border-gray-100 dark:border-gray-700 last:border-0">
                  <td className="px-5 py-4">{user._id}</td>
                  <td className="px-5 py-4 font-semibold">{user.name}</td>
                  <td className="px-5 py-4">{user.email}</td>
                  <td className="px-5 py-4">{user.role}</td>
                  <td className="px-5 py-4">{user.cedula}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
