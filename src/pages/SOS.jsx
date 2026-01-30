import React, { useState, useEffect } from 'react';
import { Phone, AlertTriangle, MapPin, ShieldAlert } from 'lucide-react';

const SOS = () => {
  const [active, setActive] = useState(false);
  const [countdown, setCountdown] = useState(5);

  const handleSOS = () => {
    setActive(true);
  };

  const cancelSOS = () => {
    setActive(false);
    setCountdown(5);
  };

  // Countdown Logic
  useEffect(() => {
    let timer;
    if (active && countdown > 0) {
      timer = setTimeout(() => setCountdown(c => c - 1), 1000);
    } else if (active && countdown === 0) {
      // TRIGGER ACTUAL CALL
      window.location.href = "tel:112"; // Universal Emergency Number
      setActive(false);
    }
    return () => clearTimeout(timer);
  }, [active, countdown]);

  return (
    <div className="flex flex-col h-full pt-4 px-4 pb-20">
      
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <ShieldAlert className="text-red-600" size={32} />
        </div>
        <h1 className="text-3xl font-bold text-slate-900">Emergency SOS</h1>
        <p className="text-slate-500 mt-2">Only use this in critical situations.</p>
      </div>

      {/* Main Trigger Button */}
      <div className="flex-1 flex flex-col items-center justify-center">
        {!active ? (
            <button 
                onClick={handleSOS}
                className="w-48 h-48 rounded-full bg-gradient-to-br from-red-500 to-red-700 text-white shadow-2xl shadow-red-300 flex flex-col items-center justify-center gap-2 transform active:scale-95 transition-all border-8 border-red-100"
            >
                <Phone size={48} />
                <span className="font-bold text-xl uppercase tracking-widest">Tap for Help</span>
            </button>
        ) : (
            <div className="flex flex-col items-center">
                <div className="text-6xl font-black text-red-600 mb-4 font-mono">
                    00:0{countdown}
                </div>
                <p className="text-slate-900 font-bold mb-8">Calling Emergency Services...</p>
                <button 
                    onClick={cancelSOS}
                    className="bg-slate-200 text-slate-700 px-8 py-3 rounded-full font-bold shadow-lg"
                >
                    CANCEL CALL
                </button>
            </div>
        )}
      </div>

      {/* Location Status */}
      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-center gap-3">
        <MapPin className="text-blue-500 shrink-0" />
        <div>
            <div className="text-xs font-bold text-slate-500 uppercase">Current Location</div>
            <div className="text-sm font-bold text-slate-800">Lat: 28.7041, Long: 77.1025</div>
            <div className="text-[10px] text-green-600 font-medium">GPS Signal Strong</div>
        </div>
      </div>

    </div>
  );
};

export default SOS;