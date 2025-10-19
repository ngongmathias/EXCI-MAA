import { useEffect, useMemo, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

type TableName =
  | 'services'
  | 'events'
  | 'posts'
  | 'comments'
  | 'likes'
  | 'event_attendees'
  | 'contact_submissions'
  | 'consultation_requests'
  | 'careers';

interface UseSupabaseTableResult<T> {
  rows: T[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

export function useSupabaseTable<T = any>(table: TableName | undefined, enabled: boolean = true): UseSupabaseTableResult<T> {
  const [rows, setRows] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const hasConfig = useMemo(() => {
    return Boolean((import.meta as any).env?.VITE_SUPABASE_URL) && Boolean((import.meta as any).env?.VITE_SUPABASE_ANON_KEY);
  }, []);

  const refresh = async () => {
    if (!enabled || !table) {
      setRows([]);
      setLoading(false);
      setError(null);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const { data, error: err, status, statusText } = await supabase
        .from(table)
        .select('*')
        .order('created_at', { ascending: false });
      if (err) throw new Error(`${status} ${statusText} - ${err.message}`);
      setRows((data as T[]) || []);
    } catch (e: any) {
      setError(e?.message || 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!enabled) {
      setRows([]);
      setLoading(false);
      setError(null);
      return;
    }
    if (!hasConfig) {
      setError('Missing Supabase environment variables');
      setLoading(false);
      return;
    }
    if (!table) {
      setError('Missing table name');
      setLoading(false);
      return;
    }
    refresh();
    const channel = supabase
      .channel(`table-changes-${table}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table },
        () => {
          refresh();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [table, hasConfig, enabled]);

  return { rows, loading, error, refresh };
}


