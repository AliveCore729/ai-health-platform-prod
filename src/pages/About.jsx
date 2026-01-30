import React from 'react';
import { Github, Linkedin, Mail, Globe, Award, Code2, Heart } from 'lucide-react';

const About = () => {
  // 1. EDIT YOUR TEAM DETAILS HERE
  const teamMembers = [
    {
      id: 1,
      name: "Shreyansh Jain",
      role: "Full-Stack Developer & AI Specialist",
      image: "/team/shreyansh.jpeg", // Replace with your photo
      bio: "Building scalable AI-driven healthcare solutions with a focus on cloud infrastructure and seamless user experiences.",
      links: { github: "https://github.com/AliveCore729", linkedin: "https://www.linkedin.com/in/shreyanshjain7/" }
    },
    {
      id: 2,
      name: "Pawan Hingane",
      role: "Machine Learning Engineer and Researcher",
      image: "/team/pawan.jpeg", // Replace with your photo
      bio: "Specializing in developing robust AI models for medical image analysis and diagnostic accuracy.",
      links: { github: "https://github.com/pawan200188", linkedin: "https://www.linkedin.com/in/pawan-hingane/" }
    },
    {
      id: 3,
      name: "Mayank Agrawal",
      role: "Full-Stack Developer & AI Specialist",
      image: "/team/mayank.png", // Replace with your photo
      bio: "Passionate about integrating AI technologies into user-friendly applications to enhance healthcare accessibility.",
      links: { github: "#", linkedin: "#" }
    },
     // Add more members if needed...
  ];

  const techStack = [
    { name: "React Native", icon: "⚛️" },
    { name: "TensorFlow", icon: "🧠" },
    { name: "Python", icon: "🐍" },
    { name: "Google Cloud", icon: "☁️" },
  ];

  return (
    <div className="flex flex-col pt-2 pb-24">
      
      {/* 1. HERO SECTION */}
      <div className="px-4 mb-8">
        <div className="bg-gradient-to-br from-medical-700 to-medical-900 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden text-center">
            {/* Background Decoration */}
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            
            <div className="relative z-10">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-4 border border-white/30">
                    <Heart className="text-white" size={32} fill="currentColor" />
                </div>
                <h1 className="text-3xl font-bold mb-2">MediScan AI</h1>
                <p className="text-medical-100 text-sm font-medium opacity-90 leading-relaxed">
                    Bridging the gap between advanced Artificial Intelligence and accessible rural healthcare.
                </p>
            </div>
        </div>
      </div>

      {/* 2. MISSION STATEMENT */}
      <div className="px-6 mb-10">
        <div className="flex items-start gap-4">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl shrink-0">
                <Award size={24} />
            </div>
            <div>
                <h3 className="font-bold text-slate-900 text-lg">Our Mission</h3>
                <p className="text-slate-500 text-sm leading-relaxed mt-1">
                    To provide a <span className="text-indigo-600 font-bold">free, instant, and privacy-focused</span> triage tool for early detection of critical conditions, empowering users to seek timely medical help.
                </p>
            </div>
        </div>
      </div>

      {/* 3. THE TEAM GRID */}
      <div className="px-4 mb-10">
        <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            Meet the Builders
            <span className="text-xs font-normal text-slate-400 bg-slate-100 px-2 py-1 rounded-full">The Team</span>
        </h2>
        
        <div className="grid grid-cols-1 gap-6">
            {teamMembers.map((member) => (
                <div key={member.id} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
                    {/* Avatar */}
                    <div className="relative shrink-0">
                        <div className="w-20 h-20 rounded-full p-1 bg-gradient-to-tr from-medical-400 to-indigo-400">
                            <img 
                                src={member.image} 
                                alt={member.name} 
                                className="w-full h-full rounded-full object-cover border-2 border-white"
                            />
                        </div>
                    </div>
                    
                    {/* Details */}
                    <div>
                        <h3 className="font-bold text-slate-900 text-lg">{member.name}</h3>
                        <p className="text-xs font-bold text-medical-600 uppercase tracking-wide mb-2">{member.role}</p>
                        <p className="text-xs text-slate-500 line-clamp-2 mb-3 leading-relaxed">
                            {member.bio}
                        </p>
                        
                        {/* Social Links */}
                        <div className="flex gap-3">
                            <a href={member.links.github} className="text-slate-400 hover:text-slate-900 transition">
                                <Github size={16} />
                            </a>
                            <a href={member.links.linkedin} className="text-slate-400 hover:text-blue-700 transition">
                                <Linkedin size={16} />
                            </a>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </div>

      {/* 4. TECH STACK (Impress Judges) */}
      <div className="px-4">
        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
            <h3 className="text-center text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Powered By Technology</h3>
            <div className="flex justify-around items-center">
                {techStack.map((tech, idx) => (
                    <div key={idx} className="flex flex-col items-center gap-2">
                        <span className="text-2xl filter drop-shadow-sm">{tech.icon}</span>
                        <span className="text-[10px] font-bold text-slate-600">{tech.name}</span>
                    </div>
                ))}
            </div>
        </div>
      </div>

      <div className="mt-12 text-center">
        <p className="text-xs text-slate-300">© 2026 MediScan Health Initiative</p>
      </div>

    </div>
  );
};

export default About;