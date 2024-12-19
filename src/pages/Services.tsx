import { motion } from 'framer-motion';
import {
  Calendar,
  Users,
  Gift,
  Camera,
  Music,
  Coffee,
  Ticket,
  MessageSquare,
  Award,
  ThumbsUp,
  Clock,
  Shield
} from 'lucide-react';

const services = [
  {
    icon: Calendar,
    title: 'Event Planning',
    description: 'Comprehensive event planning and coordination services.'
  },
  {
    icon: Users,
    title: 'Venue Management',
    description: 'Perfect venue selection and setup for your events.'
  },
  {
    icon: Gift,
    title: 'Corporate Events',
    description: 'Professional corporate event management solutions.'
  },
  {
    icon: Camera,
    title: 'Photography',
    description: 'Professional event photography and videography.'
  },
  {
    icon: Music,
    title: 'Entertainment',
    description: 'Top-tier entertainment booking and management.'
  },
  {
    icon: Coffee,
    title: 'Catering',
    description: 'Exquisite catering services for all occasions.'
  },
  {
    icon: Ticket,
    title: 'Ticketing',
    description: 'Seamless ticket management and distribution.'
  },
  {
    icon: MessageSquare,
    title: 'Marketing',
    description: 'Comprehensive event marketing and promotion.'
  }
];

const benefits = [
  {
    icon: Award,
    title: 'Expert Team',
    description: 'Experienced professionals dedicated to your success.'
  },
  {
    icon: ThumbsUp,
    title: 'Quality Service',
    description: 'Commitment to excellence in every detail.'
  },
  {
    icon: Clock,
    title: 'Timely Delivery',
    description: 'On-time execution of all event elements.'
  },
  {
    icon: Shield,
    title: 'Reliable Support',
    description: '24/7 support throughout your event journey.'
  }
];

export default function Services() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-indigo-700 py-32">
        <div className="absolute inset-0">
          <img
            className="h-full w-full object-cover mix-blend-multiply"
            src="https://images.unsplash.com/photo-1531058020387-3be344556be6?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80"
            alt="Services Hero"
          />
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl"
          >
            Our Services
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 max-w-3xl text-xl text-gray-100"
          >
            Comprehensive event management solutions tailored to your needs
          </motion.p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              What We Offer
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Everything you need for a successful event
            </p>
          </div>

          <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group"
              >
                <div className="relative p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative">
                    <service.icon className="h-12 w-12 text-indigo-600 group-hover:text-white transition-colors duration-300" />
                    <h3 className="mt-8 text-lg font-medium text-gray-900 group-hover:text-white transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="mt-2 text-gray-500 group-hover:text-gray-100 transition-colors duration-300">
                      {service.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Why Choose Us
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Experience the difference with our premium services
            </p>
          </div>

          <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-600 text-white mx-auto">
                  <benefit.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-lg font-medium text-gray-900">
                  {benefit.title}
                </h3>
                <p className="mt-2 text-gray-500">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-indigo-700">
        <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            <span className="block">Ready to get started?</span>
            <span className="block">Contact us today.</span>
          </h2>
          <p className="mt-4 text-lg leading-6 text-indigo-200">
            Let us help you create an unforgettable event experience.
          </p>
          <a
            href="/contact"
            className="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 sm:w-auto"
          >
            Get in touch
          </a>
        </div>
      </div>
    </div>
  );
}