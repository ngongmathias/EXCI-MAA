import React from 'react';
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';
import Dashboard from '../components/admin/Dashboard';
import ContentManager from '../components/admin/ContentManager';
import Analytics from '../components/admin/Analytics';
import ContactSubmissions from '../components/admin/ContactSubmissions';
import ConsultationRequests from '../components/admin/ConsultationRequests';
import AdminLayout from '../components/admin/AdminLayout';

const AdminPage: React.FC = () => {
  return (
    <>
      <SignedIn>
        <AdminLayout>
          {(active) => (
            <>
              {active === 'dashboard' && <Dashboard />}
              {active === 'services' && <ContentManager />}
              {active === 'events' && <ContentManager />}
              {active === 'posts' && <ContentManager />}
              {active === 'comments' && <ContentManager />}
              {active === 'contact' && <ContactSubmissions />}
              {active === 'consultation' && <ConsultationRequests />}
              {active === 'insights' && <Analytics />}
            </>
          )}
        </AdminLayout>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn redirectUrl="/admin" />
      </SignedOut>
    </>
  );
};

export default AdminPage;


