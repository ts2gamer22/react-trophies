import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { AchievementProvider } from '../../src';
import { AchievementConfiguration } from '../../src/types';
import { useAchievement } from '../../src/hooks/useAchievement';

export default {
    title: 'Achievement System/AchievementProvider/ToastNotifications',
    component: AchievementProvider,
} as Meta;

const TestComponent = () => {
    const { metrics, updateMetrics } = useAchievement();

    const triggerSimpleAchievement = () => {
        updateMetrics({
            basic: [...(metrics.basic || []), 1]
        });
    };

    const triggerSpecialAchievement = () => {
        updateMetrics({
            special: [...(metrics.special || []), 1]
        });
    };

    const triggerRareAchievement = () => {
        updateMetrics({
            rare: [...(metrics.rare || []), 1]
        });
    };

    const triggerEpicAchievement = () => {
        updateMetrics({
            epic: [...(metrics.epic || []), 1]
        });
    };

    const triggerLegendaryAchievement = () => {
        updateMetrics({
            legendary: [...(metrics.legendary || []), 1]
        });
    };

    return (
        <div>
            <h2>Test Achievement Toast Notifications</h2>
            <p>Click the buttons below to trigger different types of achievements and see their toast notifications:</p>
            
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
                <button 
                    onClick={triggerSimpleAchievement}
                    style={{ padding: '10px 20px', background: '#f0f0f0' }}
                >
                    Trigger Basic Achievement
                </button>
                <button 
                    onClick={triggerSpecialAchievement}
                    style={{ padding: '10px 20px', background: '#4CAF50', color: 'white' }}
                >
                    Trigger Special Achievement
                </button>
                <button 
                    onClick={triggerRareAchievement}
                    style={{ padding: '10px 20px', background: '#2196F3', color: 'white' }}
                >
                    Trigger Rare Achievement
                </button>
                <button 
                    onClick={triggerEpicAchievement}
                    style={{ padding: '10px 20px', background: '#9C27B0', color: 'white' }}
                >
                    Trigger Epic Achievement
                </button>
                <button 
                    onClick={triggerLegendaryAchievement}
                    style={{ padding: '10px 20px', background: '#FF9800', color: 'white' }}
                >
                    Trigger Legendary Achievement
                </button>
            </div>

            <div>
                <h3>Current Metrics:</h3>
                <pre>{JSON.stringify(metrics, null, 2)}</pre>
            </div>

            <div style={{ marginTop: '20px' }}>
                <h3>Test Instructions:</h3>
                <ol>
                    <li>Click different buttons to trigger various achievement types</li>
                    <li>Observe how each achievement type has its own icon and style</li>
                    <li>Note how toast notifications stack and queue when triggered rapidly</li>
                    <li>Try hovering over notifications to pause their auto-dismiss</li>
                    <li>Click on notifications to dismiss them manually</li>
                </ol>
            </div>

            <style>
                {`
                    .Toastify__toast {
                        border-radius: 8px;
                        margin-bottom: 8px;
                    }
                    .Toastify__toast-body {
                        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                    }
                    .Toastify__progress-bar {
                        height: 3px;
                    }
                `}
            </style>
        </div>
    );
};

const Template: StoryFn = () => {
    const config: AchievementConfiguration = {
        basic: [
            {
                isConditionMet: (value) => typeof value === 'number' && value >= 1,
                achievementDetails: {
                    achievementId: 'basic-achievement',
                    achievementTitle: 'First Steps',
                    achievementDescription: 'You earned your first achievement!',
                    achievementIconKey: 'firstStep'
                }
            }
        ],
        special: [
            {
                isConditionMet: (value) => typeof value === 'number' && value >= 1,
                achievementDetails: {
                    achievementId: 'special-achievement',
                    achievementTitle: 'Special Discovery',
                    achievementDescription: 'You found something special!',
                    achievementIconKey: 'special'
                }
            }
        ],
        rare: [
            {
                isConditionMet: (value) => typeof value === 'number' && value >= 1,
                achievementDetails: {
                    achievementId: 'rare-achievement',
                    achievementTitle: 'Rare Find',
                    achievementDescription: 'You discovered something rare!',
                    achievementIconKey: 'rare'
                }
            }
        ],
        epic: [
            {
                isConditionMet: (value) => typeof value === 'number' && value >= 1,
                achievementDetails: {
                    achievementId: 'epic-achievement',
                    achievementTitle: 'Epic Victory',
                    achievementDescription: 'You accomplished something epic!',
                    achievementIconKey: 'epic'
                }
            }
        ],
        legendary: [
            {
                isConditionMet: (value) => typeof value === 'number' && value >= 1,
                achievementDetails: {
                    achievementId: 'legendary-achievement',
                    achievementTitle: 'Legendary Status',
                    achievementDescription: 'You achieved legendary status!',
                    achievementIconKey: 'legendary'
                }
            }
        ]
    };

    return (
        <AchievementProvider 
            config={config} 
            storageKey="toast-test"
            soundUrl="/trophy.mp3"
        >
            <TestComponent />
        </AchievementProvider>
    );
};

export const ToastNotificationsTest = Template.bind({});
ToastNotificationsTest.parameters = {
    docs: {
        description: {
            story: 'Tests different types of achievement toast notifications with various styles and interactions'
        }
    }
};