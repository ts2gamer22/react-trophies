import React, { useEffect, useCallback, useState, useMemo } from 'react';
import { Toaster, toast } from 'sonner';
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
import BadgesButton from '../components/BadgesButton';
import BadgesModal from '../components/BadgesModal';
import ConfettiWrapper from '../components/ConfettiWrapper';
import { defaultStyles } from '../defaultStyles';
import { defaultAchievementIcons } from '../assets/defaultIcons';
import soundManager from '../components/SoundManager';

export interface AchievementContextType {
    updateMetrics: (newMetrics: AchievementMetrics | ((prevMetrics: AchievementMetrics) => AchievementMetrics)) => void;
    unlockedAchievements: string[];
    resetStorage: () => void;
    notifications: AchievementDetails[];
    clearNotifications: () => void;
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

    const [showBadges, setShowBadges] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);

    const serializeConfig = (config: AchievementConfiguration): SerializedAchievementConfiguration => {
        const serializedConfig: SerializedAchievementConfiguration = {};
        Object.entries(config).forEach(([metricName, conditions]) => {
            if (!Array.isArray(conditions)) {
                console.error(`Invalid conditions for metric ${metricName}: expected array, got ${typeof conditions}`);
                return;
            }

            serializedConfig[metricName] = conditions.map((condition: AchievementUnlockCondition<AchievementMetricValue>) => {
                if (!condition || typeof condition.isConditionMet !== 'function') {
                    console.error(`Invalid condition for metric ${metricName}: missing isConditionMet function`);
                    return {
                        achievementDetails: {
                            achievementId: 'invalid',
                            achievementTitle: 'Invalid Achievement',
                            achievementDescription: 'Invalid condition',
                            achievementIconKey: 'error'
                        },
                        conditionType: 'number',
                        conditionValue: 0
                    };
                }

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
            if (!Array.isArray(metricValues)) {
                return;
            }

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

                const latestValue = metricValues[metricValues.length - 1];
                if (
                    isConditionMet(latestValue) &&
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
        if (notifications.length > 0) {
            soundManager.playUnlockSound();
            
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false), 3000);
        }
    }, [notifications]);

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
                        // Properly merge arrays for each metric key
                        const mergedMetrics = Object.entries(newMetrics).reduce((acc, [key, value]) => ({
                            ...acc,
                            [key]: Array.isArray(metrics[key]) 
                                ? [...metrics[key], ...value]  
                                : value  
                        }), { ...metrics });
                        setMetrics(mergedMetrics);
                    }
                },
                unlockedAchievements: unlockedAchievementIds,
                resetStorage: () => {
                    localStorage.removeItem(storageKey);
                    resetAchievements();
                },
                notifications: notifications,
                clearNotifications: clearNotifications,
            }}
        >
            {children}
            <Toaster />
            <ConfettiWrapper show={showConfetti} />
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