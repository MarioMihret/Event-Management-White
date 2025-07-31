import React from 'react';
import { Target, Heart, Users } from 'lucide-react';

const MissionSection = () => {
  const values = [
    {
      icon: Target,
      title: "Our Mission",
      description: "To revolutionize event planning and management through innovative technology and exceptional service."
    },
    {
      icon: Heart,
      title: "Our Vision",
      description: "To become the world's most trusted platform for creating and managing memorable events."
    },
    {
      icon: Users,
      title: "Our Values",
      description: "Excellence, innovation, integrity, and customer-first approach in everything we do."
    }
  ];

  return (
    <div className="mb-16">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
        Our Mission & Values
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {values.map(({ icon: Icon, title, description }) => (
          <div key={title} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
            <Icon className="w-8 h-8 text-purple-500 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
            <p className="text-gray-600 dark:text-gray-400">{description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MissionSection;