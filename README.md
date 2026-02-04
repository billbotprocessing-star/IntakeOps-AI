# IntakeOps AI

![IntakeOps Banner](https://via.placeholder.com/1000x300/1e1b4b/ffffff?text=IntakeOps+AI+-+From+Calls+to+Closures)

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
├── /prompts                # Industry-specific system prompts (The "Brain")
│   └── plumbing-intake.txt
│
├── /workflows              # n8n JSON exports for CRM & Calendar sync
│   └── post-call-intake.json
│
├── /vapi-config            # Vapi Tool definitions & Function schemas
│   └── check_availability.json
│
├── /assets                 # Brand assets and landing page mockups
│   └── landing-page.png
│
└── .env.example            # Template for API keys
