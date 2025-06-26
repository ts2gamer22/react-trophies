import {Styles} from "./defaultStyles";
import { ReactNode } from 'react';

export type AchievementMetricValue = number | string | boolean | Date;

export interface AchievementDetails {
    achievementId: string;
    achievementTitle: string;
    achievementDescription: string;
    achievementIconKey?: string;
    isUnlocked?: boolean;
    achievementDate?: Date;
    targetValue?: number; // Added for progress tracking
    currentValue?: number; // Added for progress tracking
    [key: string]: any;
}

export type AchievementIconRecord = Record<string, string>;

export interface AchievementConfiguration {
    [metricName: string]: Array<AchievementUnlockCondition<AchievementMetricValue>>;
}

export type InitialAchievementMetrics = Record<string, AchievementMetricValue | AchievementMetricValue[] | undefined>;
export type AchievementMetrics = Record<string, AchievementMetricValue[]>;

export interface AchievementProviderProps {
    children: ReactNode;
    config: AchievementConfiguration;
    initialState?: InitialAchievementMetrics & { previouslyAwardedAchievements?: string[] }; // Add optional previouslyAwardedAchievements
    storageKey?: string;
    badgesButtonPosition?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
    styles?: Partial<Styles>;
    icons?: Record<string, string>;
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

export interface TrophyCardProps {
    achievement: AchievementDetails;
    showDescription?: boolean;
    showDate?: boolean;
    style?: React.CSSProperties;
    onClick?: (achievement: AchievementDetails) => void;
}

export interface TrophyGridProps {
    achievements: AchievementDetails[];
    columns?: number | string;
    minColumnWidth?: number;
    filter?: (achievement: AchievementDetails) => boolean;
    showDescriptions?: boolean;
    showDates?: boolean;
    onTrophyClick?: (achievement: AchievementDetails) => void;
}

export interface TrophyShowcaseProps {
    achievements: AchievementDetails[];
    maxDisplay?: number;
    onlyShowUnlocked?: boolean;
    showLabels?: boolean;
    onTrophyClick?: (achievement: AchievementDetails) => void;
    containerStyle?: React.CSSProperties;
    trophySize?: 'small' | 'medium' | 'large';
}

export interface TrophyStatsProps {
    achievements: AchievementDetails[];
    showTotal?: boolean;
    showUnlocked?: boolean;
    showPercentage?: boolean;
    showProgressBar?: boolean;
    title?: string;
    style?: React.CSSProperties;
    progressBarStyle?: React.CSSProperties;
}

export interface AchievementToastProps {
    position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
    expandOnHover?: boolean;
}

export interface ThemeProviderProps {
    children: ReactNode;
    theme?: 'light' | 'dark' | 'custom';
    customTheme?: Record<string, any>;
}
