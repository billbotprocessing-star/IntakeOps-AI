# 🛠 Plumbing Intake Logic

## Phase 1: Identification
* **Goal:** Capture Name, Phone, and Address.
* **Instruction:** Always confirm the service address before discussing the issue to ensure they are in the service area.

## Phase 2: Triage & Urgency
The AI must categorize the call immediately:
1. **Emergency:** Active flooding, no water, sewage backup.
2. **Routine:** Clogged sink, leaky faucet, quote request.

## Phase 3: Action Logic
* **If Emergency:** Use `escalateToOnCall` tool to notify the technician via SMS.
* **If Routine:** Use `checkCalendar` tool to offer the next two available slots.

> **AI Script Tip:** "I see you have an active leak. I'm flagging this as an emergency and notifying our lead technician right now."
