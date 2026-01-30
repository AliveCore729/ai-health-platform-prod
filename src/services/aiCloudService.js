// src/services/aiCloudService.js

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

const fileToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

export const analyzeMedicalImage = async (file, diseaseId) => {
  const startTime = Date.now();

  // Convert once for stable preview & heatmap
  const base64Image = await fileToBase64(file);

  const formData = new FormData();
  formData.append("image", file);

  // 🔥 IMPORTANT: pass disease directly
  formData.append("disease_type", diseaseId);

  const response = await fetch(`${API_BASE_URL}/api/analyze`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err?.detail || "AI analysis failed");
  }

  const backendData = await response.json();

  // keep animation feel
  const elapsed = Date.now() - startTime;
  if (elapsed < 1500) {
    await new Promise((r) => setTimeout(r, 1500 - elapsed));
  }

  return {
    success: true,
    data: {
      condition: backendData.prediction,
      probability: backendData.confidence,
      severity: backendData.severity.toLowerCase(),
      description: backendData.explanation?.summary || "",
      recommendations: backendData.recommendations || [],

      // ✅ ORIGINAL IMAGE (LEFT SIDE)
      original_image_url: base64Image,

      // ✅ REAL GRAD-CAM (RIGHT SIDE)
      heatmap_url: backendData.explanation?.heatmap_base64
        ? `data:image/png;base64,${backendData.explanation.heatmap_base64}`
        : base64Image
    }
  };
};
