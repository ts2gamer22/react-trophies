import { AchievementProvider, useAchievementContext } from './providers/AchievementProvider';
import type { 
    AchievementMetrics,
    AchievementConfiguration,
    AchievementDetails,
    AchievementUnlockCondition,
} from './types';
import ConfettiWrapper from './components/ConfettiWrapper';
import { useAchievementState } from './hooks/useAchievementState';
import { useAchievementStore } from './store/useAchievementStore';

// Import new components
import TrophyNotificationToast from './components/TrophyNotificationToast';
import TrophyCard from './components/TrophyCard';
import TrophyGrid from './components/TrophyGrid';
import AchievementProgress from './components/AchievementProgress';
import TrophyShowcase from './components/TrophyShowcase';
import soundManager, { SoundOptions } from './components/SoundManager';
import TrophyStats from './components/TrophyStats';
import AchievementToast from './components/AchievementToast';
import ThemeProvider, { useTheme } from './components/ThemeProvider';

// Export all components and hooks
export {
    AchievementProvider,
    useAchievementContext as useAchievement,
    ConfettiWrapper,
    useAchievementState,
    useAchievementStore,
    
    // New components export
    TrophyNotificationToast,
    TrophyCard,
    TrophyGrid,
    AchievementProgress,
    TrophyShowcase,
    soundManager,
    TrophyStats,
    AchievementToast,
    ThemeProvider,
    useTheme,
};

// Export types
export type {
    AchievementMetrics,
    AchievementConfiguration,
    AchievementDetails,
    AchievementUnlockCondition,
};

// Export component prop types for better developer experience
export type { TrophyNotificationToastProps } from './components/TrophyNotificationToast';
export type { TrophyCardProps } from './components/TrophyCard';
export type { TrophyGridProps } from './components/TrophyGrid';
export type { AchievementProgressProps } from './components/AchievementProgress';
export type { TrophyShowcaseProps } from './components/TrophyShowcase';
export type { SoundOptions } from './components/SoundManager';
export type { TrophyStatsProps } from './components/TrophyStats';
export type { AchievementToastProps } from './components/AchievementToast';
export type { 
    ThemeProviderProps, 
    ThemeType, 
    ThemeColors, 
    CustomTheme, 
    ThemeContextValue 
} from './components/ThemeProvider';