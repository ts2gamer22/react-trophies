import React, { useEffect, useCallback, useState, useMemo } from 'react';
import { toast } from 'sonner';
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
    AchievementContextType,
} from '../types';
import { useAchievementStore } from '../store/useAchievementStore';
import BadgesButton from '../components/BadgesButton';
import BadgesModal from '../components/BadgesModal';
import ConfettiWrapper from '../components/ConfettiWrapper';
import { defaultStyles } from '../defaultStyles';
import { defaultAchievementIcons } from '../assets/defaultIcons';
import { AchievementToastContent } from '../components/AchievementToastContent';

export const AchievementContext = React.createContext<AchievementContextType | undefined>(undefined);

export const useAchievementContext = () => {
    const context = React.useContext(AchievementContext);
    if (!context) {
        throw new Error('useAchievementContext must be used within an AchievementProvider');
    }
    return context;
};

/**
 * Provider component that manages achievement state and notifications
 * 
 * @param props - The achievement provider props
 * @param props.children - Child components that will have access to achievement context
 * @param props.config - Configuration object defining all achievements
 * @param props.initialState - Initial metrics and previously awarded achievements
 * @param props.storageKey - Key for localStorage persistence
 * @param props.badgesButtonPosition - Position of the badges button
 * @param props.styles - Custom styles for components
 * @param props.icons - Custom icons for achievements
 * @param props.achievementSoundUrl - URL to sound effect MP3 file
 * @param props.enableSound - Controls whether achievement sound effects play
 * @param props.enableConfetti - Controls whether confetti celebration displays
 * @param props.enableToasts - Controls whether toast notifications display
 * @param props.toastTitle - Title text displayed at the top of achievement toast notifications
 * @param props.toastStyles - Custom styles for achievement toast notifications
 * @param props.useDefaultToastStyles - When true, uses Sonner's default toast styling instead of custom styling
 */
const AchievementProvider: React.FC<AchievementProviderProps> = ({
    children,
    config,
    initialState = {},
    storageKey = 'react-achievements',
    badgesButtonPosition = 'top-right',
    styles = {},
    icons = {},
    achievementSoundUrl,
    enableSound = true,
    enableConfetti = true,
    enableToasts = true,
    toastTitle = "Achievement Unlocked!",
    toastStyles = {},
    useDefaultToastStyles = false
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

    // No longer need to check for Toaster component as we're using a different approach

    // Merge custom icons with default icons for consistent access
    const mergedIcons = useMemo(() => ({
        ...defaultAchievementIcons,
        ...icons,
    }), [icons]);
    
    useEffect(() => {
        if (notifications.length > 0) {
            // Play sound if enabled
            if (enableSound && achievementSoundUrl) {
                try {
                    const sound = new Howl({
                        src: [achievementSoundUrl],
                        volume: 0.5,
                        onload: () => {},
                        onloaderror: (soundId: number, error: Error) => {
                            console.error('Error loading achievement sound:', error);
                        }
                    });
                    sound.play();
                } catch (error) {
                    console.error('Error playing achievement sound:', error);
                }
            }
            
            // Display each achievement notification
            if (enableToasts) {
                notifications.forEach(achievement => {
                    if (useDefaultToastStyles) {
                        // Use default Sonner toast styling
                        toast(toastTitle, {
                            description: achievement.achievementDescription,
                            icon: achievement.achievementIconKey && achievement.achievementIconKey in mergedIcons
                                ? mergedIcons[achievement.achievementIconKey as keyof typeof mergedIcons]
                                : achievement.achievementIconKey && achievement.achievementIconKey in defaultAchievementIcons
                                    ? defaultAchievementIcons[achievement.achievementIconKey as keyof typeof defaultAchievementIcons]
                                    : defaultAchievementIcons.default,
                            duration: 4000,
                            id: `achievement-${achievement.achievementId}`,
                        });
                    } else {
                        // Use custom AchievementToastContent component
                        toast.custom((t) => (
                            <AchievementToastContent 
                                achievement={achievement}
                                icons={mergedIcons}
                                title={toastTitle}
                                customStyles={toastStyles}
                            />
                        ), {
                            duration: 4000,
                            id: `achievement-${achievement.achievementId}`,
                        });
                    }
                });
            }

            clearNotifications();

            if (enableConfetti) {
                setShowConfetti(true);
                setTimeout(() => setShowConfetti(false), 4000);
            }
        }
    }, [notifications, enableSound, achievementSoundUrl, clearNotifications, enableConfetti, enableToasts, icons, toastTitle, toastStyles, useDefaultToastStyles]);

    const handleUpdateMetrics = useCallback((newMetrics: AchievementMetrics | ((prevMetrics: AchievementMetrics) => AchievementMetrics)) => {
        if (!isInitialized) return;
        
        const currentState = useAchievementStore.getState();
        let updatedMetrics;
        if (typeof newMetrics === 'function') {
            updatedMetrics = newMetrics(currentState.metrics);
        } else {
            updatedMetrics = Object.entries(newMetrics).reduce((acc, [key, value]) => ({
                ...acc,
                [key]: Array.isArray(currentState.metrics[key]) 
                    ? [...currentState.metrics[key], ...(Array.isArray(value) ? value : [value])]
                    : (Array.isArray(value) ? value : [value])
            }), { ...currentState.metrics });
        }
        setMetrics(updatedMetrics);
    }, [isInitialized, setMetrics]);

    const handleResetStorage = useCallback(() => {
        if (storageKey) {
            localStorage.removeItem(storageKey);
        }
        resetAchievements();
    }, [storageKey, resetAchievements]);

    const contextValue = useMemo(() => ({
        updateMetrics: handleUpdateMetrics,
        unlockedAchievements: unlockedAchievementIds,
        resetStorage: handleResetStorage,
        notifications: notifications,
        clearNotifications: clearNotifications,
    }), [
        handleUpdateMetrics,
        unlockedAchievementIds,
        handleResetStorage,
        notifications,
        clearNotifications
    ]);

    const showBadgesModal = useCallback(() => {
        setShowBadges(true);
    }, []);
    
    return (
        <AchievementContext.Provider value={contextValue}>
            {children}
            {enableConfetti && <ConfettiWrapper show={showConfetti} />}
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