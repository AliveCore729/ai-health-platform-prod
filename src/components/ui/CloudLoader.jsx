// src/components/ui/CloudLoader.jsx
import React, { useEffect, useState } from 'react';
import { ShieldCheck, UploadCloud, BrainCircuit, CheckCircle2 } from 'lucide-react';

const steps = [
    { icon: ShieldCheck, text: "Encrypting & Anonymizing..." },
    { icon: UploadCloud, text: "Uploading to Secure Cloud..." },
    { icon: BrainCircuit, text: "Running Neural Analysis..." },
];

const CloudLoader = () => {
    const [activeStep, setActiveStep] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
        }, 1100); // Change step every 1.1 seconds
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center py-12 px-6 bg-white rounded-3xl shadow-xl border border-medical-50 mx-4">
            {/* Animated Icon */}
            <div className="relative mb-8">
                <div className="absolute inset-0 bg-medical-100 rounded-full animate-ping opacity-75"></div>
                <div className="relative bg-white p-5 rounded-full border-2 border-medical-500 z-10">
                    <BrainCircuit size={48} className="text-medical-600 animate-pulse" />
                </div>
            </div>

            {/* Steps List */}
            <div className="w-full space-y-5">
                {steps.map((step, index) => {
                    const Icon = step.icon;
                    const isActive = index === activeStep;
                    const isDone = index < activeStep;

                    return (
                        <div key={index} className={`flex items-center gap-4 transition-all duration-500 ${index > activeStep ? 'opacity-30' : 'opacity-100'}`}>
                            {isDone ? (
                                <CheckCircle2 className="text-emerald-500 shrink-0" size={24} />
                            ) : (
                                <Icon className={`shrink-0 ${isActive ? 'text-medical-600 animate-bounce' : 'text-slate-400'}`} size={24} />
                            )}
                            <span className={`text-sm font-medium ${isActive ? 'text-medical-900' : 'text-slate-500'}`}>
                                {step.text}
                            </span>
                        </div>
                    );
                })}
            </div>
            
            <p className="mt-8 text-xs text-slate-400 text-center">
                Please wait. Do not close the app.
            </p>
        </div>
    );
};

export default CloudLoader;