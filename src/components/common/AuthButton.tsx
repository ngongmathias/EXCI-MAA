import React from 'react';
import { Link } from 'react-router-dom';
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import { User } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const AuthButton: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="flex items-center">
      <SignedIn>
        <UserButton afterSignOutUrl="/" />
      </SignedIn>

      <SignedOut>
        <div className="flex items-center space-x-2">
          <Link
            to="/sign-in"
            className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200"
          >
            {t('auth.signIn', 'Sign In')}
          </Link>
          <span className="text-gray-300">|</span>
          <Link
            to="/sign-up"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200 shadow-sm"
          >
            {t('auth.signUp', 'Sign Up')}
          </Link>
        </div>
      </SignedOut>
    </div>
  );
};

export default AuthButton;


