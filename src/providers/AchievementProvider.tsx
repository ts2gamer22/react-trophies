import React, { useEffect, useCallback, useState, useMemo } from 'react';
import {
    AchievementDetails,
    AchievementMetricValue,
    SerializedAchievementUnlockCondition,
    SerializedAchievementConfiguration,
    AchievementProviderProps,
    AchievementMetrics,
    AchievementConfiguration,
    AchievementUnlockCondition,
} from '../types';
import { useAchievementStore } from '../store/useAchievementStore';
import AchievementModal from '../components/AchievementModal';
import BadgesButton from '../components/BadgesButton';
import BadgesModal from '../components/BadgesModal';
import ConfettiWrapper from '../components/ConfettiWrapper';
import { defaultStyles } from '../defaultStyles';

export interface AchievementContextType {
    updateMetrics: (newMetrics: AchievementMetrics | ((prevMetrics: AchievementMetrics) => AchievementMetrics)) => void;
    unlockedAchievements: string[];
    resetStorage: () => void;
}

export const AchievementContext = React.createContext<AchievementContextType | undefined>(undefined);

export const useAchievementContext = () => {
    const context = React.useContext(AchievementContext);
    if (!context) {
        throw new Error('useAchievementContext must be used within an AchievementProvider');
    }
    return context;
};

const AchievementProvider: React.FC<AchievementProviderProps> = ({
    children,
    config,
    initialState = {},
    storageKey = 'react-achievements',
    badgesButtonPosition = 'top-right',
    styles = {},
    icons = {},
}) => {
    const { 
        metrics, 
        unlockedAchievements: unlockedAchievementIds, 
        previouslyAwardedAchievements,
        notifications,
        isInitialized,
        initialize,
        setMetrics,
        unlockAchievement,
        markAchievementAsAwarded,
        addNotification,
        clearNotifications,
        resetAchievements
    } = useAchievementStore();

    const [currentAchievement, setCurrentAchievement] = useState<AchievementDetails | null>(null);
    const [showBadges, setShowBadges] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);

    const serializeConfig = (config: AchievementConfiguration): SerializedAchievementConfiguration => {
        const serializedConfig: SerializedAchievementConfiguration = {};
        Object.entries(config).forEach(([metricName, conditions]) => {
            serializedConfig[metricName] = (conditions as AchievementUnlockCondition<AchievementMetricValue>[]).map((condition: AchievementUnlockCondition<AchievementMetricValue>) => {
                // Analyze the isConditionMet function to determine type and value
                const funcString = condition.isConditionMet.toString();
                let conditionType: 'number' | 'string' | 'boolean' | 'date';
                let conditionValue: any;

                if (funcString.includes('typeof value === "number"') || funcString.includes('typeof value === \'number\'')) {
                    conditionType = 'number';
                    const matches = funcString.match(/value\s*>=?\s*(\d+)/);
                    conditionValue = matches ? parseInt(matches[1]) : 0;
                } else if (funcString.includes('typeof value === "string"') || funcString.includes('typeof value === \'string\'')) {
                    conditionType = 'string';
                    const matches = funcString.match(/value\s*===?\s*['"](.+)['"]/);
                    conditionValue = matches ? matches[1] : '';
                } else if (funcString.includes('typeof value === "boolean"') || funcString.includes('typeof value === \'boolean\'')) {
                    conditionType = 'boolean';
                    conditionValue = funcString.includes('=== true');
                } else if (funcString.includes('instanceof Date')) {
                    conditionType = 'date';
                    const matches = funcString.match(/new Date\(['"](.+)['"]\)/);
                    conditionValue = matches ? matches[1] : new Date().toISOString();
                } else {
                    // Default to number type if we can't determine the type
                    conditionType = 'number';
                    conditionValue = 1;
                }

                return {
                    achievementDetails: condition.achievementDetails,
                    conditionType,
                    conditionValue,
                };
            });
        });
        return serializedConfig;
    };

    const serializedConfig = useMemo(() => serializeConfig(config), [config]);

    const checkAchievements = useCallback(() => {
        if (!isInitialized) return;

        const newAchievements: AchievementDetails[] = [];
        Object.entries(serializedConfig).forEach(([metricName, conditions]) => {
            const metricValues = metrics[metricName];
            if (!metricValues) return;

            conditions.forEach((condition) => {
                const isConditionMet = (value: AchievementMetricValue) => {
                    switch (condition.conditionType) {
                        case 'number':
                            return typeof value === 'number' && value >= condition.conditionValue;
                        case 'string':
                            return typeof value === 'string' && value === condition.conditionValue;
                        case 'boolean':
                            return typeof value === 'boolean' && value === condition.conditionValue;
                        case 'date':
                            return value instanceof Date && 
                                value.getTime() >= new Date(condition.conditionValue).getTime();
                        default:
                            return false;
                    }
                };

                if (
                    metricValues.some((value: AchievementMetricValue) => isConditionMet(value)) &&
                    !unlockedAchievementIds.includes(condition.achievementDetails.achievementId) &&
                    !previouslyAwardedAchievements.includes(condition.achievementDetails.achievementId)
                ) {
                    newAchievements.push(condition.achievementDetails);
                }
            });
        });

        if (newAchievements.length > 0) {
            newAchievements.forEach((achievement) => {
                unlockAchievement(achievement.achievementId);
                markAchievementAsAwarded(achievement.achievementId);
                addNotification(achievement);
            });
            setShowConfetti(true);
        }
    }, [serializedConfig, metrics, unlockedAchievementIds, previouslyAwardedAchievements, unlockAchievement, markAchievementAsAwarded, addNotification, isInitialized]);

    // Initialize only once
    useEffect(() => {
        if (!isInitialized) {
            initialize({
                config: serializedConfig,
                initialState,
                storageKey,
            });
        }
    }, [initialize, serializedConfig, initialState, storageKey, isInitialized]);

    // Check achievements when metrics change
    useEffect(() => {
        if (isInitialized) {
            checkAchievements();
        }
    }, [metrics, checkAchievements, isInitialized]);

    // Handle notifications
    useEffect(() => {
        if (notifications.length > 0 && !currentAchievement) {
            setCurrentAchievement(notifications[0]);
        }
    }, [notifications, currentAchievement]);

    const showBadgesModal = () => setShowBadges(true);

    return (
        <AchievementContext.Provider
            value={{
                updateMetrics: (newMetrics) => {
                    if (!isInitialized) return;
                    if (typeof newMetrics === 'function') {
                        const updatedMetrics = newMetrics(metrics);
                        setMetrics(updatedMetrics);
                    } else {
                        setMetrics(newMetrics);
                    }
                },
                unlockedAchievements: unlockedAchievementIds,
                resetStorage: () => {
                    localStorage.removeItem(storageKey);
                    resetAchievements();
                },
            }}
        >
            {children}
            <ConfettiWrapper show={showConfetti} />
            <AchievementModal
                isOpen={!!currentAchievement}
                achievement={currentAchievement}
                onClose={() => {
                    setCurrentAchievement(null);
                    clearNotifications();
                    setShowConfetti(false);
                }}
                styles={styles.achievementModal || defaultStyles.achievementModal}
                icons={icons}
            />
            <BadgesButton
                onClick={showBadgesModal}
                position={badgesButtonPosition}
                styles={styles.badgesButton || defaultStyles.badgesButton}
                unlockedAchievements={[...unlockedAchievementIds, ...previouslyAwardedAchievements]
                    .filter((id, index, self) => self.indexOf(id) === index)
                    .map(id => {
                        const achievement = Object.values(serializedConfig)
                            .flat()
                            .find(condition => condition.achievementDetails.achievementId === id);
                        return achievement?.achievementDetails;
                    }).filter((a): a is AchievementDetails => !!a)}
            />
            <BadgesModal
                isOpen={showBadges}
                achievements={[...unlockedAchievementIds, ...previouslyAwardedAchievements]
                    .filter((id, index, self) => self.indexOf(id) === index)
                    .map(id => {
                        const achievement = Object.values(serializedConfig)
                            .flat()
                            .find(condition => condition.achievementDetails.achievementId === id);
                        return achievement?.achievementDetails;
                    }).filter((a): a is AchievementDetails => !!a)}
                onClose={() => setShowBadges(false)}
                styles={styles.badgesModal || defaultStyles.badgesModal}
                icons={icons}
            />
        </AchievementContext.Provider>
    );
};

export { AchievementProvider };