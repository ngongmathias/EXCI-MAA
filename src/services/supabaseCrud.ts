import { supabase } from '../lib/supabaseClient';

export type TableName = 'services' | 'events' | 'posts' | 'comments' | 'likes' | 'event_attendees' | 'contact_submissions' | 'consultation_requests' | 'careers';

export async function fetchAll<T>(table: TableName): Promise<T[]> {
  const { data, error, status, statusText } = await supabase
    .from(table)
    .select('*')
    .order('created_at', { ascending: false });
  if (error) {
    const details = `${status} ${statusText} - ${error.message}`;
    throw new Error(details);
  }
  return (data as T[]) || [];
}

export async function insertItem<T>(table: TableName, payload: Partial<T>): Promise<T> {
  const { data, error, status, statusText } = await supabase
    .from(table)
    .insert(payload)
    .select('*')
    .single();
  if (error) {
    const details = `${status} ${statusText} - ${error.message}`;
    throw new Error(details);
  }
  return data as T;
}

export async function updateItemById<T>(table: TableName, id: string, patch: Partial<T>): Promise<T> {
  const { data, error, status, statusText } = await supabase
    .from(table)
    .update(patch)
    .eq('id', id)
    .select('*')
    .single();
  if (error) {
    const details = `${status} ${statusText} - ${error.message}`;
    throw new Error(details);
  }
  return data as T;
}

export async function deleteById(table: TableName, id: string): Promise<void> {
  const { error, status, statusText } = await supabase
    .from(table)
    .delete()
    .eq('id', id);
  if (error) {
    const details = `${status} ${statusText} - ${error.message}`;
    throw new Error(details);
  }
}


