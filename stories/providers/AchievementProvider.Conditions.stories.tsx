import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { AchievementProvider } from '../../src';
import { AchievementConfiguration } from '../../src/types';
import { useAchievement } from '../../src/hooks/useAchievement';

export default {
    title: 'Achievement System/AchievementProvider/Conditions',
    component: AchievementProvider,
} as Meta;

const TestComponent = () => {
    const { metrics, updateMetrics } = useAchievement();

    const handleAddMetric = (type: string) => {
        const currentMetrics = metrics[type] || [];
        const newValue = type === 'date' ? new Date() : true;
        updateMetrics({ ...metrics, [type]: [...currentMetrics, newValue] });
    };

    return (
        <div>
            <h2>Test Different Condition Types</h2>
            <div>
                <button onClick={() => handleAddMetric('boolean')}>Add Boolean Metric</button>
                <button onClick={() => handleAddMetric('date')}>Add Date Metric</button>
            </div>
            <pre>{JSON.stringify(metrics, null, 2)}</pre>
        </div>
    );
};

const Template: StoryFn = (args) => {
    const config: AchievementConfiguration = {
        boolean: [
            {
                isConditionMet: (value) => typeof value === 'boolean' && value === true,
                achievementDetails: {
                    achievementId: 'boolean-achievement',
                    achievementTitle: 'Boolean Achievement',
                    achievementDescription: 'Triggered by a boolean condition',
                    achievementIconKey: 'star'
                }
            }
        ],
        date: [
            {
                isConditionMet: (value) => value instanceof Date && value >= new Date('2024-01-01'),
                achievementDetails: {
                    achievementId: 'date-achievement',
                    achievementTitle: 'Date Achievement',
                    achievementDescription: 'Triggered by a date condition',
                    achievementIconKey: 'calendar'
                }
            }
        ]
    };

    return (
        <AchievementProvider config={config} storageKey="condition-test">
            <TestComponent />
        </AchievementProvider>
    );
};

export const ConditionTypes = Template.bind({});
ConditionTypes.parameters = {
    docs: {
        description: {
            story: 'Tests different types of achievement conditions (boolean, date)'
        }
    }
};