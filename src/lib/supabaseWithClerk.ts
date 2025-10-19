import { createClient } from '@supabase/supabase-js';
import { useAuth } from '@clerk/clerk-react';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

// Create Supabase client with Clerk integration
export const createSupabaseClient = (getToken: () => Promise<string | null>) => {
  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false, // We'll handle sessions with Clerk
      autoRefreshToken: false,
    },
    global: {
      fetch: async (url, options = {}) => {
        const token = await getToken();
        const headers = new Headers(options.headers);
        if (token) {
          headers.set('Authorization', `Bearer ${token}`);
        }
        return fetch(url, { ...options, headers });
      },
    },
  });
};

// Hook to use Supabase with Clerk authentication
export const useSupabaseWithClerk = () => {
  const { getToken } = useAuth();
  
  const supabase = createSupabaseClient(getToken);
  
  // Override the from method to add auth headers
  const from = (table: string) => {
    return supabase.from(table);
  };
  
  return {
    ...supabase,
    from,
  };
};
