import React from 'react';
import { Users, Award, Calendar, Globe } from 'lucide-react';
import TeamSection from './TeamSection';
import MissionSection from './MissionSection';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            About EventHub
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Creating unforgettable experiences and connecting people through exceptional events
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          {[
            { icon: Calendar, label: "Events Hosted", value: "10,000+" },
            { icon: Users, label: "Happy Clients", value: "50,000+" },
            { icon: Award, label: "Awards Won", value: "25+" },
            { icon: Globe, label: "Countries", value: "30+" }
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
              <Icon className="w-8 h-8 text-purple-500 mb-4" />
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{value}</div>
              <div className="text-gray-600 dark:text-gray-400">{label}</div>
            </div>
          ))}
        </div>

        <MissionSection />
        <TeamSection />
      </div>
    </div>
  );
}

export default About;