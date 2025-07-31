import React from 'react';
import Hero from './Hero';
import About from './Sections/About';
import Services from './Sections/Services';
import Features from './Sections/Features';
import Testimonials from './Sections/Testimonials';
import Pricing from './Sections/Pricing';
import Partners from './Sections/Partners';
import CTA from './Sections/CTA';
import Footer from '../Layout/Footer';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-black">
      <Hero />
      <About />
      <Services />
      <Features />
      <Pricing />
      <Testimonials />
      <Partners />
      <CTA />
      <Footer />
    </div>
  );
};
export default HomePage;