import React from 'react';
import { Award, Trophy, Star } from 'lucide-react';

const achievements = [
  {
    icon: Trophy,
    title: "Best Event Planner 2023",
    organization: "Event Industry Awards"
  },
  {
    icon: Star,
    title: "5-Star Rating",
    organization: "Based on 500+ Reviews"
  },
  {
    icon: Award,
    title: "Excellence in Service",
    organization: "Luxury Events Association"
  }
];

const Achievements = () => {
  return (
    <div className="py-12 bg-gradient-to-r from-purple-900/20 to-pink-900/20 backdrop-blur-sm">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {achievements.map(({ icon: Icon, title, organization }) => (
            <div 
              key={title}
              className="flex items-center gap-6 bg-white/5 rounded-xl p-6 transform hover:scale-105 transition-all duration-300"
            >
              <Icon className="w-12 h-12 text-purple-400" />
              <div>
                <h3 className="text-xl font-bold text-white">{title}</h3>
                <p className="text-gray-400">{organization}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Achievements;