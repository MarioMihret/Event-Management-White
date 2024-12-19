import { Calendar, MapPin, Users, Video } from 'lucide-react';
import { Event } from '../types';
import { Link } from 'react-router-dom';

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
      <img
        className="h-48 w-full object-cover"
        src={event.image}
        alt={event.title}
      />
      <div className="p-6">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-semibold text-gray-900">{event.title}</h3>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
            {event.category}
          </span>
        </div>
        <p className="mt-2 text-gray-600 line-clamp-2">{event.description}</p>
        <div className="mt-4 space-y-2">
          <div className="flex items-center text-gray-500">
            <Calendar className="h-5 w-5 mr-2" />
            <span>{new Date(event.date).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center text-gray-500">
            <MapPin className="h-5 w-5 mr-2" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center text-gray-500">
            <Users className="h-5 w-5 mr-2" />
            <span>{event.tickets.available} spots left</span>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-between">
          <span className="text-2xl font-bold text-gray-900">
            {event.price === 0 ? 'Free' : `$${event.price}`}
          </span>
          <div className="flex space-x-2">
            {event.videoMeeting?.enableVideoMeeting && (
              <Link
                to={`/meeting/${event.videoMeeting.meetingId}`}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                <Video className="h-4 w-4 mr-1" />
                Join
              </Link>
            )}
            <Link
              to={`/events/${event.id}`}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}