import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Users } from 'lucide-react';
import { Tooltip } from '../../common/Tooltip';

const CallToAction: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-delay">
      <Tooltip content="Create and manage your own events">
        <button
          onClick={() => navigate('/organizer')}
          className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-white font-semibold hover:opacity-90 transform hover:scale-105 transition-all"
        >
          <Calendar className="w-5 h-5" />
          Create Event
        </button>
      </Tooltip>

      <Tooltip content="Discover upcoming events">
        <button
          onClick={() => navigate('/events')}
          className="flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-md rounded-xl text-white font-semibold hover:bg-white/20 transform hover:scale-105 transition-all"
        >
          <Users className="w-5 h-5" />
          Browse Events
        </button>
      </Tooltip>
    </div>
  );
};

export default CallToAction;