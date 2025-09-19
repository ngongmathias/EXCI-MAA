'use client';

import {User, LogOut} from 'lucide-react';
import Link from 'next/link';

export default function AuthButton() {
  // Simplified AuthButton - just show login/admin links
  return (
    <div className="flex items-center space-x-4">
      <Link
        href="/admin"
        className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors duration-200"
      >
        <User className="h-4 w-4" />
        <span className="hidden sm:inline">Admin</span>
      </Link>
      <Link
        href="/auth/signin"
        className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors duration-200"
      >
        <User className="h-4 w-4" />
        <span className="hidden sm:inline">Login</span>
      </Link>
    </div>
  );
}