import { useState } from 'react';
import { useEvents } from '../../context/EventContext';
// import { useAuth } from '../../hooks/useAuth';
import { Calendar, Users, DollarSign, BarChart } from 'lucide-react';
import EventSalesChart from './EventSalesChart';
import EventAttendeesList from './EventAttendeesList';

export default function OrganizerDashboard() {
  // const { user } = useAuth();
  const { events } = useEvents();
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);

  // Filter events for the current organizer
  const organizerEvents = events.filter(event => event.organizer === user?.id);

  const stats = {
    totalEvents: organizerEvents.length,
    totalAttendees: organizerEvents.reduce((sum, event) => sum + (event.tickets.total - event.tickets.available), 0),
    totalRevenue: organizerEvents.reduce((sum, event) => sum + (event.price * (event.tickets.total - event.tickets.available)), 0),
  };

  return (
    <div className="min-h-screen py-8 bg-gray-50">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900">Organizer Dashboard</h1>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 gap-5 mt-8 sm:grid-cols-3">
          <div className="overflow-hidden bg-white rounded-lg shadow">
            <div className="p-5">
              <div className="flex items-center">
                <Calendar className="w-6 h-6 text-gray-400" />
                <div className="ml-5">
                  <p className="text-sm font-medium text-gray-500">Total Events</p>
                  <p className="text-2xl font-semibold text-gray-900">{stats.totalEvents}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-hidden bg-white rounded-lg shadow">
            <div className="p-5">
              <div className="flex items-center">
                <Users className="w-6 h-6 text-gray-400" />
                <div className="ml-5">
                  <p className="text-sm font-medium text-gray-500">Total Attendees</p>
                  <p className="text-2xl font-semibold text-gray-900">{stats.totalAttendees}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-hidden bg-white rounded-lg shadow">
            <div className="p-5">
              <div className="flex items-center">
                <DollarSign className="w-6 h-6 text-gray-400" />
                <div className="ml-5">
                  <p className="text-sm font-medium text-gray-500">Total Revenue</p>
                  <p className="text-2xl font-semibold text-gray-900">${stats.totalRevenue}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Event Selection */}
        <div className="mt-8">
          <label htmlFor="event" className="block text-sm font-medium text-gray-700">
            Select Event
          </label>
          <select
            id="event"
            value={selectedEvent || ''}
            onChange={(e) => setSelectedEvent(e.target.value)}
            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">All Events</option>
            {organizerEvents.map((event) => (
              <option key={event.id} value={event.id}>
                {event.title}
              </option>
            ))}
          </select>
        </div>

        {/* Sales Chart */}
        <div className="mt-8">
          <h2 className="text-lg font-medium text-gray-900">Sales Overview</h2>
          <div className="p-6 mt-4 bg-white rounded-lg shadow">
            <EventSalesChart eventId={selectedEvent} />
          </div>
        </div>

        {/* Attendees List */}
        <div className="mt-8">
          <h2 className="text-lg font-medium text-gray-900">Recent Attendees</h2>
          <div className="mt-4">
            <EventAttendeesList eventId={selectedEvent} />
          </div>
        </div>
      </div>
    </div>
  );
}