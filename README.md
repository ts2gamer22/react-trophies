<h1 align="center">🏆 React-Achievements-Zustand 🏆</h1>

A flexible and customizable achievement system for React applications using Zustand for state management, perfect for adding gamification elements to your projects.

![React Achievements Demo](https://github.com/dave-b-b/react-achievements/blob/main/images/demo.gif?raw=true)

If you want to test the package, you can try it out here:

https://stackblitz.com/edit/vitejs-vite-rymmutrx

<h2 align="center">🚀 Installation</h2>

Install `react-achievements` using npm or yarn:

```bash
npm install react react-dom zustand react-achievements-zustand
```

or

```bash
yarn add react react-dom zustand react-achievements-zustand
```

<h2 align="center">✨ Features</h2>

- **Flexible Achievement System**: Define custom metrics and achievement conditions for your game or app
- **Built with TypeScript**: Provides strong typing and improved developer experience
- **Zustand-Powered State Management**: Leverages Zustand for predictable and scalable state management
- **Robust Metric Tracking**: 
  - Supports multiple metric updates simultaneously
  - Handles rapid sequential updates correctly
  - Preserves metric history in arrays
  - Evaluates achievements based on latest metric values
- **Smart Achievement Notifications**: 
  - Shows multiple achievements simultaneously when unlocked together
  - Toast notifications powered by react-toastify
  - Configurable display duration and appearance
- **Race Condition Handling**:
  - Properly handles simultaneous achievement unlocks
  - Manages sequential rapid updates correctly
  - Prevents duplicate achievements
- **Persistent Storage**: 
  - Achievements and metrics stored in localStorage
  - Support for loading previously awarded achievements
- **UI Components**:
  - Achievement notifications with customizable icons
  - Badges gallery modal
  - Confetti celebration effects
  - Fully customizable styles

<h2 align="center">🎮 Usage</h2>

Let's walk through setting up a simple RPG-style game with achievements using React-Achievements.

<h3 align="center">🛠 Set up the AchievementProvider</h3>

First, wrap your app or a part of your app with the AchievementProvider:

```jsx
import React from 'react';
import { AchievementProvider } from 'react-achievements-zustand';
import Game from './Game'; // Your main game component
import achievementConfig from './achievementConfig'; // Your achievement configuration

const initialState = {
    level: 1,
    experience: 0,
    monstersDefeated: 0,
    questsCompleted: 0,
    previouslyAwardedAchievements: ['first_step'], // Optional: Load previously awarded achievements
    // Add any other initial metrics here
};

function App() {
    return (
        <AchievementProvider
            config={achievementConfig} // Required: your achievement configuration
            initialState={initialState} // Required: initial game metrics and optionally previously awarded achievements. This can be loaded from your server
            storageKey="my-game-achievements" // Optional: customize local storage key
            badgesButtonPosition="top-right" // Optional: customize badges button position
            // Optional: add custom styles and icons here
        >
            <Game />
        </AchievementProvider>
    );
}

export default App;
```

<h3 align="center">🎣 Use the useAchievement hook</h3>

In your game components, use the useAchievement hook to update metrics and trigger achievement checks:
```jsx
import React, { useState } from 'react';
import { useAchievement } from 'react-achievements-zustand';

function Game() {
    const { setMetrics, metrics } = useAchievement();
    const [currentQuest, setCurrentQuest] = useState(null);

    const defeatMonster = () => {
        setMetrics((prevMetrics) => ({
            ...prevMetrics,
            monstersDefeated: prevMetrics.monstersDefeated + 1,
            experience: prevMetrics.experience + 10,
            level: Math.floor((prevMetrics.experience + 10) / 100) + 1, // Calculate new level
        }));
    };

    const completeQuest = () => {
        setMetrics((prevMetrics) => ({
            ...prevMetrics,
            questsCompleted: prevMetrics.questsCompleted + 1,
            experience: prevMetrics.experience + 50,
            level: Math.floor((prevMetrics.experience + 50) / 100) + 1, // Calculate new level
        }));
        setCurrentQuest(null);
    };

    const startQuest = () => {
        setCurrentQuest("Defeat the Dragon");
    };

    return (
        <div>
            <h1>My RPG Game</h1>
            <p>Level: {metrics.level}</p>
            <p>Experience: {metrics.experience}</p>
            <p>Monsters Defeated: {metrics.monstersDefeated}</p>
            <p>Quests Completed: {metrics.questsCompleted}</p>

            <div>
                <h2>Battle Arena</h2>
                <button onClick={defeatMonster}>Fight a Monster</button>
            </div>

            <div>
                <h2>Quest Board</h2>
                {currentQuest ? (
                    <>
                        <p>Current Quest: {currentQuest}</p>
                        <button onClick={completeQuest}>Complete Quest</button>
                    </>
                ) : (
                    <button onClick={startQuest}>Start a New Quest</button>
                )}
            </div>
        </div>
    );
}

export default Game;
```

<h2 align="center">🔍 Achievement Evaluation</h2>

Achievements are evaluated based on the latest value of each metric. When updating metrics:

```javascript
// Single metric update
updateMetrics({
    score: [100]  // Sets score to 100
});

// Multiple simultaneous updates
updateMetrics({
    score: [100],
    combo: [5],
    time: [60]
});

// Sequential updates (all properly tracked)
updateMetrics({ score: [10] });
setTimeout(() => updateMetrics({ score: [50] }), 100);
setTimeout(() => updateMetrics({ score: [100] }), 200);
```

Each metric update:
1. Preserves the metric history in arrays
2. Triggers achievement checks using the latest values
3. Shows notifications for all unlocked achievements simultaneously

<h2 align="center">🎯 Achievement Notifications</h2>

Achievement notifications are powered by react-toastify and will:
- Display multiple achievements simultaneously when unlocked together
- Show custom icons for each achievement type
- Auto-dismiss after a configurable duration
- Support custom styling via CSS

### Achievement Notifications Custom CSS

```css
.Toastify__toast {
  background-color: #2c3e50;
  color: #ecf0f1;
  border-radius: 10px;
}

.Toastify__toast-body {
  font-family: Arial, sans-serif;
}

.Toastify__progress-bar {
  background: #27ae60;
}
```

### badgesModal

```js
badgesModal: {
  overlay: {
    // Styles for the modal overlay
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  content: {
    // Styles for the modal content container
    backgroundColor: '#2a2a2a',
    color: '#ffffff',
    borderRadius: '10px',
    padding: '20px',
  },
  title: {
    // Styles for the modal title
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#ffd700',
  },
  badgeContainer: {
    // Styles for the container holding all badges
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  badge: {
    // Styles for individual badge containers
    margin: '10px',
    textAlign: 'center',
  },
  badgeIcon: {
    // Styles for badge icons
    width: '50px',
    height: '50px',
  },
  badgeTitle: {
    // Styles for badge titles
    fontSize: '14px',
    marginTop: '5px',
  },
  button: {
    // Styles for the close button
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
}
```

### badgesButton

```js
badgesButton: {
  // Styles for the floating badges button
  position: 'fixed',
  padding: '10px 20px',
  backgroundColor: '#007bff',
  color: '#ffffff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  zIndex: 1000,
}
```

<h2 align="center">Resetting React Achievements</h2>

The achievements and metrics are managed by Zustand and persisted in local storage. You have two primary ways to reset the achievement system:

1.  **Programmatic Reset:** Use the `resetStorage` function provided by the `useAchievementContext` hook within your components:

```jsx
    import React from 'react';
    import { useAchievementContext } from 'react-achievements-zustand';

    function ResetButton() {
      const { resetStorage } = useAchievementContext();

      const handleReset = () => {
        resetStorage();
        console.log('Achievements and progress reset!');
      };

      return <button onClick={handleReset}>Reset Achievements</button>;
    }
```

<h2 align="center">💾 Saving and Loading Progress</h2>

s<h4 align="center">To persist user achievement progress across sessions or devices, you'll typically want to save the `metrics` and `previouslyAwardedAchievements` from your Zustand store to your server. You can use the `useAchievementState` hook to access this data and trigger the save operation, for example, when the user logs out:
</h4>

```jsx
import React from 'react';
import { useAchievementState } from 'react-achievements-zustand/hooks/useAchievementState';

const LogoutButtonWithSave = ({ onLogout }) => {
    const { metrics, previouslyAwardedAchievements } = useAchievementState();

    const handleLogoutAndSave = async () => {
        const achievementData = {
            metrics,
            previouslyAwardedAchievements,
        };
        try {
            const response = await fetch('/api/save-achievements', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Include any necessary authentication headers
                },
                body: JSON.stringify(achievementData),
            });
            if (response.ok) {
                console.log('Achievement data saved successfully before logout!');
            } else {
                console.error('Failed to save achievement data before logout.');
            }
        } catch (error) {
            console.error('Error saving achievement data:', error);
        } finally {
            // Proceed with the logout action regardless of save success
            onLogout();
        }
    };

    return (
        <button onClick={handleLogoutAndSave}>Logout</button>
    );
};

export default LogoutButtonWithSave;
```

<h2 align="center">🏆Available Icons🏆</h2>

```
// General Progress & Milestones
    levelUp: '🏆',
    questComplete: '📜',
    monsterDefeated: '⚔️',
    itemCollected: '📦',
    challengeCompleted: '🏁',
    milestoneReached: '🏅',
    firstStep: '👣',
    newBeginnings: '🌱',
    breakthrough: '💡',
    growth: '📈',

    // Social & Engagement
    shared: '🔗',
    liked: '❤️',
    commented: '💬',
    followed: '👥',
    invited: '🤝',
    communityMember: '🏘️',
    supporter: '🌟',
    connected: '🌐',
    participant: '🙋',
    influencer: '📣',

    // Time & Activity
    activeDay: '☀️',
    activeWeek: '📅',
    activeMonth: '🗓️',
    earlyBird: '⏰',
    nightOwl: '🌙',
    streak: '🔥',
    dedicated: '⏳',
    punctual: '⏱️',
    consistent: '🔄',
    marathon: '🏃',

    // Creativity & Skill
    artist: '🎨',
    writer: '✍️',
    innovator: '🔬',
    creator: '🛠️',
    expert: '🎓',
    master: '👑',
    pioneer: '🚀',
    performer: '🎭',
    thinker: '🧠',
    explorer: '🗺️',

    // Achievement Types
    bronze: '🥉',
    silver: '🥈',
    gold: '🥇',
    diamond: '💎',
    legendary: '✨',
    epic: '💥',
    rare: '🔮',
    common: '🔘',
    special: '🎁',
    hidden: '❓',

    // Numbers & Counters
    one: '1️⃣',
    ten: '🔟',
    hundred: '💯',
    thousand: '🔢',

    // Actions & Interactions
    clicked: '🖱️',
    used: '🔑',
    found: '🔍',
    built: '🧱',
    solved: '🧩',
    discovered: '🔭',
    unlocked: '🔓',
    upgraded: '⬆️',
    repaired: '🔧',
    defended: '🛡️',

    // Placeholders
    default: '⭐', // A fallback icon
    loading: '⏳',
    error: '⚠️',
    success: '✅',
    failure: '❌',

    // Miscellaneous
    trophy: '🏆',
    star: '⭐',
    flag: '🚩',
    puzzle: '🧩',
    gem: '💎',
    crown: '👑',
    medal: '🏅',
    ribbon: '🎗️',
    badge: '🎖️',
    shield: '🛡️',
```

<h2 align="center">📄 License</h2>
MIT

React-Achievements provides a comprehensive achievement system for React applications, perfect for adding gamification elements to your projects. Whether you're building a game, an educational app, or any interactive experience, this package offers an easy way to implement and manage achievements, enhancing user engagement and retention.

<h2 align="center">📥 Exporting and Importing Achievement State</h2>

You can export the current state of achievements to save it to your server and later import it back. Here's how:

### Exporting the State

To export the current state, use the `useAchievementStore` hook directly:

```jsx
import { useAchievementStore } from 'react-achievements-zustand';

const ExportStateButton = () => {
    const store = useAchievementStore();
    
    const handleExport = () => {
        // Get the complete state
        const state = {
            metrics: store.metrics,
            unlockedAchievements: store.unlockedAchievements,
            previouslyAwardedAchievements: store.previouslyAwardedAchievements,
            notifications: store.notifications,
            isInitialized: store.isInitialized
        };
        
        // You can now save this state to your server
        saveToServer(state);
    };

    return <button onClick={handleExport}>Export Achievement State</button>;
};
```

### Importing the State

To import a previously saved state, provide it in the `initialState` prop of the `AchievementProvider`:

```jsx
import { AchievementProvider } from 'react-achievements-zustand';

// This could be loaded from your server
const savedState = {
    metrics: {
        level: 5,
        experience: 1000,
        // ... other metrics
    },
    previouslyAwardedAchievements: ['achievement1', 'achievement2'],
    // You can include other state properties if needed
};

function App() {
    return (
        <AchievementProvider
            config={achievementConfig}
            initialState={savedState}
            storageKey="my-game-achievements"
        >
            <Game />
        </AchievementProvider>
    );
}
```

### Best Practices

1. When exporting state, consider what data you need to persist:
   - `metrics`: Required for tracking progress
   - `unlockedAchievements`: Required for maintaining achievement status. This is used to trigger achievements as they are earned
   - `previouslyAwardedAchievements`: Required for historical records
   - `notifications`: Optional, typically not needed to persist
   - `isInitialized`: Optional, will be set automatically on provider mount

2. When importing state, the minimum required properties in `initialState` are:
   - `metrics`: Your achievement metrics
   - `previouslyAwardedAchievements`: Previously awarded achievements

3. Consider implementing automatic state sync:

```jsx
import { useAchievementStore } from 'react-achievements-zustand';
import { useEffect } from 'react';

const AutoSyncAchievements = () => {
    const store = useAchievementStore();

    useEffect(() => {
        // Set up an interval to sync state periodically
        const syncInterval = setInterval(() => {
            const stateToSync = {
                metrics: store.metrics,
                unlockedAchievements: store.unlockedAchievements,
                previouslyAwardedAchievements: store.previouslyAwardedAchievements
            };
            
            // Your sync logic here
            saveToServer(stateToSync);
        }, 5 * 60 * 1000); // Every 5 minutes

        return () => clearInterval(syncInterval);
    }, [store]);

    return null; // This is a utility component, it doesn't render anything
};
```
