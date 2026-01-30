from pydantic import BaseModel
from typing import List, Optional

class AnalyzeResponse(BaseModel):
    prediction: str
    confidence: float
    severity: str
    triage_level: str
    explanation: dict
    recommendations: List[str]
