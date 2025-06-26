# 🏆 React-Trophies

A comprehensive achievement and trophy system for React applications with sound effects, notifications, theming, and visual components.

![React Trophies Demo](https://media.giphy.com/media/5sXoITml136LmyBPEc/giphy.gif)

Try it out: [StackBlitz Demo](https://stackblitz.com/edit/vitejs-vite-rymmutrx) | [Next.js Demo](https://react-trophies-nextjs-demo.vercel.app/)

## Features

- 🏆 **Achievement System**: Configurable achievements with custom unlock conditions
- 🔔 **Notifications**: Toast notifications with sound effects
- 🎯 **Progress Tracking**: Track and display user progress toward unlocking achievements
- 🎮 **Gaming Elements**: Trophy cards, showcases, badges buttons, and leaderboards
- 🎨 **Themeable**: Customize the look and feel to match your application
- 🔄 **Persistence**: Save and load achievement progress
- 📱 **Responsive**: Works on all screen sizes
- 🔧 **Framework Agnostic**: Works with any React-based framework


## Package Structure

The `react-trophies` package is organized into the following directories:

```
react-trophies/
├── trophy-components/    # Core visual components (TrophyCard, TrophyShowcase, etc.)
├── trophy-providers/     # Context providers and hooks for state management
├── trophy-guidelines/    # Documentation and integration guides
├── examples/             # Example implementations for different frameworks
│   ├── nextjs/          # Next.js example setup
│   ├── vite/            # Vite.js example setup
│   └── basic/           # Framework-agnostic examples
└── src/                 # Source code (build from this)
    ├── components/      # Raw component implementations
    ├── providers/       # Provider implementations
    └── utils/           # Helper utilities
```

## Quick Start

```bash
npm install react-trophies
```

```jsx
import { AchievementProvider, useAchievement, TrophyNotificationToast } from 'react-trophies';

// 1. Define achievements
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

// 2. Use the provider and notification component
function App() {
  return (
    <AchievementProvider config={achievementConfig}>
      <TrophyNotificationToast position="bottom-right" playSound={true} />
      <Game />
    </AchievementProvider>
  );
}

// 3. Update metrics
function Game() {
  const { updateMetrics } = useAchievement();

  const handleScore = () => {
    updateMetrics({
      score: [100]  // Values are always passed in arrays
    });
  };

  return <button onClick={handleScore}>Score Points</button>;
}
```

## Core Features

### Metric Updates
```jsx
const { updateMetrics } = useAchievement();

// Single update
updateMetrics({ score: [100] });

// Multiple metrics
updateMetrics({
  score: [100],
  combo: [5],
  time: [60]
});

// Sequential updates
updateMetrics({ score: [50] });
setTimeout(() => updateMetrics({ score: [100] }), 1000);
```

## Component Library

React-Trophies comes with a comprehensive set of components to help you build a rich achievement system in your React application.

### TrophyNotificationToast

Displays toast notifications when achievements are unlocked with customizable appearance and sound effects.

```jsx
// In your app component
import { TrophyNotificationToast } from 'react-trophies';

function App() {
  return (
    <>
      {/* Configuration options */}
      <TrophyNotificationToast 
        position="bottom-right" 
        playSound={true}
        duration={4000}
        soundVolume={0.8}
        customSoundUrl="/sounds/achievement.mp3"
        toastTitle="Achievement Unlocked!"
      />
      
      {/* Rest of your app */}
    </>
  );
}
```

### AchievementToast

A simpler version of TrophyNotificationToast that automatically shows toast notifications when achievements are unlocked.

```jsx
<AchievementToast 
  position="top-center"
  expandOnHover={true}
/>
```

### TrophyCard

A visually appealing card component to display individual achievements.

```jsx
import { TrophyCard } from 'react-trophies';

function AchievementDetails({ achievement }) {
  return (
    <TrophyCard 
      achievement={achievement}
      showDescription={true}
      showDate={true}
      onClick={(achievement) => console.log('Clicked:', achievement.achievementId)}
    />
  );
}
```

### TrophyGrid

Display multiple achievements in a responsive grid layout.

```jsx
import { TrophyGrid } from 'react-trophies';

function AchievementsPage({ achievements }) {
  return (
    <TrophyGrid
      achievements={achievements}
      columns="auto-fill"
      minColumnWidth={250}
      showDescriptions={true}
      showDates={true}
      onTrophyClick={(achievement) => setSelectedAchievement(achievement)}
      filter={(achievement) => achievement.isUnlocked}
    />
  );
}
```

### AchievementProgress

Shows progress towards completing specific achievements.

```jsx
import { AchievementProgress } from 'react-trophies';

function ProgressTracker({ achievement, currentValue }) {
  return (
    <AchievementProgress
      achievement={achievement}
      currentValue={currentValue}
      targetValue={100}
      showPercentage={true}
      showFraction={true}
      barColor="#4CAF50"
      animate={true}
      onComplete={(achievement) => console.log('Achievement complete!')}
    />
  );
}
```

### TrophyShowcase

A horizontal, scrollable display of achievements - perfect for profile pages or headers.

```jsx
import { TrophyShowcase } from 'react-trophies';

function ProfileHeader({ achievements }) {
  return (
    <TrophyShowcase
      achievements={achievements}
      maxDisplay={5}
      onlyShowUnlocked={true}
      showLabels={true}
      onTrophyClick={(achievement) => setSelectedAchievement(achievement)}
    />
  );
}
```

### TrophyStats

Display achievement statistics including counts and completion percentage.

```jsx
import { TrophyStats } from 'react-trophies';

function AchievementStatistics({ achievements }) {
  return (
    <TrophyStats
      achievements={achievements}
      showTotal={true}
      showUnlocked={true}
      showPercentage={true}
      showProgressBar={true}
      title="Achievement Progress"
    />
  );
}
```

### ThemeProvider

Provides theming context for trophy components.

```jsx
import { ThemeProvider, useTheme } from 'react-trophies';

function App() {
  return (
    <ThemeProvider 
      initialTheme="dark" 
      persistTheme={true}
      customThemes={[
        {
          name: 'neon',
          colors: {
            primary: '#00ff8c',
            secondary: '#ff00ff',
            background: '#121212'
            // ...other color values
          }
        }
      ]}
    >
      <YourApp />
    </ThemeProvider>
  );
}

// Inside components:
function ThemedComponent() {
  const { colors, setTheme } = useTheme();
  
  return (
    <div style={{ backgroundColor: colors.background, color: colors.text }}>
      <button onClick={() => setTheme('dark')}>Dark Mode</button>
      <button onClick={() => setTheme('light')}>Light Mode</button>
      <button onClick={() => setTheme('neon')}>Neon Theme</button>
    </div>
  );
}
```

### SoundManager

Utility for managing achievement-related sound effects.

```jsx
import { soundManager } from 'react-trophies';

// Register custom sounds
soundManager.registerSound('levelUp', '/sounds/level-up.mp3');
soundManager.registerSound('quest', '/sounds/quest-complete.mp3', { volume: 0.7 });

// Play sounds
soundManager.play('levelUp');

// Control volume
soundManager.setVolume(0.5);

// Disable/enable sounds
soundManager.setEnabled(false);
```

### Sound Effects
- Powered by [Howler.js](https://howlerjs.com/)
- Play a sound when an achievement is unlocked

```jsx
<AchievementProvider
  config={achievementConfig}
  soundUrl="/path/to/your/sound.mp3"
>
  <App />
</AchievementProvider>
```

### State Management
```jsx
// Save progress
const { metrics, previouslyAwardedAchievements } = useAchievementState();

// Load progress
<AchievementProvider
  config={achievementConfig}
  initialState={{
    metrics: savedMetrics,
    previouslyAwardedAchievements: savedAchievements
  }}
/>
```

### Reset Progress
```jsx
const { resetStorage } = useAchievement();
resetStorage(); // Clears all progress
```

## Available Icons

### Achievement Types
- 🏆 `trophy` - Classic achievement symbol
- ⭐ `star` - General achievement
- 🥉 `bronze` - Bronze tier achievement
- 🥈 `silver` - Silver tier achievement
- 🥇 `gold` - Gold tier achievement
- 💎 `diamond` - Diamond tier achievement
- ✨ `legendary` - Legendary achievement
- 💥 `epic` - Epic achievement
- 🔮 `rare` - Rare achievement
- 🔘 `common` - Common achievement
- 🎁 `special` - Special achievement

### Progress & Milestones
- 📈 `growth` - Progress indicator
- 🔥 `streak` - Streak achievements
- 👑 `master` - Mastery achievements
- 🚀 `pioneer` - Pioneer or early adopter
- 💡 `breakthrough` - Discovery or breakthrough
- 🌱 `newBeginnings` - First-time achievements
- 👣 `firstStep` - First achievement
- 🏅 `milestoneReached` - Milestone completion
- 🏁 `challengeCompleted` - Challenge completion

### Social & Engagement
- 🔗 `shared` - Sharing achievement
- ❤️ `liked` - Appreciation
- 💬 `commented` - Communication
- 👥 `followed` - Following achievement
- 🤝 `invited` - Invitation achievement
- 🏘️ `communityMember` - Community participation
- 🌟 `supporter` - Support achievement
- 🌐 `connected` - Connection achievement
- 🙋 `participant` - Participation
- 📣 `influencer` - Influence achievement

### Time & Activity
- ☀️ `activeDay` - Daily activity
- 📅 `activeWeek` - Weekly activity
- 🗓️ `activeMonth` - Monthly activity
- ⏰ `earlyBird` - Early participation
- 🌙 `nightOwl` - Late participation
- ⏳ `dedicated` - Time dedication
- ⏱️ `punctual` - Timeliness
- 🔄 `consistent` - Consistency
- 🏃 `marathon` - Long-term achievement

### Creativity & Expertise
- 🎨 `artist` - Artistic achievement
- ✍️ `writer` - Writing achievement
- 🔬 `innovator` - Innovation
- 🛠️ `creator` - Creation achievement
- 🎓 `expert` - Expertise achievement
- 🎭 `performer` - Performance achievement
- 🧠 `thinker` - Thinking achievement
- 🗺️ `explorer` - Exploration achievement

### Action & Interaction
- 🖱️ `clicked` - Click interaction
- 🔑 `used` - Usage achievement
- 🔍 `found` - Discovery achievement
- 🧱 `built` - Building achievement
- 🧩 `solved` - Problem solving
- 🔭 `discovered` - Discovery
- 🔓 `unlocked` - Unlocking achievement
- ⬆️ `upgraded` - Upgrade achievement
- 🔧 `repaired` - Fix achievement
- 🛡️ `defended` - Defense achievement

### Numbers & Counters
- 1️⃣ `one` - First achievement
- 🔟 `ten` - Tenth achievement
- 💯 `hundred` - Hundredth achievement
- 🔢 `thousand` - Thousandth achievement

### System Icons
- ⭐ `default` - Default fallback icon
- ⏳ `loading` - Loading state
- ⚠️ `error` - Error state
- ✅ `success` - Success state
- ❌ `failure` - Failure state

### Additional Decorative Icons
- 🚩 `flag` - Flag marker
- 💎 `gem` - Gem reward
- 🎗️ `ribbon` - Ribbon award
- 🎖️ `badge` - Badge award
- ⚔️ `monsterDefeated` - Combat achievement
- 📦 `itemCollected` - Collection achievement

### Usage Example
```jsx
const achievementConfig = {
  score: [{
    isConditionMet: (value) => value >= 100,
    achievementDetails: {
      achievementId: 'high-score',
      achievementTitle: 'High Score!',
      achievementDescription: 'Score 100 points',
      achievementIconKey: 'legendary' // Use any icon key from above
    }
  }]
};
```

## Advanced Features

### Custom Styling
```jsx
const styles = {
  badgesButton: {
    position: 'fixed',
    top: '20px',
    right: '20px',
    // ...more styles
  },
  badgesModal: {
    overlay: { backgroundColor: 'rgba(0,0,0,0.8)' },
    // ...more styles
  }
};

<AchievementProvider styles={styles}>
  <App />
</AchievementProvider>
```

### Persistence
```jsx
<AchievementProvider
  config={achievementConfig}
  storageKey="my-game-achievements" // localStorage key
  initialState={loadedState}
/>
```

## Complete Documentation
- [Full Example](#full-example)
- [API Reference](#api-reference)
- [Icon List](#full-icon-list)
- [Styling Guide](#styling-guide)
- [Migration Guide](#migration-guide)
