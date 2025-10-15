import React from 'react';
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';
import Dashboard from '../components/admin/Dashboard';
import ContentManager from '../components/admin/ContentManager';
import Analytics from '../components/admin/Analytics';
import AdminLayout from '../components/admin/AdminLayout';
import { CollectionManager } from '../components/admin/Collections';

const AdminPage: React.FC = () => {
    return (
    <>
      <SignedIn>
    <div className="min-h-screen bg-gray-50">
      <Dashboard />
          <AdminLayout>
            {(active) => (
              <>
                {active === 'dashboard' && <Analytics />}
                {active === 'services' && (
                  <CollectionManager title="Services" keyName="services" fields={["name","description","price"]} />
                )}
                {active === 'events' && (
                  <CollectionManager title="Events" keyName="events" fields={["title","description","location","start","end","image"]} />
                )}
                {active === 'posts' && (
                  <CollectionManager title="Blog Posts" keyName="posts" fields={["title","image","content"]} />
                )}
                {active === 'comments' && (
                  <CollectionManager title="Comments" keyName="comments" fields={["postId","name","message"]} />
                )}
                {active === 'contact' && (
                  <CollectionManager title="Contact Submissions" keyName="contact_submissions" disableCreate fields={["name","email","phone","subject","message"]} />
                )}
                {active === 'consultation' && (
                  <CollectionManager title="Consultation Requests" keyName="consultation_requests" disableCreate fields={["full_name","email","phone","company","country_slug","service_id","message"]} />
                )}
                {active === 'insights' && <ContentManager />}
              </>
            )}
          </AdminLayout>
    </div>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn redirectUrl="/admin" />
      </SignedOut>
    </>
  );
};

export default AdminPage;


