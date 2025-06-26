import React, { ReactNode } from 'react';
import { AchievementProvider, AchievementToast, ThemeProvider } from 'react-trophies';
// When installed in a real project, this path will be correct
// This is just a placeholder for the template
const builderAchievementConfig = {};

/**
 * AchievementWrapper Component
 * 
 * This component wraps your application with achievement providers and toast notifications
 * specifically configured for web builder & extension applications like Extensio.
 * 
 * @param {Object} props - Component props
 * @param {ReactNode} props.children - Child components to wrap
 * @param {string} props.storageKey - Key used to persist achievement state in localStorage
 * @param {Object} props.initialState - Optional initial state for achievements
 * @returns {JSX.Element} Wrapped application with achievement context
 */
export const AchievementWrapper: React.FC<{
  children: ReactNode;
  storageKey?: string;
  initialState?: Record<string, any>;
}> = ({ 
  children, 
  storageKey = 'extensio-achievements',
  initialState = {}
}) => {
  // Custom toast notification styles to match your UI
  const toastStyles = {
    background: '#2a2b38',
    color: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    padding: '12px'
  };

  return (
    <ThemeProvider initialTheme="dark" persistTheme={true}>
      <AchievementProvider
        config={builderAchievementConfig}
        storageKey={storageKey}
        initialState={initialState}
        badgesButtonPosition="bottom-right"
        // The soundUrl prop would be configured in your main app
      >
        {children}
        
        <AchievementToast
          position="bottom-right"
          expandOnHover={true}
          customToastStyles={toastStyles}
          toastTitle="Achievement Unlocked!"
        />
      </AchievementProvider>
    </ThemeProvider>
  );
};

export default AchievementWrapper;
