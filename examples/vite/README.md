# React-Trophies Vite Integration

This folder contains examples for integrating the react-trophies package with Vite and React using TypeScript.

## Quick Start

1. Create a new Vite project with React and TypeScript:
```bash
npm create vite@latest my-app -- --template react-ts
cd my-app
```

2. Install react-trophies:
```bash
npm install react-trophies
```

3. Run the setup script:
```bash
npx react-trophies-setup vite
```

This will create the necessary files and integrate the trophy system into your application.

## Manual Setup

If you prefer to set up manually:

1. Copy the example files from this directory into your project
2. Ensure your main entry file wraps your App with the AchievementProvider
3. Add your own achievement configurations

## File Structure

The setup creates:

- `src/lib/achievements/config.ts` - Achievement configuration
- `src/components/achievements/AchievementWrapper.tsx` - Provider component
- `src/components/achievements/AchievementDemo.tsx` - Example component

## Testing

For type testing, you can add the following to your `vite.config.ts`:

```ts
/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './tests/setup.ts',
  },
})
```

Then create a simple test with `vitest`:

```ts
// tests/achievements.test.ts
import { describe, it, expect } from 'vitest';
import { achievementConfig } from '../src/lib/achievements/config';

describe('Achievement Configuration', () => {
  it('should have valid achievement configurations', () => {
    // Ensure each metric has array of achievements
    Object.values(achievementConfig).forEach(metrics => {
      expect(Array.isArray(metrics)).toBe(true);
      
      // Ensure each achievement has required fields
      metrics.forEach(achievement => {
        expect(typeof achievement.isConditionMet).toBe('function');
        expect(achievement.achievementDetails).toBeDefined();
        expect(achievement.achievementDetails.achievementId).toBeDefined();
        expect(achievement.achievementDetails.achievementTitle).toBeDefined();
        expect(achievement.achievementDetails.achievementDescription).toBeDefined();
      });
    });
  });
});
```

Run tests with:
```bash
npm test
```
