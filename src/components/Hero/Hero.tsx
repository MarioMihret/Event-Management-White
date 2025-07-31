import React from 'react';
import Stats from './Stats';
import Services from './Services';
import PackageSlider from './PackageSlider';
import AnimatedIllustrations from './AnimatedIllustrations';
import HeroContent from './HeroContent';
import Testimonials from './Testimonials';
import Achievements from './Achievements';

const Hero = () => {
  return (
    <div className="relative min-h-screen">
      {/* Background Image with Overlay */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
      </div>

      <AnimatedIllustrations />

      {/* Content */}
      <div className="relative">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center">
          <div className="container mx-auto px-6">
            <HeroContent />
            <Stats />
          </div>
        </section>

        {/* Achievements Section */}
        <Achievements />

        {/* Services Section */}
        <section className="py-20 bg-black/30 backdrop-blur-sm">
          <div className="container mx-auto px-6">
            <Services />
          </div>
        </section>

        {/* Package Slider Section */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <PackageSlider />
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-black/30 backdrop-blur-sm">
          <div className="container mx-auto px-6">
            <Testimonials />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Hero;