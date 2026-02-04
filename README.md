# IntakeOps AI

[![IntakeOps Banner](https://via.placeholder.com/1000x300/1e1b4b/ffffff?text=IntakeOps+AI+-+From+Calls+to+Closures)](https://claude.ai/public/artifacts/39b920e4-99fd-4cb2-b20e-550dd31b0e17)

**IntakeOps AI** is a sophisticated voice-first automation platform that replaces traditional answering services with high-conversion intake workflows. Unlike standard bots, IntakeOps is built to qualify leads, sync to CRMs, and recover lost revenue—all in real-time.

---

## The Vision
Businesses don't need "minutes answered"; they need **qualified leads** and **booked jobs**. IntakeOps AI targets high-intent industries where speed-to-lead is the primary revenue driver.

* **Primary Verticals:** Home Services, Legal Intake, Med Spas, and Multi-location SMBs.
* **Key Differentiator:** Closed-loop automation that ensures no caller falls through the cracks.

---

## Tech Stack
- **Voice Interface:** [Vapi.ai](https://vapi.ai)
- **Intelligence:** [OpenAI GPT-4o](https://openai.com)
- **Connectivity Layer:** [n8n](https://n8n.io) (Self-hosted/Cloud)
- **Data Engine:** Structured JSON Outputs via Pydantic logic.

---

## Repository Structure

```text
/IntakeOps-AI
│
├── /assets                 # Branding and UI/UX
│   ├── landing-page.png    # The Claude-generated landing page screenshot
│   └── logo-mark.svg
│
├── /prompts                # Vertical-specific "Intake Blueprints"
│   ├── plumbing-intake.txt
│   ├── legal-intake.txt
│   ├── property-mgmt.txt
│   └── med-spa.txt
│
├── /vapi-config            # Voice Agent & Tooling Definitions
│   ├── assistant-base.json # Global settings (voice, model, latency)
│   └── /tools              # Shared function calling schemas
│       ├── check-availability.json
│       └── calendar-booking.json
│
├── /workflows              # n8n Workflow Exports (The "Nerves")
│   ├── post-call-sync.json # Universal CRM loop
│   ├── lead-recovery.json  # SMS sequence for dropped calls
│   └── triage-routing.json # Logic for multi-department routing
│
├── .env.example            # API Key templates
├── docker-compose.yml      # (Optional) For self-hosting n8n
└── README.md               # The "Master Blueprint" for the project
