# IntakeOps AI

---

## 📌 Overview

IntakeOps AI is a full intake automation engine designed to handle inbound calls, qualify leads, sync with your systems, and drive bookings automatically.

Core outcomes:
- Capture more leads  
- Qualify faster  
- Book more jobs  
- Reduce admin workload  

---

## 🚀 What to expect

The IntakeOps web app (landing page + client dashboard, hosted on Netlify) demonstrates how IntakeOps-AI operates as a **closed-loop intake system**:

### 🗣 AI Voice Receptionist
An AI receptionist trained on your business intake logic:

- Custom qualification questions  
- Objection handling  
- Multi-language capability  
- Business hours & after-hours logic  
- Urgent escalation routing  

---

### 🔄 Closed-Loop CRM Automation

Every interaction becomes usable business data:

- Automatic lead creation  
- Notes and structured intake details  
- Call recordings attached to records  
- Tagging and classification  
- SMS & email follow-up sequences  

---

### 📈 Smart Qualification & Routing

The system determines next steps in real time:

- Qualified leads → booking or scheduling  
- Quote requests → captured and routed  
- Emergencies → live transfer/escalation  
- Low-quality or spam calls → filtered out  

---

### 📊 Conversion Analytics Dashboard

The focus is **business performance**, not just phone metrics:

- Missed-call capture rate  
- Lead qualification rate  
- Booking conversion rate  
- Response time  
- Follow-up performance  

---

## 🏆 Designed For High-Intent Service Industries

IntakeOps-AI supports structured intake models for:

- Home services (HVAC, plumbing, electrical, etc.)  
- Legal screening & consultation intake  
- Med spas and appointment-based clinics  
- Property management & maintenance requests  
- Multi-location service businesses  

---

## 💡 Why IntakeOps-AI

| Traditional Intake | IntakeOps-AI |
|--------------------|--------------|
| Missed calls = lost revenue | 24/7 automated capture |
| Staff dependent | System driven |
| Manual note taking | Structured data instantly |
| Slow follow-up | Immediate automated follow-up |
| No clear metrics | Conversion-focused analytics |

---

## 🎯 How It Works

1. **Intake Blueprint Setup**  
   Your business rules, questions, and qualification criteria are mapped.

2. **AI Training & Logic Configuration**  
   The receptionist is tuned to your industry and workflows.

3. **System Integration**  
   CRM, SMS, email, and scheduling tools are connected.

4. **Live Deployment**  
   Calls are handled automatically.

5. **Optimization Loop**  
   Ongoing tuning based on call outcomes and conversion data.

---

## 🧠 Core Principle

**Speed + Structure + Consistency = More Booked Revenue**

IntakeOps-AI ensures every inbound opportunity is handled the same way — correctly, immediately, and with business intelligence behind every step.

---

## 🔗 Live Web Experience

The web app presents the marketing view and operational concept of the system in action.
Link: _add your Netlify URL here once the site is deployed._

---

## 📞 Contribution / Collaboration

This repository represents the IntakeOps-AI system concept and web showcase.  
For improvements, integrations, or collaboration, open an issue or submit a pull request.


---

## The Vision
Businesses don't need "minutes answered"; they need **qualified leads** and **booked jobs**. IntakeOps AI targets high-intent industries where speed-to-lead is the primary revenue driver.

* **Primary Verticals:** Home Services, Legal Intake, Med Spas, and Multi-location SMBs.
* **Key Differentiator:** Closed-loop automation that ensures no caller falls through the cracks.

---

## Tech Stack
- **Voice Interface:** [Vapi.ai](https://vapi.ai)
- **Intelligence:** [OpenAI GPT-4o](https://openai.com)
- **Connectivity Layer:** [n8n](https://n8n.io) — the workflows in `/workflows`
- **App:** React + Vite, hosted on [Netlify](https://netlify.com)
- **API:** Netlify Functions (TypeScript) under `/api/*`
- **Data & login:** [Supabase](https://supabase.com) (Postgres + Auth)
- **CRM / SMS:** HubSpot, Twilio

---

## The app

| URL | What it is |
|-----|-----------|
| `/` | Marketing site with the "call me now" demo form |
| `/login` | Client sign-in (Supabase Auth, email + password) |
| `/app` | Dashboard: KPIs and daily call volume |
| `/app/leads` | Every handled call, with transcript, recording and a status you can update |
| `/app/tickets` | Prioritized follow-ups from triage routing |
| `/app/missed-calls` | Missed callers and whether they got a recovery text |
| `/app/demo-requests` | Demo calls requested from the landing page |
| `/app/integrations` | Which services are configured, and the webhook URLs for n8n |

## Webhook API

The endpoints the n8n workflows call keep the same paths, JSON bodies and
`X-API-Key` header as the old FastAPI backend. Each call is now also saved to
Supabase so it shows up in the dashboard.

| Method & path | Called by | Does |
|---|---|---|
| `POST /api/leads` | post-call-intake, triage-routing | Stores the lead, creates a HubSpot contact + deal, texts the caller (or pages on-call for emergencies) |
| `POST /api/tickets` | triage-routing | Stores a prioritized ticket, creates a HubSpot contact + deal |
| `POST /api/missed-calls` | lead-recovery | Stores the missed call, adds a HubSpot note |
| `POST /api/escalate` | Vapi `escalateToOnCall` via n8n | Texts `ON_CALL_PHONE`; returns 502 if the text couldn't be sent |
| `POST /api/demo-request` | landing page form | Forwards to the n8n `demo-request` webhook (no API key; input is validated) |
| `GET /api/health` | uptime checks | `{"status":"ok"}` |

---

## Setup

### 1. Supabase
1. Create a project at supabase.com.
2. Run `supabase/migrations/0001_intakeops.sql` in the SQL editor.
3. **Authentication → Providers → Email:** turn off "Allow new users to sign up",
   then add each dashboard user under **Authentication → Users**. Any signed-in
   user can see all data, so only invite people who should.

### 2. Netlify
1. **Add new site → Import from Git**, pick this repo. Build settings come from `netlify.toml`.
2. **Site configuration → Environment variables:** add everything in `.env.example`
   under *INTAKEOPS API*, *SUPABASE*, *TWILIO* and *CRM (HUBSPOT)*.
3. Deploy, then open `/app/integrations` to confirm each service shows **Connected**.

### 3. n8n
Set `CRM_WEBHOOK_URL` to `https://<your-site>.netlify.app/api` and make sure
`INTAKEOPS_API_KEY` matches the Netlify value. No workflow edits are needed.
Once calls show up in the dashboard, the old Railway backend can be shut down.

### 4. GitHub Pages
The repo root is now the app's source, not a static page, so turn off GitHub
Pages (**Settings → Pages**) and point links at the Netlify URL instead.

## Local development

```bash
npm install
npm run dev        # frontend only, http://localhost:5173
npx netlify dev    # frontend + functions, reads env from Netlify or .env
npm test           # function tests (replays the n8n payloads)
npm run build      # typecheck + production build
```

---

## Repository Structure

```text
/IntakeOps-AI
├── index.html, src/        # React app (landing page + dashboard)
├── netlify/functions/      # Webhook API — one file per endpoint
├── netlify/lib/            # Shared: validation, HubSpot, Twilio, Supabase
├── supabase/migrations/    # Database schema + row-level security
├── tests/                  # Function tests
├── workflows/              # n8n workflows
├── vapi-config/            # Vapi assistant + tool schemas
├── prompts/, blueprint/    # Industry intake prompts and playbooks
├── sales-assets/, legal-ops/
├── netlify.toml
└── .env.example
```
