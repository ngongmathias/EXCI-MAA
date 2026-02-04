import React from 'react';
import { Link } from 'react-router-dom';
import { User, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';

const AuthButton: React.FC = () => {
  const { t, user, isAuthenticated, logout } = useAuth();

  if (isAuthenticated && user) {
    return (
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-exci-blue-600 rounded-full flex items-center justify-center">
            <User className="h-4 w-4 text-white" />
          </div>
          <span className="text-sm font-medium text-gray-700">
            {user.name}
          </span>
        </div>
        <button
          onClick={logout}
          className="inline-flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-exci-blue-600 hover:bg-gray-50 rounded-md transition-colors duration-200"
        >
          <LogOut className="h-4 w-4" />
          <span>{t('auth.signOut', 'Sign Out')}</span>
        </button>
      </div>
    );
  }

  return (
    <Link
      to="/signin"
      className="inline-flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-exci-blue-600 hover:bg-gray-50 rounded-md transition-colors duration-200"
    >
      <User className="h-4 w-4" />
      <span>{t('auth.signIn', 'Sign In')}</span>
    </Link>
  );
};

export default AuthButton;


