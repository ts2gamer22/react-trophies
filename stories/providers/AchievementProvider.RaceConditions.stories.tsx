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
        // Update multiple metrics simultaneously in a single update
        updateMetrics({
            score: [100],
            time: [60],
            combo: [5]
        });
    };

    const triggerRapidAchievements = () => {
        // Rapidly update metrics in succession
        updateMetrics({
            score: [10]
        });
        
        setTimeout(() => {
            updateMetrics({
                time: [20],
                score: [50]
            });
        }, 100);
        
        setTimeout(() => {
            updateMetrics({
                combo: [5],
                score: [100]  // This should trigger the high score achievement
            });
        }, 200);
    };

    return (
        <div>
            <h2>Test Multiple Achievement Race Conditions</h2>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                <button onClick={triggerMultipleAchievements}>
                    Trigger Multiple Achievements (Simultaneous)
                </button>
                <button onClick={triggerRapidAchievements}>
                    Trigger Rapid Achievements (Sequential)
                </button>
            </div>
            <div>
                <h3>Current Metrics:</h3>
                <pre>{JSON.stringify(metrics, null, 2)}</pre>
            </div>
            <div style={{ marginTop: '20px' }}>
                <h3>Test Instructions:</h3>
                <ol>
                    <li>Click "Trigger Multiple Achievements" to see all achievements trigger at once</li>
                    <li>Click "Trigger Rapid Achievements" to see score increase over time until reaching 100</li>
                    <li>Observe how achievements trigger as their conditions are met</li>
                </ol>
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