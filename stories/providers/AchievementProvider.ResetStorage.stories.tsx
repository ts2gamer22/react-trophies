// stories/AchievementProvider.ProviderTest.stories.tsx

import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { AchievementProvider } from '../../src';
import { AchievementConfiguration } from '../../src/types';
import { useAchievement } from '../../src/hooks/useAchievement';

export default {
    title: 'Achievement System/AchievementProvider/ResetStorage',
    component: AchievementProvider,
} as Meta;

const TestComponent = () => {
    const { metrics, updateMetrics, resetStorage } = useAchievement();

    const triggerAchievement = () => {
        updateMetrics({
            visits: [...(metrics.visits || []), 1]
        });
    };

    return (
        <div>
            <h2>Test Storage Reset</h2>
            <button onClick={triggerAchievement}>Trigger Achievement</button>
            <button onClick={resetStorage}>Reset Storage</button>
            <pre>{JSON.stringify(metrics, null, 2)}</pre>
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
            storageKey="reset-test"
        >
            <TestComponent />
        </AchievementProvider>
    );
};

export const ResetStorageTest = Template.bind({});
ResetStorageTest.parameters = {
    docs: {
        description: {
            story: 'Tests the storage reset functionality'
        }
    }
};