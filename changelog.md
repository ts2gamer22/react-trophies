# Changelog - React Trophies

## v2.2.0 (2025-07-02)

### New Features

- **Enhanced TrophyModal Component**:
  - Added achievement icons display for visual distinction
  - Added green styling for unlocked achievements with celebration emoji
  - Fixed duplicate button issue when using custom triggers
  - Added extensive styling customization options with new props:
    - `modalClassName`: For styling the modal container
    - `cardClassName`: For styling all achievement cards
    - `unlockedCardClassName`: For styling unlocked achievement cards
    - `iconClassName`: For styling achievement icons

- **Dependency Management**:
  - Added support for sonner v2.x (^1.4.41 || ^2.0.0)
  - Simplified Shadcn UI integration with comprehensive documentation
  - Added proper icon support for achievement visualization

### Documentation

- Added comprehensive Storybook examples for TrophyModal customization
- Updated integration guide with TrophyModal styling instructions
- Added detailed sections about dependencies and styling options

## v2.1.2 (2025-06-30)

### Bug Fixes

- **Performance Optimization**:
  - Fixed infinite render loop issue in AchievementProvider using proper function memoization
  - Implemented useCallback and useMemo for context value and functions
  - Added mergedIcons memoization to prevent unnecessary re-renders
  - Fixed TypeScript errors related to icon indexing
  - Improved enableToasts flag handling in notification effect

## v2.1.1 (2025-06-30)

### Bug Fixes

- **Toast Styling**:
  - Added toastStyles prop to AchievementProvider for custom toast styling
  - Added useDefaultToastStyles prop to optionally use Sonner's default toast styling
  - Updated documentation for new styling options

## v2.1.0 (2025-06-30)

### Major Architecture Improvements

- **Toast Notification Architecture Redesign**:
  - Implemented the render prop pattern for toast notifications
  - Created new `AchievementToastContent` component to separate toast content from toast rendering
  - Fixed conflicts with applications that also use Sonner
  - Added `toastTitle` prop to `AchievementProvider` for customizing the title text
  - Enhanced CSS class names with `rt-` prefix for better styling targeting
  - Added `data-testid` attributes to improve component testability

### Documentation

- Updated integration guide with improved Sonner integration instructions
- Added examples for the new toast architecture
- Added clear warning about the Toaster component requirement

## v2.0.0 (2025-06-30)

### BREAKING CHANGES

- **Toast Handling System Redesign**:
  - Removed built-in `<Toaster />` component rendering from `AchievementProvider`
  - Deprecated `TrophyNotificationToast` component
  - Users must now add their own `<Toaster />` component from sonner in their app layout
  - Added warning when toasts are triggered but no Toaster component is found in DOM
  
### New Features

- **Improved Toast Architecture**:
  - Added `TrophyToast` utility export as a wrapper around sonner's toast function
  - Added `isToasterMounted` helper function to detect if a Toaster is in the DOM
  - Better separation of concerns: library handles logic, app handles UI rendering
  
### Documentation

- Updated documentation to reflect new toast handling approach
- Added clearer guidance on sonner integration in host applications
- Emphasized sonner as a peer dependency

### Technical Changes

- Added the `utils/TrophyToast.ts` utility module
- Improved code organization and maintainability
- Removed unnecessary console.log statements

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
