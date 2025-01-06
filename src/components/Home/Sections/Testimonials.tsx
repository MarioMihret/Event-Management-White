import React from 'react';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    content: "The team went above and beyond our expectations. Our wedding was absolutely perfect!",
    author: "Sarah Johnson",
    role: "Bride",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80"
  },
  {
    content: "Professional, creative, and detail-oriented. They made our corporate event a huge success.",
    author: "Michael Chen",
    role: "Marketing Director",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80"
  },
  {
    content: "The best event planning service I've ever worked with. Highly recommended!",
    author: "Emma Davis",
    role: "Event Coordinator",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80"
  }
];

const Testimonials: React.FC = () => {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold mb-6">What Our Clients Say</h2>
          <p className="text-gray-300 text-lg">
            Don't just take our word for it - hear from some of our satisfied clients
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.author}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-8 hover:transform hover:scale-105 transition-all duration-300"
            >
              <Quote className="w-10 h-10 text-purple-400 mb-6" />
              <p className="text-gray-300 mb-6">{testimonial.content}</p>
              
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.author}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold">{testimonial.author}</div>
                  <div className="text-gray-400 text-sm">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;