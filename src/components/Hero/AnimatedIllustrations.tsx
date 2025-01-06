import React from 'react';
import { Sparkles, Stars, PartyPopper } from 'lucide-react';

const AnimatedIllustrations = () => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Floating Icons */}
      <Sparkles className="absolute top-1/4 left-1/4 w-12 h-12 text-purple-400/30 animate-float" 
        style={{ animationDelay: '0.5s', animationDuration: '4s' }} />
      <Stars className="absolute top-1/3 right-1/3 w-16 h-16 text-pink-400/30 animate-float" 
        style={{ animationDelay: '1.5s', animationDuration: '5s' }} />
      <PartyPopper className="absolute bottom-1/3 right-1/4 w-14 h-14 text-purple-400/30 animate-float" 
        style={{ animationDelay: '1s', animationDuration: '6s' }} />
      
      {/* Animated Circles */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="w-96 h-96 rounded-full border-2 border-purple-500/20 animate-pulse" />
        <div className="absolute inset-0 w-72 h-72 rounded-full border-2 border-pink-500/20 animate-pulse" 
          style={{ animationDelay: '1s' }} />
        <div className="absolute inset-0 w-48 h-48 rounded-full border-2 border-purple-500/20 animate-pulse" 
          style={{ animationDelay: '2s' }} />
      </div>
    </div>
  );
};

export default AnimatedIllustrations;