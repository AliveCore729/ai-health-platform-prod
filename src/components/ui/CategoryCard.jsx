import React from 'react';
import { ArrowRight } from 'lucide-react';
import { cn } from '../../utils/cn';

const CategoryCard = ({ title, icon: Icon, description, colorClass, onClick }) => {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "relative w-full text-left p-5 rounded-3xl transition-all duration-300 group overflow-hidden border border-transparent",
        "hover:shadow-lg hover:scale-[1.02] active:scale-95",
        colorClass // We pass utility classes like "bg-blue-50 text-blue-700"
      )}
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 p-4 opacity-10 scale-150 transform group-hover:scale-125 transition-transform duration-500">
        <Icon size={80} />
      </div>

      <div className="relative z-10 flex flex-col gap-3">
        <div className="w-12 h-12 rounded-2xl bg-white/60 backdrop-blur-sm flex items-center justify-center shadow-sm">
           <Icon size={24} />
        </div>
        
        <div>
            <h3 className="font-bold text-lg leading-tight mb-1">{title}</h3>
            <p className="text-xs opacity-80 font-medium">{description}</p>
        </div>
      </div>

      <div className="absolute bottom-4 right-4 opacity-0 transform translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
        <ArrowRight size={20} />
      </div>
    </button>
  );
};

export default CategoryCard;