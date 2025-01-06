import React, { useState } from 'react';

const packages = [
  {
    name: "Essential",
    price: "$2,000",
    features: ["Event Planning", "Basic Decor", "Sound System", "4-Hour Duration"]
  },
  {
    name: "Premium",
    price: "$5,000",
    features: ["Full Planning", "Custom Decor", "Pro Sound & Lighting", "8-Hour Duration", "Photography"]
  },
  {
    name: "Luxury",
    price: "$10,000",
    features: ["VIP Planning", "Luxury Decor", "Premium AV Setup", "Full Day Event", "Photo & Video", "Catering"]
  }
];

const PackageSlider = () => {
  const [activeIndex, setActiveIndex] = useState(1);

  return (
    <div className="animate-fade-in-delay">
      <h2 className="text-4xl font-bold text-white mb-4">Event Packages</h2>
      <p className="text-xl text-gray-300 mb-12">Choose the perfect package for your event</p>
      
      <div className="relative">
        <input
          type="range"
          min="0"
          max="2"
          value={activeIndex}
          onChange={(e) => setActiveIndex(parseInt(e.target.value))}
          className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer mb-12"
          style={{
            background: 'linear-gradient(to right, rgb(139, 92, 246), rgb(219, 39, 119))',
          }}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <div
              key={pkg.name}
              className={`p-8 rounded-xl transition-all duration-500 transform ${
                index === activeIndex
                  ? 'bg-white/10 scale-105 backdrop-blur-md'
                  : 'bg-white/5 scale-95 opacity-50'
              }`}
            >
              <h3 className="text-2xl font-bold text-white mb-4">{pkg.name}</h3>
              <div className="text-3xl font-bold text-purple-400 mb-6">{pkg.price}</div>
              <ul className="space-y-4">
                {pkg.features.map((feature) => (
                  <li key={feature} className="text-gray-300 flex items-center">
                    <span className="w-2 h-2 bg-purple-400 rounded-full mr-3" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PackageSlider;