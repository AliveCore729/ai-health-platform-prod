import tensorflow as tf
import torch
import numpy as np
import cv2
import base64

from PIL import Image
from io import BytesIO
from torchvision import transforms
from tensorflow.keras.applications.vgg19 import preprocess_input

from app.models.brain_tumor_model import TumorClassifier

# =================================================
# DEVICE
# =================================================
DEVICE = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# =================================================
# LOAD MODELS (ONCE AT STARTUP)
# =================================================

# ---------- Brain Stroke (VGG19) ----------
try:
    brain_stroke_model = tf.keras.models.load_model(
        "models/Brain_Stroke.h5", compile=False
    )
    brain_stroke_model.trainable = False
    print("✅ Brain Stroke model loaded")
except Exception as e:
    brain_stroke_model = None
    print("❌ Brain Stroke model failed:", e)

# ---------- Alzheimer ----------
try:
    alzheimer_model = tf.keras.models.load_model(
        "models/alzheimer.h5", compile=False
    )
    alzheimer_model.trainable = False
    print("✅ Alzheimer model loaded")
except Exception as e:
    alzheimer_model = None
    print("❌ Alzheimer model failed:", e)

# ---------- Brain Tumor (PyTorch) ----------
try:
    brain_tumor_model = TumorClassifier(num_classes=4)
    brain_tumor_model.load_state_dict(
        torch.load("models/Brain_Tumer.pth", map_location=DEVICE)
    )
    brain_tumor_model.to(DEVICE)
    brain_tumor_model.eval()
    print("✅ Brain Tumor model loaded")
except Exception as e:
    brain_tumor_model = None
    print("❌ Brain Tumor model failed:", e)


# =================================================
# IMAGE VALIDATION (ROBUST)
# =================================================
def medical_image_likelihood(img_array):
    img = img_array[0]
    gray = cv2.cvtColor((img * 255).astype(np.uint8), cv2.COLOR_RGB2GRAY)

    contrast = gray.std()
    edges = cv2.Canny(gray, 30, 120)

    score = 0.5 * (contrast / 50) + 0.5 * np.mean(edges > 0)
    return score

# =================================================
# PREPROCESSING
# =================================================

# ---- Brain Stroke (VGG19) ----
def preprocess_stroke_image(image_bytes):
    img = Image.open(BytesIO(image_bytes)).convert("RGB")
    img = img.resize((224, 224))
    arr = np.array(img)
    arr = np.expand_dims(arr, axis=0)
    arr = preprocess_input(arr)
    return img, arr

# ---- Alzheimer (MRI – grayscale safe) ----
def preprocess_alzheimer_image(image_bytes):
    img = Image.open(BytesIO(image_bytes)).convert("L")
    img = img.resize((224, 224))
    arr = np.array(img) / 255.0
    arr = np.expand_dims(arr, axis=-1)
    arr = np.expand_dims(arr, axis=0)

    if alzheimer_model.input_shape[-1] == 3:
        arr = np.repeat(arr, 3, axis=-1)

    return img.convert("RGB"), arr

# ---- Brain Tumor (PyTorch) ----
tumor_transform = transforms.Compose([
    transforms.Resize((224,224)),
    transforms.ToTensor(),
    transforms.Normalize([0.5]*3, [0.5]*3)
])

# =================================================
# GRAD-CAM (TENSORFLOW)
# =================================================
def generate_gradcam_tf(model, img_array, original_img, target_layer_name):
    target_layer = model.get_layer(target_layer_name)

    grad_model = tf.keras.models.Model(
        inputs=model.inputs,
        outputs=[target_layer.output, model.output]
    )

    with tf.GradientTape() as tape:
        conv_out, preds = grad_model(img_array)

        # ✅ Binary medical stability
        class_idx = 0
        loss = preds[:, class_idx]

    grads = tape.gradient(loss, conv_out)
    pooled_grads = tf.reduce_mean(grads, axis=(0, 1, 2))

    conv_out = conv_out[0]
    heatmap = conv_out @ pooled_grads[..., tf.newaxis]
    heatmap = tf.squeeze(heatmap)

    heatmap = tf.maximum(heatmap, 0)
    heatmap /= tf.reduce_max(heatmap) + 1e-8
    heatmap = heatmap.numpy()

    heatmap = cv2.resize(heatmap, original_img.size)
    heatmap = np.uint8(255 * heatmap)
    heatmap = cv2.applyColorMap(heatmap, cv2.COLORMAP_JET)

    # ✅ Softer medical overlay
    overlay = cv2.addWeighted(
        np.array(original_img), 0.75,
        heatmap, 0.25,
        0
    )

    _, buffer = cv2.imencode(".png", overlay)
    return base64.b64encode(buffer).decode("utf-8")

# =================================================
# SEVERITY + SAFETY HELPERS
# =================================================
def severity_from_confidence(conf):
    if conf >= 0.9:
        return "HIGH"
    if conf >= 0.7:
        return "MEDIUM"
    return "LOW"

def inconclusive_response():
    return {
        "prediction": "Inconclusive",
        "confidence": 0.0,
        "severity": "UNAVAILABLE",
        "explanation": {
            "summary": "Confidence too low for reliable medical interpretation"
        },
        "recommendations": ["Upload a clearer scan"]
    }

def invalid_input_response(expected):
    return {
        "prediction": "Invalid Input",
        "confidence": 0.0,
        "severity": "UNAVAILABLE",
        "explanation": {
            "summary": f"Uploaded image does not appear to be a valid {expected}"
        },
        "recommendations": [f"Upload a proper {expected} image"]
    }

def result_payload(label, conf, heatmap, summary, recs):
    conf = float(np.clip(conf, 0.0, 1.0))
    return {
        "prediction": label,
        "confidence": conf,
        "severity": severity_from_confidence(conf),
        "explanation": {
            "summary": summary,
            "heatmap_base64": heatmap
        },
        "recommendations": recs
    }

# =================================================
# MAIN MODEL ROUTER
# =================================================
def run_model(disease_type: str, image_bytes: bytes):

    # ============================
    # BRAIN STROKE
    # ============================
    if disease_type == "brain_stroke":
        if brain_stroke_model is None:
            raise RuntimeError("Brain Stroke model unavailable")

        original, arr = preprocess_stroke_image(image_bytes)

        if medical_image_likelihood(np.clip(arr / 255.0, 0, 1)) < 0.1:
            return invalid_input_response("brain MRI")

        preds = brain_stroke_model.predict(arr)
        conf = float(np.max(preds))

        if conf < 0.1:
            return inconclusive_response()

        try:
            heatmap = generate_gradcam_tf(
            brain_stroke_model,
            arr,
            original,
            target_layer_name="block4_conv4"
            )
        except Exception as e:
            print("❌ Grad-CAM failed (stroke):", e)
            heatmap = None


        return result_payload(
            "Brain Stroke", conf, heatmap,
            "Stroke-related abnormalities detected",
            ["Immediate neurologist consultation", "Urgent MRI/CT"]
        )

    # ============================
    # BRAIN TUMOR
    # ============================
    if disease_type == "brain_tumor":
        if brain_tumor_model is None:
            raise RuntimeError("Brain Tumor model unavailable")

        try:
            img = Image.open(BytesIO(image_bytes)).convert("RGB")
            tensor = tumor_transform(img).unsqueeze(0).to(DEVICE)

            with torch.no_grad():
                out = brain_tumor_model(tensor)
                probs = torch.softmax(out, dim=1)
                conf, idx = torch.max(probs, dim=1)

            classes = [
                "Glioma Tumor",
                "Meningioma Tumor",
                "Pituitary Tumor",
                "No Tumor"
            ]

            # 🔍 DEBUG LOG (TEMPORARY)
            print("🧠 Tumor output:", out)
            print("🧠 Tumor probs:", probs)
            print("🧠 Tumor class:", classes[idx.item()])
            print("🧠 Tumor confidence:", conf.item())

            if conf.item() < 0.1:
                return inconclusive_response()

            return result_payload(
                classes[idx.item()],
                float(conf.item()),
                None,
                "Tumor classification using custom CNN",
                ["Consult neurologist", "Contrast MRI"]
            )

        except Exception as e:
            print("❌ Brain Tumor inference failed:", e)
            return inconclusive_response()



    # ============================
    # ALZHEIMER
    # ============================
    if disease_type == "alzheimer":
        if alzheimer_model is None:
            raise RuntimeError("Alzheimer model unavailable")

        original, arr = preprocess_alzheimer_image(image_bytes)
        preds = alzheimer_model.predict(arr)

        if preds.shape[-1] == 1:
            conf = float(preds[0][0])
            label = "Alzheimer’s Detected" if conf >= 0.5 else "Normal"
        else:
            conf = float(np.max(preds))
            label = "Alzheimer’s Detected" if np.argmax(preds) == 1 else "Normal"

        if conf < 0.55:
            return inconclusive_response()

        try:
            heatmap = generate_gradcam_tf(
            alzheimer_model,
            arr,
            original,
            target_layer_name=alzheimer_model.layers[-5].name
            )
        except Exception as e:
            print("❌ Grad-CAM failed (alzheimer):", e)
            heatmap = None


        return result_payload(
            label, conf, heatmap,
            "Neurodegenerative patterns detected",
            ["Neurologist consultation", "Cognitive assessment"]
        )

    # ============================
    # FALLBACK
    # ============================
    return {
        "prediction": "Under Deployment",
        "confidence": 0.0,
        "severity": "UNAVAILABLE",
        "explanation": {"summary": "Model not active"},
        "recommendations": []
    }
