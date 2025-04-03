
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL; // Replace with your actual URL
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY; // Replace with your actual anon key

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
