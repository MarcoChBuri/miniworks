
import React, { useState, createContext, useContext, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import { Briefcase, User as UserIcon, LogOut, Search, PlusCircle, History, Star, Settings, LayoutDashboard, Sun, Moon } from 'lucide-react';
import { User, UserRole } from './types';
import { DarkModeProvider, useDarkMode } from './contexts/DarkModeContext';

// Ensure UserRole enum values are available at runtime
console.log('UserRole enum:', UserRole);

// Auth Context
interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

// Components
const Navbar = () => {
  const { user, logout } = useAuth();
  const { darkMode, toggleDarkMode } = useDarkMode();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white dark:bg-black border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 text-cyan-500 dark:text-cyan-400 font-bold text-xl">
              <Briefcase className="w-8 h-8" />
              <span>MiniWorks</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-600 dark:text-gray-300 hover:text-cyan-500 dark:hover:text-cyan-400 font-medium transition-colors">Buscar Empleos</Link>
            {user?.role === UserRole.STUDENT && (
              <>
                <Link to="/dashboard" className="text-gray-600 dark:text-gray-300 hover:text-cyan-500 dark:hover:text-cyan-400 font-medium transition-colors">Mi Panel</Link>
                <Link to="/history" className="text-gray-600 dark:text-gray-300 hover:text-cyan-500 dark:hover:text-cyan-400 font-medium transition-colors">Historial</Link>
              </>
            )}
            {user?.role === UserRole.EMPLOYER && (
              <>
                <Link to="/employer-dashboard" className="text-gray-600 dark:text-gray-300 hover:text-cyan-500 dark:hover:text-cyan-400 font-medium transition-colors">Gestión</Link>
                <Link to="/post-job" className="bg-cyan-500 text-white px-4 py-2 rounded-lg hover:bg-cyan-600 transition flex items-center gap-2">
                  <PlusCircle className="w-4 h-4" /> Publicar
                </Link>
              </>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 text-gray-500 dark:text-gray-400 hover:text-cyan-500 dark:hover:text-cyan-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              title={darkMode ? 'Modo claro' : 'Modo oscuro'}
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {user ? (
              <div className="flex items-center gap-4">
                <Link to="/profile" className="flex items-center gap-2 text-gray-700 dark:text-gray-200 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors">
                  <div className="w-8 h-8 bg-cyan-100 dark:bg-cyan-900 text-cyan-600 dark:text-cyan-400 rounded-full flex items-center justify-center font-bold">
                    {user.name.charAt(0)}
                  </div>
                  <span className="hidden sm:inline font-medium">{user.name}</span>
                </Link>
                <button 
                  onClick={handleLogout}
                  className="p-2 text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login" className="text-gray-600 dark:text-gray-300 hover:text-cyan-500 dark:hover:text-cyan-400 px-4 py-2 font-medium transition-colors">Login</Link>
                <Link to="/register" className="bg-cyan-500 text-white px-4 py-2 rounded-lg hover:bg-cyan-600 transition">Registro</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

// Fix: Changed children to optional in the prop type to resolve TypeScript errors in Route element components
const ProtectedRoute = ({ children, allowedRoles }: { children?: React.ReactNode, allowedRoles?: UserRole[] }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(user.role)) return <Navigate to="/" />;
  return <>{children}</>;
};

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import StudentDashboard from './pages/StudentDashboard';
import EmployerDashboard from './pages/EmployerDashboard';
import PostJobPage from './pages/PostJobPage';
import ProfilePage from './pages/ProfilePage';
import JobDetailsPage from './pages/JobDetailsPage';
import StudentHistoryPage from './pages/StudentHistoryPage';

const App = () => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('miniworks_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return null;
      }
    }
    return null;
  });

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem('miniworks_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('miniworks_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      <DarkModeProvider>
        <Router>
          <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            <Navbar />
            <main className="flex-grow container mx-auto px-4 py-8">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/jobs/:id" element={<JobDetailsPage />} />
                
                <Route path="/dashboard" element={
                  <ProtectedRoute allowedRoles={[UserRole.STUDENT]}>
                    <StudentDashboard />
                  </ProtectedRoute>
                } />
                
                <Route path="/history" element={
                  <ProtectedRoute allowedRoles={[UserRole.STUDENT]}>
                    <StudentHistoryPage />
                  </ProtectedRoute>
                } />

                <Route path="/employer-dashboard" element={
                  <ProtectedRoute allowedRoles={[UserRole.EMPLOYER]}>
                    <EmployerDashboard />
                  </ProtectedRoute>
                } />

                <Route path="/post-job" element={
                  <ProtectedRoute allowedRoles={[UserRole.EMPLOYER]}>
                    <PostJobPage />
                  </ProtectedRoute>
                } />

                <Route path="/profile" element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                } />
              </Routes>
            </main>
            <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-8 text-center text-gray-500 dark:text-gray-400 transition-colors duration-300">
              <p>&copy; 2024 MiniWorks. Conectando talento universitario con oportunidades.</p>
            </footer>
          </div>
        </Router>
      </DarkModeProvider>
    </AuthContext.Provider>
  );
};

export default App;
