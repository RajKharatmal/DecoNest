import React, { useState, useCallback, useEffect } from 'react';
import { Welcome } from './components/Welcome';
import { FeatureGrid } from './components/FeatureGrid';
import { ImageUploader } from './components/ImageUploader';
import { ResultsDisplay } from './components/ResultsDisplay';
import { LoadingView } from './components/LoadingView';
import { ColorPaletteSelector } from './components/ColorPaletteSelector';
import { EmailCollector } from './components/EmailCollector';
import type { Feature } from './types';
import { generateDesign } from './services/geminiService';

type View = 'WELCOME' | 'EMAIL_COLLECTION' | 'HOME' | 'UPLOADING' | 'COLOR_SELECTION' | 'PROCESSING' | 'RESULTS';

const App: React.FC = () => {
  const [view, setView] = useState<View>('WELCOME');
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState<string>('');
  
  useEffect(() => {
    const savedEmail = localStorage.getItem('userEmail');
    if (savedEmail) {
      setView('HOME');
    } else {
      setView('WELCOME');
    }
  }, []);

  const handleWelcomeNext = () => {
    setView('EMAIL_COLLECTION');
  }

  const handleEmailSubmit = (email: string) => {
    localStorage.setItem('userEmail', email);
    setView('HOME');
  };

  const handleFeatureSelect = (feature: Feature) => {
    setSelectedFeature(feature);
    setError(null);
    setOriginalImage(null);
    setResultImage(null);
    setSelectedColor(null);
    setView('UPLOADING');
  };
  
  const handleImageUpload = useCallback(async (file: File) => {
    if (!selectedFeature) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Data = (reader.result as string).split(',')[1];
      setOriginalImage(reader.result as string);
      setMimeType(file.type);
      setError(null);
      
      if (selectedFeature.id === 'repaint' || selectedFeature.id === 'floor') {
          setView('COLOR_SELECTION');
      } else {
          setView('PROCESSING');
          try {
            const generatedImage = await generateDesign(selectedFeature, base64Data, file.type, null);

            if (generatedImage) {
              setResultImage(`data:image/jpeg;base64,${generatedImage}`);
            }
            setView('RESULTS');
          } catch (e) {
            console.error(e);
            setError('Sorry, something went wrong while generating your design. Please try again.');
            setView('UPLOADING');
          }
      }
    };
    reader.readAsDataURL(file);
  }, [selectedFeature]);

  const handleColorSelect = async (color: string) => {
    if (!selectedFeature || !originalImage || !mimeType) {
        setError("Something went wrong, please start over.");
        setView('HOME');
        return;
    }

    setSelectedColor(color);
    setView('PROCESSING');
    setError(null);
    
    try {
      const base64Data = originalImage.split(',')[1];
      const generatedImage = await generateDesign(selectedFeature, base64Data, mimeType, color);

      if (generatedImage) {
        setResultImage(`data:image/jpeg;base64,${generatedImage}`);
      }
      setView('RESULTS');
    } catch (e) {
      console.error(e);
      setError('Sorry, something went wrong while generating your design. Please try again.');
      setView('COLOR_SELECTION');
    }
  };

  const handleReset = () => {
    localStorage.removeItem('userEmail');
    setView('WELCOME');
    setSelectedFeature(null);
    setOriginalImage(null);
    setResultImage(null);
    setError(null);
    setMimeType('');
    setSelectedColor(null);
  };

  const handleBackToUploader = () => {
    setView('UPLOADING');
    setResultImage(null);
  }

  const handleUploaderBack = () => {
    setView('HOME');
  }

  const handleColorSelectionBack = () => {
    setView('UPLOADING');
  }

  const renderContent = () => {
    switch (view) {
      case 'WELCOME':
        return <Welcome onNext={handleWelcomeNext} />;
      case 'EMAIL_COLLECTION':
        return <EmailCollector onEmailSubmit={handleEmailSubmit} />;
      case 'HOME':
        return (
            <FeatureGrid onFeatureSelect={handleFeatureSelect} />
        );
      case 'UPLOADING':
        return (
          <ImageUploader 
            feature={selectedFeature} 
            onImageUpload={handleImageUpload} 
            error={error}
            onBack={handleUploaderBack}
          />
        );
      case 'COLOR_SELECTION':
        return (
          <ColorPaletteSelector 
            feature={selectedFeature}
            image={originalImage}
            onColorSelect={handleColorSelect}
            onBack={handleColorSelectionBack}
          />
        );
      case 'PROCESSING':
        return <LoadingView feature={selectedFeature} image={originalImage} />;
      case 'RESULTS':
        return (
          <ResultsDisplay 
            originalImage={originalImage} 
            resultImage={resultImage} 
            featureTitle={selectedFeature?.title || ''}
            onReset={handleReset}
            onBack={handleBackToUploader}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen text-brand-text font-sans antialiased flex items-center justify-center p-4">
      <main className="container mx-auto p-6 max-w-lg w-full bg-brand-bg/80 backdrop-blur-lg rounded-2xl shadow-xl">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;