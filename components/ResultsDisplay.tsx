import React, { useState } from 'react';
import { FullscreenModal } from './FullscreenModal';

interface ResultsDisplayProps {
  originalImage: string | null;
  resultImage: string | null;
  featureTitle: string;
  onReset: () => void;
  onBack: () => void;
}

const DownloadIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>
);

const ViewIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M10 4H4c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h6c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 8H4V6h6v6zm10-8h-6c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h6c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 8h-6V6h6v6zM10 15H4c-1.1 0-2 .9-2 2v2c0 1.1.9 2 2 2h6c1.1 0 2-.9 2-2v-2c0-1.1-.9-2-2-2zm0 4H4v-2h6v2zm10-4h-6c-1.1 0-2 .9-2 2v2c0 1.1.9 2 2 2h6c1.1 0 2-.9 2-2v-2c0-1.1-.9-2-2-2zm0 4h-6v-2h6v2z"/></svg>
);

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ originalImage, resultImage, featureTitle, onReset, onBack }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDownload = () => {
    if (!resultImage) return;
    const link = document.createElement('a');
    link.href = resultImage;
    link.download = `ai-design-${featureTitle.toLowerCase().replace(' ', '-')}.jpeg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <div className="flex flex-col items-center text-center p-4">
        <h2 className="text-3xl font-serif text-brand-accent font-bold mb-4">Your New Look!</h2>
        <p className="text-md text-brand-text mb-6">Here's how our AI reimagined your space with the "{featureTitle}" feature.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mb-6">
          <div className="w-full">
            <h3 className="font-bold mb-2">Before</h3>
            {originalImage && <img src={originalImage} alt="Original room" className="rounded-lg shadow-md w-full object-cover aspect-square" />}
          </div>
          <div className="w-full">
            <h3 className="font-bold mb-2">After</h3>
            {resultImage ? (
              <div className="relative group">
                <img src={resultImage} alt="AI redesigned room" className="rounded-lg shadow-md w-full object-cover aspect-square" />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 rounded-lg flex items-center justify-center gap-4">
                    <button 
                      onClick={() => setIsModalOpen(true)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/80 text-brand-accent p-3 rounded-full hover:bg-white"
                      aria-label="View fullscreen"
                    >
                        <ViewIcon className="w-6 h-6"/>
                    </button>
                    <button 
                      onClick={handleDownload}
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/80 text-brand-accent p-3 rounded-full hover:bg-white"
                      aria-label="Download image"
                    >
                        <DownloadIcon className="w-6 h-6"/>
                    </button>
                </div>
              </div>
            ) : (
               <div className="rounded-lg shadow-md w-full object-cover aspect-square bg-gray-200 flex items-center justify-center">
                  <p>Could not generate image.</p>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-xs">
           <button 
            onClick={onBack} 
            className="w-full bg-white text-brand-accent border-2 border-brand-primary font-bold py-3 px-4 rounded-xl shadow-sm hover:bg-brand-secondary transition-colors duration-300"
          >
            Try a Different Photo
          </button>
          <button 
            onClick={onReset} 
            className="w-full bg-brand-primary text-white font-bold py-3 px-4 rounded-xl shadow-md hover:bg-brand-accent transition-colors duration-300"
          >
            Start Over
          </button>
        </div>
      </div>
      {isModalOpen && resultImage && (
          <FullscreenModal imageSrc={resultImage} onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
};