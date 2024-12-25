import { createClient } from '@firebase/firebase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const firebase = createClient(supabaseUrl, supabaseKey);