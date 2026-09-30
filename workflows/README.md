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
| `calendar-sync.json` | `vapi/check-calendar` | Vapi tool `checkCalendar` → finds the next 2 open times on your Google Calendar. |
| `book-strategy-call.json` | `vapi/book-appointment` | Vapi tool `bookStrategyCall` → re-checks the time is free and creates the Google Calendar event. |
| `triage-routing.json` | `intakeops/triage` | Optional: for intake sources other than Vapi (web forms etc.). |

## Setup

For **each** file:

1. In n8n: **Create workflow → ⋯ (top right) → Import from File** and pick the file.
2. Open the **Config** node and replace the values in quotes:
   - `intakeops_api_key` — the same value as `INTAKEOPS_API_KEY` in Netlify.
   - `site_api_url` — already set to `https://intake-ops-ai.netlify.app/api`.
   - `twilio_from_number`, `booking_url`, `on_call_phone`, `service_zip_codes`,
     and the calendar settings (`calendar_id`, `timezone`, business hours) — only in the workflows that have them.
3. If the workflow has **Twilio** nodes (Lead Recovery, Triage Routing), open each one
   and choose your Twilio credential under **Credential to connect with**
   (create it once: Account SID + Auth Token).
   The two calendar workflows have **Google Calendar** nodes: choose a
   **Google Calendar OAuth2 API** credential on each (create it once with **Sign in with Google**).
4. **Save**, then switch the workflow to **Active** (or **Publish**).

## Vapi URLs

Your production webhook URLs are `https://billbotprocessing.app.n8n.cloud/webhook/<path>`:

- Assistant **Server URL** → `…/webhook/vapi/call-ended`, server messages: `end-of-call-report` only
- Tool `escalateToOnCall` → `…/webhook/vapi/escalate`
- Tool `check_service_availability` → `…/webhook/vapi/check-service-area`
- Tool `checkCalendar` → `…/webhook/vapi/check-calendar`
- Tool `bookStrategyCall` → `…/webhook/vapi/book-appointment`

Post-Call Intake reads the caller's details from the assistant's **Analysis** tab:

- **Structured Outputs** (newer Vapi accounts): add one field per row below, named exactly as shown.

  | Name | Type | Allowed values |
  |---|---|---|
  | `caller_name` | string | |
  | `issue_description` | string | |
  | `service_address` | string | |
  | `urgency_level` | string | `emergency`, `high`, `standard`, `unqualified` |
  | `industry` | string | `plumbing`, `legal`, `med-spa`, `property-management`, `general` |

- **Structured Data** (older accounts): paste `vapi-config/structured-data-schema.json`.

## Notes

- Vapi tools can be **Function** or **API Request** tools (method **POST**); the workflows accept both.

- Callers get one text per call: the site sends it when the lead is saved.
  Post-Call Intake has no Twilio nodes on purpose.
- Calendar: open times are your business hours (Config) minus anything busy on the
  calendar. `bookStrategyCall` checks the slot is still free before creating the event.
  If Google can't be reached, Vapi is told to promise a callback instead.
