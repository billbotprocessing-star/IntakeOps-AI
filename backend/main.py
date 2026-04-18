import os
import hmac
import hashlib
from contextlib import asynccontextmanager
from fastapi import FastAPI, Request, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware

from .models import LeadCreate, MissedCall, TicketCreate, EscalationRequest
from .crm import upsert_contact, create_deal, log_missed_call
from .sms import send_confirmation, send_emergency_alert, send_missed_call_recovery

INTAKEOPS_API_KEY = os.getenv("INTAKEOPS_API_KEY", "")
BOOKING_URL = os.getenv("BOOKING_URL", "https://calendly.com/your-link")


@asynccontextmanager
async def lifespan(app: FastAPI):
    yield


app = FastAPI(title="IntakeOps CRM Webhook", version="1.0.0", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["POST", "GET"],
    allow_headers=["*"],
)


def verify_api_key(request: Request):
    key = request.headers.get("X-API-Key", "")
    if INTAKEOPS_API_KEY and not hmac.compare_digest(key, INTAKEOPS_API_KEY):
        raise HTTPException(status_code=401, detail="Invalid API key")


@app.get("/health")
async def health():
    return {"status": "ok"}


@app.post("/leads", dependencies=[Depends(verify_api_key)])
async def create_lead(lead: LeadCreate):
    """Receives post-call data from n8n, creates CRM contact + deal, sends SMS."""
    lead_dict = lead.model_dump()

    contact_id = await upsert_contact(lead.caller_phone, lead.caller_name, lead.industry)
    deal_id = await create_deal(contact_id, lead_dict)

    if lead.urgency_level == "emergency":
        send_emergency_alert(lead_dict)
    else:
        send_confirmation(lead.caller_phone, lead.caller_name)

    return {
        "status": "created",
        "contact_id": contact_id,
        "deal_id": deal_id,
        "urgency": lead.urgency_level,
    }


@app.post("/missed-calls", dependencies=[Depends(verify_api_key)])
async def handle_missed_call(missed: MissedCall):
    """Logs missed call in CRM. SMS recovery is handled by n8n lead-recovery workflow."""
    await log_missed_call(missed.caller_phone, missed.missed_at, missed.call_id)
    return {"status": "logged"}


@app.post("/tickets", dependencies=[Depends(verify_api_key)])
async def create_ticket(ticket: TicketCreate):
    """Creates a prioritized CRM ticket from triage-routing workflow."""
    ticket_dict = ticket.model_dump()

    contact_id = await upsert_contact(ticket.caller_phone, ticket.caller_name, ticket.industry)
    deal_id = await create_deal(contact_id, ticket_dict)

    return {
        "status": "created",
        "contact_id": contact_id,
        "deal_id": deal_id,
        "priority": ticket.priority,
    }


@app.post("/escalate", dependencies=[Depends(verify_api_key)])
async def escalate(req: EscalationRequest):
    """Direct escalation endpoint — called by Vapi's escalateToOnCall tool via n8n."""
    send_emergency_alert(req.model_dump())
    return {"status": "escalated", "message": "On-call team notified via SMS"}
