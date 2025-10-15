import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

const ContentManager: React.FC = () => {
  const { t } = useLanguage();
  const [active, setActive] = useState<'services' | 'events' | 'posts' | 'comments'>('services');

  return (
    <section className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <aside className="md:col-span-1">
            <div className="sticky top-20 space-y-2">
              <button onClick={() => setActive('services')} className={`w-full text-left px-3 py-2 rounded-md border ${active==='services'?'bg-blue-600 text-white border-blue-600':'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'}`}>Services</button>
              <button onClick={() => setActive('events')} className={`w-full text-left px-3 py-2 rounded-md border ${active==='events'?'bg-blue-600 text-white border-blue-600':'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'}`}>Events</button>
              <button onClick={() => setActive('posts')} className={`w-full text-left px-3 py-2 rounded-md border ${active==='posts'?'bg-blue-600 text-white border-blue-600':'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'}`}>Blog Posts</button>
              <button onClick={() => setActive('comments')} className={`w-full text-left px-3 py-2 rounded-md border ${active==='comments'?'bg-blue-600 text-white border-blue-600':'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'}`}>Comments</button>
            </div>
          </aside>
          <main className="md:col-span-3">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t('admin.contentTitle')}</h2>
            {active === 'services' && <CrudStub title="Services" fields={["name","description","price"]} storageKey="admin_services" />}
            {active === 'events' && <CrudStub title="Events" fields={["title","description","location","start","end"]} storageKey="admin_events" />}
            {active === 'posts' && <CrudStub title="Blog Posts" fields={["title","image","content"]} storageKey="admin_posts" />}
            {active === 'comments' && <CrudStub title="Comments" fields={["postId","name","message"]} storageKey="admin_comments" />}
          </main>
        </div>
      </div>
    </section>
  );
};

type CrudStubProps = { title: string; fields: string[]; storageKey: string };

const CrudStub: React.FC<CrudStubProps> = ({ title, fields, storageKey }) => {
  const [items, setItems] = useState<any[]>(() => {
    try { const raw = localStorage.getItem(storageKey); return raw ? JSON.parse(raw) : []; } catch { return []; }
  });
  const [form, setForm] = useState<Record<string, string>>({});
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  function persist(next: any[]) {
    setItems(next);
    localStorage.setItem(storageKey, JSON.stringify(next));
  }

  function submit() {
    const payload = fields.reduce((acc, f) => ({ ...acc, [f]: form[f] || '' }), {} as Record<string, string>);
    if (editingIndex !== null) {
      const next = items.slice();
      next[editingIndex] = { ...next[editingIndex], ...payload };
      persist(next);
      setEditingIndex(null);
    } else {
      persist([{ id: crypto.randomUUID(), ...payload }, ...items]);
    }
    setForm({});
  }

  function edit(idx: number) {
    setEditingIndex(idx);
    const item = items[idx];
    const prefill: Record<string, string> = {};
    fields.forEach(f => prefill[f] = item[f] || '');
    setForm(prefill);
  }

  function remove(idx: number) {
    const next = items.filter((_, i) => i !== idx);
    persist(next);
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {fields.map(f => (
          <input key={f} placeholder={f} value={form[f] || ''} onChange={e => setForm(s => ({ ...s, [f]: e.target.value }))} className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        ))}
      </div>
      <div className="mt-3 flex items-center gap-2">
        <button onClick={submit} className="px-3 py-1.5 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700">{editingIndex !== null ? 'Update' : 'Create'}</button>
        {editingIndex !== null && (
          <button onClick={() => { setEditingIndex(null); setForm({}); }} className="px-3 py-1.5 text-sm rounded-md bg-white border border-gray-200 text-gray-700 hover:bg-gray-50">Cancel</button>
        )}
      </div>
      <ul className="mt-4 divide-y divide-gray-200">
        {items.map((item, idx) => (
          <li key={item.id || idx} className="py-3 flex items-start justify-between gap-4">
            <div className="text-sm text-gray-700 break-words">{JSON.stringify(item)}</div>
            <div className="shrink-0 flex items-center gap-2">
              <button onClick={() => edit(idx)} className="px-2 py-1 text-sm rounded-md bg-white border border-gray-200 text-gray-700 hover:bg-gray-50">Edit</button>
              <button onClick={() => remove(idx)} className="px-2 py-1 text-sm rounded-md bg-red-600 text-white hover:bg-red-700">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContentManager;


