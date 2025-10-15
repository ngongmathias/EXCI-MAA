import React from 'react';

type SidebarProps = {
  active: string;
  onSelect: (key: string) => void;
};

const Sidebar: React.FC<SidebarProps> = ({ active, onSelect }) => {
  const items = [
    { key: 'dashboard', label: 'Dashboard' },
    { key: 'services', label: 'Services' },
    { key: 'events', label: 'Events' },
    { key: 'posts', label: 'Blog Posts' },
    { key: 'comments', label: 'Comments' },
    { key: 'contact', label: 'Contact Submissions' },
    { key: 'consultation', label: 'Consultation Requests' },
    { key: 'insights', label: 'Insights' },
  ];

  return (
    <aside className="w-full md:w-64 shrink-0">
      <div className="sticky top-20 space-y-2">
        {items.map((it) => (
          <button
            key={it.key}
            onClick={() => onSelect(it.key)}
            className={`w-full text-left px-3 py-2 rounded-md border ${
              active === it.key
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
            }`}
          >
            {it.label}
          </button>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;


