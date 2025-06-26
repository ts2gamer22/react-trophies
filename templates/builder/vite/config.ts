// Web App Builder Achievement Configuration

/**
 * Achievement Details interface that matches the shape expected by react-trophies
 */
interface AchievementDetails {
  achievementId: string;
  achievementTitle: string;
  achievementDescription: string;
  achievementIconKey: string;
  isUnlocked?: boolean;
  dateUnlocked?: string;
}

/**
 * Achievement configuration for Builder/SaaS applications
 * 
 * This is specifically tailored for web extension builder applications like Extensio,
 * with achievements focused on builder engagement, mastery, and community.
 */

// ======================================================
// CATEGORY A: ONBOARDING ACHIEVEMENTS
// ======================================================
const onboardingAchievements = [
  {
    isConditionMet: (value) => value >= 1,
    achievementDetails: {
      achievementId: 'first-login',
      achievementTitle: 'Welcome Aboard!',
      achievementDescription: 'Sign in to your builder account for the first time',
      achievementIconKey: 'newBeginnings'
    }
  },
  {
    isConditionMet: (value) => value >= 1,
    achievementDetails: {
      achievementId: 'profile-complete',
      achievementTitle: 'Identity Established',
      achievementDescription: 'Complete your builder profile with avatar and bio',
      achievementIconKey: 'milestoneReached'
    }
  },
  {
    isConditionMet: (value) => value >= 1,
    achievementDetails: {
      achievementId: 'first-build',
      achievementTitle: 'First Creation',
      achievementDescription: 'Build your first extension',
      achievementIconKey: 'firstStep'
    }
  },
  {
    isConditionMet: (value) => value >= 1,
    achievementDetails: {
      achievementId: 'tutorial-finish',
      achievementTitle: 'Quick Study',
      achievementDescription: 'Complete all "Getting Started" tutorial steps',
      achievementIconKey: 'master'
    }
  }
];

// ======================================================
// CATEGORY B: ENGAGEMENT & FREQUENCY ACHIEVEMENTS
// ======================================================
const engagementAchievements = [
  {
    isConditionMet: (value) => value >= 3,
    achievementDetails: {
      achievementId: 'daily-streak-3',
      achievementTitle: 'Momentum Building',
      achievementDescription: 'Use the builder for 3 days in a row',
      achievementIconKey: 'streak'
    }
  },
  {
    isConditionMet: (value) => value >= 7,
    achievementDetails: {
      achievementId: 'daily-streak-7',
      achievementTitle: 'Dedicated Developer',
      achievementDescription: 'Use the builder for 7 days in a row',
      achievementIconKey: 'streak'
    }
  },
  {
    isConditionMet: (value) => value >= 4,
    achievementDetails: {
      achievementId: 'weekly-sessions',
      achievementTitle: 'Weekly Regular',
      achievementDescription: 'Complete 4 builder sessions in one week',
      achievementIconKey: 'consistent'
    }
  },
  {
    isConditionMet: (value) => value >= 1,
    achievementDetails: {
      achievementId: 'feedback-given',
      achievementTitle: 'Valuable Input',
      achievementDescription: 'Submit feedback or report a bug',
      achievementIconKey: 'liked'
    }
  }
];

// ======================================================
// CATEGORY C: MASTERY & POWER USAGE ACHIEVEMENTS
// ======================================================
const masteryAchievements = [
  {
    isConditionMet: (value) => value >= 1,
    achievementDetails: {
      achievementId: 'css-customizer',
      achievementTitle: 'Style Master',
      achievementDescription: 'Edit advanced CSS settings for your extension',
      achievementIconKey: 'artist'
    }
  },
  {
    isConditionMet: (value) => value >= 10,
    achievementDetails: {
      achievementId: 'publish-10',
      achievementTitle: 'Prolific Builder',
      achievementDescription: 'Publish 10 extensions',
      achievementIconKey: 'creator'
    }
  },
  {
    isConditionMet: (value) => value >= 1,
    achievementDetails: {
      achievementId: 'versioning-pro',
      achievementTitle: 'Version Control Veteran',
      achievementDescription: 'Use the rollback or version history feature',
      achievementIconKey: 'expert'
    }
  },
  {
    isConditionMet: (value) => value >= 1,
    achievementDetails: {
      achievementId: 'api-integration',
      achievementTitle: 'API Architect',
      achievementDescription: 'Integrate a third-party API into your extension',
      achievementIconKey: 'innovator'
    }
  }
];

// ======================================================
// CATEGORY D: SOCIAL & COMMUNITY ACHIEVEMENTS
// ======================================================
const socialAchievements = [
  {
    isConditionMet: (value) => value >= 1,
    achievementDetails: {
      achievementId: 'first-share',
      achievementTitle: 'Social Builder',
      achievementDescription: 'Share one of your extensions',
      achievementIconKey: 'shared'
    }
  },
  {
    isConditionMet: (value) => value >= 1,
    achievementDetails: {
      achievementId: 'collab-invite',
      achievementTitle: 'Team Player',
      achievementDescription: 'Invite a collaborator to work on your extension',
      achievementIconKey: 'invited'
    }
  },
  {
    isConditionMet: (value) => value >= 10,
    achievementDetails: {
      achievementId: 'template-upvote-10',
      achievementTitle: 'Community Favorite',
      achievementDescription: 'Get 10 likes on one of your extension templates',
      achievementIconKey: 'supporter'
    }
  },
  {
    isConditionMet: (value) => value >= 3,
    achievementDetails: {
      achievementId: 'community-helper',
      achievementTitle: 'Knowledge Sharer',
      achievementDescription: 'Answer 3 questions in the community forum',
      achievementIconKey: 'influencer'
    }
  }
];

// ======================================================
// CATEGORY E: SPECIAL & SEASONAL ACHIEVEMENTS
// ======================================================
const specialAchievements = [
  {
    isConditionMet: (value) => value >= 1,
    achievementDetails: {
      achievementId: 'hackathon-2025',
      achievementTitle: 'Hackathon Hero',
      achievementDescription: 'Participate in the 2025 Extension Builder Hackathon',
      achievementIconKey: 'special'
    }
  },
  {
    isConditionMet: (value) => value >= 50,
    achievementDetails: {
      achievementId: 'dark-mode-lover',
      achievementTitle: 'Night Owl',
      achievementDescription: 'Toggle dark mode 50 times',
      achievementIconKey: 'nightOwl'
    }
  }
];

// ======================================================
// COMPOUND ACHIEVEMENTS (require multiple conditions)
// ======================================================
const compoundAchievements = [
  {
    // This uses a more complex condition checking multiple metrics
    isConditionMet: (_, allMetrics) => 
      allMetrics.builds && allMetrics.builds.length >= 50 && 
      allMetrics.shares && allMetrics.shares.length >= 10,
    achievementDetails: {
      achievementId: 'extension-champion',
      achievementTitle: 'Extension Champion',
      achievementDescription: 'Build 50 extensions and share at least 10 with the community',
      achievementIconKey: 'legendary'
    }
  }
];

// Combine all achievement categories
export const builderAchievementConfig = {
  // Onboarding metrics
  profileComplete: onboardingAchievements.filter(a => a.achievementDetails.achievementId === 'profile-complete'),
  firstLogin: onboardingAchievements.filter(a => a.achievementDetails.achievementId === 'first-login'),
  firstBuild: onboardingAchievements.filter(a => a.achievementDetails.achievementId === 'first-build'),
  tutorialComplete: onboardingAchievements.filter(a => a.achievementDetails.achievementId === 'tutorial-finish'),
  
  // Engagement metrics
  dailyStreak: [
    ...engagementAchievements.filter(a => a.achievementDetails.achievementId === 'daily-streak-3'),
    ...engagementAchievements.filter(a => a.achievementDetails.achievementId === 'daily-streak-7')
  ],
  weeklySessions: engagementAchievements.filter(a => a.achievementDetails.achievementId === 'weekly-sessions'),
  feedbackSubmitted: engagementAchievements.filter(a => a.achievementDetails.achievementId === 'feedback-given'),
  
  // Mastery metrics
  cssEdits: masteryAchievements.filter(a => a.achievementDetails.achievementId === 'css-customizer'),
  extensionsPublished: masteryAchievements.filter(a => a.achievementDetails.achievementId === 'publish-10'),
  versioningUsed: masteryAchievements.filter(a => a.achievementDetails.achievementId === 'versioning-pro'),
  apiIntegrations: masteryAchievements.filter(a => a.achievementDetails.achievementId === 'api-integration'),
  
  // Social metrics
  extensionsShared: socialAchievements.filter(a => a.achievementDetails.achievementId === 'first-share'),
  collaboratorsInvited: socialAchievements.filter(a => a.achievementDetails.achievementId === 'collab-invite'),
  templateUpvotes: socialAchievements.filter(a => a.achievementDetails.achievementId === 'template-upvote-10'),
  questionsAnswered: socialAchievements.filter(a => a.achievementDetails.achievementId === 'community-helper'),
  
  // Special metrics
  hackathonParticipation: specialAchievements.filter(a => a.achievementDetails.achievementId === 'hackathon-2025'),
  darkModeToggles: specialAchievements.filter(a => a.achievementDetails.achievementId === 'dark-mode-lover'),
  
  // Compound achievement requiring multiple metrics
  extensionMastery: compoundAchievements
};

export default builderAchievementConfig;
