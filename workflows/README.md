# n8n workflows

Six workflows connect Vapi (the AI receptionist) to the IntakeOps site. Each
one starts with a **Config** node: that is the only place you type your
settings. They don't use `$env` or `$vars`, so they work on n8n Cloud as-is.

| File | Webhook path | What it does |
|---|---|---|
| `post-call-intake.json` | `vapi/call-ended` | Vapi's end-of-call report → saves the lead (the site texts the caller or pages on-call) and creates a ticket. Short calls with no details go to Lead Recovery instead. |
| `lead-recovery.json` | `vapi/call-missed` | Waits 3 minutes, texts the caller a booking link, logs the missed call. |
| `escalate-to-oncall.json` | `vapi/escalate` | Vapi tool `escalateToOnCall` → pages on-call through the site. |
| `service-area-check.json` | `vapi/check-service-area` | Vapi tool `check_service_availability` → checks the ZIP against your list. |
| `calendar-sync.json` | `vapi/check-calendar` | Vapi tool `checkCalendar` → asks your calendar API for the next 2 slots. |
| `triage-routing.json` | `intakeops/triage` | Optional: for intake sources other than Vapi (web forms etc.). |

## Setup

For **each** file:

1. In n8n: **Create workflow → ⋯ (top right) → Import from File** and pick the file.
2. Open the **Config** node and replace the values in quotes:
   - `intakeops_api_key` — the same value as `INTAKEOPS_API_KEY` in Netlify.
   - `site_api_url` — already set to `https://intake-ops-ai.netlify.app/api`.
   - `twilio_from_number`, `booking_url`, `on_call_phone`, `service_zip_codes`,
     `calendar_api_url`, `calendar_api_key` — only in the workflows that have them.
3. If the workflow has **Twilio** nodes (Lead Recovery, Triage Routing), open each one
   and choose your Twilio credential under **Credential to connect with**
   (create it once: Account SID + Auth Token).
4. **Save**, then switch the workflow to **Active** (or **Publish**).

## Vapi URLs

Your production webhook URLs are `https://billbotprocessing.app.n8n.cloud/webhook/<path>`:

- Assistant **Server URL** → `…/webhook/vapi/call-ended`, server messages: `end-of-call-report` only
- Tool `escalateToOnCall` → `…/webhook/vapi/escalate`
- Tool `check_service_availability` → `…/webhook/vapi/check-service-area`
- Tool `checkCalendar` → `…/webhook/vapi/check-calendar`

In the assistant's **Analysis → Structured Data**, paste the schema from
`vapi-config/structured-data-schema.json`. Post-Call Intake reads the caller's
name, issue, address, urgency and industry from it.

## Notes

- Callers get one text per call: the site sends it when the lead is saved.
  Post-Call Intake has no Twilio nodes on purpose.
- `calendar-sync.json` calls `GET <calendar_api_url>/availability?date=&service=&duration=&limit=2`
  and expects `{ "slots": [{ "start": "<ISO time>" }] }`. Most calendar APIs
  (Acuity, Calendly…) use a different shape, so adjust the **Fetch Available Slots**
  node for yours. If the call fails, Vapi is told to promise a callback.
