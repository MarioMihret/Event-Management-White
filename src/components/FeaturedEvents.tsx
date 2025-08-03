import { useState, useEffect } from 'react';
import { Event } from '../types';
import EventCard from './EventCard';
import { ArrowRight, Sparkles, Calendar, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

// Sample featured events data
const SAMPLE_FEATURED_EVENTS: Event[] = [
  {
    id: '1',
    title: 'Tech Innovation Summit 2024',
    description: 'Join industry leaders and innovators for a day of cutting-edge technology discussions, networking, and workshops. Discover the latest trends in AI, blockchain, and sustainable tech.',
    date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
    location: 'San Francisco Convention Center',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    price: 299,
    category: 'Technology',
    organizer: {
      id: '1',
      name: 'TechEvents Inc.',
      email: 'contact@techevents.com'
    },
    tickets: {
      total: 500,
      available: 127,
      sold: 373
    },
    status: 'published',
    visibility: 'public',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    videoMeeting: {
      enableVideoMeeting: true,
      meetingId: 'tech-summit-2024',
      meetingLink: 'https://meet.example.com/tech-summit-2024'
    }
  },
  {
    id: '2',
    title: 'Creative Design Workshop',
    description: 'Unleash your creativity in this hands-on workshop covering modern design principles, UX/UI best practices, and the latest design tools. Perfect for beginners and professionals alike.',
    date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days from now
    location: 'Design Studio Downtown',
    image: 'https://images.unsplash.com/photo-1559223607-b4d0555ae227?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    price: 149,
    category: 'Design',
    organizer: {
      id: '2',
      name: 'Creative Minds Studio',
      email: 'hello@creativeminds.com'
    },
    tickets: {
      total: 50,
      available: 12,
      sold: 38
    },
    status: 'published',
    visibility: 'public',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    videoMeeting: {
      enableVideoMeeting: false
    }
  },
  {
    id: '3',
    title: 'Startup Networking Mixer',
    description: 'Connect with fellow entrepreneurs, investors, and startup enthusiasts in a relaxed networking environment. Share ideas, find co-founders, and build meaningful business relationships.',
    date: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString(), // 21 days from now
    location: 'Innovation Hub',
    image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    price: 0, // Free event
    category: 'Networking',
    organizer: {
      id: '3',
      name: 'Startup Community',
      email: 'events@startupcommunity.com'
    },
    tickets: {
      total: 200,
      available: 89,
      sold: 111
    },
    status: 'published',
    visibility: 'public',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    videoMeeting: {
      enableVideoMeeting: true,
      meetingId: 'startup-mixer-2024',
      meetingLink: 'https://meet.example.com/startup-mixer-2024'
    }
  }
];

// Loading skeleton component
function EventCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
      <div className="h-48 bg-gray-300"></div>
      <div className="p-6">
        <div className="h-4 bg-gray-300 rounded mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
        <div className="space-y-2">
          <div className="h-3 bg-gray-300 rounded w-1/2"></div>
          <div className="h-3 bg-gray-300 rounded w-2/3"></div>
          <div className="h-3 bg-gray-300 rounded w-1/3"></div>
        </div>
        <div className="mt-6 flex justify-between items-center">
          <div className="h-6 bg-gray-300 rounded w-16"></div>
          <div className="h-10 bg-gray-300 rounded w-24"></div>
        </div>
      </div>
    </div>
  );
}

export default function FeaturedEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate loading for a brief moment to show the skeleton
    const timer = setTimeout(() => {
      setEvents(SAMPLE_FEATURED_EVENTS);
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-indigo-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-10 w-64 h-64 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-2000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-100 text-indigo-800 text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4 mr-2" />
            Handpicked for You
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Featured
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
              Events
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover extraordinary events curated just for you. From intimate workshops to grand celebrations, find experiences that inspire and connect.
          </p>
        </div>

        {/* Content */}
        <div className="mb-12">
          {loading && (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(3)].map((_, index) => (
                <EventCardSkeleton key={index} />
              ))}
            </div>
          )}
          
          {error && (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-6">
                <Calendar className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Oops! Something went wrong</h3>
              <p className="text-gray-600 mb-6">{error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          )}
          
          {!loading && !error && events.length === 0 && (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-6">
                <Calendar className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Events Yet</h3>
              <p className="text-gray-600 mb-6">Be the first to create an amazing event!</p>
              <Link 
                to="/create-event"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
              >
                Create Event
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          )}
          
          {!loading && !error && events.length > 0 && (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {events.map((event, index) => (
                <div 
                  key={event.id} 
                  className="transform transition-all duration-500 hover:scale-105"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <EventCard event={event} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Call to action */}
        {!loading && !error && events.length > 0 && (
          <div className="text-center">
            <div className="inline-flex items-center space-x-6">
              <Link
                to="/events"
                className="group inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
              >
                <TrendingUp className="mr-2 w-5 h-5" />
                Explore All Events
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                to="/create-event"
                className="group inline-flex items-center px-8 py-4 text-lg font-semibold text-gray-700 bg-white border-2 border-gray-200 rounded-xl hover:border-indigo-300 hover:bg-indigo-50 transition-all duration-200"
              >
                Create Your Own
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Custom animations */}
      <style dangerouslySetInnerHTML={{
        __html: `
          .animation-delay-2000 {
            animation-delay: 2s;
          }
        `
      }} />
    </section>
  );
}