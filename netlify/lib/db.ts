import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { env } from "./http";

let client: SupabaseClient | null | undefined;

/** Service-role Supabase client, or null when the database isn't configured. */
export function db(): SupabaseClient | null {
  if (client !== undefined) return client;
  const url = env("SUPABASE_URL");
  const key = env("SUPABASE_SERVICE_ROLE_KEY");
  client = url && key ? createClient(url, key, { auth: { persistSession: false } }) : null;
  return client;
}

/** Throws on a Supabase error so `attempt` can log it. */
export function check<T extends { error: { message: string } | null }>(result: T): T {
  if (result.error) throw new Error(result.error.message);
  return result;
}
