import { useState } from 'react';
import { Plus, Minus, X } from 'lucide-react';

interface TicketType {
  name: string;
  price: number;
  quantity: number;
  description: string;
}

interface EventTicketingProps {
  data: {
    type: 'free' | 'paid';
    price: number;
    availableTickets: number;
    ticketTypes: TicketType[];
  };
  onUpdate: (data: any) => void;
}

export default function EventTicketing({ data, onUpdate }: EventTicketingProps) {
  const [newTicketType, setNewTicketType] = useState<TicketType>({
    name: '',
    price: 0,
    quantity: 0,
    description: '',
  });

  const handleAddTicketType = () => {
    if (newTicketType.name && newTicketType.quantity > 0) {
      onUpdate({
        ticketTypes: [...data.ticketTypes, newTicketType],
      });
      setNewTicketType({
        name: '',
        price: 0,
        quantity: 0,
        description: '',
      });
    }
  };

  const handleRemoveTicketType = (index: number) => {
    onUpdate({
      ticketTypes: data.ticketTypes.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Ticket Type
        </label>
        <div className="flex space-x-4">
          <button
            type="button"
            onClick={() => onUpdate({ type: 'free' })}
            className={`flex items-center px-4 py-2 rounded-md ${
              data.type === 'free'
                ? 'bg-indigo-100 text-indigo-700 border-2 border-indigo-500'
                : 'bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            Free Event
          </button>
          <button
            type="button"
            onClick={() => onUpdate({ type: 'paid' })}
            className={`flex items-center px-4 py-2 rounded-md ${
              data.type === 'paid'
                ? 'bg-indigo-100 text-indigo-700 border-2 border-indigo-500'
                : 'bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            Paid Event
          </button>
        </div>
      </div>

      {data.type === 'paid' && (
        <div className="space-y-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Add Ticket Type</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="ticketName" className="block text-sm font-medium text-gray-700">
                  Ticket Name
                </label>
                <input
                  type="text"
                  id="ticketName"
                  value={newTicketType.name}
                  onChange={(e) => setNewTicketType({ ...newTicketType, name: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="e.g., Early Bird, VIP"
                />
              </div>
              <div>
                <label htmlFor="ticketPrice" className="block text-sm font-medium text-gray-700">
                  Price
                </label>
                <input
                  type="number"
                  id="ticketPrice"
                  value={newTicketType.price}
                  onChange={(e) => setNewTicketType({ ...newTicketType, price: Number(e.target.value) })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  min="0"
                  step="0.01"
                />
              </div>
              <div>
                <label htmlFor="ticketQuantity" className="block text-sm font-medium text-gray-700">
                  Quantity Available
                </label>
                <input
                  type="number"
                  id="ticketQuantity"
                  value={newTicketType.quantity}
                  onChange={(e) => setNewTicketType({ ...newTicketType, quantity: Number(e.target.value) })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  min="1"
                />
              </div>
              <div>
                <label htmlFor="ticketDescription" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <input
                  type="text"
                  id="ticketDescription"
                  value={newTicketType.description}
                  onChange={(e) => setNewTicketType({ ...newTicketType, description: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Ticket benefits or restrictions"
                />
              </div>
            </div>
            <button
              type="button"
              onClick={handleAddTicketType}
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add Ticket Type
            </button>
          </div>

          {/* Ticket Types List */}
          {data.ticketTypes.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Ticket Types</h3>
              <div className="space-y-2">
                {data.ticketTypes.map((ticket, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-white p-4 rounded-lg border border-gray-200"
                  >
                    <div>
                      <h4 className="font-medium text-gray-900">{ticket.name}</h4>
                      <p className="text-sm text-gray-500">{ticket.description}</p>
                      <div className="mt-1 text-sm text-gray-700">
                        ${ticket.price} • {ticket.quantity} available
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveTicketType(index)}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {data.type === 'free' && (
        <div>
          <label htmlFor="availableTickets" className="block text-sm font-medium text-gray-700">
            Available Tickets
          </label>
          <input
            type="number"
            id="availableTickets"
            value={data.availableTickets}
            onChange={(e) => onUpdate({ availableTickets: Number(e.target.value) })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            min="1"
          />
        </div>
      )}
    </div>
  );
}