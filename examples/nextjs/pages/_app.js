import '../styles/globals.css';
import { AchievementProvider, AchievementToast, ThemeProvider } from 'react-trophies';

/**
 * Achievement configuration for the demo
 * Defines different achievements that can be unlocked based on metrics
 */
const achievementConfig = {
  // Score-based achievements
  score: [{
    isConditionMet: (value) => value >= 50,
    achievementDetails: {
      achievementId: 'score-50',
      achievementTitle: 'Half Century',
      achievementDescription: 'Reach a score of 50 points',
      achievementIconKey: 'bronze',
      isUnlocked: false
    }
  }, {
    isConditionMet: (value) => value >= 100,
    achievementDetails: {
      achievementId: 'score-100',
      achievementTitle: 'Century Maker',
      achievementDescription: 'Reach a score of 100 points',
      achievementIconKey: 'silver',
      isUnlocked: false
    }
  }],
  
  // Visit-based achievements
  visits: [{
    isConditionMet: (value) => value >= 3,
    achievementDetails: {
      achievementId: 'regular-visitor',
      achievementTitle: 'Regular Visitor',
      achievementDescription: 'Visit the site 3 times',
      achievementIconKey: 'activeDay',
      isUnlocked: false
    }
  }, {
    isConditionMet: (value) => value >= 10,
    achievementDetails: {
      achievementId: 'loyal-visitor',
      achievementTitle: 'Loyal Visitor',
      achievementDescription: 'Visit the site 10 times',
      achievementIconKey: 'activeWeek',
      isUnlocked: false
    }
  }],
  
  // Social-based achievements
  shares: [{
    isConditionMet: (value) => value >= 1,
    achievementDetails: {
      achievementId: 'first-share',
      achievementTitle: 'Sharing is Caring',
      achievementDescription: 'Share something for the first time',
      achievementIconKey: 'shared',
      isUnlocked: false
    }
  }],
  
  // Engagement-based achievements
  likes: [{
    isConditionMet: (value) => value >= 5,
    achievementDetails: {
      achievementId: 'appreciative',
      achievementTitle: 'Appreciative',
      achievementDescription: 'Like 5 items',
      achievementIconKey: 'liked',
      isUnlocked: false
    }
  }]
};

/**
 * Custom App component that wraps the entire application with providers
 * @param {Object} props - Component props
 * @param {React.Component} props.Component - The active page component
 * @param {Object} props.pageProps - Props for the page component
 * @returns {React.ReactElement} Wrapped application
 */
function MyApp({ Component, pageProps }) {
  return (
    // ThemeProvider supports light, dark, and system theme modes
    <ThemeProvider initialTheme="system" persistTheme={true}>
      {/* AchievementProvider manages all achievement state */}
      <AchievementProvider 
        config={achievementConfig}
        storageKey="next-trophies-demo"
      >
        {/* AchievementToast shows notifications when achievements are unlocked */}
        <AchievementToast 
          position="bottom-right"
          playSound={true}
          expandOnHover={true}
        />
        <Component {...pageProps} />
      </AchievementProvider>
    </ThemeProvider>
  );
}

export default MyApp;
