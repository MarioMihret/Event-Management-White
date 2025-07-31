import React from 'react';
import { Calendar } from 'lucide-react';

const CTA: React.FC = () => {
  return (
    <section className="py-20 relative bg-gradient-to-b from-purple-900/20 to-transparent">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Create Your Event?</h2>
          <p className="text-gray-300 text-lg mb-8">
            Let's work together to make your vision a reality
          </p>
          <button className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-white font-semibold hover:opacity-90 transform hover:scale-105 transition-all">
            <Calendar className="w-5 h-5" />
            Get Started Now
          </button>
        </div>
      </div>
    </section>
  );
};
export default CTA;