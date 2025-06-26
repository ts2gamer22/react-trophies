# React-Trophies Components

This document provides examples of all available components in the react-trophies package.

## Core Components

### TrophyCard

```jsx
import { TrophyCard } from 'react-trophies';

// Example achievement object
const achievement = {
  achievementId: 'high-score',
  achievementTitle: 'High Score Master',
  achievementDescription: 'Score 1000+ points in a single game',
  achievementIconKey: 'trophy',  
  isUnlocked: true,
  achievementDate: new Date()
};

// Basic usage
<TrophyCard 
  achievement={achievement}
  showDescription={true}
  showDate={true}
/>

// With custom styling
<TrophyCard 
  achievement={achievement}
  style={{
    border: '2px solid gold',
    borderRadius: '8px',
    backgroundColor: '#1a1a1a'
  }}
  onClick={(achievement) => console.log(`Clicked: ${achievement.achievementId}`)}
/>
```

### TrophyGrid

```jsx
import { TrophyGrid } from 'react-trophies';

// Array of achievements
const achievements = [
  {
    achievementId: 'high-score',
    achievementTitle: 'High Score Master',
    achievementDescription: 'Score 1000+ points in a single game',
    achievementIconKey: 'trophy',
    isUnlocked: true,
    achievementDate: new Date()
  },
  {
    achievementId: 'streak',
    achievementTitle: 'On Fire',
    achievementDescription: 'Win 5 games in a row',
    achievementIconKey: 'streak',
    isUnlocked: false,
    achievementDate: null
  }
  // More achievements...
];

// Basic usage
<TrophyGrid 
  achievements={achievements}
  columns="auto-fill"
  minColumnWidth={250}
/>

// With filtering and click handling
<TrophyGrid 
  achievements={achievements}
  columns={3}
  showDescriptions={true}
  showDates={true}
  filter={(achievement) => achievement.isUnlocked}
  onTrophyClick={(achievement) => setSelectedAchievement(achievement)}
/>
```

### TrophyShowcase

```jsx
import { TrophyShowcase } from 'react-trophies';

// Array of achievements
const achievements = [/* ... */];

// Basic usage
<TrophyShowcase
  achievements={achievements}
  maxDisplay={5}
/>

// With advanced options
<TrophyShowcase
  achievements={achievements}
  maxDisplay={3}
  onlyShowUnlocked={true}
  showLabels={true}
  onTrophyClick={(achievement) => setSelectedAchievement(achievement)}
  containerStyle={{ backgroundColor: '#f0f0f0', padding: '10px' }}
  trophySize="large"
/>
```

### AchievementProgress

```jsx
import { AchievementProgress } from 'react-trophies';

// For a single achievement with numeric progress
<AchievementProgress
  achievement={{
    achievementId: 'collector',
    achievementTitle: 'Collector',
    achievementDescription: 'Collect 100 items',
    achievementIconKey: 'growth',
    isUnlocked: false
  }}
  currentValue={75}
  targetValue={100}
  showPercentage={true}
  showFraction={true}
  barColor="#4CAF50"
  animate={true}
  onComplete={(achievement) => console.log('Achievement complete!')}
/>

// With custom styling
<AchievementProgress
  achievement={achievement}
  currentValue={currentValue}
  targetValue={100}
  height="10px"
  style={{ marginBottom: '20px', width: '100%' }}
  barStyle={{ borderRadius: '5px' }}
/>
```

### TrophyStats

```jsx
import { TrophyStats } from 'react-trophies';

// Array of achievements
const achievements = [/* ... */];

// Basic usage
<TrophyStats
  achievements={achievements}
  showTotal={true}
  showUnlocked={true}
/>

// With all options
<TrophyStats
  achievements={achievements}
  showTotal={true}
  showUnlocked={true}
  showPercentage={true}
  showProgressBar={true}
  title="Achievement Progress"
  style={{ padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '10px' }}
  progressBarStyle={{ height: '8px', borderRadius: '4px' }}
/>
```

### AchievementToast

```jsx
import { AchievementToast } from 'react-trophies';

// Simply include in your app
<AchievementToast
  position="top-center"
  expandOnHover={true}
/>

// With customization
<AchievementToast
  position="bottom-right"
  duration={5000}
  playSound={true}
  soundVolume={0.7}
  expandOnHover={true}
  style={{ 
    fontSize: '16px',
    '--toast-bg': '#1a1a1a',
    '--toast-border': '#333'
  }}
/>
```

### ThemeProvider

```jsx
import { ThemeProvider, useTheme } from 'react-trophies';

// Wrapping your application
<ThemeProvider
  initialTheme="dark"
  persistTheme={true}
>
  <App />
</ThemeProvider>

// With custom themes
<ThemeProvider
  initialTheme="system"
  persistTheme={true}
  customThemes={[
    {
      name: 'gaming',
      colors: {
        primary: '#00ff8c',
        secondary: '#ff00ff',
        background: '#121212',
        text: '#ffffff',
        border: '#333333',
        success: '#00ff8c',
        error: '#ff3355'
      }
    }
  ]}
>
  <App />
</ThemeProvider>

// Using theme values in components
function ThemedComponent() {
  const { colors, theme, setTheme } = useTheme();
  
  return (
    <div style={{ backgroundColor: colors.background, color: colors.text }}>
      <h1 style={{ color: colors.primary }}>Welcome to the Game</h1>
      <button 
        style={{ 
          backgroundColor: colors.secondary,
          color: colors.text,
          border: `1px solid ${colors.border}`
        }}
        onClick={() => setTheme('gaming')}
      >
        Switch to Gaming Theme
      </button>
    </div>
  );
}
```

### SoundManager

```jsx
import { soundManager } from 'react-trophies';

// Register sounds
soundManager.registerSound('default', '/sounds/achievement.mp3');
soundManager.registerSound('rare', '/sounds/rare-achievement.mp3');
soundManager.registerSound('epic', '/sounds/epic-achievement.mp3', { volume: 0.7 });

// Play sounds
soundManager.play('default');
soundManager.play('rare');

// Control volume
soundManager.setVolume(0.5); // 50% volume for all sounds

// Enable/disable sounds
soundManager.setEnabled(false); // Mute all sounds
soundManager.setEnabled(true);  // Unmute all sounds

// Check if sounds are enabled
const isEnabled = soundManager.isEnabled(); // true or false
```

## Using with the Achievement System

All these components are designed to work seamlessly with the `AchievementProvider`:

```jsx
import { 
  AchievementProvider, 
  AchievementToast,
  useAchievement
} from 'react-trophies';

// Define your achievement configuration
const achievementConfig = {
  score: [{
    isConditionMet: (value) => value >= 100,
    achievementDetails: {
      achievementId: 'high-score',
      achievementTitle: 'High Score!',
      achievementDescription: 'Score 100 points',
      achievementIconKey: 'trophy'
    }
  }]
};

// In your App component
function App() {
  return (
    <AchievementProvider config={achievementConfig}>
      <AchievementToast position="bottom-right" />
      <Game />
    </AchievementProvider>
  );
}

// In your Game component
function Game() {
  const { updateMetrics } = useAchievement();
  
  const handleScore = () => {
    updateMetrics({ score: [100] });
    // This will automatically trigger the achievement toast
  };
  
  return <button onClick={handleScore}>Score Points</button>;
}
```

Visit the [Integration Guide](./INTEGRATION_GUIDE.md) for more detailed setup instructions for various React frameworks.
