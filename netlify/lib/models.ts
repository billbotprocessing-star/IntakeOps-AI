// Request bodies accepted by the webhook functions. These mirror the Pydantic
// models of the original FastAPI backend so the n8n workflows keep working
// unchanged. Unknown fields are ignored, as Pydantic did.
import { z } from "zod";

export const UrgencyLevel = z.enum(["emergency", "high", "standard", "unqualified"]);
export const Industry = z.enum(["plumbing", "legal", "med-spa", "property-management", "general"]);

export const LeadCreate = z.object({
  call_id: z.string(),
  caller_phone: z.string(),
  caller_name: z.string().default("Unknown"),
  issue_description: z.string().default(""),
  urgency_level: UrgencyLevel.default("standard"),
  service_address: z.string().default(""),
  industry: Industry.default("general"),
  call_duration_seconds: z.coerce.number().int().default(0),
  transcript: z.string().default(""),
  recording_url: z.string().default(""),
  ended_reason: z.string().default(""),
  timestamp: z.string(),
  // Sent by the triage workflow's "Log Unqualified" branch.
  status: z.string().optional(),
});
export type LeadCreate = z.infer<typeof LeadCreate>;

export const MissedCall = z.object({
  call_id: z.string(),
  caller_phone: z.string(),
  missed_at: z.string(),
  recovery_sms_sent: z.boolean().default(false),
});
export type MissedCall = z.infer<typeof MissedCall>;

export const TicketCreate = z.object({
  call_id: z.string(),
  caller_phone: z.string(),
  caller_name: z.string().default("Unknown"),
  issue_description: z.string().default(""),
  urgency_level: UrgencyLevel.default("standard"),
  service_address: z.string().default(""),
  industry: Industry.default("general"),
  priority: z.string().default("NORMAL"),
  status: z.string().default("queued"),
  timestamp: z.string().nullish(),
});
export type TicketCreate = z.infer<typeof TicketCreate>;

export const EscalationRequest = z.object({
  caller_name: z.string(),
  caller_phone: z.string(),
  service_address: z.string().default(""),
  issue_description: z.string(),
  industry: Industry.default("general"),
});
export type EscalationRequest = z.infer<typeof EscalationRequest>;

export const DemoRequest = z.object({
  phoneNumber: z.string().trim().min(7).max(32).regex(/^[+\d\s().-]+$/, "Invalid phone number"),
  industry: z.enum(["home-services", "legal", "med-spa", "property", "multi-location", "other"]),
  source: z.string().max(64).default("Landing Page"),
});
export type DemoRequest = z.infer<typeof DemoRequest>;

/** A timestamp from n8n, or now if it is missing or unparseable. */
export function toIso(value: string | null | undefined): string {
  const date = value ? new Date(value) : new Date();
  return Number.isNaN(date.getTime()) ? new Date().toISOString() : date.toISOString();
}
