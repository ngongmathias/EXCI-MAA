import React, { useState } from 'react';
import Sidebar from './Sidebar';

const AdminLayout: React.FC<{ children: (active: string) => React.ReactNode }> = ({ children }) => {
  const [active, setActive] = useState('dashboard');
  return (
    <section className="py-10 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-6">
          <Sidebar active={active} onSelect={setActive} />
          <main className="flex-1">
            {children(active)}
          </main>
        </div>
      </div>
    </section>
  );
};

export default AdminLayout;


