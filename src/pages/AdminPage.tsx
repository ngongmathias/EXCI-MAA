import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import Dashboard from '../components/admin/Dashboard';
import ContentManager from '../components/admin/ContentManager';
import Analytics from '../components/admin/Analytics';
import CareersAdmin from '../components/admin/CareersAdmin';
import ContactSubmissions from '../components/admin/ContactSubmissions';
import ConsultationRequests from '../components/admin/ConsultationRequests';
import BackgroundImageManager from '../components/admin/BackgroundImageManager';
import AccountingNewsManager from '../components/admin/AccountingNewsManager';
import AdminAccountManager from '../components/admin/AdminAccountManager';
import AdminLayout from '../components/admin/AdminLayout';

const AdminPage: React.FC = () => {
  const { user, loading, isAuthenticated, isAdmin } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/signin" replace />;
  }

  return (
    <AdminLayout>
      {(active) => (
        <>
          {active === 'dashboard' && <Dashboard />}
          {active === 'careers' && <CareersAdmin />}
          {active === 'backgrounds' && <BackgroundImageManager />}
          {active === 'services' && <ContentManager active="services" />}
          {active === 'events' && <ContentManager active="events" />}
          {active === 'posts' && <ContentManager active="posts" />}
          {active === 'comments' && <ContentManager active="comments" />}
          {active === 'accounting-news' && <AccountingNewsManager />}
          {active === 'admin-accounts' && <AdminAccountManager />}
          {active === 'contact' && <ContactSubmissions />}
          {active === 'consultation' && <ConsultationRequests />}
          {active === 'insights' && <Analytics />}
        </>
      )}
    </AdminLayout>
  );
};

export default AdminPage;


