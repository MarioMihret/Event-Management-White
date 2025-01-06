import React from 'react';
import { TypewriterText } from '../TypewriterText';
import CallToAction from './CallToAction';
import HeroStats from '../HeroStats';

const HeroContent: React.FC = () => (
  <div className="relative container mx-auto px-6 pt-32">
    <div className="max-w-4xl">
      <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-slide-up">
        Creating{' '}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          <TypewriterText 
            words={['Unforgettable', 'Magical', 'Perfect']} 
            delay={100}
          />
        </span>{' '}
        Events
      </h1>
      
      <p className="text-xl text-gray-300 mb-8 animate-slide-up-delay">
        Transform your vision into extraordinary experiences. From corporate gatherings 
        to dream weddings, we create moments that last a lifetime.
      </p>

      <CallToAction />
      <HeroStats />
    </div>
  </div>
);

export default HeroContent;