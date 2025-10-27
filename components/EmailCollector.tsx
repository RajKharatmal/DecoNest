import React, { useState } from 'react';

interface EmailCollectorProps {
  onEmailSubmit: (email: string) => void;
}

const MailIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
);


export const EmailCollector: React.FC<EmailCollectorProps> = ({ onEmailSubmit }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!email.trim()) {
      setError('Email address is required.');
      return;
    }
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setError(null);
    onEmailSubmit(email);
  };

  return (
    <div className="flex flex-col items-center text-center p-4 animate-fade-in">
      <MailIcon className="w-16 h-16 text-brand-primary mb-4" />
      <h2 className="text-3xl font-serif text-brand-accent font-bold mb-2">Join the Community</h2>
      <p className="text-md text-brand-text mb-8 max-w-xs">Enter your email to save your creations and get design inspiration.</p>
      
      <form onSubmit={handleSubmit} className="w-full max-w-xs space-y-4">
        <input 
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your.email@example.com"
          className="w-full px-4 py-3 bg-brand-accent text-white placeholder-white/70 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-secondary transition-colors"
          aria-label="Email address"
          required
        />
        
        {error && <p className="text-red-600 text-sm text-left">{error}</p>}

        <button 
          type="submit"
          className="w-full bg-brand-primary text-white font-bold py-4 px-4 rounded-xl shadow-lg hover:bg-brand-accent transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-brand-accent/50"
        >
          Continue &rarr;
        </button>
      </form>
    </div>
  );
};