# 🔒 Privacy Policy & Data Handling Standards

**Last Updated:** February 2026

At **IntakeOps AI**, we prioritize the security and confidentiality of the data captured during the intake process. This policy outlines our commitment to protecting both our clients (Business Owners) and their end-users (Callers).

## 1. Data Collection & Purpose
Our AI agents collect only the information necessary to fulfill the "Intake Blueprint" defined by the client. This includes:
* **Voice Recordings:** Processed in real-time to generate transcripts.
* **Transcripts:** Used to extract structured lead data (Name, Phone, Issue).
* **Metadata:** Call duration, timestamp, and caller ID for CRM logging.

## 2. PII Redaction & Security
To protect sensitive information, IntakeOps AI employs "Automatic Scrubbing":
* **Redaction:** Any detected Social Security Numbers, Credit Card details, or sensitive health IDs are automatically redacted from transcripts before they are stored or pushed to a CRM.
* **Encryption:** All data is encrypted at rest using AES-256 and in transit via TLS 1.2+.

## 3. Call Recording Disclosures
IntakeOps AI is configured to comply with "Two-Party Consent" laws. 
* Unless otherwise disabled by the client for specific jurisdictions, the AI will begin every call with: *"This call is recorded for quality and training purposes."*

## 4. Data Retention
* **Transcripts:** Retained for 30 days by default to allow for "Human-in-the-Loop" QA, then purged.
* **Audio:** Audio files can be deleted immediately after transcription at the client's request.
* **CRM Data:** Once pushed to the client's CRM (HubSpot, GHL, etc.), that data falls under the client's own data retention policies.

## 5. Third-Party Sub-Processors
We utilize industry-leading infrastructure to ensure 99.9% uptime:
* **Telephony/Voice:** Vapi.ai / Twilio
* **Transcription:** Deepgram (SOC2 Compliant)
* **Intelligence:** OpenAI (Enterprise API - Data is NOT used for model training)

---
*For privacy inquiries, please contact: privacy@intakeops.ai*
