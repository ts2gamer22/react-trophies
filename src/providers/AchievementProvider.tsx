import React, { useEffect, useCallback, useState, useMemo } from 'react';
import { Toaster, toast } from 'sonner';
import { Howl } from 'howler';
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
    achievementSoundUrl,
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
            if (achievementSoundUrl) {
                try {
                    console.log("Achievement unlocked - Playing sound:", achievementSoundUrl);
                    const sound = new Howl({
                        src: [achievementSoundUrl],
                        volume: 0.8,
                        preload: true,
                        onload: () => console.log("Sound loaded successfully"),
                        onloaderror: (soundId: number, error: Error) => console.error("Error loading sound:", error)
                        // Note: onplayerror isn't in the TypeScript definitions but exists in newer Howler versions
                    });
                    sound.play();
                } catch (error) {
                    console.error("react-trophies: Failed to play achievement sound.", error);
                }
            }

            notifications.forEach(achievement => {
                const mergedIcons: Record<string, string> = { ...defaultAchievementIcons, ...icons };
                const iconToDisplay = achievement?.achievementIconKey && achievement.achievementIconKey in mergedIcons 
                    ? mergedIcons[achievement.achievementIconKey] 
                    : mergedIcons.default;
                
                toast(achievement.achievementTitle, {
                    description: achievement.achievementDescription,
                    icon: <span style={{ fontSize: '2em', marginRight: '10px' }}>{iconToDisplay}</span>,
                    duration: 4000,
                });
            });

            clearNotifications();
            
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false), 4000);
        }
    }, [notifications, icons, clearNotifications, achievementSoundUrl]);

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
            }}
        >
            {children}
            {/* @ts-ignore - Work around Sonner's type conflicts with React */}
            <Toaster richColors position="top-right" />
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