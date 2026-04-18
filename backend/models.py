from pydantic import BaseModel
from typing import Optional
from enum import Enum


class UrgencyLevel(str, Enum):
    emergency = "emergency"
    high = "high"
    standard = "standard"
    unqualified = "unqualified"


class Industry(str, Enum):
    plumbing = "plumbing"
    legal = "legal"
    med_spa = "med-spa"
    property_management = "property-management"
    general = "general"


class LeadCreate(BaseModel):
    call_id: str
    caller_phone: str
    caller_name: str = "Unknown"
    issue_description: str = ""
    urgency_level: UrgencyLevel = UrgencyLevel.standard
    service_address: str = ""
    industry: Industry = Industry.general
    call_duration_seconds: int = 0
    transcript: str = ""
    recording_url: str = ""
    ended_reason: str = ""
    timestamp: str


class MissedCall(BaseModel):
    call_id: str
    caller_phone: str
    missed_at: str
    recovery_sms_sent: bool = False


class TicketCreate(BaseModel):
    call_id: str
    caller_phone: str
    caller_name: str = "Unknown"
    issue_description: str = ""
    urgency_level: UrgencyLevel = UrgencyLevel.standard
    service_address: str = ""
    industry: Industry = Industry.general
    priority: str = "NORMAL"
    status: str = "queued"
    timestamp: Optional[str] = None


class EscalationRequest(BaseModel):
    caller_name: str
    caller_phone: str
    service_address: str = ""
    issue_description: str
    industry: Industry = Industry.general
