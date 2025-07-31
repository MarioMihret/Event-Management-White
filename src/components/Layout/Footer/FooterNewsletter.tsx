import React from 'react';

const FooterNewsletter: React.FC = () => {
  return (
    <div>
      <h3 className="text-sm font-semibold mb-4">Subscribe to our newsletter</h3>
      <p className="text-gray-400 mb-4">
        Get the latest updates on new features and upcoming events.
      </p>
      <form className="flex gap-2">
        <input
          type="email"
          placeholder="Enter your email"
          className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-purple-500"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white font-semibold hover:opacity-90"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
};
export default FooterNewsletter;