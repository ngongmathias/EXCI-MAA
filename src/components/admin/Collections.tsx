import React, { useEffect, useMemo, useState } from 'react';
import { fetchAll, insertItem, updateItemById, deleteById } from '../../services/supabaseCrud';
import { exportToExcel, excelFormatters } from '../../utils/excelExport';

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

  // Handle Excel export
  const handleExcelExport = () => {
    if (!items || items.length === 0) {
      setError('No data available to export');
      return;
    }

    // Define columns for export
    const columns = [
      ...fields.map(field => ({
        key: field,
        label: field.charAt(0).toUpperCase() + field.slice(1).replace(/_/g, ' ')
      })),
      {
        key: 'created_at',
        label: 'Created At',
        transform: excelFormatters.dateTime
      },
      {
        key: 'id',
        label: 'ID'
      }
    ];

    try {
      exportToExcel({
        data: items,
        filename: `${title.replace(/\s+/g, '_').toLowerCase()}_export`,
        sheetName: title,
        columns
      });
    } catch (error) {
      console.error('Export failed:', error);
      setError('Failed to export Excel file');
    }
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
        <button
          onClick={handleExcelExport}
          disabled={!items || items.length === 0}
          className="px-3 py-1.5 text-sm rounded-md bg-green-600 text-white hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Export Excel
        </button>
      </div>
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



