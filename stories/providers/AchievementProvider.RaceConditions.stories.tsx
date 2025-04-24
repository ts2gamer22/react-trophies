import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { AchievementProvider } from '../../src';
import { AchievementConfiguration } from '../../src/types';
import { useAchievement } from '../../src/hooks/useAchievement';

export default {
    title: 'Achievement System/AchievementProvider/RaceConditions',
    component: AchievementProvider,
} as Meta;

const TestComponent = () => {
    const { metrics, updateMetrics } = useAchievement();

    const triggerMultipleAchievements = () => {
        // Update multiple metrics simultaneously
        updateMetrics({
            score: [100],
            time: [60],
            combo: [5]
        });
    };

    const triggerRapidAchievements = () => {
        // Rapidly update metrics in succession
        updateMetrics({ score: [10] });
        setTimeout(() => updateMetrics({ time: [20] }), 100);
        setTimeout(() => updateMetrics({ combo: [3] }), 200);
    };

    return (
        <div>
            <h2>Test Multiple Achievement Race Conditions</h2>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                <button onClick={triggerMultipleAchievements}>
                    Trigger Multiple Achievements
                </button>
                <button onClick={triggerRapidAchievements}>
                    Trigger Rapid Achievements
                </button>
            </div>
            <div>
                <h3>Current Metrics:</h3>
                <pre>{JSON.stringify(metrics, null, 2)}</pre>
            </div>
        </div>
    );
};

const Template: StoryFn = () => {
    const config: AchievementConfiguration = {
        score: [
            {
                isConditionMet: (value) => typeof value === 'number' && value >= 100,
                achievementDetails: {
                    achievementId: 'high_score',
                    achievementTitle: 'High Score',
                    achievementDescription: 'Reached 100 points',
                    achievementIconKey: 'trophy'
                }
            }
        ],
        time: [
            {
                isConditionMet: (value) => typeof value === 'number' && value >= 60,
                achievementDetails: {
                    achievementId: 'time_master',
                    achievementTitle: 'Time Master',
                    achievementDescription: 'Lasted 60 seconds',
                    achievementIconKey: 'clock'
                }
            }
        ],
        combo: [
            {
                isConditionMet: (value) => typeof value === 'number' && value >= 5,
                achievementDetails: {
                    achievementId: 'combo_king',
                    achievementTitle: 'Combo King',
                    achievementDescription: 'Got a 5x combo',
                    achievementIconKey: 'star'
                }
            }
        ]
    };

    return (
        <AchievementProvider 
            config={config} 
            storageKey="race-conditions-test"
        >
            <TestComponent />
        </AchievementProvider>
    );
};

export const RaceConditionsTest = Template.bind({});
RaceConditionsTest.parameters = {
    docs: {
        description: {
            story: 'Tests handling of multiple achievements being triggered simultaneously or in rapid succession'
        }
    }
};