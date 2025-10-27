import React from 'react';
import type { Feature } from '../types';

const BrushIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M7 14c-1.66 0-3 1.34-3 3 0 1.31-1.16 2-2 2 .92 1.22 2.49 2 4 2 2.21 0 4-1.79 4-4 0-1.66-1.34-3-3-3zm13.71-9.37c-.39-.39-1.02-.39-1.41 0L18 5.92 9.28 14.63c.33.27.63.58.89.93l9.2-9.19c.38-.38.38-1.02 0-1.41zM2 20h2v2H2z"/></svg>
);
const SofaIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M22 10v1c0 .55-.45 1-1 1h-1v1c0 1.1-.9 2-2 2h-2V9h2c1.1 0 2 .9 2 2zM5 11H4c-.55 0-1-.45-1-1v-1c0-1.1.9-2 2-2h2v6H5v-1zm13-1c0-.55-.45-1-1-1H7v2h10c.55 0 1-.45 1-1zm-7 8H9v-2H7v2c-1.1 0-2-.9-2-2v-1H4c-1.1 0-2-.9-2-2v-1c0-1.65 1.35-3 3-3h14c1.65 0 3 1.35 3 3v1c0 1.1-.9 2-2 2h-1v1c0 1.1-.9 2-2 2z"/></svg>
);
const PaintRollerIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M22 18V2H6v4H4v12h2v-2h14v2h2zM16 8h-4V4h4v4zm-6 0H8V4h2v4zM6 14v-2h12v2H6z"/></svg>
);
const LayersIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M11.99 18.54l-7.37-5.73L3 14.07l9 7 9-7-1.63-1.27zM12 16l7.36-5.73L21 9l-9-7-9 7 1.63 1.27L12 16z"/></svg>
);

const features: Feature[] = [
  { id: 'style', title: 'Style Transfer', description: 'Change furniture texture & color', icon: BrushIcon },
  { id: 'furnish', title: 'Auto Furnish', description: 'Add recommended furniture', icon: SofaIcon },
  { id: 'repaint', title: 'Re-paint', description: 'Change the paint on your walls', icon: PaintRollerIcon },
  { id: 'floor', title: 'Floor Change', description: 'Swap out flooring materials', icon: LayersIcon },
];

interface FeatureGridProps {
  onFeatureSelect: (feature: Feature) => void;
  onViewHistory: () => void;
}

const HistoryIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M13 3a9 9 0 0 0-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42A8.954 8.954 0 0 0 13 21a9 9 0 0 0 0-18zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/></svg>
);

export const FeatureGrid: React.FC<FeatureGridProps> = ({ onFeatureSelect, onViewHistory }) => {
  return (
    <div className="text-center">
       <h1 
        className="text-4xl font-serif font-bold text-brand-text mb-4 leading-tight"
        style={{ textShadow: '0 2px 8px rgba(50,50,50,0.2)' }}
       >
        Your space, your story, design it with confidence.
      </h1>
      <p 
        className="text-lg font-bold text-brand-accent uppercase tracking-widest mb-10"
        style={{ textShadow: '0 1px 4px rgba(50,50,50,0.2)' }}
      >
        Take your tools, your weapons!!
      </p>
      <div className="grid grid-cols-2 gap-4 mb-6">
        {features.map((feature) => (
          <button
            key={feature.id}
            onClick={() => onFeatureSelect(feature)}
            className="bg-white/80 p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 text-left flex flex-col items-start aspect-square justify-between group hover:bg-white"
          >
            <div>
              <feature.icon className="h-8 w-8 text-brand-accent mb-2 transition-transform duration-300 group-hover:scale-110" />
              <h3 className="font-bold text-brand-text text-lg">{feature.title}</h3>
            </div>
            <p className="text-sm text-gray-500">{feature.description}</p>
          </button>
        ))}
      </div>

      <button
        onClick={onViewHistory}
        className="w-full bg-brand-accent text-white font-bold py-3 px-4 rounded-xl shadow-md hover:bg-brand-primary transition-colors duration-300 flex items-center justify-center gap-2"
      >
        <HistoryIcon className="w-5 h-5" />
        View Your Design History
      </button>
    </div>
  );
};