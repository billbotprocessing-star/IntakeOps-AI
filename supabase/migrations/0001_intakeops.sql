-- IntakeOps AI — data store for the webhook functions and the dashboard.
-- Run in the Supabase SQL editor (or `supabase db push`).
--
-- Writes come only from the Netlify functions, which use the service-role key
-- (it bypasses RLS). Signed-in dashboard users can read everything and update
-- the workflow status of leads and tickets. Anonymous visitors get nothing.

create extension if not exists pgcrypto;

-- ── Leads: one row per completed call (POST /api/leads) ─────────────────────
create table if not exists public.leads (
  id                     uuid primary key default gen_random_uuid(),
  call_id                text not null unique,
  caller_phone           text not null,
  caller_name            text not null default 'Unknown',
  issue_description      text not null default '',
  urgency_level          text not null default 'standard'
                         check (urgency_level in ('emergency','high','standard','unqualified')),
  service_address        text not null default '',
  industry               text not null default 'general',
  call_duration_seconds  integer not null default 0,
  transcript             text not null default '',
  recording_url          text not null default '',
  ended_reason           text not null default '',
  status                 text not null default 'new'
                         check (status in ('new','contacted','booked','closed','unqualified')),
  hubspot_contact_id     text,
  hubspot_deal_id        text,
  occurred_at            timestamptz not null default now(),
  created_at             timestamptz not null default now()
);
create index if not exists leads_occurred_at_idx on public.leads (occurred_at desc);

-- ── Tickets: prioritized work items from triage routing (POST /api/tickets) ─
create table if not exists public.tickets (
  id                  uuid primary key default gen_random_uuid(),
  call_id             text not null,
  caller_phone        text not null,
  caller_name         text not null default 'Unknown',
  issue_description   text not null default '',
  urgency_level       text not null default 'standard',
  service_address     text not null default '',
  industry            text not null default 'general',
  priority            text not null default 'NORMAL',
  status              text not null default 'queued',
  hubspot_contact_id  text,
  hubspot_deal_id     text,
  occurred_at         timestamptz not null default now(),
  created_at          timestamptz not null default now()
);
create index if not exists tickets_occurred_at_idx on public.tickets (occurred_at desc);

-- ── Missed calls (POST /api/missed-calls) ───────────────────────────────────
create table if not exists public.missed_calls (
  id                 uuid primary key default gen_random_uuid(),
  call_id            text not null unique,
  caller_phone       text not null,
  missed_at          timestamptz not null,
  recovery_sms_sent  boolean not null default false,
  created_at         timestamptz not null default now()
);
create index if not exists missed_calls_missed_at_idx on public.missed_calls (missed_at desc);

-- ── Escalations (POST /api/escalate) ────────────────────────────────────────
create table if not exists public.escalations (
  id                 uuid primary key default gen_random_uuid(),
  caller_name        text not null,
  caller_phone       text not null,
  service_address    text not null default '',
  issue_description  text not null,
  industry           text not null default 'general',
  sms_sent           boolean not null default false,
  created_at         timestamptz not null default now()
);

-- ── Demo requests from the landing page (POST /api/demo-request) ────────────
create table if not exists public.demo_requests (
  id              uuid primary key default gen_random_uuid(),
  phone_number    text not null,
  industry        text not null,
  source          text not null default 'Landing Page',
  forwarded       boolean not null default false,
  created_at      timestamptz not null default now()
);

-- ── Row level security ──────────────────────────────────────────────────────
alter table public.leads          enable row level security;
alter table public.tickets        enable row level security;
alter table public.missed_calls   enable row level security;
alter table public.escalations    enable row level security;
alter table public.demo_requests  enable row level security;

create policy "dashboard read leads"          on public.leads          for select to authenticated using (true);
create policy "dashboard read tickets"        on public.tickets        for select to authenticated using (true);
create policy "dashboard read missed calls"   on public.missed_calls   for select to authenticated using (true);
create policy "dashboard read escalations"    on public.escalations    for select to authenticated using (true);
create policy "dashboard read demo requests"  on public.demo_requests  for select to authenticated using (true);

-- Dashboard users may move leads/tickets through their workflow, nothing else.
create policy "dashboard update leads"   on public.leads   for update to authenticated using (true) with check (true);
create policy "dashboard update tickets" on public.tickets for update to authenticated using (true) with check (true);
revoke update on public.leads   from authenticated;
revoke update on public.tickets from authenticated;
grant  update (status) on public.leads   to authenticated;
grant  update (status) on public.tickets to authenticated;
