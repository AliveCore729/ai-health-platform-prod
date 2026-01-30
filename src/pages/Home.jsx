import React from 'react';
import { Activity, ArrowRight, Clock, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-col gap-6 pt-2">
      {/* 1. Greeting Section */}
      <section className="px-1">
        <h1 className="text-2xl font-bold text-slate-900">Good Morning, Guest</h1>
        <p className="text-slate-500 text-sm">Your health AI companion is ready.</p>
      </section>

      {/* 2. Main Action Card (The "Hero") */}
      <div className="bg-gradient-to-br from-medical-600 to-medical-800 rounded-3xl p-6 text-white shadow-xl shadow-medical-200/50 relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-teal-400/20 rounded-full -ml-10 -mb-10 blur-xl"></div>
        
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-4">
            <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm">
               <Activity className="text-white" size={24} />
            </div>
            <span className="bg-white/20 text-[10px] font-bold px-2 py-1 rounded-full backdrop-blur-sm">
              AI READY
            </span>
          </div>
          
          <h2 className="text-xl font-bold mb-1">New Health Scan</h2>
          <p className="text-medical-100 text-xs mb-6 max-w-[80%]">
            Detect anomalies in X-rays, MRIs, and skin photos using advanced AI models.
          </p>

          <Link to="/triage" className="bg-white text-medical-700 py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-transform">
            Start Assessment <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      {/* 3. Status Overview Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col gap-2">
           <Clock className="text-orange-500" size={20} />
           <span className="text-slate-400 text-xs font-medium">Recent Activity</span>
           <span className="text-slate-800 font-bold text-lg">0 Scans</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col gap-2">
           <ShieldCheck className="text-emerald-500" size={20} />
           <span className="text-slate-400 text-xs font-medium">System Status</span>
           <span className="text-emerald-700 font-bold text-lg">Online</span>
        </div>
      </div>

      {/* 4. Educational/Safety Note */}
      <div className="bg-slate-100 p-4 rounded-xl flex gap-3 items-start">
        <div className="mt-1">
            <ShieldCheck size={18} className="text-slate-400" />
        </div>
        <div>
            <h4 className="font-bold text-slate-700 text-xs uppercase mb-1">Privacy First</h4>
            <p className="text-slate-500 text-[10px] leading-relaxed">
                Your medical data is processed in a secure, encrypted cloud environment and is never shared with third parties.
            </p>
        </div>
      </div>
    </div>
  );
};

export default Home;