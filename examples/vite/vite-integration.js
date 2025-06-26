/**
 * Example setup script for integrating react-trophies with Vite
 * 
 * This script demonstrates how to set up the React-Trophies package in a Vite application.
 * Run this after installing the react-trophies package.
 */

const fs = require('fs');
const path = require('path');

// Create necessary directories
const directories = [
  './src/components/achievements',
  './src/lib/achievements',
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
 * Achievement configuration for your Vite application
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
fs.writeFileSync('./src/lib/achievements/config.js', achievementConfigContent);
console.log('Created achievement configuration file');

// Create provider wrapper component
const providerComponentContent = `
/**
 * Achievement provider component for your Vite application
 */
import React from 'react';
import { AchievementProvider, TrophyNotificationToast, ThemeProvider } from 'react-trophies';
import { achievementConfig } from '../lib/achievements/config';

// Load saved achievements from localStorage
function loadSavedAchievements() {
  try {
    const savedData = localStorage.getItem('my-app-achievements');
    return savedData ? JSON.parse(savedData) : null;
  } catch (e) {
    console.error('Failed to load saved achievements:', e);
    return null;
  }
}

export function AchievementWrapper({ children }) {
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
fs.writeFileSync('./src/components/achievements/AchievementWrapper.jsx', providerComponentContent);
console.log('Created achievement provider component');

// Create example usage component
const exampleComponentContent = `
/**
 * Example component demonstrating achievement usage
 */
import React from 'react';
import { useAchievement, TrophyCard, TrophyGrid, TrophyStats, TrophyShowcase } from 'react-trophies';

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
      
      <TrophyStats 
        achievements={achievements}
        showTotal={true}
        showUnlocked={true}
        showPercentage={true}
        showProgressBar={true}
        title="Your Progress"
      />
      
      <div className="buttons" style={{ margin: '20px 0' }}>
        <button onClick={handleScoreClick} style={{ marginRight: '10px' }}>Score 100 points</button>
        <button onClick={handlePageVisit}>Simulate 5 Page Visits</button>
      </div>
      
      <h3>Recently Unlocked</h3>
      <TrophyShowcase
        achievements={achievements.filter(a => a.isUnlocked)}
        maxDisplay={3}
        showLabels={true}
      />
      
      <h3>All Achievements</h3>
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
fs.writeFileSync('./src/components/achievements/AchievementDemo.jsx', exampleComponentContent);
console.log('Created example achievement demo component');

// Modify main.jsx to include the achievement wrapper
const mainJsxContent = `
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AchievementWrapper } from './components/achievements/AchievementWrapper'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AchievementWrapper>
      <App />
    </AchievementWrapper>
  </React.StrictMode>,
)
`;

// Check if main.jsx exists, if not, create it
const mainJsxPath = './src/main.jsx';
if (!fs.existsSync('./src')) {
  fs.mkdirSync('./src', { recursive: true });
  console.log('Created src directory');
}

console.log('');
console.log('==================================================================');
console.log('Setup complete!');
console.log('');
console.log('Next steps:');
console.log('1. Modify your src/main.jsx to wrap your App with AchievementWrapper:');
console.log(mainJsxContent);
console.log('');
console.log('2. Place an achievement sound file in: ./public/sounds/achievement.mp3');
console.log('3. Import and use the AchievementDemo component in your App.jsx or another component');
console.log('4. Add more achievements in src/lib/achievements/config.js');
console.log('==================================================================');
`
