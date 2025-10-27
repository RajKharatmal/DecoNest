import React, { useState, useEffect } from 'react';
import { getUserDesigns, Design } from '../services/databaseService';
import { FullscreenModal } from './FullscreenModal';

interface HistoryProps {
  userId: string | null;
  onBack: () => void;
}

const HistoryIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M13 3a9 9 0 0 0-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42A8.954 8.954 0 0 0 13 21a9 9 0 0 0 0-18zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/></svg>
);

const DownloadIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>
);

const ViewIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M10 4H4c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h6c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 8H4V6h6v6zm10-8h-6c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h6c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 8h-6V6h6v6zM10 15H4c-1.1 0-2 .9-2 2v2c0 1.1.9 2 2 2h6c1.1 0 2-.9 2-2v-2c0-1.1-.9-2-2-2zm0 4H4v-2h6v2zm10-4h-6c-1.1 0-2 .9-2 2v2c0 1.1.9 2 2 2h6c1.1 0 2-.9 2-2v-2c0-1.1-.9-2-2-2zm0 4h-6v-2h6v2z"/></svg>
);

export const History: React.FC<HistoryProps> = ({ userId, onBack }) => {
  const [designs, setDesigns] = useState<Design[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const loadDesigns = async () => {
      if (!userId) {
        setLoading(false);
        return;
      }
      const userDesigns = await getUserDesigns(userId);
      setDesigns(userDesigns);
      setLoading(false);
    };
    loadDesigns();
  }, [userId]);

  const handleDownload = (imageUrl: string, featureType: string, date: string) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `deconest-${featureType}-${date}.jpeg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getFeatureTitle = (featureType: string): string => {
    const titles: Record<string, string> = {
      style: 'Style Transfer',
      furnish: 'Auto Furnish',
      repaint: 'Re-paint',
      floor: 'Floor Change',
    };
    return titles[featureType] || featureType;
  };

  return (
    <>
      <div className="flex flex-col items-center text-center p-4">
        <HistoryIcon className="w-12 h-12 text-brand-accent mb-4" />
        <h2 className="text-3xl font-serif text-brand-accent font-bold mb-2">Your Design History</h2>
        <p className="text-md text-brand-text mb-6">View all your past AI-generated designs.</p>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="w-12 h-12 border-4 border-t-4 border-gray-200 border-t-brand-accent rounded-full animate-spin"></div>
          </div>
        ) : designs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-brand-text text-lg mb-4">No designs yet!</p>
            <p className="text-gray-500">Start creating your first design to see it here.</p>
          </div>
        ) : (
          <div className="w-full space-y-6 max-h-96 overflow-y-auto">
            {designs.map((design) => (
              <div key={design.id} className="bg-white/50 rounded-xl p-4 shadow-md">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-lg text-brand-text">{getFeatureTitle(design.feature_type)}</h3>
                  <span className="text-xs text-gray-500">
                    {new Date(design.created_at).toLocaleDateString()}
                  </span>
                </div>
                {design.color_selection && (
                  <p className="text-sm text-gray-600 mb-3">Color: {design.color_selection}</p>
                )}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-xs font-semibold mb-1 text-gray-600">Before</p>
                    <img
                      src={design.original_image_url}
                      alt="Original"
                      className="w-full aspect-square object-cover rounded-lg shadow-sm"
                    />
                  </div>
                  <div>
                    <p className="text-xs font-semibold mb-1 text-gray-600">After</p>
                    <div className="relative group">
                      <img
                        src={design.result_image_url}
                        alt="Result"
                        className="w-full aspect-square object-cover rounded-lg shadow-sm"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 rounded-lg flex items-center justify-center gap-2">
                        <button
                          onClick={() => setSelectedImage(design.result_image_url)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 text-brand-accent p-2 rounded-full hover:bg-white"
                          aria-label="View fullscreen"
                        >
                          <ViewIcon className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() =>
                            handleDownload(
                              design.result_image_url,
                              design.feature_type,
                              new Date(design.created_at).toISOString().split('T')[0]
                            )
                          }
                          className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 text-brand-accent p-2 rounded-full hover:bg-white"
                          aria-label="Download image"
                        >
                          <DownloadIcon className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="w-full max-w-xs mt-8">
          <button
            onClick={onBack}
            className="w-full bg-white text-brand-accent font-bold py-4 px-4 rounded-2xl shadow-lg transition-all duration-300 border-2 border-brand-secondary hover:shadow-xl hover:shadow-brand-accent/30 hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-brand-accent/50"
          >
            &larr; Back to Home
          </button>
        </div>
      </div>
      {selectedImage && <FullscreenModal imageSrc={selectedImage} onClose={() => setSelectedImage(null)} />}
    </>
  );
};
