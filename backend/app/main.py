from dotenv import load_dotenv
load_dotenv()
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import analyze, sos, chat


app = FastAPI(
    title="AI Healthcare Backend",
    description="Cloud AI Orchestrator for Medical Image Analysis",
    version="1.0.0"
)

# CORS (frontend integration)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # restrict later
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routes
app.include_router(analyze.router, prefix="/api")
app.include_router(sos.router, prefix="/api")
app.include_router(chat.router)

@app.get("/")
def root():
    return {"status": "AI Healthcare Backend Running"}
