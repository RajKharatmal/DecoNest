import React from 'react';

interface WelcomeProps {
  onNext: () => void;
}

export const Welcome: React.FC<WelcomeProps> = ({ onNext }) => {
  return (
    <div className="flex flex-col items-center text-center h-full justify-center">
      <h1 
        className="text-6xl font-serif font-bold text-brand-text mb-4"
        style={{ textShadow: '0 2px 8px rgba(50,50,50,0.2)' }}
      >
        Welcome
      </h1>
      <p 
        className="text-2xl text-brand-text/80 mb-12"
      >
        to DecoNest!
      </p>
      <button 
        onClick={onNext}
        className="bg-brand-primary text-white font-bold py-4 px-12 rounded-xl shadow-lg hover:bg-brand-accent transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-brand-accent/50"
      >
        Next &rarr;
      </button>
    </div>
  );
};