/**
 * Achievement configuration for your Vite application with TypeScript
 * 
 * This file defines all achievements available in your application
 * and the conditions under which they are unlocked.
 */
import { AchievementConfiguration, AchievementDetails } from 'react-trophies';

/**
 * Full achievement configuration object with metrics and unlock conditions
 */
export const achievementConfig: AchievementConfiguration = {
  // Example: Score-based achievements
  score: [
    {
      isConditionMet: (value: number) => value >= 100,
      achievementDetails: {
        achievementId: 'high-score',
        achievementTitle: 'High Score!',
        achievementDescription: 'Score 100 points',
        achievementIconKey: 'trophy',
        isUnlocked: false
      }
    },
    {
      isConditionMet: (value: number) => value >= 500,
      achievementDetails: {
        achievementId: 'pro-score',
        achievementTitle: 'Pro Scorer',
        achievementDescription: 'Score 500 points',
        achievementIconKey: 'medal',
        isUnlocked: false
      }
    }
  ],
  
  // Example: Page visit achievements
  pageVisits: [
    {
      isConditionMet: (value: number) => value >= 5,
      achievementDetails: {
        achievementId: 'frequent-visitor',
        achievementTitle: 'Frequent Visitor',
        achievementDescription: 'Visit pages 5 times',
        achievementIconKey: 'star',
        isUnlocked: false
      }
    },
    {
      isConditionMet: (value: number) => value >= 20,
      achievementDetails: {
        achievementId: 'loyal-visitor',
        achievementTitle: 'Loyal Visitor',
        achievementDescription: 'Visit pages 20 times',
        achievementIconKey: 'crown',
        isUnlocked: false
      }
    }
  ],
  
  // Example: Time-based achievements
  timeSpent: [
    {
      isConditionMet: (value: number) => value >= 5,
      achievementDetails: {
        achievementId: 'explorer',
        achievementTitle: 'Explorer',
        achievementDescription: 'Spend 5 minutes in the app',
        achievementIconKey: 'compass',
        isUnlocked: false
      }
    }
  ],

  // Example: Feature usage achievements
  features: [
    {
      isConditionMet: (value: string[]) => value.includes('darkMode'),
      achievementDetails: {
        achievementId: 'night-owl',
        achievementTitle: 'Night Owl',
        achievementDescription: 'Enable dark mode',
        achievementIconKey: 'moon',
        isUnlocked: false
      }
    }
  ]
};

/**
 * List of all achievements for display purposes
 * This can be used if you need a flat list of all achievements
 */
export const getAllAchievements = (): AchievementDetails[] => {
  return Object.values(achievementConfig)
    .flatMap(metricAchievements => 
      metricAchievements.map(achievement => achievement.achievementDetails)
    );
};
