import { useAchievementStore } from '../store/useAchievementStore';

export const useAchievementState = () => {
    const { metrics, previouslyAwardedAchievements } = useAchievementStore();

    return {
        metrics,
        previouslyAwardedAchievements,
    };
};