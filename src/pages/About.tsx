import { Users, Calendar, Award, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

const timeline = [
  {
    year: '2020',
    title: 'Company Founded',
    description: 'Started with a vision to revolutionize event management.'
  },
  {
    year: '2021',
    title: 'Rapid Growth',
    description: 'Expanded our services across multiple cities.'
  },
  {
    year: '2022',
    title: 'Technology Innovation',
    description: 'Launched our advanced event management platform.'
  },
  {
    year: '2023',
    title: 'Global Expansion',
    description: 'Started serving international clients and events.'
  }
];

const stats = [
  { icon: Users, label: 'Happy Clients', value: '10,000+' },
  { icon: Calendar, label: 'Events Managed', value: '5,000+' },
  { icon: Award, label: 'Awards Won', value: '15+' },
  { icon: TrendingUp, label: 'Growth Rate', value: '200%' }
];

const team = [
  {
    name: 'Sarah Johnson',
    role: 'CEO & Founder',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    bio: 'Visionary leader with 15+ years in event management.'
  },
  {
    name: 'Michael Chen',
    role: 'Technical Director',
    image: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    bio: 'Tech expert specializing in event technology solutions.'
  },
  {
    name: 'Emily Rodriguez',
    role: 'Creative Director',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    bio: 'Award-winning creative professional.'
  }
];

export default function About() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative h-[60vh] bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
            alt="About Us Hero"
            className="w-full h-full object-cover mix-blend-overlay"
          />
        </div>
        <div className="relative h-full flex items-center justify-center text-center">
          <div className="max-w-3xl px-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-bold text-white mb-6"
            >
              Creating Unforgettable Event Experiences
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-white"
            >
              We're passionate about bringing people together and making every event special.
            </motion.p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <stat.icon className="mx-auto h-8 w-8 text-indigo-600" />
                <p className="mt-2 text-3xl font-semibold text-gray-900">{stat.value}</p>
                <p className="text-gray-500">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Our Journey</h2>
            <p className="mt-4 text-lg text-gray-600">
              From humble beginnings to industry leadership
            </p>
          </div>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-gray-200" />
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className={`relative ${
                    index % 2 === 0 ? 'text-right pr-12' : 'text-left pl-12'
                  }`}
                >
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
                    <div className="w-4 h-4 rounded-full bg-indigo-600" />
                  </div>
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <span className="text-indigo-600 font-semibold">{item.year}</span>
                    <h3 className="mt-2 text-xl font-bold text-gray-900">{item.title}</h3>
                    <p className="mt-2 text-gray-600">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Meet Our Team</h2>
            <p className="mt-4 text-lg text-gray-600">
              The passionate people behind our success
            </p>
          </div>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="relative">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="mx-auto h-40 w-40 rounded-full object-cover"
                  />
                  <div className="mt-4">
                    <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
                    <p className="text-indigo-600">{member.role}</p>
                    <p className="mt-2 text-gray-500">{member.bio}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}