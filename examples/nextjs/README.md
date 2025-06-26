# React-Trophies Next.js Example

This example demonstrates how to integrate the `react-trophies` package with a Next.js application.

## Getting Started

1. Create a new Next.js project:

```bash
npx create-next-app my-trophy-app
cd my-trophy-app
```

2. Install the react-trophies package:

```bash
npm install react-trophies
# or
yarn add react-trophies
```

3. Copy the files from this example folder:

- `pages/_app.js` - Wraps your app with AchievementProvider and ThemeProvider
- `pages/index.js` - Example home page using trophy components
- `styles/Home.module.css` - Styles for the home page
- `styles/globals.css` - Global styles with dark mode support

## Key Components Used

This example demonstrates several key components:

- `AchievementProvider` - Manages achievement state and unlocking logic
- `AchievementToast` - Shows toast notifications when achievements unlock
- `ThemeProvider` - Provides theming with light/dark mode support
- `TrophyCard` - Individual achievement display cards
- `TrophyGrid` - Responsive grid for showing multiple achievements
- `TrophyShowcase` - Horizontal showcase of unlocked achievements
- `TrophyStats` - Statistics about achievement progress

## Important Notes for Next.js

When using the react-trophies package with Next.js:

1. **Client-side Storage**: Load saved achievements only on the client side to avoid SSR mismatches:

```jsx
// Only load from localStorage on the client side
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
```

2. **Sound Files**: Place sound files in the `public` directory:

```
public/
├─ sounds/
│  ├─ achievement.mp3
```

3. **SSR-safe Components**: For components that rely on browser APIs, you can use dynamic imports:

```jsx
import dynamic from 'next/dynamic';

const AchievementToastNoSSR = dynamic(
  () => import('react-trophies').then((mod) => mod.AchievementToast),
  { ssr: false }
);
```

## Further Customization

See the full [Integration Guide](../INTEGRATION_GUIDE.md) and [Components Documentation](../COMPONENTS.md) for more details on customizing and extending the trophy system.
