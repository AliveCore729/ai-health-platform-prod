// src/pages/Scan.jsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Camera, Image as ImageIcon, ArrowLeft, AlertCircle } from 'lucide-react';
import { useAIAnalysis } from '../hooks/useAIAnalysis';
import CloudLoader from '../components/ui/CloudLoader';
import { cn } from '../utils/cn';

const diseaseLabels = {
  brain_stroke: "Brain Stroke",
  brain_tumor: "Brain Tumor",
  alzheimer: "Alzheimer’s",
  lung_cancer: "Lung Cancer",
  pneumonia: "Pneumonia",
  skin_cancer: "Skin Cancer",
  fracture: "Bone Fracture",
};

const Scan = () => {
  const { category } = useParams(); // Now this is a disease ID
  const navigate = useNavigate();
  const { status, startAnalysis, error } = useAIAnalysis();
  const [preview, setPreview] = useState(null);

  const diseaseName = diseaseLabels[category] || "Medical";

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // 1. Show Preview
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    // 2. Start Analysis
    const resultData = await startAnalysis(file, category);

    // 3. Navigate on Success
    if (resultData) {
      navigate('/report', {
        state: { result: resultData }
      });
    }
  };

  // Loading State
  if (status === 'analyzing') {
    return (
      <div className="fixed inset-0 bg-slate-50/90 backdrop-blur-sm z-50 flex items-center justify-center">
        <CloudLoader />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full pt-2">
      {/* Header */}
      <div className="px-2 mb-6 flex items-center gap-2">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-slate-100 rounded-full transition"
        >
          <ArrowLeft size={24} className="text-slate-700" />
        </button>
        <div>
          <h1 className="text-xl font-bold text-slate-900">
            {diseaseName} Scan
          </h1>
          <p className="text-xs text-slate-500">
            Upload medical imagery for AI analysis
          </p>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mx-4 mb-4 p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-red-700">
          <AlertCircle size={20} />
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      {/* Preview Area */}
      <div className="flex-1 px-4 mb-6">
        <div
          className={cn(
            "h-full rounded-3xl border-2 border-dashed flex flex-col items-center justify-center relative overflow-hidden transition-all",
            preview
              ? "border-medical-500 bg-slate-900"
              : "border-slate-300 bg-slate-100"
          )}
        >
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-contain"
            />
          ) : (
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                <Camera size={32} className="text-slate-400" />
              </div>
              <p className="text-slate-500 font-medium text-sm">
                Tap buttons below to
                <br />
                capture or upload
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-4 px-4 pb-20">
        <label className="bg-medical-600 text-white p-4 rounded-2xl flex flex-col items-center gap-2 shadow-lg shadow-medical-200 active:scale-95 transition cursor-pointer">
          <Camera size={26} />
          <span className="font-bold text-sm">Camera</span>
          <input
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={handleFileSelect}
          />
        </label>

        <label className="bg-white text-slate-700 border border-slate-200 p-4 rounded-2xl flex flex-col items-center gap-2 shadow-sm active:scale-95 transition cursor-pointer">
          <ImageIcon size={26} />
          <span className="font-bold text-sm">Gallery</span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileSelect}
          />
        </label>
      </div>
    </div>
  );
};

export default Scan;
