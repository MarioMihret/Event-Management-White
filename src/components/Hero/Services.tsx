import React, { useState } from 'react';
import { PartyPopper, Building2, Heart, Music, Camera, Utensils } from 'lucide-react';

const services = [
  {
    icon: PartyPopper,
    title: "Private Events",
    description: "Birthdays, anniversaries, and milestone celebrations crafted to perfection.",
    price: "from $2,000"
  },
  {
    icon: Building2,
    title: "Corporate Events",
    description: "Conferences, team buildings, and galas that elevate your brand.",
    price: "from $5,000"
  },
  {
    icon: Heart,
    title: "Weddings",
    description: "Turn your dream wedding into an unforgettable reality.",
    price: "from $8,000"
  },
  {
    icon: Music,
    title: "Entertainment",
    description: "Live bands, DJs, and performers for any occasion.",
    price: "from $1,000"
  },
  {
    icon: Camera,
    title: "Photography",
    description: "Capture every magical moment with our professional team.",
    price: "from $1,500"
  },
  {
    icon: Utensils,
    title: "Catering",
    description: "Exquisite menus tailored to your taste and preferences.",
    price: "from $3,000"
  }
];

const ServiceCard = ({ service }) => {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = service.icon;

  return (
    <div
      className="relative bg-white/5 backdrop-blur-sm rounded-xl p-6 transform transition-all duration-300 hover:scale-105 hover:bg-white/10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative z-10">
        <Icon 
          className={`w-12 h-12 mb-4 transition-all duration-300 ${
            isHovered ? 'text-purple-400 rotate-12 scale-110' : 'text-white'
          }`}
        />
        <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
        <p className={`text-gray-300 mb-4 transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-70'
        }`}>
          {service.description}
        </p>
        <span className="text-purple-400 font-semibold">{service.price}</span>
      </div>
      {isHovered && (
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl" />
      )}
    </div>
  );
};

const Services = () => {
  return (
    <div className="animate-fade-in-delay">
      <h2 className="text-4xl font-bold text-white mb-4">Our Services</h2>
      <p className="text-xl text-gray-300 mb-12">Comprehensive event solutions tailored to your needs</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service) => (
          <ServiceCard key={service.title} service={service} />
        ))}
      </div>
    </div>
  );
};

export default Services;