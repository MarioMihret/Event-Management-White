import React, { useState } from 'react';
import { Search, X } from 'lucide-react';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleClear = () => {
    setQuery('');
  };

  return (
    <div className={`relative group ${isFocused ? 'w-64' : 'w-48'} transition-all duration-300`}>
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 
        group-hover:text-purple-400 transition-colors" />
      
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder="Search events..."
        className="w-full pl-10 pr-8 py-2 bg-white/5 border border-white/10 rounded-lg 
          text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 
          focus:ring-1 focus:ring-purple-500 transition-all"
      />

      {query && (
        <button
          onClick={handleClear}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 
            text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
