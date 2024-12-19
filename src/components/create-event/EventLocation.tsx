import { MapPin, Globe } from 'lucide-react';

interface EventLocationProps {
  data: {
    type: 'physical' | 'virtual';
    venue: string;
    address: string;
    city: string;
    virtualLink: string;
  };
  onUpdate: (data: any) => void;
}

export default function EventLocation({ data, onUpdate }: EventLocationProps) {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Event Type
        </label>
        <div className="flex space-x-4">
          <button
            type="button"
            onClick={() => onUpdate({ type: 'physical' })}
            className={`flex items-center px-4 py-2 rounded-md ${
              data.type === 'physical'
                ? 'bg-indigo-100 text-indigo-700 border-2 border-indigo-500'
                : 'bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <MapPin className="w-5 h-5 mr-2" />
            Physical Event
          </button>
          <button
            type="button"
            onClick={() => onUpdate({ type: 'virtual' })}
            className={`flex items-center px-4 py-2 rounded-md ${
              data.type === 'virtual'
                ? 'bg-indigo-100 text-indigo-700 border-2 border-indigo-500'
                : 'bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Globe className="w-5 h-5 mr-2" />
            Virtual Event
          </button>
        </div>
      </div>

      {data.type === 'physical' ? (
        <div className="space-y-4">
          <div>
            <label htmlFor="venue" className="block text-sm font-medium text-gray-700">
              Venue Name
            </label>
            <input
              type="text"
              id="venue"
              value={data.venue}
              onChange={(e) => onUpdate({ venue: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Enter venue name"
            />
          </div>

          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
              Street Address
            </label>
            <input
              type="text"
              id="address"
              value={data.address}
              onChange={(e) => onUpdate({ address: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Enter street address"
            />
          </div>

          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700">
              City
            </label>
            <input
              type="text"
              id="city"
              value={data.city}
              onChange={(e) => onUpdate({ city: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Enter city"
            />
          </div>
        </div>
      ) : (
        <div>
          <label htmlFor="virtualLink" className="block text-sm font-medium text-gray-700">
            Virtual Event Link
          </label>
          <input
            type="url"
            id="virtualLink"
            value={data.virtualLink}
            onChange={(e) => onUpdate({ virtualLink: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Enter virtual event link (e.g., Zoom, Google Meet)"
          />
        </div>
      )}
    </div>
  );
}