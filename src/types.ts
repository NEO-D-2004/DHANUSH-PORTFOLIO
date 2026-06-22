import React from 'react';

export interface ProjectItem {
  id: string;
  number: string;
  name: string;
  category: string;
  col1Image1: string;
  col1Image2: string;
  col2Image: string;
}

export interface ServiceItem {
  id: string;
  number: string;
  name: string;
  description: string;
}

export interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  className?: string;
  as?: string;
  key?: React.Key;
}

export interface MagnetProps {
  children: React.ReactNode;
  padding?: number;
  strength?: number;
  activeTransition?: string;
  inactiveTransition?: string;
  className?: string;
  key?: React.Key;
}
