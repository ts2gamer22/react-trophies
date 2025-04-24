import { useAchievementStore } from '../store/useAchievementStore';
import { useAchievementContext } from '../providers/AchievementProvider';

export const useAchievement = () => {
    const { updateMetrics, unlockedAchievements, resetStorage } = useAchievementContext() || {};
    const { metrics, config, notifications } = useAchievementStore();

    return {
        metrics,
        unlockedAchievements: unlockedAchievements || [],
        notifications,
        config,
        updateMetrics: updateMetrics || (() => {}),
        resetStorage: resetStorage || (() => {}),
    };
};