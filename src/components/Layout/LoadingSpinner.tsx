import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingSpinner;