import React from 'react';
import { Calendar, Users, Award } from 'lucide-react';

const features = [
  {
    icon: Calendar,
    title: 'Event Planning',
    description: 'Expert planning and coordination for events of any size'
  },
  {
    icon: Users,
    title: 'Professional Team',
    description: 'Dedicated team of experienced event professionals'
  },
  {
    icon: Award,
    title: 'Quality Service',
    description: 'Award-winning service with attention to every detail'
  }
];

const About: React.FC = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold mb-6">
            Why Choose{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              EventHub
            </span>
          </h2>
          <p className="text-gray-300 text-lg">
            We bring your vision to life with exceptional planning, flawless execution, 
            and memorable experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map(({ icon: Icon, title, description }) => (
            <div 
              key={title}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-6 hover:transform hover:scale-105 transition-all duration-300"
            >
              <Icon className="w-12 h-12 text-purple-400 mb-4" />
              <h3 className="text-xl font-semibold mb-3">{title}</h3>
              <p className="text-gray-400">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;