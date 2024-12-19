import { useState } from 'react';
import { Calendar, MapPin, Users, Share2, Clock, Globe, Mail, Phone, CreditCard } from 'lucide-react';
import EventVideoMeetingButton from './EventVideoMeetingButton';

export default function EventDetails({ event }) {
  const [selectedTickets, setSelectedTickets] = useState(1);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const handleTicketPurchase = () => {
    setShowPaymentModal(true);
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      {/* Event Details */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">{event.title}</h2>
        
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

        {/* Video Meeting Section */}
        {event.videoMeeting?.enableVideoMeeting && (
          <EventVideoMeetingButton 
            meetingId={event.videoMeeting.meetingId}
            isOrganizer={false}
          />
        )}

        {/* Ticket Purchase Section */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <span className="text-2xl font-bold text-gray-900">
              {event.price === 0 ? 'Free' : `${event.price} ETB`}
            </span>
            <div className="flex space-x-2">
              <select
                value={selectedTickets}
                onChange={(e) => setSelectedTickets(Number(e.target.value))}
                className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'ticket' : 'tickets'}
                  </option>
                ))}
              </select>
              <button
                onClick={handleTicketPurchase}
                disabled={event.tickets.available === 0}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                <CreditCard className="h-5 w-5 mr-2" />
                {event.tickets.available === 0 ? 'Sold Out' : 'Reserve Tickets'}
              </button>
            </div>
          </div>
        </div>

        {/* Contact Organizer */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Contact Organizer</h3>
          <div className="mt-4 space-y-2">
            <div className="flex items-center text-sm text-gray-600">
              <Mail className="h-5 w-5 mr-2" />
              <a href="mailto:contact@example.com" className="hover:text-indigo-600">
                contact@example.com
              </a>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Phone className="h-5 w-5 mr-2" />
              <a href="tel:+1234567890" className="hover:text-indigo-600">
                (123) 456-7890
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}