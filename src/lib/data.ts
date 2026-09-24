import { useCallback, useEffect, useState } from "react";
import { supabase } from "./supabase";

export type Urgency = "emergency" | "high" | "standard" | "unqualified";
export type LeadStatus = "new" | "contacted" | "booked" | "closed" | "unqualified";

export type Lead = {
  id: string;
  call_id: string;
  caller_phone: string;
  caller_name: string;
  issue_description: string;
  urgency_level: Urgency;
  service_address: string;
  industry: string;
  call_duration_seconds: number;
  transcript: string;
  recording_url: string;
  ended_reason: string;
  status: LeadStatus;
  hubspot_contact_id: string | null;
  hubspot_deal_id: string | null;
  occurred_at: string;
};

export type Ticket = {
  id: string;
  call_id: string;
  caller_phone: string;
  caller_name: string;
  issue_description: string;
  urgency_level: Urgency;
  service_address: string;
  industry: string;
  priority: string;
  status: string;
  occurred_at: string;
};

export type MissedCall = {
  id: string;
  call_id: string;
  caller_phone: string;
  missed_at: string;
  recovery_sms_sent: boolean;
};

export type DemoRequest = {
  id: string;
  phone_number: string;
  industry: string;
  source: string;
  forwarded: boolean;
  created_at: string;
};

type Table = "leads" | "tickets" | "missed_calls" | "demo_requests";

const REFRESH_MS = 30_000;

/**
 * Loads rows from a table, newest first, and refreshes every 30 s while the
 * tab is visible. `since` limits rows to that timestamp column's recent past.
 */
export function useRows<T>(table: Table, orderBy: string, opts: { sinceDays?: number; limit?: number } = {}) {
  const { sinceDays, limit = 500 } = opts;
  const [rows, setRows] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!supabase) return;
    let query = supabase.from(table).select("*").order(orderBy, { ascending: false }).limit(limit);
    if (sinceDays) query = query.gte(orderBy, new Date(Date.now() - sinceDays * 86_400_000).toISOString());
    const { data, error } = await query;
    setError(error ? error.message : null);
    if (data) setRows(data as T[]);
    setLoading(false);
  }, [table, orderBy, sinceDays, limit]);

  useEffect(() => {
    load();
    const timer = setInterval(() => document.visibilityState === "visible" && load(), REFRESH_MS);
    return () => clearInterval(timer);
  }, [load]);

  return { rows, setRows, loading, error, reload: load };
}

export async function updateStatus(table: "leads" | "tickets", id: string, status: string) {
  if (!supabase) return "Not connected";
  const { error } = await supabase.from(table).update({ status }).eq("id", id);
  return error?.message ?? null;
}
