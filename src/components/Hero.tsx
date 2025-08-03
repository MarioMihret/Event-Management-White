import { Calendar, Users2, ArrowRight, Play, Star, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <div className="relative bg-gradient-to-br from-indigo-50 via-white to-purple-50 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center min-h-screen py-12 lg:py-0">
          {/* Left content */}
          <div className="lg:col-span-6">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-100 text-indigo-800 text-sm font-medium mb-8 animate-fade-in">
              <Star className="w-4 h-4 mr-2" />
              #1 Event Management Platform
            </div>

            {/* Main heading */}
            <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight animate-slide-up">
              Create
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                Unforgettable
              </span>
              <span className="block">Events</span>
            </h1>

            {/* Subtitle */}
            <p className="mt-6 text-xl text-gray-600 max-w-2xl animate-slide-up animation-delay-200">
              The ultimate platform that brings people together. Create, manage, and discover events that inspire, connect, and transform communities.
            </p>

            {/* Stats */}
            <div className="mt-8 grid grid-cols-3 gap-6 animate-slide-up animation-delay-400">
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-indigo-600">10K+</div>
                <div className="text-sm text-gray-500">Events Created</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-purple-600">50K+</div>
                <div className="text-sm text-gray-500">Happy Users</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-pink-600">99%</div>
                <div className="text-sm text-gray-500">Success Rate</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4 animate-slide-up animation-delay-600">
              <Link
                to="/create-event"
                className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
              >
                Create Your Event
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/events"
                className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-gray-700 bg-white border-2 border-gray-200 rounded-xl hover:border-indigo-300 hover:bg-indigo-50 transition-all duration-200"
              >
                <Play className="mr-2 w-5 h-5" />
                Explore Events
              </Link>
            </div>
          </div>

          {/* Right content - Features */}
          <div className="lg:col-span-6 mt-12 lg:mt-0">
            <div className="relative">
              {/* Main image */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl animate-fade-in animation-delay-800">
                <img
                  className="w-full h-96 lg:h-[500px] object-cover"
                  src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                  alt="Large audience at a concert with vibrant stage lighting"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>

              {/* Floating feature cards */}
              <div className="absolute -left-6 top-8 bg-white rounded-xl shadow-lg p-4 animate-float">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">Easy Planning</div>
                    <div className="text-xs text-gray-500">Intuitive tools</div>
                  </div>
                </div>
              </div>

              <div className="absolute -right-6 top-32 bg-white rounded-xl shadow-lg p-4 animate-float animation-delay-1000">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Users2 className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">Global Reach</div>
                    <div className="text-xs text-gray-500">Connect worldwide</div>
                  </div>
                </div>
              </div>

              <div className="absolute -left-4 bottom-8 bg-white rounded-xl shadow-lg p-4 animate-float animation-delay-2000">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">Analytics</div>
                    <div className="text-xs text-gray-500">Track success</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom animations */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes blob {
            0% { transform: translate(0px, 0px) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
            100% { transform: translate(0px, 0px) scale(1); }
          }
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
          @keyframes fade-in {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes slide-up {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-blob { animation: blob 7s infinite; }
          .animate-float { animation: float 3s ease-in-out infinite; }
          .animate-fade-in { animation: fade-in 1s ease-out; }
          .animate-slide-up { animation: slide-up 1s ease-out; }
          .animation-delay-200 { animation-delay: 0.2s; }
          .animation-delay-400 { animation-delay: 0.4s; }
          .animation-delay-600 { animation-delay: 0.6s; }
          .animation-delay-800 { animation-delay: 0.8s; }
          .animation-delay-1000 { animation-delay: 1s; }
          .animation-delay-2000 { animation-delay: 2s; }
          .animation-delay-4000 { animation-delay: 4s; }
        `
      }} />
    </div>
  );
}
