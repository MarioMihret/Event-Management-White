import React from 'react';

const Background: React.FC = () => (
  <>
    <div 
      className="absolute inset-0 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80")',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
    </div>
    
    {/* Animated Particles */}
    <div className="absolute inset-0 pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${5 + Math.random() * 5}s`
          }}
        >
          <div className="h-2 w-2 bg-white/20 rounded-full" />
        </div>
      ))}
    </div>
  </>
);

export default Background;