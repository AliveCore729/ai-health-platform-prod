import React from 'react';
import { Home, MessageCircle, Upload, ShieldAlert, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../../utils/cn';

const MobileLayout = ({ children }) => {
  return (
    <div className="flex flex-col h-[100dvh] bg-slate-50 overflow-hidden relative max-w-md mx-auto shadow-2xl">

      {/* HEADER */}
      <header className="h-14 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-4 shrink-0 z-30 sticky top-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-medical-100 rounded-lg flex items-center justify-center text-medical-700 font-bold text-lg">
            M
          </div>
          <span className="font-bold text-slate-800 text-lg tracking-tight">
            MediScan AI
          </span>
        </div>
        <div className="text-xs font-medium text-medical-600 bg-medical-50 px-2 py-1 rounded-full">
          Beta v1.0
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 pb-24 scroll-smooth">
        {children}
      </main>

      {/* BOTTOM NAVIGATION */}
      <nav className="h-20 bg-white border-t border-slate-200 fixed bottom-0 w-full max-w-md flex justify-around items-center px-2 z-40 pb-2 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">

        <NavItem to="/" icon={<Home size={22} />} label="Home" />

        {/* ✅ AI CHAT (REPLACED RECORDS) */}
        <NavItem
          to="/chat"
          icon={<MessageCircle size={22} />}
          label="AI Chat"
        />

        {/* Floating Scan Button */}
        <div className="relative -top-6 group">
          <Link
            to="/triage"
            className="w-14 h-14 bg-medical-600 rounded-full text-white shadow-lg shadow-medical-200 flex items-center justify-center transform transition-all duration-200 active:scale-90 group-hover:shadow-medical-500/50"
          >
            <Upload size={26} strokeWidth={2.5} />
          </Link>
        </div>

        <NavItem to="/About" icon={<User size={22} />} label="About" />
        <NavItem to="/sos" icon={<ShieldAlert size={22} />} label="SOS" isDanger />
      </nav>
    </div>
  );
};

// Internal Sub-component
const NavItem = ({ to, icon, label, isDanger = false }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={cn(
        "flex flex-col items-center gap-1 p-2 w-16 transition-colors",
        isActive
          ? (isDanger ? "text-red-600" : "text-medical-700")
          : "text-slate-400 hover:text-slate-600"
      )}
    >
      {icon}
      <span className={cn("text-[10px] font-medium", isActive && "font-bold")}>
        {label}
      </span>
    </Link>
  );
};

export default MobileLayout;
