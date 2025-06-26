/**
 * Achievement provider component for your Vite application
 * 
 * This component wraps your application with the react-trophies providers
 * to enable achievements, notifications, and theme handling.
 */
import React, { ReactNode, useMemo } from 'react';
import { 
  AchievementProvider, 
  AchievementToast, 
  ThemeProvider,
  InitialAchievementMetrics 
} from 'react-trophies';
import { achievementConfig } from './config';

interface AchievementWrapperProps {
  children: ReactNode;
}

interface SavedAchievementData {
  previouslyAwardedAchievements?: string[];
  [key: string]: any;
}

/**
 * Loads previously saved achievement data from localStorage
 * 
 * @returns The saved achievement data or null if not found
 */
function loadSavedAchievements(): SavedAchievementData | null {
  try {
    // Get saved data from local storage using the same key as in the provider
    const savedData = localStorage.getItem('my-app-achievements');
    return savedData ? JSON.parse(savedData) : null;
  } catch (e) {
    console.error('Failed to load saved achievements:', e);
    return null;
  }
}

/**
 * AchievementWrapper component
 * 
 * This component wraps your application with all necessary providers
 * from react-trophies, and automatically handles persistence of achievements.
 */
export function AchievementWrapper({ children }: AchievementWrapperProps): JSX.Element {
  // Load saved data from localStorage when the component mounts
  const savedData = useMemo(() => loadSavedAchievements(), []);
  
  // Optional: Initialize metrics with custom values
  const initialMetrics: InitialAchievementMetrics = {
    // You can provide initial values for your metrics here
    // Example: pageVisits: 0,
    ...savedData // Spread saved data to restore previous state
  };
  
  return (
    {/* Using ThemeProvider with React 18 compatible props */}
        <ThemeProvider theme="system">
      {/* Using AchievementProvider with React 18 compatible props */}
        <AchievementProvider 
        config={achievementConfig}
        storageKey="my-app-achievements"
        initialState={initialMetrics}
        badgesButtonPosition="bottom-right"
        soundUrl="/sounds/achievement.mp3" // Path to your sound file
      >
        {/* Achievement toast notifications */}
        {/* Using AchievementToast with React 18 compatible props */}
        <AchievementToast 
          position="bottom-right"
          playSound={true}
          expandOnHover={true}
        />
        
        {/* Your application */}
        {children}
      </AchievementProvider>
    </ThemeProvider>
  );
}
