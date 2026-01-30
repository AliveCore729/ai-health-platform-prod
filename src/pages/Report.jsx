import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MapPin, AlertTriangle, CheckCircle, ArrowRight, Shield, X } from 'lucide-react';
import HeatmapToggle from '../components/ui/HeatmapToggle';
import { cn } from '../utils/cn';

const Report = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { result } = location.state || {};

  const [timeLeft, setTimeLeft] = useState(300);

  useEffect(() => {
    if (!result) navigate('/triage');

    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [result, navigate]);

  if (!result) return null;

  const isUnavailable =
    result.severity === 'UNAVAILABLE' || result.probability === 0;

  const getSeverityColor = (level) => {
    switch (level) {
      case 'high': return 'bg-red-50 text-red-700 border-red-100';
      case 'medium': return 'bg-orange-50 text-orange-700 border-orange-100';
      case 'low': return 'bg-green-50 text-green-700 border-green-100';
      default: return 'bg-slate-100 text-slate-600 border-slate-200';
    }
  };

  const openMaps = () => {
    const query = `${result.condition.split(' ')[0]} specialist near me`;
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`,
      '_blank'
    );
  };

  return (
    <div className="flex flex-col pt-2 pb-24">

      {/* HEADER */}
      <div className="px-4 mb-6">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Analysis Report</h1>
            <p className="text-xs text-slate-500">
              ID: #AI-{Math.floor(Math.random() * 10000)}
            </p>
          </div>

          <div className={cn(
            "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border",
            getSeverityColor(result.severity)
          )}>
            {isUnavailable ? "Unavailable" : `${result.severity} Risk`}
          </div>
        </div>

        {/* Verdict Card */}
        <div className="bg-slate-900 text-white p-5 rounded-2xl shadow-xl mt-4 relative overflow-hidden">
          <div className="relative z-10">
            <span className="text-slate-400 text-xs uppercase">
              Detected Condition
            </span>
            <h2 className="text-2xl font-bold mb-1">
              {result.condition}
            </h2>

            {!isUnavailable ? (
              <div className="flex items-center gap-2 text-medical-300 text-sm font-medium">
                <CheckCircle size={16} />
                <span>{(result.probability * 100).toFixed(1)}% Confidence</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-orange-300 text-sm font-medium">
                <AlertTriangle size={16} />
                <span>Model under deployment</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* VISUAL EXPLANATION */}
      {!isUnavailable && (
        <div className="px-4 mb-8">
          <h3 className="text-sm font-bold text-slate-700 mb-3">
            Visual Explanation
          </h3>

          <HeatmapToggle
            original={result.original_image_url}
            heatmap={result.heatmap_url}
          />

          <p className="text-xs text-slate-500 mt-2">
            <span className="font-bold text-medical-700">AI Note:</span>{" "}
            {result.description}
          </p>
        </div>
      )}

      {/* UNDER DEPLOYMENT MESSAGE */}
      {isUnavailable && (
        <div className="px-4 mb-8">
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 flex gap-3 text-orange-700">
            <AlertTriangle size={20} />
            <p className="text-sm">
              This AI model is currently under deployment.  
              The platform architecture supports it, but the model will be activated in a future update.
            </p>
          </div>
        </div>
      )}

      {/* RECOMMENDATIONS */}
      {!isUnavailable && (
        <div className="px-4 mb-8">
          <h3 className="text-sm font-bold text-slate-700 mb-3">
            Recommended Actions
          </h3>

          <div className="space-y-3">
            {result.recommendations.map((rec, idx) => (
              <div key={idx} className="flex gap-3 bg-white p-4 rounded-xl border shadow-sm">
                <CheckCircle size={14} className="text-medical-600 mt-1" />
                <span className="text-sm">{rec}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MAP BUTTON */}
      {!isUnavailable && (
        <div className="px-4 mb-6">
          <button
            onClick={openMaps}
            className="w-full bg-medical-600 text-white p-4 rounded-2xl font-bold flex justify-between shadow-lg"
          >
            <span>Find Nearby Specialists</span>
            <ArrowRight size={20} />
          </button>
        </div>
      )}

      {/* PRIVACY FOOTER */}
      <div className="px-4">
        <div className="bg-slate-100 rounded-xl p-3 flex gap-3 border">
          <Shield size={18} className="text-slate-400" />
          <div className="flex-1 text-xs text-slate-500">
            Data auto-deletes in{" "}
            {Math.floor(timeLeft / 60)}:
            {(timeLeft % 60).toString().padStart(2, '0')}
          </div>
          <button
            onClick={() => navigate('/')}
            className="p-2 bg-white rounded-full"
          >
            <X size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Report;
