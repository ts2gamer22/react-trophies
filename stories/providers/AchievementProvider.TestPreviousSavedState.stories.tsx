import React, { useState, useEffect } from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { AchievementProvider } from '../../src';
import { AchievementConfiguration, AchievementMetricValue, InitialAchievementMetrics } from '../../src/types';
import { useAchievement } from '../../src/hooks/useAchievement';
import { defaultAchievementIcons } from '../../src/assets/defaultIcons';

export default {
    title: 'Achievement System/AchievementProvider/TestPreviousSavedState',
    component: AchievementProvider,
} as Meta;

const TestComponent = () => {
    const { metrics, updateMetrics, unlockedAchievements } = useAchievement();
    const [clickCount, setClickCount] = useState<number>(0);
    const [viewCount, setViewCount] = useState<number>(0);
    const [pointCount, setPointCount] = useState<number>(0);

    // Initialize state from metrics
    useEffect(() => {
        const initialClicks = typeof metrics.clicks?.[0] === 'number' ? metrics.clicks[0] : 0;
        const initialViews = typeof metrics.views?.[0] === 'number' ? metrics.views[0] : 0;
        const initialPoints = typeof metrics.points?.[0] === 'number' ? metrics.points[0] : 0;

        setClickCount(initialClicks);
        setViewCount(initialViews);
        setPointCount(initialPoints);
    }, [metrics]);

    const handleButtonClick = () => {
        const newClickCount = clickCount + 1;
        setClickCount(newClickCount);
        updateMetrics({ 
            ...metrics,
            clicks: [newClickCount] 
        });
    };

    const handleView = () => {
        const newViewCount = viewCount + 1;
        setViewCount(newViewCount);
        updateMetrics({ 
            ...metrics,
            views: [newViewCount] 
        });
    };

    const handlePointGain = () => {
        const newPointCount = pointCount + 50;
        setPointCount(newPointCount);
        updateMetrics({ 
            ...metrics,
            points: [newPointCount] 
        });
    };

    return (
        <div>
            <h2>Test Previously Awarded Achievements</h2>
            <div style={{ marginBottom: '20px' }}>
                <p>Test different scenarios with previously awarded achievements:</p>
                <ul>
                    <li>View achievement already awarded (should not trigger again)</li>
                    <li>Points achievement partially completed</li>
                    <li>Click achievement not started</li>
                </ul>
            </div>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                <button onClick={handleButtonClick}>Click ({clickCount})</button>
                <button onClick={handleView}>View Page ({viewCount})</button>
                <button onClick={handlePointGain}>Gain Points ({pointCount})</button>
            </div>
            <div>
                <h3>Current State:</h3>
                <div>
                    <h4>Metrics:</h4>
                    <pre>{JSON.stringify(metrics, null, 2)}</pre>
                </div>
                <div>
                    <h4>Unlocked Achievements:</h4>
                    <pre>{JSON.stringify(unlockedAchievements, null, 2)}</pre>
                </div>
            </div>
        </div>
    );
};

const Template: StoryFn = () => {
    const config: AchievementConfiguration = {
        clicks: [
            {
                isConditionMet: (value: AchievementMetricValue) => typeof value === 'number' && value >= 5,
                achievementDetails: {
                    achievementId: 'click_master_bronze',
                    achievementTitle: 'Bronze Click Master',
                    achievementDescription: 'Clicked 5 times!',
                    achievementIconKey: 'bronze',
                },
            },
            {
                isConditionMet: (value: AchievementMetricValue) => typeof value === 'number' && value >= 10,
                achievementDetails: {
                    achievementId: 'click_master_silver',
                    achievementTitle: 'Silver Click Master',
                    achievementDescription: 'Clicked 10 times!',
                    achievementIconKey: 'silver',
                },
            }
        ],
        views: [
            {
                isConditionMet: (value: AchievementMetricValue) => typeof value === 'number' && value >= 3,
                achievementDetails: {
                    achievementId: 'view_watcher_bronze',
                    achievementTitle: 'Bronze View Watcher',
                    achievementDescription: 'Viewed 3 times!',
                    achievementIconKey: 'bronze',
                },
            },
            {
                isConditionMet: (value: AchievementMetricValue) => typeof value === 'number' && value >= 5,
                achievementDetails: {
                    achievementId: 'view_watcher_silver',
                    achievementTitle: 'Silver View Watcher',
                    achievementDescription: 'Viewed 5 times!',
                    achievementIconKey: 'silver',
                },
            }
        ],
        points: [
            {
                isConditionMet: (value: AchievementMetricValue) => typeof value === 'number' && value >= 100,
                achievementDetails: {
                    achievementId: 'point_collector_bronze',
                    achievementTitle: 'Bronze Point Collector',
                    achievementDescription: 'Collected 100 points!',
                    achievementIconKey: 'bronze',
                },
            },
            {
                isConditionMet: (value: AchievementMetricValue) => typeof value === 'number' && value >= 200,
                achievementDetails: {
                    achievementId: 'point_collector_silver',
                    achievementTitle: 'Silver Point Collector',
                    achievementDescription: 'Collected 200 points!',
                    achievementIconKey: 'silver',
                },
            }
        ],
    };

    // Initial state with mixed scenarios:
    // 1. Views achievement already completed
    // 2. Points achievement partially completed
    // 3. Clicks achievement not started
    const initialState = {
        clicks: 0,
        views: 4, // Already passed bronze (3), approaching silver (5)
        points: 50, // Halfway to bronze (100)
        previouslyAwardedAchievements: ['view_watcher_bronze'], // Bronze view achievement already awarded
    };

    return (
        <AchievementProvider
            config={config}
            initialState={initialState}
            icons={defaultAchievementIcons}
            storageKey="previous-state-test"
        >
            <TestComponent />
            <ResetStorageButton storageKey="previous-state-test" />
        </AchievementProvider>
    );
};

export const TestPreviousSavedState = Template.bind({});
TestPreviousSavedState.parameters = {
    docs: {
        description: {
            story: 'Tests various scenarios with previously awarded achievements and partially completed progress.'
        }
    }
};

const ResetStorageButton = ({ storageKey }: { storageKey: string }) => {
    const handleResetStorage = () => {
        localStorage.removeItem(storageKey);
        window.location.reload();
    };

    return (
        <button
            style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                padding: '8px 16px',
                background: '#f5f5f5',
                color: '#333',
                border: '1px solid #ddd',
                borderRadius: '4px',
                cursor: 'pointer',
            }}
            onClick={handleResetStorage}
        >
            Reset Storage
        </button>
    );
};