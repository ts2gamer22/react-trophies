# 🏆 React-Achievements-Zustand

A flexible achievement system for React applications using Zustand for state management.

![React Achievements Demo](https://media.giphy.com/media/5sXoITml136LmyBPEc/giphy.gif)

Try it out: [StackBlitz Demo](https://stackblitz.com/edit/vitejs-vite-rymmutrx)

## Quick Start

```bash
npm install react react-dom zustand react-achievements-zustand
```

```jsx
import { AchievementProvider, useAchievement } from 'react-achievements-zustand';

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

// 2. Use the provider
function App() {
  return (
    <AchievementProvider config={achievementConfig}>
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

### Achievement Notifications
- Powered by [Sonner](https://sonner.emilkowal.ski/)
- Shows multiple achievements simultaneously
- Customizable appearance

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
