# React-Trophies Integration Guide

This guide provides comprehensive instructions for integrating the `react-trophies` package into various React application frameworks and environments.

## Table of Contents

1. [Basic Installation](#basic-installation)
2. [Core Components](#core-components)
3. [TrophyModal Component](#trophymodal-component)
4. [Framework-Specific Integration](#framework-specific-integration)
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
npm install react-trophies sonner howler zustand

# Using yarn
yarn add react-trophies sonner howler zustand
```

## Core Components

The React-Trophies package provides several components to build a complete achievement system:

### Required Components

- **AchievementProvider**: The core provider component that manages achievement state
- **Toaster** (from sonner): The toast notification container that displays achievement unlocks (must be included in your application)

### Optional Components

- **TrophyModal**: Modal dialog for displaying all achievements with progress bars
- **TrophyCard**: Individual achievement card display
- **TrophyGrid**: Grid layout for displaying multiple achievements
- **TrophyShowcase**: Horizontal showcase of selected achievements
- **AchievementProgress**: Progress bar for tracking achievement completion
- **TrophyStats**: Statistics display for achievement progress
- **ThemeProvider**: Theme management for consistent styling

## TrophyModal Component

The TrophyModal component displays achievements with progress bars, sorted with unlocked achievements first. It provides extensive styling customization options through props.

### Required Dependencies

TrophyModal relies on Shadcn UI components. You can either install individual Radix UI primitives or use Shadcn UI for a complete solution.

#### Option 1: Install Individual Radix UI Primitives

```bash
npm install @radix-ui/react-dialog @radix-ui/react-progress @radix-ui/react-scroll-area
```

#### Option 2: Install Shadcn UI (Recommended)

For a more complete UI solution with consistent styling:

```bash
npx shadcn-ui@latest init
```

Then add the required components:

```bash
npx shadcn-ui@latest add dialog progress scroll-area button
```

### Basic Usage

```jsx
import { TrophyModal } from 'react-trophies';
import { useAchievement } from 'react-trophies';

function AchievementsPage() {
  const { metrics, config } = useAchievement();
  
  return (
    <div>
      <TrophyModal 
        config={config}
        metrics={metrics}
        modalTitle="My Achievements" 
      />
    </div>
  );
}
```

### Custom Trigger Button

```jsx
import { TrophyModal } from 'react-trophies';
import { useAchievement } from 'react-trophies';
import { Trophy } from 'lucide-react'; // Optional icon

function AchievementsPage() {
  const { metrics, config } = useAchievement();
  
  return (
    <div>
      <TrophyModal 
        config={config}
        metrics={metrics}
        modalTitle="My Achievements" 
        customTrigger={
          <button className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg">
            <Trophy size={18} />
            <span>View Trophies</span>
          </button>
        }
      />
    </div>
  );
}
```

### Styling Customization

The TrophyModal component accepts several className props for styling customization:

```jsx
<TrophyModal 
  config={config}
  metrics={metrics}
  modalTitle="My Achievements"
  // Styling customization props
  modalClassName="bg-slate-900 text-white border-slate-700" 
  cardClassName="bg-slate-800 border-slate-700"
  unlockedCardClassName="border-amber-500 bg-amber-500/10"
  iconClassName="text-amber-400 text-2xl"
/>
```

### Available Customization Props

| Prop | Type | Description |
|------|------|-------------|
| `modalClassName` | `string` | CSS classes for the modal dialog container |
| `cardClassName` | `string` | CSS classes applied to all achievement cards |
| `unlockedCardClassName` | `string` | CSS classes for unlocked achievement cards |
| `iconClassName` | `string` | CSS classes for achievement icons |
| `customTrigger` | `ReactNode` | Custom button or element to trigger the modal |
| `modalTitle` | `string` | Title displayed at the top of the modal |
| `buttonLabel` | `string` | Text for the default trigger button if no customTrigger provided |
| `buttonPosition` | `string` | Position of the trigger button: 'top-left', 'top-right', 'bottom-left', 'bottom-right' |

## Framework-Specific Integration

### Create React App

1. Wrap your application with AchievementProvider in `src/index.js`:

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { AchievementProvider } from 'react-trophies';
import { Toaster } from 'sonner';
import App from './App';
import './index.css';
import { achievementConfig } from './lib/achievements/config';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AchievementProvider config={achievementConfig} enableToasts={true}>
      <App />
      <Toaster position="bottom-right" richColors />
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
import { AchievementProvider } from 'react-trophies';
import { Toaster } from 'sonner';
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
      enableToasts={true}
    >
      {children}
      <Toaster position="bottom-right" richColors />
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

### Vite

1. Create a wrapper component in `src/components/AchievementWrapper.jsx`:

```jsx
import React from 'react';
import { AchievementProvider } from 'react-trophies';
import { Toaster } from 'sonner';
import { achievementConfig } from '../lib/achievements/config';

export function AchievementWrapper({ children }) {
  const [isBrowser, setIsBrowser] = React.useState(false);
  
  React.useEffect(() => {
    setIsBrowser(true);
  }, []);
  
  // Only render on the client side to avoid SSR issues
  if (!isBrowser) {
    return <>{children}</>;
  }
  
  return (
    <AchievementProvider 
      config={achievementConfig}
      storageKey="vite-app-achievements"
      enableToasts={true}
    >
      {children}
      <Toaster position="bottom-right" richColors />
    </AchievementProvider>
  );
}
```

### Custom Toast Styling

You can customize the toast appearance by configuring the Toaster component:

```jsx
<Toaster 
  position="top-center"
  richColors
  closeButton
  theme="dark" 
  visibleToasts={3}
  toastOptions={{
    duration: 5000,
    className: "my-custom-toast-class"
  }}
/>
```

For more advanced customization, you can use the exported `AchievementToastContent` component to define custom achievement toasts:

```jsx
import { AchievementToastContent } from 'react-trophies';
import { toast } from 'sonner';

// In your custom component
const achievement = {
  achievementId: 'custom-achievement',
  achievementTitle: 'Custom Achievement',
  achievementDescription: "You've unlocked a special achievement!",
  achievementIconKey: 'custom'
};

const icons = { 'custom': '🏆' };

toast.custom(() => (
  <AchievementToastContent 
    achievement={achievement}
    icons={icons}
    toastTitle="Trophy Unlocked!"
  />
), { duration: 6000 })
```

## Creating Achievements

To effectively implement achievements in your application, follow this step-by-step guide:

### 1. Achievement Configuration Structure

Achievements are organized by metric types. Each metric can have multiple achievement conditions:

```javascript
const achievementConfig = {
  // Metric type: clicks
  clicks: [
    // Achievement 1
    {
      // Condition function
      isConditionMet: (value) => typeof value === 'number' && value >= 10,
      // Achievement details
      achievementDetails: {
        achievementId: 'beginner-clicker',
        achievementTitle: 'Beginner Clicker',
        achievementDescription: 'Click the button 10 times',
        achievementIconKey: 'click' // Maps to your icons
      }
    },
    // Achievement 2
    {
      isConditionMet: (value) => typeof value === 'number' && value >= 50,
      achievementDetails: {
        achievementId: 'advanced-clicker',
        achievementTitle: 'Advanced Clicker',
        achievementDescription: 'Click the button 50 times',
        achievementIconKey: 'click-gold'
      }
    }
  ],
  // Another metric type
  nightOwl: [
    {
      isConditionMet: (value) => typeof value === 'boolean' && value === true,
      achievementDetails: {
        achievementId: 'night-owl',
        achievementTitle: 'Night Owl',
        achievementDescription: 'Use the app between midnight and 5am',
        achievementIconKey: 'owl'
      }
    }
  ]
}
```

### 2. Tracking Metrics in Components

Use the `updateMetrics` function from the achievement context to track user actions:

```jsx
import { useAchievementContext } from 'react-trophies';

function ClickerButton() {
  const { updateMetrics } = useAchievementContext();
  const [clickCount, setClickCount] = useState(0);
  
  const handleClick = () => {
    // Update local state
    const newCount = clickCount + 1;
    setClickCount(newCount);
    
    // Send metric to achievement system
    updateMetrics({ clicks: newCount });
    
    // Check time-based conditions
    const currentHour = new Date().getHours();
    if (currentHour >= 0 && currentHour < 5) {
      updateMetrics({ nightOwl: true });
    }
  };
  
  return <button onClick={handleClick}>Click Me! ({clickCount})</button>;
}
```

### 3. Implementing Complex Tracking Patterns

For more complex metrics like tracking sequences or time-based patterns:

```jsx
// Track rapid clicks within a time window
function RapidClickerGame() {
  const { updateMetrics } = useAchievementContext();
  const [clickCount, setClickCount] = useState(0);
  const recentClicks = useRef([]);
  
  // Constants
  const RAPID_CLICK_WINDOW = 5000; // 5 seconds
  const RAPID_CLICK_THRESHOLD = 10; // 10 clicks
  
  const handleClick = () => {
    setClickCount(prev => prev + 1);
    updateMetrics({ clicks: clickCount + 1 });
    
    const now = Date.now();
    
    // Add current click timestamp
    recentClicks.current = [
      ...recentClicks.current,
      now
    ];
    
    // Remove clicks older than window
    recentClicks.current = recentClicks.current.filter(
      time => now - time < RAPID_CLICK_WINDOW
    );
    
    // Check if threshold reached for rapid clicking
    if (recentClicks.current.length >= RAPID_CLICK_THRESHOLD) {
      updateMetrics({ rapidClicker: true });
    }
  };
  
  return <button onClick={handleClick}>Rapid Click!</button>;
}
```

### 4. Creating an AchievementWrapper Component (Recommended)

For cleaner code organization, create a wrapper component:

```jsx
// AchievementWrapper.jsx
import { AchievementProvider } from 'react-trophies';
import { Toaster } from 'sonner';
import achievementConfig from './achievementConfig';  

export function AchievementWrapper({ children }) {
  return (
    <>
      <AchievementProvider
        config={achievementConfig}
        enableConfetti={true}
        achievementSoundUrl="/sounds/achievement-unlocked.mp3"
        toastTitle="Achievement Unlocked!"
      >
        {children}
      </AchievementProvider>
      <Toaster position="top-right" />
    </>
  );
}

// App.jsx
import { AchievementWrapper } from './AchievementWrapper';

function App() {
  return (
    <AchievementWrapper>
      <YourAppContent />
    </AchievementWrapper>
  );
}
```

### 5. Displaying Unlocked Achievements

Display a list of achievements the user has unlocked:

```jsx
function AchievementsList() {
  const { unlockedAchievements } = useAchievementContext();
  // Note: unlockedAchievements contains achievementIds, not full achievement objects
  
  return (
    <div className="achievements-list">
      <h2>Your Achievements</h2>
      {unlockedAchievements.length > 0 ? (
        unlockedAchievements.map(id => (
          <div key={id} className="achievement-item">
            Achievement ID: {id}
          </div>
        ))
      ) : (
        <p>No achievements unlocked yet</p>
      )}
    </div>
  );
}
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

### Toast Notifications Setup

React-Trophies uses Sonner for toast notifications. Unlike previous versions, this approach avoids conflicts with user applications that also use Sonner.

> ⚠️ **WARNING: AVOIDING DUPLICATE TOASTS**
> 
> If your application already uses Sonner, follow these guidelines to avoid multiple toast instances:
> 
> 1. **ALWAYS add only ONE `<Toaster />` component** in your application root
> 2. **NEVER nest multiple `<Toaster />` components** at different levels
> 3. Make sure the `<Toaster />` component is a sibling to your main app wrapped with `<AchievementProvider>`
>
> ```jsx
> // CORRECT SETUP ✅
> <>
>   <AchievementProvider config={achievementConfig}>
>     <YourApp />
>   </AchievementProvider>
>   <Toaster /> {/* Single Toaster outside the provider */}
> </>
>
> // INCORRECT SETUP ❌
> <AchievementProvider config={achievementConfig}>
>   <YourApp />
>   <Toaster /> {/* Don't put Toaster inside provider */}
>   {/* Don't add multiple Toaster components */}
> </AchievementProvider>
> ```

1. Add the Sonner `<Toaster />` component to your application:

```jsx
import { Toaster } from 'sonner';

// In your root layout or app component
function App() {
  return (
    <>
      <YourAppContent />
      <Toaster position="top-right" richColors />
    </>
  );
}
```

2. The AchievementProvider will use this Toaster component to display achievement notifications

3. You can customize the toast title using the `toastTitle` prop:

```jsx
<AchievementProvider 
  config={achievementConfig}
  toastTitle="Trophy Unlocked!" // Default is "Achievement Unlocked!"
  enableToasts={true} // Default is true
>
  {children}
</AchievementProvider>
```

4. If toast notifications aren't appearing when achievements are unlocked:
   - Make sure you have a `<Toaster />` component from sonner properly rendered in your application
   - Verify that `enableToasts={true}` is set on your AchievementProvider (it's true by default)
   - Ensure that the achievement conditions are actually being met

### SSR Compatibility

For server-side rendering frameworks:

1. Always wrap state-dependent code in useEffect or conditionally render based on browser detection
2. For Next.js, use dynamic import with `{ ssr: false }` for the Toaster component:

```jsx
import dynamic from 'next/dynamic';

const ToasterNoSSR = dynamic(
  () => import('sonner').then((mod) => mod.Toaster),
  { ssr: false }
);

function Page() {
  return (
    <div>
      <ToasterNoSSR position="bottom-right" />
      {/* Rest of your page */}
    </div>
  );
}
```

For additional support, please refer to the full [React-Trophies Documentation](https://github.com/your-username/react-trophies) or open an issue on GitHub.
