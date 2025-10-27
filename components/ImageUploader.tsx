import React, { useRef } from 'react';
import type { Feature } from '../types';

interface ImageUploaderProps {
  feature: Feature | null;
  onImageUpload: (file: File) => void;
  error: string | null;
  onBack: () => void;
}

const CameraIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm0-5c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/><path d="M12 14c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4zm-8 4c0-.99 2.33-2 6-2s6 1.01 6 2H4zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>
);

const GalleryIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M22 16V4c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2zm-11-4l2.03 2.71L16 11l4 5H8l3-4zM2 6v14c0 1.1.9 2 2 2h14v-2H4V6H2z"/></svg>
);


export const ImageUploader: React.FC<ImageUploaderProps> = ({ feature, onImageUpload, error, onBack }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      onImageUpload(event.target.files[0]);
    }
  };

  return (
    <div className="flex flex-col items-center text-center p-4">
      <h2 className="text-3xl font-serif text-brand-accent font-bold mb-2">Step 1: Upload a Photo</h2>
      <p className="text-md text-brand-text mb-8">Take a picture or select one from your gallery for the "{feature?.title}" feature.</p>
      
      {error && <p className="bg-red-100 text-red-700 p-3 rounded-lg mb-6">{error}</p>}
      
      <div className="space-y-4 w-full max-w-xs">
        <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
        <button 
          onClick={() => fileInputRef.current?.click()}
          className="w-full bg-brand-primary text-white font-bold py-4 px-4 rounded-xl shadow-md hover:bg-brand-accent transition-colors duration-300 flex items-center justify-center"
        >
          <GalleryIcon className="w-6 h-6 mr-3" />
          Upload from Gallery
        </button>
        
        <input type="file" accept="image/*" capture="environment" ref={cameraInputRef} onChange={handleFileChange} className="hidden" />
        <button 
          onClick={() => cameraInputRef.current?.click()}
          className="w-full bg-white text-brand-accent border-2 border-brand-secondary font-bold py-4 px-4 rounded-xl shadow-sm hover:bg-brand-secondary transition-colors duration-300 flex items-center justify-center"
        >
          <CameraIcon className="w-6 h-6 mr-3" />
          Use Camera
        </button>
      </div>

      <div className="w-full max-w-xs mt-8">
        <button
          onClick={onBack}
          className="w-full bg-white text-brand-accent font-bold py-4 px-4 rounded-2xl shadow-lg transition-all duration-300 border-2 border-brand-secondary hover:shadow-xl hover:shadow-brand-accent/30 hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-brand-accent/50"
        >
          &larr; Back to Features
        </button>
      </div>
    </div>
  );
};