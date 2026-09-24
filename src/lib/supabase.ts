import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

/** Browser client (anon key + the signed-in user's session). Null until configured. */
export const supabase = url && anonKey ? createClient(url, anonKey) : null;
