import React from 'react';
import type { Feature } from '../types';

interface ColorPaletteSelectorProps {
  feature: Feature | null;
  image: string | null;
  onColorSelect: (color: string) => void;
  onBack: () => void;
}

const wallColors = [
  { name: 'Swiss Coffee', hex: '#F1E9DA', textColor: '#4A4A4A' },
  { name: 'Greige', hex: '#BEB2A7', textColor: '#FFFFFF' },
  { name: 'Dusty Blue', hex: '#8C9A9E', textColor: '#FFFFFF' },
  { name: 'Sage Green', hex: '#B2AC88', textColor: '#FFFFFF' },
  { name: 'Warm Taupe', hex: '#A8998D', textColor: '#FFFFFF' },
  { name: 'Terracotta', hex: '#E2725B', textColor: '#FFFFFF' },
];

const floorOptions = [
  { name: 'Light Oak Wood', color: '#DEB887', textColor: '#4A4A4A' },
  { name: 'Dark Walnut Wood', color: '#654321', textColor: '#FFFFFF' },
  { name: 'Gray Wash Vinyl', color: '#BDBDBD', textColor: '#4A4A4A' },
  { name: 'Classic Marble Tile', color: '#F5F5F5', textColor: '#4A4A4A' },
  { name: 'Polished Concrete', color: '#808080', textColor: '#FFFFFF' },
  { name: 'Natural Slate', color: '#5A5A5A', textColor: '#FFFFFF' },
];

export const ColorPaletteSelector: React.FC<ColorPaletteSelectorProps> = ({ feature, image, onColorSelect, onBack }) => {
  const isRepaint = feature?.id === 'repaint';
  const options = isRepaint ? wallColors : floorOptions;
  const title = isRepaint ? 'Step 2: Choose a Wall Color' : 'Step 2: Select a Flooring';

  return (
    <div className="flex flex-col items-center text-center p-4">
      {image && (
        <div className="w-full max-w-sm aspect-square rounded-lg overflow-hidden shadow-lg mb-6">
            <img src={image} alt="Your uploaded room" className="w-full h-full object-cover" />
        </div>
      )}

      <h2 className="text-3xl font-serif text-brand-accent font-bold mb-2">{title}</h2>
      <p className="text-md text-brand-text mb-8">Select one of the options below to visualize it in your room.</p>
      
      <div className="grid grid-cols-2 gap-4 w-full">
        {options.map((option) => (
          <button 
            key={option.name}
            onClick={() => onColorSelect(option.name)}
            className="p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 text-left flex flex-col items-start aspect-square justify-end group border-2 border-transparent hover:border-brand-accent"
            style={{ 
              backgroundColor: isRepaint ? option.hex : option.color, 
              color: option.textColor || 'white' 
            }}
          >
            <span className="font-bold text-lg" style={{textShadow: '0 1px 2px rgba(0,0,0,0.4)'}}>{option.name}</span>
          </button>
        ))}
      </div>

       <div className="w-full max-w-xs mt-8">
        <button
          onClick={onBack}
          className="w-full bg-white text-brand-accent font-bold py-4 px-4 rounded-2xl shadow-lg transition-all duration-300 border-2 border-brand-secondary hover:shadow-xl hover:shadow-brand-accent/30 hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-brand-accent/50"
        >
          &larr; Use a different photo
        </button>
      </div>
    </div>
  );
};