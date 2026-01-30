from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from app.services.model_runner import run_model
from app.utils.image import validate_image

router = APIRouter()

@router.post("/analyze")
async def analyze_image(
    disease_type: str = Form(...),
    image: UploadFile = File(...)
):
    image_bytes = await image.read()

    if not validate_image(image_bytes):
        raise HTTPException(
            status_code=400,
            detail="Invalid image file"
        )

    try:
        return run_model(disease_type, image_bytes)
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )
