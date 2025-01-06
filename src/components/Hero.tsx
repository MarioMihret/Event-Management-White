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
