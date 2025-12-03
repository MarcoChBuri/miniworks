import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const BottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { icon: 'work', label: 'Empleos', path: '/feed' },
    { icon: 'assignment', label: 'Postulaciones', path: '/my-applications' },
    { icon: 'chat_bubble', label: 'Mensajes', path: '/messages' },
    { icon: 'person', label: 'Perfil', path: '/profile' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-10 border-t border-gray-200 bg-white/80 backdrop-blur-sm dark:border-gray-800 dark:bg-background-dark/80">
      <div className="grid h-16 grid-cols-4 items-center justify-items-center px-4">
        {navItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`flex flex-col items-center gap-1 ${
              isActive(item.path)
                ? 'text-primary'
                : 'text-gray-500 dark:text-gray-400'
            }`}
          >
            <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: isActive(item.path) ? "'FILL' 1" : "'FILL' 0" }}>{item.icon}</span>
            <span className="text-xs font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default BottomNav;
