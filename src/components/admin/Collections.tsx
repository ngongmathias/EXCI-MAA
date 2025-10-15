import React, { useEffect, useMemo, useState } from 'react';
import { fetchAll, insertItem, updateItemById, deleteById } from '../../services/supabaseCrud';

type CollectionKey = 'services' | 'events' | 'posts' | 'comments' | 'contact_submissions' | 'consultation_requests';

interface CollectionManagerProps {
  title: string;
  fields: string[];
  keyName: CollectionKey;
  disableCreate?: boolean;
}

export const CollectionManager: React.FC<CollectionManagerProps> = ({ title, fields, keyName, disableCreate }) => {
  const [items, setItems] = useState<any[]>([]);
  const [form, setForm] = useState<Record<string, string>>({});
  const [editing, setEditing] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function refresh() {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchAll<any>(keyName);
      setItems(data);
    } catch (e: any) {
      setError(e.message || 'Failed to load');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { refresh(); }, [keyName]);

  async function submit() {
    const payload = fields.reduce<Record<string, string>>((acc: Record<string, string>, f: string) => ({ ...acc, [f]: form[f] || '' }), {});
    if (keyName === 'events') {
      // normalize dates
      if (payload.start) payload.start = new Date(payload.start).toISOString();
      if (payload.end) payload.end = new Date(payload.end).toISOString();
    }
    try {
      if (editing) {
        await updateItemById<any>(keyName, editing, payload);
      } else if (!disableCreate) {
        await insertItem<any>(keyName, payload as any);
      }
      setForm({});
      setEditing(null);
      await refresh();
    } catch (e: any) {
      setError(e.message || 'Operation failed');
    }
  }

  function startEdit(id: string) {
    setEditing(id);
    const item = items.find(i => i.id === id);
    const pre: Record<string, string> = {};
    fields.forEach((f: string) => (pre[f] = (item as any)?.[f] || ''));
    setForm(pre);
  }

  async function remove(id: string) {
    try {
      await deleteById(keyName, id);
      await refresh();
    } catch (e: any) {
      setError(e.message || 'Delete failed');
    }
  }

  const pretty = useMemo(() => items.map((i: any) => ({ ...i })), [items]);

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
      {error && <div className="mt-2 rounded-md bg-red-50 text-red-700 px-3 py-2 text-sm">{error}</div>}
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {fields.map((f: string) => (
          <input key={f} placeholder={f} value={form[f] || ''} onChange={e => setForm((s: Record<string, string>) => ({ ...s, [f]: e.target.value }))} className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        ))}
      </div>
      <div className="mt-3 flex items-center gap-2">
        <button disabled={loading} onClick={submit} className={`px-3 py-1.5 text-sm rounded-md text-white ${loading ? 'bg-blue-300' : 'bg-blue-600 hover:bg-blue-700'}`}>{editing ? 'Update' : 'Create'}</button>
        {editing && (
          <button onClick={() => { setEditing(null); setForm({}); }} className="px-3 py-1.5 text-sm rounded-md bg-white border border-gray-200 text-gray-700 hover:bg-gray-50">Cancel</button>
        )}
      </div>
      {loading ? (
        <div className="mt-4 text-sm text-gray-600">Loading...</div>
      ) : (
        <ul className="mt-4 divide-y divide-gray-200">
          {pretty.map((item) => (
            <li key={item.id} className="py-3 flex items-start justify-between gap-4">
              <div className="text-sm text-gray-700 break-words">{JSON.stringify(item)}</div>
              <div className="shrink-0 flex items-center gap-2">
                <button onClick={() => startEdit(item.id)} className="px-2 py-1 text-sm rounded-md bg-white border border-gray-200 text-gray-700 hover:bg-gray-50">Edit</button>
                <button onClick={() => remove(item.id)} className="px-2 py-1 text-sm rounded-md bg-red-600 text-white hover:bg-red-700">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};



