import React from 'react';

interface FullscreenModalProps {
  imageSrc: string;
  onClose: () => void;
}

export const FullscreenModal: React.FC<FullscreenModalProps> = ({ imageSrc, onClose }) => {
  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="relative max-w-4xl max-h-[90vh]"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on the image container
      >
        <img src={imageSrc} alt="Fullscreen design" className="w-auto h-auto max-w-full max-h-full object-contain rounded-lg shadow-2xl" />
        <button 
          onClick={onClose}
          className="absolute -top-2 -right-2 bg-white text-black rounded-full h-8 w-8 flex items-center justify-center text-lg font-bold hover:bg-gray-200 transition-colors"
          aria-label="Close fullscreen view"
        >
          &times;
        </button>
      </div>
    </div>
  );
};
