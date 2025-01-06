import React from 'react';
import { Calendar } from 'lucide-react';

const FooterCopyright: React.FC = () => {
  return (
    <div className="pt-8 mt-8 border-t border-white/10">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Calendar className="w-6 h-6 text-purple-400" />
          <span className="font-semibold">EventHub</span>
        </div>
        <p className="text-gray-400 text-sm">
          © {new Date().getFullYear()} EventHub. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default FooterCopyright; // Default export added here
