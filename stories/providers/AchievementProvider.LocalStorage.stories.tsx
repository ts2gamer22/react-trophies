import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { AchievementProvider } from '../../src';
import { AchievementConfiguration } from '../../src/types';
import { useAchievement } from '../../src/hooks/useAchievement';

export default {
    title: 'Achievement System/AchievementProvider/LocalStorage',
    component: AchievementProvider,
} as Meta;

const TestComponent = () => {
    const { metrics, updateMetrics } = useAchievement();

    const addVisit = () => {
        updateMetrics({
            visits: [...(metrics.visits || []), 1]
        });
    };

    return (
        <div>
            <h2>Test Local Storage Persistence</h2>
            <p>Current visits: {metrics.visits?.length || 0}</p>
            <button onClick={addVisit}>Add Visit</button>
            <div>
                <h3>Current State:</h3>
                <pre>{JSON.stringify(metrics, null, 2)}</pre>
            </div>
            <div>
                <h3>Instructions:</h3>
                <ol>
                    <li>Click "Add Visit" a few times</li>
                    <li>Refresh the page</li>
                    <li>State should persist</li>
                </ol>
            </div>
        </div>
    );
};

const Template: StoryFn = (args) => {
    const config: AchievementConfiguration = {
        visits: [
            {
                isConditionMet: (value) => typeof value === 'number' && value >= 1,
                achievementDetails: {
                    achievementId: 'first-visit',
                    achievementTitle: 'First Visit',
                    achievementDescription: 'You visited for the first time!',
                    achievementIconKey: 'star'
                }
            }
        ]
    };

    return (
        <AchievementProvider 
            config={config} 
            storageKey="storage-test"
        >
            <TestComponent />
        </AchievementProvider>
    );
};

export const LocalStorageTest = Template.bind({});
LocalStorageTest.parameters = {
    docs: {
        description: {
            story: 'Tests the local storage persistence functionality'
        }
    }
};