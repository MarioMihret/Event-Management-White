import React from 'react';
import TypewriterText from './TypewriterText';
import { Sparkles, Stars, PartyPopper } from 'lucide-react';

const HeroContent = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between gap-12 py-20">
      <div className="flex-1 max-w-2xl">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-slide-up">
          Creating{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            <TypewriterText words={['Unforgettable', 'Magical', 'Perfect']} />
          </span>{' '}
          Events
        </h1>
        
        <p className="text-xl text-gray-300 mb-8 animate-slide-up-delay">
          Transforming your vision into extraordinary events. Specializing in corporate gatherings, 
          dream weddings, and exclusive celebrations tailored to your unique style.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-delay">
          <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white font-semibold hover:opacity-90 transform hover:scale-105 transition-all duration-300">
            Get Free Consultation
          </button>
          <button className="px-8 py-4 bg-white/10 backdrop-blur-md rounded-full text-white font-semibold hover:bg-white/20 transform hover:scale-105 transition-all duration-300">
            View Our Portfolio
          </button>
        </div>
      </div>

      <div className="flex-1 relative">
        <img 
          src="https://images.unsplash.com/photo-1511795409834-432e51f83099?auto=format&fit=crop&q=80"
          alt="Online Event"
          className="rounded-2xl w-full max-w-lg mx-auto animate-float"
        />
        
        {/* Animated Elements */}
        <Sparkles className="absolute top-10 left-0 w-12 h-12 text-purple-400/30 animate-float" 
          style={{ animationDelay: '0.5s' }} />
        <Stars className="absolute top-1/2 right-0 w-16 h-16 text-pink-400/30 animate-float" 
          style={{ animationDelay: '1.5s' }} />
        <PartyPopper className="absolute bottom-10 left-1/4 w-14 h-14 text-purple-400/30 animate-float" 
          style={{ animationDelay: '1s' }} />
      </div>
    </div>
  );
};

export default HeroContent;