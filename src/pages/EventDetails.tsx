import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Calendar,
  MapPin,
  Users,
  Share2,
  Clock,
  Mail,
  Phone,
  CreditCard,
  
  AlertCircle,
} from 'lucide-react';
import { useEvents } from '../context/EventContext';
import PaymentModal from '../components/PaymentModal';

export default function EventDetails() {
  const [selectedTickets, setSelectedTickets] = useState(1);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const { id } = useParams();
  const { events } = useEvents();

  const event = events.find(e => e.id === id);

  if (!event) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-red-500" />
          <h2 className="mt-2 text-lg font-medium text-gray-900">Event not found</h2>
        </div>
      </div>
    );
  }

  const handleTicketPurchase = () => {
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = () => {
    setShowPaymentModal(false);
    // In a real app, we would update the ticket count and show a success message
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Hero Section */}
      <div className="relative h-96">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
            <div className="max-w-3xl">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                {event.category}
              </span>
              <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
                {event.title}
              </h1>
              <div className="mt-4 flex flex-wrap gap-4">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  <span>{new Date(event.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  <span>{new Date(event.date).toLocaleTimeString()}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span>{event.location}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Description */}
            <section className="prose max-w-none">
              <h2 className="text-2xl font-bold text-gray-900">About This Event</h2>
              <p className="text-gray-600">{event.description}</p>
            </section>

            {/* Agenda */}
            <section className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Event Schedule</h2>
              <div className="space-y-4">
                {AGENDA.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow-sm p-4 flex items-start"
                  >
                    <div className="min-w-[100px] text-indigo-600 font-medium">
                      {item.time}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{item.title}</h3>
                      <p className="text-gray-500 text-sm">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Speakers */}
            <section className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Speakers</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {SPEAKERS.map((speaker, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow-sm p-6 flex items-start space-x-4"
                  >
                    <img
                      src={speaker.image}
                      alt={speaker.name}
                      className="h-16 w-16 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-medium text-gray-900">{speaker.name}</h3>
                      <p className="text-sm text-gray-500">{speaker.role} at {speaker.company}</p>
                      <p className="mt-2 text-sm text-indigo-600">{speaker.topic}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="mt-8 lg:mt-0">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <div className="mb-4">
                <span className="text-3xl font-bold text-gray-900">
                  {event.price === 0 ? 'Free' : `${event.price} ETB`}
                </span>
              </div>

              <div className="space-y-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Users className="h-5 w-5 mr-2" />
                  <span>{event.tickets.available} tickets remaining</span>
                </div>

                <div>
                  <label htmlFor="tickets" className="block text-sm font-medium text-gray-700">
                    Number of Tickets
                  </label>
                  <select
                    id="tickets"
                    value={selectedTickets}
                    onChange={(e) => setSelectedTickets(Number(e.target.value))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  >
                    {[1, 2, 3, 4, 5].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'ticket' : 'tickets'} ({num * event.price} ETB)
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={handleTicketPurchase}
                  disabled={event.tickets.available === 0}
                  className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  <CreditCard className="h-5 w-5 mr-2" />
                  {event.tickets.available === 0 ? 'Sold Out' : 'Reserve Tickets'}
                </button>

                <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50">
                  <Share2 className="h-5 w-5 mr-2" />
                  Share Event
                </button>
              </div>

              {/* Contact Organizer */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Contact Organizer</h3>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <Mail className="h-5 w-5 mr-2" />
                    <a href="mailto:contact@techeventsinc.com" className="hover:text-indigo-600">
                      contact@techeventsinc.com
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
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && event && (
        <PaymentModal
          event={event}
          selectedTickets={selectedTickets}
          onClose={() => setShowPaymentModal(false)}
          onSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  );
}

// Mock data for the example
const SPEAKERS = [
  {
    name: 'Sarah Johnson',
    role: 'AI Research Director',
    company: 'TechCorp',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    topic: 'The Future of AI in Enterprise',
  },
  {
    name: 'Michael Chen',
    role: 'CTO',
    company: 'InnovateLabs',
    image: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    topic: 'Scaling Cloud Infrastructure',
  },
];

const AGENDA = [
  {
    time: '09:00 AM',
    title: 'Registration & Breakfast',
    description: 'Check-in and enjoy networking breakfast',
  },
  {
    time: '10:00 AM',
    title: 'Keynote: The Future of Technology',
    description: 'Opening keynote by Sarah Johnson',
  },
  {
    time: '11:30 AM',
    title: 'Break-out Sessions',
    description: 'Choose from 3 parallel tracks',
  },
];