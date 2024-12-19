// import { useAuth } from '../../hooks/useAuth';
import { useEvents } from '../../context/EventContext';
import { Ticket, Calendar, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AttendeeDashboard() {
  // const { user } = useAuth();
  const { events } = useEvents();

  // In a real app, you would fetch the user's purchased tickets from the backend
  const purchasedTickets = [
    {
      eventId: '1',
      quantity: 2,
      purchaseDate: '2024-03-01',
      status: 'active',
    },
  ];

  const ticketedEvents = events.filter(event => 
    purchasedTickets.some(ticket => ticket.eventId === event.id)
  );

  return (
    <div className="min-h-screen py-8 bg-gray-50">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900">My Tickets</h1>

        <div className="mt-8">
          {ticketedEvents.length > 0 ? (
            <div className="grid gap-6">
              {ticketedEvents.map((event) => {
                const ticket = purchasedTickets.find(t => t.eventId === event.id)!;
                return (
                  <div
                    key={event.id}
                    className="overflow-hidden bg-white rounded-lg shadow"
                  >
                    <div className="p-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium text-gray-900">
                          {event.title}
                        </h3>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {ticket.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="w-5 h-5 mr-2" />
                          {new Date(event.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <MapPin className="w-5 h-5 mr-2" />
                          {event.location}
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center text-sm text-gray-500">
                          <Ticket className="w-5 h-5 mr-2" />
                          {ticket.quantity} {ticket.quantity === 1 ? 'ticket' : 'tickets'}
                        </div>
                        <Link
                          to={`/events/${event.id}`}
                          className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700"
                        >
                          View Event
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="py-12 text-center">
              <Ticket className="w-12 h-12 mx-auto text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No tickets yet</h3>
              <p className="mt-1 text-sm text-gray-500">
                Get started by browsing available events.
              </p>
              <div className="mt-6">
                <Link
                  to="/events"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700"
                >
                  Browse Events
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}