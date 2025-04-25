import { create } from 'zustand';
import {
    InitialAchievementMetrics,
    AchievementMetrics,
    AchievementDetails,
    SerializedAchievementConfiguration,
} from '../types';

interface AchievementState {
    isInitialized: boolean;
    config: SerializedAchievementConfiguration;
    metrics: AchievementMetrics;
    unlockedAchievements: string[];
    previouslyAwardedAchievements: string[];
    storageKey: string | null;
    notifications: AchievementDetails[];
    initialize: (params: { 
        config: SerializedAchievementConfiguration; 
        initialState?: InitialAchievementMetrics & { previouslyAwardedAchievements?: string[] }; 
        storageKey: string 
    }) => void;
    setMetrics: (metrics: AchievementMetrics) => void;
    unlockAchievement: (achievementId: string) => void;
    markAchievementAsAwarded: (achievementId: string) => void;
    resetAchievements: () => void;
    addNotification: (notification: AchievementDetails) => void;
    clearNotifications: () => void;
}

export const useAchievementStore = create<AchievementState>((set, get) => ({
    isInitialized: false,
    config: {},
    metrics: {},
    unlockedAchievements: [],
    previouslyAwardedAchievements: [],
    storageKey: null,
    notifications: [],

    initialize: ({ config, initialState, storageKey }) => {
        const state = get();
        if (state.isInitialized) return;

        const storedState = storageKey ? localStorage.getItem(storageKey) : null;

        const initialMetrics = initialState ? Object.keys(initialState)
            .filter(key => key !== 'previouslyAwardedAchievements')
            .reduce((acc, key) => ({ 
                ...acc, 
                [key]: Array.isArray(initialState[key]) ? initialState[key] : [initialState[key]] 
            }), {}) : {};

        const initialAwarded = initialState?.previouslyAwardedAchievements || [];

        if (storedState) {
            try {
                const parsedState = JSON.parse(storedState);
                set({
                    isInitialized: true,
                    config,
                    storageKey,
                    metrics: parsedState.achievements?.metrics || initialMetrics,
                    unlockedAchievements: parsedState.achievements?.unlockedAchievements || [],
                    previouslyAwardedAchievements: parsedState.achievements?.previouslyAwardedAchievements || initialAwarded,
                });
            } catch (error) {
                console.error('Error parsing stored achievement state:', error);
                set({
                    isInitialized: true,
                    config,
                    storageKey,
                    metrics: initialMetrics,
                    unlockedAchievements: [],
                    previouslyAwardedAchievements: initialAwarded,
                });
            }
        } else {
            set({
                isInitialized: true,
                config,
                storageKey,
                metrics: initialMetrics,
                unlockedAchievements: [],
                previouslyAwardedAchievements: initialAwarded,
            });
        }
    },

    setMetrics: (metrics) => {
        const state = get();
        set({ metrics });
        if (state.storageKey) {
            localStorage.setItem(state.storageKey, JSON.stringify({
                achievements: {
                    metrics,
                    unlockedAchievements: state.unlockedAchievements,
                    previouslyAwardedAchievements: state.previouslyAwardedAchievements
                }
            }));
        }
    },

    unlockAchievement: (achievementId) => {
        const state = get();
        if (!state.unlockedAchievements.includes(achievementId)) {
            const newUnlockedAchievements = [...state.unlockedAchievements, achievementId];
            set({ unlockedAchievements: newUnlockedAchievements });
            if (state.storageKey) {
                localStorage.setItem(state.storageKey, JSON.stringify({
                    achievements: {
                        metrics: state.metrics,
                        unlockedAchievements: newUnlockedAchievements,
                        previouslyAwardedAchievements: state.previouslyAwardedAchievements
                    }
                }));
            }
        }
    },

    markAchievementAsAwarded: (achievementId) => {
        const state = get();
        if (!state.previouslyAwardedAchievements.includes(achievementId)) {
            const newAwardedAchievements = [...state.previouslyAwardedAchievements, achievementId];
            set({ previouslyAwardedAchievements: newAwardedAchievements });
            if (state.storageKey) {
                localStorage.setItem(state.storageKey, JSON.stringify({
                    achievements: {
                        metrics: state.metrics,
                        unlockedAchievements: state.unlockedAchievements,
                        previouslyAwardedAchievements: newAwardedAchievements
                    }
                }));
            }
        }
    },

    resetAchievements: () => {
        const state = get();
        set({
            metrics: {},
            unlockedAchievements: [],
            previouslyAwardedAchievements: [],
        });
        if (state.storageKey) {
            localStorage.removeItem(state.storageKey);
        }
    },

    addNotification: (notification) => {
        const state = get();
        set({ notifications: [...state.notifications, notification] });
    },

    clearNotifications: () => {
        set({ notifications: [] });
    },
}));