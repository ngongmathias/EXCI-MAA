import React from 'react';
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';
import Dashboard from '../components/admin/Dashboard';
import ContentManager from '../components/admin/ContentManager';
import Analytics from '../components/admin/Analytics';
import CareersAdmin from '../components/admin/CareersAdmin';
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
              {active === 'careers' && <CareersAdmin />}
              {active === 'services' && <ContentManager active="services" />}
              {active === 'events' && <ContentManager active="events" />}
              {active === 'posts' && <ContentManager active="posts" />}
              {active === 'comments' && <ContentManager active="comments" />}
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


