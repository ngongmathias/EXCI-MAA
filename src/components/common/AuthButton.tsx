import React, { useState } from 'react';
import { User, LogOut, Settings } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';

const AuthButton: React.FC = () => {
  const { user, isAuthenticated, logout, isAdmin } = useAuth();
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  if (!isAuthenticated) {
    return (
      <div className="flex items-center space-x-2">
        <button className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-exci-blue-600 hover:bg-gray-50 rounded-md transition-colors duration-200">
          <User className="h-4 w-4" />
          <span>{t('auth.signIn')}</span>
        </button>
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-exci-blue-600 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-exci-blue-500"
      >
        <User className="h-4 w-4" />
        <span className="hidden sm:inline">{user?.name || user?.email}</span>
        {isAdmin && (
          <span className="hidden sm:inline bg-exci-blue-100 text-exci-blue-800 text-xs px-2 py-1 rounded-full">
            {t('auth.admin')}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
          <div className="px-4 py-2 border-b border-gray-100">
            <p className="text-sm font-medium text-gray-900">{user?.name}</p>
            <p className="text-sm text-gray-500">{user?.email}</p>
          </div>
          
          {isAdmin && (
            <a
              href="/admin"
              className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              onClick={() => setIsOpen(false)}
            >
              <Settings className="h-4 w-4" />
              <span>{t('auth.adminPanel')}</span>
            </a>
          )}
          
          <button
            onClick={() => {
              logout();
              setIsOpen(false);
            }}
            className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
          >
            <LogOut className="h-4 w-4" />
            <span>{t('auth.signOut')}</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default AuthButton;


