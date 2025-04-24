import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { AchievementProvider } from '../../src';
import { AchievementConfiguration } from '../../src/types';
import { useAchievement } from '../../src/hooks/useAchievement';

export default {
    title: 'Achievement System/AchievementProvider/MultipleMetrics',
    component: AchievementProvider,
} as Meta;

const TestComponent = () => {
    const { metrics, updateMetrics } = useAchievement();

    const handleClick = () => {
        const currentClicks = typeof metrics.clicks?.[0] === 'number' ? metrics.clicks[0] : 0;
        updateMetrics({
            ...metrics,
            clicks: [currentClicks + 1]
        });
    };

    const handlePointsGain = () => {
        const currentPoints = typeof metrics.points?.[0] === 'number' ? metrics.points[0] : 0;
        updateMetrics({
            ...metrics,
            points: [currentPoints + 10]
        });
    };

    const handleLevelUp = () => {
        const currentLevel = typeof metrics.level?.[0] === 'number' ? metrics.level[0] : 0;
        updateMetrics({
            ...metrics,
            level: [currentLevel + 1]
        });
    };

    return (
        <div>
            <h2>Test Multiple Achievement Types</h2>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                <button onClick={handleClick}>Click (Count)</button>
                <button onClick={handlePointsGain}>Gain Points</button>
                <button onClick={handleLevelUp}>Level Up</button>
            </div>
            <div>
                <h3>Current Metrics:</h3>
                <pre>{JSON.stringify(metrics, null, 2)}</pre>
            </div>
        </div>
    );
};

const Template: StoryFn = (args) => {
    const config: AchievementConfiguration = {
        clicks: [
            {
                isConditionMet: (value) => typeof value === 'number' && value >= 5,
                achievementDetails: {
                    achievementId: 'clicker',
                    achievementTitle: 'Dedicated Clicker',
                    achievementDescription: 'Clicked 5 times!',
                    achievementIconKey: 'star'
                }
            }
        ],
        points: [
            {
                isConditionMet: (value) => typeof value === 'number' && value >= 50,
                achievementDetails: {
                    achievementId: 'point-collector',
                    achievementTitle: 'Point Collector',
                    achievementDescription: 'Earned 50 points!',
                    achievementIconKey: 'trophy'
                }
            }
        ],
        level: [
            {
                isConditionMet: (value) => typeof value === 'number' && value >= 3,
                achievementDetails: {
                    achievementId: 'level-master',
                    achievementTitle: 'Level Master',
                    achievementDescription: 'Reached level 3!',
                    achievementIconKey: 'medal'
                }
            }
        ]
    };

    return (
        <AchievementProvider 
            config={config} 
            storageKey="multiple-metrics-test"
        >
            <TestComponent />
        </AchievementProvider>
    );
};

export const MultipleMetricsTest = Template.bind({});
MultipleMetricsTest.parameters = {
    docs: {
        description: {
            story: 'Tests tracking and achieving multiple types of metrics simultaneously'
        }
    }
};