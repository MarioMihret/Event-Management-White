import { Calendar, Users2, Ticket } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <div className="relative bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block xl:inline">Create and Join</span>{' '}
                <span className="block text-indigo-600 xl:inline">Amazing Events</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                The ultimate platform for event organizers and attendees. Create, manage, and discover events that matter to you.
              </p>
              <div className="mt-8">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 lg:grid-cols-3">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <Calendar className="h-6 w-6 text-indigo-600" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">Plan with Ease</h3>
                      <p className="mt-1 text-base text-gray-500">Organize events effortlessly.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <Users2 className="h-6 w-6 text-indigo-600" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">Connect People</h3>
                      <p className="mt-1 text-base text-gray-500">Bring communities together.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <Ticket className="h-6 w-6 text-indigo-600" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">Sell Tickets</h3>
                      <p className="mt-1 text-base text-gray-500">Seamlessly manage ticketing.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-10 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <Link
                    to="/create-event"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                  >
                    Create Event
                  </Link>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <Link
                    to="/events"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10"
                  >
                    Browse Events
                  </Link>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <img
          className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
          src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
          alt="Large audience at a concert with vibrant stage lighting"
        />
      </div>
    </div>
  );
}
