import React from 'react';
import { Brain, Stethoscope, Bone, Activity } from 'lucide-react';
import CategoryCard from '../components/ui/CategoryCard';
import { useNavigate } from 'react-router-dom';

const Triage = () => {
  const navigate = useNavigate();

  const handleSelect = (category) => {
  if (category === "neuro") {
    navigate("/diseases/neuro");
  } else if (category === "respiratory") {
    navigate("/diseases/respiratory");
  } else if (category === "skin") {
    navigate("/diseases/skin");
  } else {
    navigate(`/scan/${category}`);
  }
};



  const categories = [
    {
      id: 'neuro',
      title: 'Brain & Neuro',
      desc: 'Stroke, Tumor & Neuro Analysis',
      icon: Brain,
      color: 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100'
    },
    {
      id: 'respiratory',
      title: 'Lungs & Chest',
      desc: 'X-Ray Pneumonia / TB / Cancer',
      icon: Stethoscope,
      color: 'bg-cyan-50 text-cyan-700 hover:bg-cyan-100'
    },
    {
      id: 'skin',
      title: 'Skin & Derma',
      desc: 'Early Cancer & Rash Detection',
      icon: Activity,
      color: 'bg-orange-50 text-orange-700 hover:bg-orange-100'
    },
    {
      id: 'ortho',
      title: 'Bone & Joint',
      desc: 'Fracture & Density Check',
      icon: Bone,
      color: 'bg-slate-100 text-slate-700 hover:bg-slate-200'
    }
  ];

  return (
    <div className="flex flex-col gap-6 pt-2">
      <section className="px-1">
        <h1 className="text-2xl font-bold text-slate-900">Select Category</h1>
        <p className="text-slate-500 text-sm">
          Choose the affected body system to begin.
        </p>
      </section>

      <div className="grid grid-cols-1 gap-4 pb-20">
        {categories.map((cat) => (
          <CategoryCard
            key={cat.id}
            title={cat.title}
            description={cat.description}
            icon={cat.icon}
            colorClass={cat.color}
            onClick={() => handleSelect(cat.id)}
          />

        ))}
      </div>
    </div>
  );
};

export default Triage;
