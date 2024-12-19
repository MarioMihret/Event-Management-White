import { createContext, useContext, useState, ReactNode } from 'react';
import { Event } from '../types';

interface EventContextType {
  events: Event[];
  addEvent: (event: Event) => void;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export function EventProvider({ children }: { children: ReactNode }) {
  const [events, setEvents] = useState<Event[]>([
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
    }
  ]);

  const addEvent = (event: Event) => {
    setEvents((prevEvents) => [...prevEvents, { ...event, id: String(prevEvents.length + 1) }]);
  };

  return (
    <EventContext.Provider value={{ events, addEvent }}>
      {children}
    </EventContext.Provider>
  );
}

export function useEvents() {
  const context = useContext(EventContext);
  if (context === undefined) {
    throw new Error('useEvents must be used within an EventProvider');
  }
  return context;
}