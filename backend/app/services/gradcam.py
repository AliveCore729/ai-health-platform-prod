import torch
import cv2
import numpy as np
import base64
from PIL import Image
from io import BytesIO


class GradCAM:
    def __init__(self, model, target_layer):
        self.model = model
        self.target_layer = target_layer
        self.gradients = None
        self.activations = None

        # ✅ Forward hook
        self.target_layer.register_forward_hook(self._save_activation)

        # ✅ Correct backward hook (NOT deprecated)
        self.target_layer.register_full_backward_hook(self._save_gradient)

    def _save_activation(self, module, input, output):
        self.activations = output.detach()

    def _save_gradient(self, module, grad_input, grad_output):
        self.gradients = grad_output[0].detach()

    def generate(self, input_tensor, class_idx: int):
        self.model.zero_grad()

        output = self.model(input_tensor)

        # Force scalar loss for medical stability
        loss = output[:, class_idx]
        loss.backward()

        # Global average pooling on gradients
        weights = self.gradients.mean(dim=(2, 3), keepdim=True)

        cam = (weights * self.activations).sum(dim=1)
        cam = torch.relu(cam)

        # Normalize safely
        cam -= cam.min()
        cam /= cam.max() + 1e-8

        return cam[0].cpu().numpy()


def create_gradcam_image(
    model,
    image_tensor,
    original_pil,
    target_layer_index: int = -2,
    force_class_idx: int | None = None
):
    """
    target_layer_index:
        -2 or -3 works best for medical CNNs
    """

    # 🎯 Select BETTER layer (NOT last conv)
    target_layer = model.features[target_layer_index]

    gradcam = GradCAM(model, target_layer)

    with torch.no_grad():
        preds = model(image_tensor)
        probs = torch.softmax(preds, dim=1)

    # 🔒 Stable class selection
    class_idx = (
        force_class_idx
        if force_class_idx is not None
        else probs.argmax(dim=1).item()
    )

    cam = gradcam.generate(image_tensor, class_idx)

    cam = cv2.resize(cam, original_pil.size)

    heatmap = cv2.applyColorMap(
        np.uint8(255 * cam),
        cv2.COLORMAP_JET
    )

    original = np.array(original_pil)

    # 🎨 Softer medical overlay
    overlay = cv2.addWeighted(
        original, 0.75,
        heatmap, 0.25,
        0
    )

    _, buffer = cv2.imencode(".png", overlay)
    return base64.b64encode(buffer).decode("utf-8")
