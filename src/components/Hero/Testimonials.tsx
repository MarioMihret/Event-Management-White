import React from 'react';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Bride",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80",
    quote: "They turned our dream wedding into a magical reality. Every detail was perfect!",
    rating: 5
  },
  {
    name: "Michael Chen",
    role: "Corporate Event Manager",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80",
    quote: "The most professional event planning team I've worked with. Outstanding service!",
    rating: 5
  },
  {
    name: "Emma Davis",
    role: "Birthday Celebrant",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80",
    quote: "They made my 30th birthday absolutely unforgettable. Highly recommended!",
    rating: 5
  }
];

const TestimonialCard = ({ testimonial }) => (
  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 transform hover:scale-105 transition-all duration-300">
    <Quote className="w-10 h-10 text-purple-400 mb-4" />
    <p className="text-gray-300 mb-6 italic">{testimonial.quote}</p>
    <div className="flex items-center gap-4">
      <img 
        src={testimonial.image} 
        alt={testimonial.name}
        className="w-12 h-12 rounded-full object-cover"
      />
      <div>
        <h4 className="text-white font-semibold">{testimonial.name}</h4>
        <p className="text-gray-400 text-sm">{testimonial.role}</p>
      </div>
    </div>
  </div>
);

const Testimonials = () => {
  return (
    <div className="animate-fade-in-delay">
      <h2 className="text-4xl font-bold text-white mb-4">Client Stories</h2>
      <p className="text-xl text-gray-300 mb-12">What our clients say about their experience</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial) => (
          <TestimonialCard key={testimonial.name} testimonial={testimonial} />
        ))}
      </div>
    </div>
  );
};

export default Testimonials;