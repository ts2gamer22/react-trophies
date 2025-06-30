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
import { toast as TrophyToast, isToasterMounted } from './utils/TrophyToast';
import { AchievementToastContent } from './components/AchievementToastContent';

export {
    AchievementProvider,
    useAchievementContext as useAchievement,
    ConfettiWrapper,
    useAchievementState,
    useAchievementStore,
    TrophyToast,
    isToasterMounted,
    AchievementToastContent,
};

export type {
    AchievementMetrics,
    AchievementConfiguration,
    AchievementDetails,
    AchievementUnlockCondition,
};