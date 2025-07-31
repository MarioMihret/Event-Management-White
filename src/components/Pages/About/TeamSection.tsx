import React from 'react';
import { Github, Linkedin, Twitter } from 'lucide-react';

const TeamSection = () => {
  const team = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80",
      social: {
        twitter: "#",
        linkedin: "#",
        github: "#"
      }
    },
    {
      name: "Michael Chen",
      role: "CTO",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80",
      social: {
        twitter: "#",
        linkedin: "#",
        github: "#"
      }
    },
    {
      name: "Emma Davis",
      role: "Head of Design",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80",
      social: {
        twitter: "#",
        linkedin: "#",
        github: "#"
      }
    }
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
        Meet Our Team
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {team.map((member) => (
          <div key={member.name} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
            <img 
              src={member.image} 
              alt={member.name}
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                {member.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">{member.role}</p>
              <div className="flex gap-4">
                <a href={member.social.twitter} className="text-gray-400 hover:text-purple-500">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href={member.social.linkedin} className="text-gray-400 hover:text-purple-500">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href={member.social.github} className="text-gray-400 hover:text-purple-500">
                  <Github className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamSection;