/**
 * Example setup script for integrating react-trophies with Next.js
 * 
 * This script demonstrates how to set up the React-Trophies package in a Next.js application.
 * Run this after installing the react-trophies package.
 */

const fs = require('fs');
const path = require('path');

// Create necessary directories
const directories = [
  './components/achievements',
  './lib/achievements',
  './public/sounds'
];

directories.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`Created directory: ${dir}`);
  }
});

// Example achievement configuration
const achievementConfigContent = `
/**
 * Achievement configuration for your Next.js application
 */
import { Achievement } from 'react-trophies';

export const achievementConfig = {
  score: [{
    isConditionMet: (value) => value >= 100,
    achievementDetails: {
      achievementId: 'high-score',
      achievementTitle: 'High Score!',
      achievementDescription: 'Score 100 points',
      achievementIconKey: 'trophy',
      achievementDate: new Date(),
      isUnlocked: false
    }
  }],
  pageVisits: [{
    isConditionMet: (value) => value >= 5,
    achievementDetails: {
      achievementId: 'frequent-visitor',
      achievementTitle: 'Frequent Visitor',
      achievementDescription: 'Visit pages 5 times',
      achievementIconKey: 'star',
      achievementDate: null,
      isUnlocked: false
    }
  }]
};
`;

// Write achievement configuration file
fs.writeFileSync('./lib/achievements/config.js', achievementConfigContent);
console.log('Created achievement configuration file');

// Create provider wrapper component
const providerComponentContent = `
/**
 * Achievement provider component for your Next.js application
 */
import React from 'react';
import { AchievementProvider, TrophyNotificationToast, ThemeProvider } from 'react-trophies';
import { achievementConfig } from '../lib/achievements/config';

// Optional: Load saved achievements from localStorage (on client-side only)
function loadSavedAchievements() {
  if (typeof window === 'undefined') return null;
  
  try {
    const savedData = localStorage.getItem('my-app-achievements');
    return savedData ? JSON.parse(savedData) : null;
  } catch (e) {
    console.error('Failed to load saved achievements:', e);
    return null;
  }
}

export function AchievementWrapper({ children }) {
  // During SSR, this will be null
  const savedData = React.useMemo(() => loadSavedAchievements(), []);
  
  return (
    <ThemeProvider initialTheme="system" persistTheme={true}>
      <AchievementProvider 
        config={achievementConfig}
        storageKey="my-app-achievements"
        initialState={savedData}
      >
        <TrophyNotificationToast 
          position="bottom-right"
          playSound={true}
          toastTitle="Achievement Unlocked!"
        />
        {children}
      </AchievementProvider>
    </ThemeProvider>
  );
}
`;

// Write provider component file
fs.writeFileSync('./components/achievements/AchievementWrapper.jsx', providerComponentContent);
console.log('Created achievement provider component');

// Create example usage component
const exampleComponentContent = `
/**
 * Example component demonstrating achievement usage
 */
import React from 'react';
import { useAchievement, TrophyCard, TrophyGrid } from 'react-trophies';

export function AchievementDemo() {
  const { updateMetrics, getAchievements } = useAchievement();
  const achievements = getAchievements();
  
  const handleScoreClick = () => {
    updateMetrics({ score: [100] });
  };
  
  const handlePageVisit = () => {
    updateMetrics({ pageVisits: [5] });
  };
  
  return (
    <div className="achievement-demo">
      <h2>Achievement Demo</h2>
      
      <div className="buttons">
        <button onClick={handleScoreClick}>Score 100 points</button>
        <button onClick={handlePageVisit}>Simulate 5 Page Visits</button>
      </div>
      
      <h3>Your Achievements</h3>
      
      <TrophyGrid 
        achievements={achievements}
        columns="auto-fill"
        minColumnWidth={250}
        showDescriptions={true}
        showDates={true}
      />
    </div>
  );
}
`;

// Write example component file
fs.writeFileSync('./components/achievements/AchievementDemo.jsx', exampleComponentContent);
console.log('Created example achievement demo component');

// Modify _app.js to include the achievement wrapper
const appJsContent = `
import '../styles/globals.css';
import { AchievementWrapper } from '../components/achievements/AchievementWrapper';

function MyApp({ Component, pageProps }) {
  return (
    <AchievementWrapper>
      <Component {...pageProps} />
    </AchievementWrapper>
  );
}

export default MyApp;
`;

// Check if _app.js exists, if not, create it
const appJsPath = './pages/_app.js';
if (!fs.existsSync('./pages')) {
  fs.mkdirSync('./pages', { recursive: true });
  console.log('Created pages directory');
}

if (!fs.existsSync(appJsPath)) {
  fs.writeFileSync(appJsPath, appJsContent);
  console.log('Created _app.js with achievement wrapper');
} else {
  console.log('_app.js already exists. Please manually integrate AchievementWrapper.');
  console.log('Example integration:');
  console.log(appJsContent);
}

// Copy sample sound file (this is just a placeholder instruction)
console.log('');
console.log('==================================================================');
console.log('Setup complete!');
console.log('');
console.log('Next steps:');
console.log('1. Place an achievement sound file in: ./public/sounds/achievement.mp3');
console.log('2. Try integrating the AchievementDemo component in one of your pages');
console.log('3. Add more achievements in lib/achievements/config.js');
console.log('==================================================================');
`
