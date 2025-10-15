import { supabase } from '../lib/supabaseClient';

export type TableName = 'services' | 'events' | 'posts' | 'comments' | 'likes' | 'event_attendees' | 'contact_submissions' | 'consultation_requests';

export async function fetchAll<T>(table: TableName): Promise<T[]> {
  const { data, error } = await supabase.from(table).select('*').order('created_at', { ascending: false });
  if (error) throw error;
  return (data as T[]) || [];
}

export async function insertItem<T>(table: TableName, payload: Partial<T>): Promise<T> {
  const { data, error } = await supabase.from(table).insert(payload).select('*').single();
  if (error) throw error;
  return data as T;
}

export async function updateItemById<T>(table: TableName, id: string, patch: Partial<T>): Promise<T> {
  const { data, error } = await supabase.from(table).update(patch).eq('id', id).select('*').single();
  if (error) throw error;
  return data as T;
}

export async function deleteById(table: TableName, id: string): Promise<void> {
  const { error } = await supabase.from(table).delete().eq('id', id);
  if (error) throw error;
}


