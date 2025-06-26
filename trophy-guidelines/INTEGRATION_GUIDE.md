# React-Trophies Integration Guide

This guide provides comprehensive instructions for integrating the `react-trophies` package into various React application frameworks and environments.

## Table of Contents

1. [Basic Installation](#basic-installation)
2. [Core Components](#core-components)
3. [Framework-Specific Integration](#framework-specific-integration)
   - [Create React App](#create-react-app)
   - [Next.js](#nextjs)
   - [Vite](#vite)
   - [Gatsby](#gatsby)
4. [Advanced Configuration](#advanced-configuration)
   - [Customizing Sounds](#customizing-sounds)
   - [Theming](#theming)
   - [Persistence](#persistence)
5. [Troubleshooting](#troubleshooting)

## Basic Installation

Install the package using npm or yarn:

```bash
# Using npm
npm install react-trophies

# Using yarn
yarn add react-trophies
```

## Core Components

The React-Trophies package provides several components to build a complete achievement system:

### Required Components

- **AchievementProvider**: The core provider component that manages achievement state
- **TrophyNotificationToast** or **AchievementToast**: Components for displaying achievement notifications

### Optional Components

- **TrophyCard**: Individual achievement card display
- **TrophyGrid**: Grid layout for displaying multiple achievements
- **TrophyShowcase**: Horizontal showcase of selected achievements
- **AchievementProgress**: Progress bar for tracking achievement completion
- **TrophyStats**: Statistics display for achievement progress
- **ThemeProvider**: Theme management for consistent styling

## Framework-Specific Integration

### Create React App

1. Wrap your application with AchievementProvider in `src/index.js`:

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { AchievementProvider, TrophyNotificationToast } from 'react-trophies';
import App from './App';
import './index.css';
import { achievementConfig } from './lib/achievements/config';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AchievementProvider config={achievementConfig}>
      <TrophyNotificationToast position="bottom-right" playSound={true} />
      <App />
    </AchievementProvider>
  </React.StrictMode>
);
```

2. Create an achievement config file at `src/lib/achievements/config.js`:

```jsx
export const achievementConfig = {
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
```

3. Use achievement hooks in your components:

```jsx
import { useAchievement } from 'react-trophies';

function GameComponent() {
  const { updateMetrics } = useAchievement();
  
  const handleScore = () => {
    updateMetrics({ score: [100] });
  };
  
  return <button onClick={handleScore}>Score Points</button>;
}
```

### Next.js

1. Create an achievement wrapper component in `components/AchievementWrapper.jsx`:

```jsx
import React from 'react';
import { AchievementProvider, TrophyNotificationToast } from 'react-trophies';
import { achievementConfig } from '../lib/achievements/config';

// Load saved achievements from localStorage (client-side only)
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
  const savedData = React.useMemo(() => loadSavedAchievements(), []);
  
  return (
    <AchievementProvider 
      config={achievementConfig}
      storageKey="my-app-achievements"
      initialState={savedData}
    >
      <TrophyNotificationToast position="bottom-right" playSound={true} />
      {children}
    </AchievementProvider>
  );
}
```

2. Wrap your application in `pages/_app.js`:

```jsx
import { AchievementWrapper } from '../components/AchievementWrapper';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <AchievementWrapper>
      <Component {...pageProps} />
    </AchievementWrapper>
  );
}

export default MyApp;
```

3. For Next.js applications, ensure sound files are placed in the `public` folder:

```
public/
├─ sounds/
│  ├─ achievement.mp3
│  └─ ...
```

### Vite

1. Update your `main.jsx` file:

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { AchievementProvider, TrophyNotificationToast } from 'react-trophies';
import App from './App.jsx';
import './index.css';
import { achievementConfig } from './lib/achievements/config';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AchievementProvider config={achievementConfig}>
      <TrophyNotificationToast position="bottom-right" playSound={true} />
      <App />
    </AchievementProvider>
  </React.StrictMode>
);
```

2. Place sound files in the `public` directory to ensure they're served correctly:

```
public/
├─ sounds/
│  ├─ achievement.mp3
│  └─ ...
```

### Gatsby

1. Create a wrapper component in `src/components/AchievementWrapper.jsx`:

```jsx
import React from 'react';
import { AchievementProvider, TrophyNotificationToast } from 'react-trophies';
import { achievementConfig } from '../lib/achievements/config';

export function AchievementWrapper({ children }) {
  const [isBrowser, setIsBrowser] = React.useState(false);
  
  React.useEffect(() => {
    setIsBrowser(true);
  }, []);
  
  // Only render on the client side to avoid SSR issues
  if (!isBrowser) return <>{children}</>;
  
  return (
    <AchievementProvider config={achievementConfig}>
      <TrophyNotificationToast position="bottom-right" playSound={true} />
      {children}
    </AchievementProvider>
  );
}
```

2. Update your `gatsby-browser.js` file:

```jsx
import React from 'react';
import { AchievementWrapper } from './src/components/AchievementWrapper';

export const wrapRootElement = ({ element }) => {
  return <AchievementWrapper>{element}</AchievementWrapper>;
};
```

## Advanced Configuration

### Customizing Sounds

The `SoundManager` utility allows you to register and play custom sounds:

```jsx
import { soundManager } from 'react-trophies';

// Register custom sounds
soundManager.registerSound('rare', '/sounds/rare-achievement.mp3');
soundManager.registerSound('epic', '/sounds/epic-achievement.mp3', { volume: 0.7 });

// Play sound when needed
soundManager.play('rare');

// Global volume control
soundManager.setVolume(0.5);

// Disable sounds (e.g., based on user preference)
soundManager.setEnabled(false);
```

### Theming

Use the `ThemeProvider` component to enable theming:

```jsx
import { ThemeProvider, useTheme } from 'react-trophies';

function App() {
  return (
    <ThemeProvider 
      initialTheme="dark" 
      persistTheme={true}
      customThemes={[
        {
          name: 'gameConsole',
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
      <YourApp />
    </ThemeProvider>
  );
}

// Access theme in components
function ThemedComponent() {
  const { colors, theme, setTheme, themes } = useTheme();
  
  return (
    <div style={{ backgroundColor: colors.background, color: colors.text }}>
      <select 
        value={theme} 
        onChange={(e) => setTheme(e.target.value)}
      >
        {themes.map(t => (
          <option key={t.name} value={t.name}>{t.name}</option>
        ))}
      </select>
      
      <h1 style={{ color: colors.primary }}>Themed Content</h1>
    </div>
  );
}
```

### Persistence

Enable persistence to save achievement progress:

```jsx
<AchievementProvider
  config={achievementConfig}
  storageKey="my-app-achievements" // localStorage key
>
  {/* Your app */}
</AchievementProvider>
```

Access and manipulate the saved state:

```jsx
import { useAchievement, useAchievementState } from 'react-trophies';

function ProfileComponent() {
  const { resetStorage } = useAchievement();
  const { metrics, previouslyAwardedAchievements } = useAchievementState();
  
  const handleResetProgress = () => {
    if (confirm('Are you sure you want to reset all progress?')) {
      resetStorage();
    }
  };
  
  return (
    <div>
      <h2>Your Progress</h2>
      <pre>{JSON.stringify(metrics, null, 2)}</pre>
      
      <h2>Unlocked Achievements</h2>
      <div>{previouslyAwardedAchievements.length} achievements unlocked</div>
      
      <button onClick={handleResetProgress}>Reset All Progress</button>
    </div>
  );
}
```

## Troubleshooting

### Issues with Sound Playback

If sound isn't playing when achievements unlock:

1. Verify that the sound files exist at the correct path.
2. For Next.js and other frameworks that use file-based routing, ensure sounds are in the `public` directory.
3. Check if browser policies require user interaction before playing sounds.
4. Try registering the sound manually with a direct URL path:

```jsx
import { soundManager } from 'react-trophies';
soundManager.registerSound('default', '/sounds/achievement.mp3');
```

### Component Styling Issues

If components don't match your app's design:

1. Use the `ThemeProvider` to customize the color scheme.
2. Override component styles with your own CSS:

```jsx
<TrophyCard
  achievement={achievement}
  style={{
    border: '2px solid gold',
    borderRadius: '10px',
    backgroundColor: '#333'
  }}
/>
```

### SSR Compatibility

For server-side rendering frameworks:

1. Always wrap state-dependent code in useEffect or conditionally render based on browser detection.
2. Avoid direct localStorage or window access during rendering.
3. For Next.js, use the dynamic import with `{ ssr: false }` for components that rely on browser APIs:

```jsx
import dynamic from 'next/dynamic';

const AchievementToastNoSSR = dynamic(
  () => import('react-trophies').then((mod) => mod.AchievementToast),
  { ssr: false }
);

function Page() {
  return (
    <div>
      <AchievementToastNoSSR position="bottom-right" />
      {/* Rest of your page */}
    </div>
  );
}
```

For additional support, please refer to the full [React-Trophies Documentation](https://github.com/your-username/react-trophies) or open an issue on GitHub.
