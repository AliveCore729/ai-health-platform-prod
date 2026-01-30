from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.services.gemini_service import ask_gemini

router = APIRouter(prefix="/api", tags=["AI Chat"])

class ChatRequest(BaseModel):
    message: str

@router.post("/chat")
def chat(req: ChatRequest):
    if not req.message.strip():
        raise HTTPException(status_code=400, detail="Empty message")

    reply = ask_gemini(req.message)
    return {"reply": reply}
