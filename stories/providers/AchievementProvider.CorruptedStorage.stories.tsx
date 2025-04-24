import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { AchievementProvider } from '../../src';
import { AchievementConfiguration } from '../../src/types';
import { useAchievement } from '../../src/hooks/useAchievement';

export default {
    title: 'Achievement System/AchievementProvider/CorruptedStorage',
    component: AchievementProvider,
} as Meta;

const TestComponent = () => {
    const { metrics, updateMetrics, resetStorage } = useAchievement();

    const corruptStorage = () => {
        localStorage.setItem('corrupted-storage-test', 'invalid{JSON:data]]');
    };

    const setInvalidMetrics = () => {
        // @ts-ignore - Intentionally setting invalid metrics
        updateMetrics({
            score: "not-an-array",
            invalidType: undefined,
            malformedData: { nested: "object" }
        });
    };

    return (
        <div>
            <h2>Test Corrupted Storage and Invalid Data</h2>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                <button onClick={corruptStorage}>
                    Corrupt Storage Data
                </button>
                <button onClick={setInvalidMetrics}>
                    Set Invalid Metrics
                </button>
                <button onClick={resetStorage}>
                    Reset Storage
                </button>
                <button onClick={() => window.location.reload()}>
                    Reload Page
                </button>
            </div>
            <div>
                <h3>Current Metrics:</h3>
                <pre>{JSON.stringify(metrics, null, 2)}</pre>
                <h3>Local Storage:</h3>
                <pre>{localStorage.getItem('corrupted-storage-test') || 'No stored data'}</pre>
            </div>
            <div>
                <h3>Test Instructions:</h3>
                <ol>
                    <li>Click "Corrupt Storage Data" to simulate corrupted localStorage</li>
                    <li>Reload the page to see how the system handles corrupted data</li>
                    <li>Try setting invalid metrics to test error handling</li>
                    <li>Use Reset Storage to clear everything and start fresh</li>
                </ol>
            </div>
        </div>
    );
};

const Template: StoryFn = () => {
    // Test both valid and invalid achievement configurations
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
            },
            {
                // @ts-ignore - Intentionally invalid condition
                isConditionMet: "not a function",
                achievementDetails: {
                    achievementId: 'invalid_achievement',
                    achievementTitle: 'Invalid Achievement',
                    achievementDescription: 'This should be handled gracefully',
                    achievementIconKey: 'error'
                }
            }
        ],
        // @ts-ignore - Testing invalid metric type
        invalidMetric: "not an array of conditions",
    };

    return (
        <AchievementProvider 
            config={config} 
            storageKey="corrupted-storage-test"
            initialState={{
                score: [],
                // @ts-ignore - Testing invalid initial state
                invalidData: { nested: "object" }
            }}
        >
            <TestComponent />
        </AchievementProvider>
    );
};

export const CorruptedStorageTest = Template.bind({});
CorruptedStorageTest.parameters = {
    docs: {
        description: {
            story: 'Tests error handling for corrupted storage data and invalid configurations'
        }
    }
};