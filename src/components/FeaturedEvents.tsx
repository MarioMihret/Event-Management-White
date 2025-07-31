import { useState, useEffect } from 'react';
import { Event } from '../types';
import EventCard from './EventCard';
import eventService from '../services/eventService';

export default function FeaturedEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const fetchedEvents = await eventService.getEvents();
        setEvents(fetchedEvents.slice(0, 3)); // Take the first 3 events as featured
      } catch (err) {
        setError('Failed to load events. Please try again later.');
      }
      setLoading(false);
    };

    fetchEvents();
  }, []);

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
        <div className="mt-12">
          {loading && <p className="text-center">Loading events...</p>}
          {error && <p className="text-center text-red-500">{error}</p>}
          {!loading && !error && (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {events.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}