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
      headers: {
        // Add Clerk token to all requests
        get Authorization() {
          return getToken().then(token => token ? `Bearer ${token}` : '');
        },
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
