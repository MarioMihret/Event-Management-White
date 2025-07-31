<<<<<<< HEAD
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
=======
// import React from 'react';
// import { Calendar, Sparkles, Users } from 'lucide-react';

// const Hero = () => {
//   return (
//     <div className="relative min-h-screen overflow-hidden">
//       Background Image with Overlay
//       <div
//         className="absolute inset-0 bg-cover bg-center bg-no-repeat"
//         style={{
//           backgroundImage:
//             'url("https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80")',
//         }}
//       >
//         <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
//       </div>

//       {/* Animated Particles */}
//       <div className="absolute inset-0">
//         {[...Array(20)].map((_, i) => (
//           <div
//             key={i}
//             className="absolute animate-float"
//             style={{
//               left: `${Math.random() * 100}%`,
//               top: `${Math.random() * 100}%`,
//               animationDelay: `${Math.random() * 5}s`,
//               animationDuration: `${5 + Math.random() * 5}s`,
//             }}
//           >
//             <div className="h-2 w-2 bg-white/20 rounded-full" />
//           </div>
//         ))}
//       </div>

//       {/* Content */}
//       <div className="relative container mx-auto px-6 h-screen flex flex-col justify-center">
//         <div className="max-w-3xl animate-fade-in">
//           <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-slide-up">
//             Creatin{' '}
//             <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
//               Unforgettable
//             </span>{' '}
//             Experiences
//           </h1>

//           <p className="text-xl text-gray-300 mb-8 animate-slide-up-delay">
//             Transforming your vision into extraordinary events. Specializing in
//             corporate gatherings, dream weddings, and exclusive celebrations
//             tailored to your unique style.
//           </p>

//           {/* Stats */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
//             {[
//               { icon: Calendar, label: 'Events Organized', value: '500+' },
//               { icon: Users, label: 'Happy Clients', value: '1000+' },
//               { icon: Sparkles, label: 'Years Experience', value: '15+' },
//             ].map(({ icon: Icon, label, value }, index) => (
//               <div
//                 key={label}
//                 className="bg-white/10 backdrop-blur-md rounded-lg p-4 transform hover:scale-105 transition-all duration-300"
//                 style={{ animationDelay: `${index * 0.2}s` }}
//               >
//                 <Icon className="w-8 h-8 text-purple-400 mb-2" />
//                 <div className="text-2xl font-bold text-white">{value}</div>
//                 <div className="text-gray-300">{label}</div>
//               </div>
//             ))}
//           </div>

//           {/* CTAs */}
//           <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-delay">
//             <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white font-semibold hover:opacity-90 transform hover:scale-105 transition-all duration-300">
//               Get Free Consultation
//             </button>
//             <button className="px-8 py-4 bg-white/10 backdrop-blur-md rounded-full text-white font-semibold hover:bg-white/20 transform hover:scale-105 transition-all duration-300">
//               View Our Portfolio
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Hero;
>>>>>>> 34a2d352adaefa9df4bc1ecb6a50c8f0fdd37605
