import React from 'react';
import { Clock, ChevronRight, FileText, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const History = () => {
  const navigate = useNavigate();

  // 1. Mock Data representing past AI scans
  const records = [
    { 
        id: 101, 
        date: 'Today, 10:23 AM', 
        type: 'Brain Scan', 
        condition: 'Early-Stage Glioma', 
        severity: 'high',
        probability: 0.89,
        // We use a placeholder image since we don't have the real old files
        image: 'https://placehold.co/400x400/1e293b/FFF?text=Brain+MRI',
        description: 'MRI analysis detects a hyperintense region in the temporal lobe.',
        recommendations: ["Consult Neurologist", "MRI Contrast Scan"],
        color: 'text-red-600 bg-red-50 border-red-100' 
    },
    { 
        id: 102, 
        date: 'Jan 24, 2:15 PM', 
        type: 'Skin Check', 
        condition: 'Benign Keratosis', 
        severity: 'low',
        probability: 0.76,
        image: 'https://placehold.co/400x400/fb923c/FFF?text=Skin+Derma',
        description: 'Dermatoscopic analysis suggests non-cancerous seborrheic keratosis.',
        recommendations: ["Monitor for size changes", "Apply sunscreen"],
        color: 'text-green-600 bg-green-50 border-green-100' 
    },
    { 
        id: 103, 
        date: 'Jan 12, 9:00 AM', 
        type: 'Chest X-Ray', 
        condition: 'Viral Pneumonia', 
        severity: 'medium',
        probability: 0.92,
        image: 'https://placehold.co/400x400/0ea5e9/FFF?text=Chest+XRay',
        description: 'Chest X-ray reveals diffuse interstitial opacities.',
        recommendations: ["Pulmonologist consultation", "Monitor O2 Saturation"],
        color: 'text-orange-600 bg-orange-50 border-orange-100' 
    },
  ];

  // 2. The Logic to Open a Past Report
  const openRecord = (record) => {
    // We navigate to the /report page, passing this record's data
    // exactly how the Scan page does it.
    navigate('/report', { 
        state: { 
            result: {
                condition: record.condition,
                severity: record.severity,
                probability: record.probability,
                description: record.description,
                recommendations: record.recommendations,
                heatmap_url: record.image // Simulating the heatmap
            }, 
            image: record.image 
        } 
    });
  };

  return (
    <div className="flex flex-col h-full pt-4 px-4 pb-24">
      <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-slate-900">Medical Records</h1>
          <div className="p-2 bg-slate-100 rounded-full text-slate-500">
            <Calendar size={20} />
          </div>
      </div>

      <div className="space-y-4">
        {records.map((rec) => (
            <button 
                key={rec.id} 
                onClick={() => openRecord(rec)}
                className="w-full bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between hover:shadow-md transition-all active:scale-[0.98]"
            >
                <div className="flex items-start gap-4 text-left">
                    {/* Icon Box */}
                    <div className="p-3 bg-slate-50 rounded-xl text-slate-400 shrink-0">
                        <FileText size={20} />
                    </div>
                    
                    {/* Text Details */}
                    <div>
                        <h4 className="font-bold text-slate-800 text-sm">{rec.type}</h4>
                        <div className="flex items-center gap-2 mt-1 mb-2">
                            <Clock size={12} className="text-slate-400" />
                            <span className="text-xs text-slate-400 font-medium">{rec.date}</span>
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-1 rounded border ${rec.color}`}>
                            {rec.condition}
                        </span>
                    </div>
                </div>
                
                {/* Arrow */}
                <ChevronRight className="text-slate-300" size={20} />
            </button>
        ))}
      </div>
      
      <p className="text-center text-xs text-slate-400 mt-8 leading-relaxed px-8">
        These records are stored locally for demonstration purposes. In the full version, they sync with the patient database.
      </p>
    </div>
  );
};

export default History;