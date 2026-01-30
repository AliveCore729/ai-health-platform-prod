from PIL import Image
import io

def validate_image(image_bytes: bytes) -> bool:
    try:
        Image.open(io.BytesIO(image_bytes))
        return True
    except Exception:
        return False
