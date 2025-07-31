import React from 'react';
import { Calendar, Users, Sparkles } from 'lucide-react';

const stats = [
  { icon: Calendar, label: "Events Organized", value: "500+" },
  { icon: Users, label: "Happy Clients", value: "1000+" },
  { icon: Sparkles, label: "Years Experience", value: "15+" }
];

const HeroStats: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
      {stats.map(({ icon: Icon, label, value }, index) => (
        <div 
          key={label}
          className="bg-white/10 backdrop-blur-md rounded-lg p-6 transform hover:scale-105 transition-all duration-300"
          style={{ animationDelay: `${index * 0.2}s` }}
        >
          <Icon className="w-8 h-8 text-purple-400 mb-2" />
          <div className="text-2xl font-bold text-white">{value}</div>
          <div className="text-gray-300">{label}</div>
        </div>
      ))}
    </div>
  );
};
export default HeroStats;