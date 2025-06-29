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

export {
    AchievementProvider,
    useAchievementContext as useAchievement,
    ConfettiWrapper,
    useAchievementState,
    useAchievementStore,
};

export type {
    AchievementMetrics,
    AchievementConfiguration,
    AchievementDetails,
    AchievementUnlockCondition,
};