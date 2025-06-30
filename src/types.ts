import {Styles} from "./defaultStyles";
import React from 'react';

export type AchievementMetricValue = number | string | boolean | Date;

export interface AchievementDetails {
    achievementId: string;
    achievementTitle: string;
    achievementDescription: string;
    achievementIconKey?: string;
    /** Whether this achievement is unlocked */
    isUnlocked?: boolean;
    /** The date when this achievement was unlocked */
    achievementDate?: string | Date;
    /** Optional target value for progress-based achievements */
    targetValue?: number;
}

export type AchievementIconRecord = Record<string, string>;

export interface AchievementConfiguration {
    [metricName: string]: Array<AchievementUnlockCondition<AchievementMetricValue>>;
}

export type InitialAchievementMetrics = Record<string, AchievementMetricValue | AchievementMetricValue[] | undefined>;
export type AchievementMetrics = Record<string, AchievementMetricValue[]>;

export interface AchievementProviderProps {
    children: React.ReactNode;
    config: AchievementConfiguration;
    initialState?: InitialAchievementMetrics & { previouslyAwardedAchievements?: string[] };
    storageKey?: string;
    badgesButtonPosition?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
    styles?: Partial<Styles>;
    icons?: Record<string, string>;
    achievementSoundUrl?: string;
    /** Controls whether achievement sound effects play (default: true) */
    enableSound?: boolean;
    /** Controls whether confetti celebration displays (default: true) */
    enableConfetti?: boolean;
    /** Controls whether toast notifications display (default: true) */
    enableToasts?: boolean;
    /** Title text displayed at the top of achievement toast notifications (default: "Achievement Unlocked!") */
    toastTitle?: string;
    /** Custom styles for achievement toast notifications */
    toastStyles?: React.CSSProperties;
    /** When true, uses default Sonner toast styling instead of custom styling (default: false) */
    useDefaultToastStyles?: boolean;
}

export interface AchievementUnlockCondition<T extends AchievementMetricValue> {
    isConditionMet: (value: T) => boolean;
    achievementDetails: AchievementDetails;
}

export interface SerializedAchievementUnlockCondition {
    achievementDetails: AchievementDetails;
    conditionType: 'number' | 'string' | 'boolean' | 'date';
    conditionValue: any;
}

export interface SerializedAchievementConfiguration {
    [metricName: string]: SerializedAchievementUnlockCondition[];
}

/**
 * Interface for the Achievement Context provided to components
 */
export interface AchievementContextType {
    /** Updates metrics and automatically checks for unlocked achievements */
    updateMetrics: (newMetrics: AchievementMetrics | ((prevMetrics: AchievementMetrics) => AchievementMetrics)) => void;
    /** List of unlocked achievement IDs */
    unlockedAchievements: string[];
    /** Resets the achievement storage */
    resetStorage: () => void;
    /** Current notifications to be displayed */
    notifications: AchievementDetails[];
    /** Clears current notifications after they've been displayed */
    clearNotifications: () => void;
}