import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { AchievementProvider } from '../../src';
import { AchievementConfiguration } from '../../src/types';
import { useAchievement } from '../../src/hooks/useAchievement';

export default {
    title: 'Achievement System/AchievementProvider/ErrorHandling',
    component: AchievementProvider,
} as Meta;

const TestComponent = () => {
    const { metrics, updateMetrics } = useAchievement();

    const triggerInvalidMetric = () => {
        // @ts-ignore - Intentionally passing invalid data
        updateMetrics({
            invalidMetric: "not an array"
        });
    };

    const triggerMalformedStorage = () => {
        localStorage.setItem('error-test', 'invalid-json{');
    };

    const triggerUndefinedMetric = () => {
        updateMetrics({
            // @ts-ignore - Intentionally passing undefined
            undefinedMetric: undefined
        });
    };

    return (
        <div>
            <h2>Test Error Handling</h2>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                <button onClick={triggerInvalidMetric}>Trigger Invalid Metric</button>
                <button onClick={triggerMalformedStorage}>Corrupt Storage</button>
                <button onClick={triggerUndefinedMetric}>Undefined Metric</button>
            </div>
            <div>
                <h3>Current Metrics:</h3>
                <pre>{JSON.stringify(metrics, null, 2)}</pre>
            </div>
            <div>
                <h3>Local Storage:</h3>
                <pre>{localStorage.getItem('error-test') || 'No stored data'}</pre>
            </div>
        </div>
    );
};

const Template: StoryFn = () => {
    const config: AchievementConfiguration = {
        testMetric: [
            {
                isConditionMet: (value) => typeof value === 'number' && value >= 1,
                achievementDetails: {
                    achievementId: 'test-achievement',
                    achievementTitle: 'Test Achievement',
                    achievementDescription: 'This is a test achievement',
                    achievementIconKey: 'star'
                }
            }
        ]
    };

    return (
        <AchievementProvider 
            config={config} 
            storageKey="error-test"
        >
            <TestComponent />
        </AchievementProvider>
    );
};

export const ErrorHandlingTest = Template.bind({});
ErrorHandlingTest.parameters = {
    docs: {
        description: {
            story: 'Tests error handling for invalid metrics, malformed storage data, and undefined values'
        }
    }
};