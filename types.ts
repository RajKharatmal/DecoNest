import React from 'react';

export interface Feature {
  id: 'style' | 'furnish' | 'repaint' | 'floor';
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}
