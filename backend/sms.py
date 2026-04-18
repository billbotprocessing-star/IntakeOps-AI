import os
from twilio.rest import Client

TWILIO_ACCOUNT_SID = os.getenv("TWILIO_ACCOUNT_SID", "")
TWILIO_AUTH_TOKEN = os.getenv("TWILIO_AUTH_TOKEN", "")
TWILIO_FROM_NUMBER = os.getenv("TWILIO_FROM_NUMBER", "")
ON_CALL_PHONE = os.getenv("ON_CALL_PHONE", "")


def _client() -> Client:
    return Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)


def send_confirmation(to: str, caller_name: str) -> None:
    if not all([TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_FROM_NUMBER, to]):
        return
    _client().messages.create(
        body=(
            f"Hi {caller_name}, your intake has been received. "
            "Our team will follow up within 1 business hour. Reply STOP to opt out."
        ),
        from_=TWILIO_FROM_NUMBER,
        to=to,
    )


def send_emergency_alert(lead: dict) -> None:
    if not all([TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_FROM_NUMBER, ON_CALL_PHONE]):
        return
    _client().messages.create(
        body=(
            f"🚨 EMERGENCY — {lead.get('caller_name', 'Unknown')} "
            f"({lead.get('caller_phone', '')}) at {lead.get('service_address', 'N/A')}. "
            f"Issue: {lead.get('issue_description', '')}. Call back immediately."
        ),
        from_=TWILIO_FROM_NUMBER,
        to=ON_CALL_PHONE,
    )


def send_missed_call_recovery(to: str, booking_url: str) -> None:
    if not all([TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_FROM_NUMBER, to]):
        return
    _client().messages.create(
        body=(
            f"Hi! We just missed your call. We'd love to help — "
            f"book a time at {booking_url} or reply here. Reply STOP to opt out."
        ),
        from_=TWILIO_FROM_NUMBER,
        to=to,
    )
