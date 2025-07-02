import { AchievementProvider, useAchievementContext } from './providers/AchievementProvider';
import type { 
    AchievementMetrics,
    AchievementConfiguration,
    AchievementDetails,
    AchievementUnlockCondition,
} from './types';
import ConfettiWrapper from './components/ConfettiWrapper';
import TrophyModal from './components/TrophyModal';
import { useAchievementState } from './hooks/useAchievementState';
import { useAchievementStore } from './store/useAchievementStore';
import { toast as TrophyToast, isToasterMounted } from './utils/TrophyToast';

export {
    AchievementProvider,
    useAchievementContext as useAchievement,
    ConfettiWrapper,
    TrophyModal,
    useAchievementState,
    useAchievementStore,
    TrophyToast,
    isToasterMounted,
};

export type {
    AchievementMetrics,
    AchievementConfiguration,
    AchievementDetails,
    AchievementUnlockCondition,
};