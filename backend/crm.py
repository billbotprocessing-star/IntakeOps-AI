import os
import httpx
from typing import Optional

HUBSPOT_API_KEY = os.getenv("HUBSPOT_API_KEY", "")
HUBSPOT_BASE = "https://api.hubapi.com"


async def upsert_contact(phone: str, name: str, industry: str) -> Optional[str]:
    """Create or update a HubSpot contact. Returns the contact ID."""
    if not HUBSPOT_API_KEY:
        return None

    first, *rest = name.strip().split(" ", 1)
    last = rest[0] if rest else ""

    headers = {
        "Authorization": f"Bearer {HUBSPOT_API_KEY}",
        "Content-Type": "application/json",
    }
    payload = {
        "properties": {
            "phone": phone,
            "firstname": first,
            "lastname": last,
            "hs_lead_status": "NEW",
            "industry": industry,
        }
    }

    async with httpx.AsyncClient(timeout=10) as client:
        resp = await client.post(
            f"{HUBSPOT_BASE}/crm/v3/objects/contacts",
            headers=headers,
            json=payload,
        )
        if resp.status_code in (200, 201):
            return resp.json().get("id")

        # 409 = already exists; fetch by phone
        if resp.status_code == 409:
            search = await client.post(
                f"{HUBSPOT_BASE}/crm/v3/objects/contacts/search",
                headers=headers,
                json={
                    "filterGroups": [
                        {"filters": [{"propertyName": "phone", "operator": "EQ", "value": phone}]}
                    ]
                },
            )
            results = search.json().get("results", [])
            if results:
                return results[0]["id"]

    return None


async def create_deal(contact_id: Optional[str], lead: dict) -> Optional[str]:
    """Create a HubSpot deal linked to the contact. Returns deal ID."""
    if not HUBSPOT_API_KEY:
        return None

    urgency = lead.get("urgency_level", "standard")
    priority_map = {"emergency": "HIGH", "high": "HIGH", "standard": "MEDIUM", "unqualified": "LOW"}

    properties = {
        "dealname": f"Intake – {lead.get('caller_name', 'Unknown')} [{urgency.upper()}]",
        "pipeline": "default",
        "dealstage": "appointmentscheduled" if urgency == "emergency" else "qualifiedtobuy",
        "description": lead.get("issue_description", ""),
        "hs_priority": priority_map.get(urgency, "MEDIUM"),
    }

    associations = []
    if contact_id:
        associations.append({
            "to": {"id": contact_id},
            "types": [{"associationCategory": "HUBSPOT_DEFINED", "associationTypeId": 3}],
        })

    payload = {"properties": properties, "associations": associations}

    async with httpx.AsyncClient(timeout=10) as client:
        headers = {
            "Authorization": f"Bearer {HUBSPOT_API_KEY}",
            "Content-Type": "application/json",
        }
        resp = await client.post(
            f"{HUBSPOT_BASE}/crm/v3/objects/deals",
            headers=headers,
            json=payload,
        )
        if resp.status_code in (200, 201):
            return resp.json().get("id")

    return None


async def log_missed_call(phone: str, missed_at: str, call_id: str) -> None:
    """Add a note to an existing HubSpot contact for a missed call."""
    if not HUBSPOT_API_KEY:
        return

    async with httpx.AsyncClient(timeout=10) as client:
        headers = {
            "Authorization": f"Bearer {HUBSPOT_API_KEY}",
            "Content-Type": "application/json",
        }
        await client.post(
            f"{HUBSPOT_BASE}/crm/v3/objects/notes",
            headers=headers,
            json={
                "properties": {
                    "hs_note_body": f"Missed call at {missed_at}. Call ID: {call_id}. Recovery SMS sent.",
                    "hs_timestamp": missed_at,
                }
            },
        )
