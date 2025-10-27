
import React from 'react';
import type { Feature } from '../types';

interface LoadingViewProps {
  feature: Feature | null;
  image: string | null;
}

export const LoadingView: React.FC<LoadingViewProps> = ({ feature, image }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center pt-16">
      {image && (
        <div className="relative w-full max-w-sm aspect-square rounded-lg overflow-hidden shadow-xl mb-8">
            <img src={image} alt="Room to be redesigned" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                 <div className="w-16 h-16 border-4 border-t-4 border-gray-200 border-t-white rounded-full animate-spin"></div>
            </div>
        </div>
      )}
      <h2 className="text-3xl font-serif text-brand-accent font-bold mb-2 animate-pulse">Designing your space...</h2>
      <p className="text-md text-brand-text">
        Our AI is working its magic to {feature?.description.toLowerCase()}. This may take a moment.
      </p>
    </div>
  );
};
