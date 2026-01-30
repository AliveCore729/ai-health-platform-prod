import React from 'react';
import ReactCompareImage from 'react-compare-image';

const HeatmapToggle = ({ original, heatmap }) => {
  return (
    <div className="w-full aspect-square rounded-3xl overflow-hidden shadow-inner border border-slate-200 relative isolate">
      {/* The Library Component */}
      <ReactCompareImage 
        leftImage={original} 
        rightImage={heatmap} 
        sliderLineColor="#0D9488" // medical-600
        sliderLineWidth={3}
        handleSize={40}
        handle={
            <div className="bg-white text-medical-700 rounded-full p-2 shadow-xl border border-medical-50 transform hover:scale-110 transition">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </div>
        }
      />
      
      {/* Floating Labels */}
      <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full pointer-events-none z-10">
        Original Scan
      </div>
      <div className="absolute top-4 right-4 bg-medical-600/90 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full pointer-events-none z-10">
        AI Analysis
      </div>
    </div>
  );
};

export default HeatmapToggle;