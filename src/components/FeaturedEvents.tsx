import { Event } from '../types';
import EventCard from './EventCard';

const FEATURED_EVENTS: Event[] = [
  {
    id: '1',
    title: 'Tech Conference 2024',
    description: 'Join us for the biggest tech conference of the year featuring industry leaders and innovative workshops.',
    date: '2024-06-15',
    location: 'San Francisco, CA',
    price: 299,
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    organizer: 'Tech Events Inc',
    category: 'Technology',
    tickets: {
      available: 250,
      total: 1000
    }
  },
  {
    id: '2',
    title: 'Music Festival',
    description: 'A three-day music festival featuring top artists from around the world.',
    date: '2024-07-20',
    location: 'Austin, TX',
    price: 199,
    image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    organizer: 'Festival Productions',
    category: 'Music',
    tickets: {
      available: 5000,
      total: 10000
    }
  },
  {
    id: '3',
    title: 'Food & Wine Expo',
    description: 'Experience the finest cuisines and wines from renowned chefs and sommeliers.',
    date: '2024-08-10',
    location: 'New York, NY',
    price: 150,
    image: 'https://images.unsplash.com/photo-1510924199351-4e9d94df18a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    organizer: 'Culinary Arts Association',
    category: 'Food & Drink',
    tickets: {
      available: 750,
      total: 1000
    }
  }
];

export default function FeaturedEvents() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Featured Events
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Discover amazing events happening near you
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {FEATURED_EVENTS.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </section>
  );
}