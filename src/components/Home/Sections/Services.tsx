import React from 'react';
import { PartyPopper, Building2, Heart, Music, Camera, Utensils } from 'lucide-react';

const services = [
  {
    icon: PartyPopper,
    title: "Private Events",
    description: "Birthdays, anniversaries, and celebrations"
  },
  {
    icon: Building2,
    title: "Corporate Events",
    description: "Conferences, seminars, and team building"
  },
  {
    icon: Heart,
    title: "Weddings",
    description: "Your perfect day, perfectly planned"
  },
  {
    icon: Music,
    title: "Entertainment",
    description: "Live music, DJs, and performances"
  },
  {
    icon: Camera,
    title: "Photography",
    description: "Professional photo and video coverage"
  },
  {
    icon: Utensils,
    title: "Catering",
    description: "Gourmet food and beverage service"
  }
];

const Services: React.FC = () => {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold mb-6">Our Services</h2>
          <p className="text-gray-300 text-lg">
            Comprehensive event solutions tailored to your needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="group bg-white/5 backdrop-blur-sm rounded-xl p-8 hover:transform hover:scale-105 transition-all duration-300"
            >
              <Icon className="w-12 h-12 text-purple-400 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-semibold mb-2">{title}</h3>
              <p className="text-gray-400">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Services;