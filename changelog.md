# Changelog - React Trophies

## v1.4.2 (2025-06-29)

### Fixes & Improvements

- ✅ Storybook examples now include direct sound-test controls and confirm playback with Howler.js.
- 🔊 Improved runtime logging for audio load / play errors.
- 🗂 Added proper `files`/`exports` fields and `sideEffects:false` in package.json so only the built bundle is published.
- 📦 Verified Rollup `external` array lists: react, react-dom, zustand, react-confetti, react-use, sonner, howler.
- 🔖 Bumped package version to 1.4.2.


## v1.0.0 (2025-06-28)

### Package Modernization and Rebranding

- **Package Renamed**: Rebranded from `react-achievements-zustand` to `react-trophies`
- **License Changed**: Updated from ISC to MIT license
- **React Compatibility**: Added support for React 19 (^18.0.0 || ^19.0.0-rc.0)
- **Zustand Compatibility**: Added support for Zustand 5 (^4.0.0 || ^5.0.0)

### Feature Updates

- **Notification System Upgrade**: 
  - Replaced react-toastify with sonner for more modern, cleaner notifications
  - Improved toast appearance with rich colors and simpler design
  - Added 4000ms default duration (up from 3000ms) for better readability

- **Audio Support Added**:
  - Integrated howler.js for achievement sound effects
  - Added achievement sound URL configuration option
  - Implemented sound playback when achievements are unlocked
  - Added error handling for sound playback failures

- **Developer Experience**:
  - Added TypeScript declaration for howler.js
  - Updated Storybook imports for version 8.x compatibility
  - Fixed type definitions throughout the codebase

### Technical Changes

- **Dependencies**:
  - Added: `howler: ^2.2.4` and `@types/howler: ^2.2.12`
  - Added: `sonner: ^1.4.41`
  - Removed: `react-toastify: ^9.0.0` and `@types/react-toastify: ^4.0.2`
  - Updated external dependencies in rollup configuration

- **Type Definitions**:
  - Added `achievementSoundUrl` prop to `AchievementProviderProps` interface
  - Added custom type definitions for Howler.js
  - Updated storybook type imports

### Documentation

- Updated keywords in package.json to include new technologies
- Updated component examples in storybook to demonstrate sound functionality
- Added achievement sound URL parameter to storybook controls

### Removed

- Removed CustomStyles stories file
- Removed react-toastify CSS imports
- Removed ToastContainer component

---

## Previous Versions

### v0.2.4 and earlier

- Initial implementation of achievement system using react-toastify
- Core achievement tracking functionality
- Achievement notifications and badges
- Zustand state management
