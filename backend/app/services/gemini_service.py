import os
import google.generativeai as genai

genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

SYSTEM_PROMPT = """
You are a medical information assistant inside a healthcare app.

Rules:
- You do NOT diagnose diseases
- You do NOT prescribe medicines
- You do NOT give emergency decisions
- If a user mentions a medical emergency, advise contacting emergency services
- Be calm, empathetic, and clear
"""

# TRY THIS MODEL NAME:
model = genai.GenerativeModel(
    "gemini-2.5-flash", 
    system_instruction=SYSTEM_PROMPT
)

def ask_gemini(user_message: str) -> str:
    try:
        response = model.generate_content(user_message)
        return response.text.strip()

    except Exception as e:
        print(f"❌ Gemini error: {e}")
        return (
            "I’m having trouble responding right now. "
            "If this is urgent, please seek immediate medical help."
        )

if __name__ == "__main__":
    print(ask_gemini("I have a mild headache."))