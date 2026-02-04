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
        <Link
          to="/sign-in"
          className="inline-flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-exci-blue-600 hover:bg-gray-50 rounded-md transition-colors duration-200"
        >
          <User className="h-4 w-4" />
          <span>{t('auth.signIn', 'Sign In')}</span>
        </Link>
      </SignedOut>
    </div>
  );
};

export default AuthButton;


