import React from "react";
import { useNavigate } from "react-router-dom";
import { Brain, AlertTriangle, ArrowLeft } from "lucide-react";

const NeuroDiseases = () => {
  const navigate = useNavigate();

  const diseases = [
    {
      id: "brain_stroke",
      title: "Brain Stroke",
      description: "CT & MRI based stroke detection",
      status: "active",
    },
    {
      id: "brain_tumor",
      title: "Brain Tumor",
      description: "MRI-based tumor detection",
      status: "active",
    },
    {
      id: "alzheimer",
      title: "Alzheimer’s",
      description: "Neurodegenerative screening",
      status: "active",
    },
  ];

  return (
    <div className="flex flex-col gap-6 pt-2 pb-20">
      {/* Header */}
      <div className="px-2 flex items-center gap-2">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-slate-100 rounded-full transition"
        >
          <ArrowLeft size={24} />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Brain & Neuro</h1>
          <p className="text-sm text-slate-500">
            Select a neurological condition
          </p>
        </div>
      </div>

      {/* Disease Cards */}
      <div className="flex flex-col gap-4 px-2">
        {diseases.map((disease) => {
          const isActive = disease.status === "active";

          return (
            <div
              key={disease.id}
              onClick={() => isActive && navigate(`/scan/${disease.id}`)}
              className={`p-4 rounded-2xl border transition ${
                isActive
                  ? "bg-white hover:shadow-md cursor-pointer"
                  : "bg-slate-100 opacity-70 cursor-not-allowed"
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-medical-50 text-medical-600">
                  <Brain />
                </div>

                <div className="flex-1">
                  <h3 className="font-bold text-slate-800">
                    {disease.title}
                  </h3>
                  <p className="text-sm text-slate-500">
                    {disease.description}
                  </p>
                </div>

                {!isActive && (
                  <div className="flex items-center gap-1 text-xs text-orange-600 font-medium">
                    <AlertTriangle size={14} />
                    Under Deployment
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NeuroDiseases;
