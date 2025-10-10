import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import Dashboard from '../components/admin/Dashboard';
import ContentManager from '../components/admin/ContentManager';
import Analytics from '../components/admin/Analytics';

const AdminPage: React.FC = () => {
  const { isAdmin, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600">Please sign in to access the admin panel.</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600">You don't have admin privileges.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Dashboard />
      <ContentManager />
      <Analytics />
    </div>
  );
};

export default AdminPage;


