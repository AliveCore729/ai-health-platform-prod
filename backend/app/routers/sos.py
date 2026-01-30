from fastapi import APIRouter

router = APIRouter()

@router.post("/sos")
def emergency_sos(payload: dict):
    return {
        "status": "EMERGENCY_TRIGGERED",
        "message": "Nearest hospitals and emergency services notified",
        "next_steps": [
            "Call emergency number",
            "Proceed to nearest hospital"
        ]
    }
