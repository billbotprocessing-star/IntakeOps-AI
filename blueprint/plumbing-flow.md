# Plumbing Intake Blueprint

## Overview
Handles inbound calls for plumbing businesses. Primary goals: confirm service area, triage urgency, collect structured lead data, and trigger the correct downstream action (emergency escalation or appointment booking).

---

## Data to Capture

| Field | Values |
|---|---|
| `caller_name` | Full name |
| `caller_phone` | Auto-captured by Vapi |
| `service_address` | Full street address + ZIP |
| `issue_description` | One-sentence summary |
| `urgency_level` | `emergency` / `high` / `standard` / `unqualified` |
| `industry` | Always `plumbing` |

---

## Urgency Definitions

| Level | Triggers |
|---|---|
| `emergency` | Active flooding, burst pipe, sewage backup, no water at all, gas smell near pipes |
| `high` | Slow active leak, water heater failure, partial water loss |
| `standard` | Clogged drain, dripping faucet, quote request, inspection |
| `unqualified` | Out of service area, non-plumbing request |

---

## Phase 1: Identification
**Goal:** Capture name and service address before discussing the issue.

- Collect caller's full name first.
- Ask for the full service address and ZIP code.
- Do NOT discuss the problem until the address is confirmed — service area must be verified first.

---

## Phase 2: Service Area Verification
**Tool:** `check_service_availability(zip_code)`

- Call the tool immediately after collecting the ZIP.
- If **out of area**: apologize, offer a referral, set `urgency_level: unqualified`, end the call.
- If **in area**: proceed to Phase 3.

---

## Phase 3: Triage & Urgency
Ask the caller to describe their issue. Categorize using the urgency definitions above.

**Emergency keywords to listen for:**
- "flooding," "water everywhere," "burst pipe," "pipe burst," "sewage backup," "sewage coming up," "no water," "no water at all," "gas smell"

**High keywords:**
- "slow drip," "water heater out," "barely any water," "water leaking slowly"

Anything that does not match emergency or high defaults to `standard`.

---

## Phase 4: Action Logic

### If `emergency`
1. Call `escalateToOnCall(caller_name, caller_phone, service_address, issue_description, industry="plumbing")`
2. Tell the caller: *"I've flagged this as an emergency and our lead technician has been notified. They will call you back within 15 minutes."*
3. Do NOT offer a calendar slot — emergency calls skip scheduling.

### If `high` or `standard`
1. Call `checkCalendar(service_type="plumbing-routine")` to retrieve the next 2 available slots.
2. Offer both slots to the caller and confirm their preference.
3. Close: *"I have you down for [slot]. You will receive an SMS confirmation within 60 seconds."*

### If `unqualified`
1. Politely decline and offer a referral.
2. End the call without collecting further details.

---

## Phase 5: Metadata Output
Before ending the call the AI must emit a structured metadata block so the CRM and n8n workflows receive complete data. See prompt for exact format.

---

## Guardrails
- Never give specific price quotes. Use: *"Our technician provides a firm estimate on-site starting at $89 for the diagnostic."*
- Never dispatch a technician verbally — only the `escalateToOnCall` tool triggers real dispatch.
- If the caller describes a non-plumbing issue, decline politely and end the call.
- Keep the call focused. Do not engage in extended troubleshooting or DIY advice.
