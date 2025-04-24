import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { AchievementProvider } from '../../src';
import { AchievementConfiguration } from '../../src/types';
import { useAchievement } from '../../src/hooks/useAchievement';

export default {
    title: 'Achievement System/AchievementProvider/Icons',
    component: AchievementProvider,
} as Meta;

const customIcons = {
    star: '⭐️',
    badge: '🏅',
    trophy: '🏆',
    medal: '🎖️',
};

const TestComponent = () => {
    const { metrics, updateMetrics } = useAchievement();

    const triggerAchievement = (type: string) => {
        updateMetrics({ 
            ...metrics, 
            [type]: [...(metrics[type] || []), 1] 
        });
    };

    return (
        <div>
            <h2>Test Custom Icons</h2>
            <button onClick={() => triggerAchievement('star')}>Trigger Star Achievement</button>
            <button onClick={() => triggerAchievement('trophy')}>Trigger Trophy Achievement</button>
            <button onClick={() => triggerAchievement('medal')}>Trigger Medal Achievement</button>
            <pre>{JSON.stringify(metrics, null, 2)}</pre>
        </div>
    );
};

const Template: StoryFn = (args) => {
    const config: AchievementConfiguration = {
        star: [
            {
                isConditionMet: (value) => typeof value === 'number' && value >= 1,
                achievementDetails: {
                    achievementId: 'star-achievement',
                    achievementTitle: 'Star Achievement',
                    achievementDescription: 'Earned a star!',
                    achievementIconKey: 'star'
                }
            }
        ],
        trophy: [
            {
                isConditionMet: (value) => typeof value === 'number' && value >= 1,
                achievementDetails: {
                    achievementId: 'trophy-achievement',
                    achievementTitle: 'Trophy Achievement',
                    achievementDescription: 'Earned a trophy!',
                    achievementIconKey: 'trophy'
                }
            }
        ],
        medal: [
            {
                isConditionMet: (value) => typeof value === 'number' && value >= 1,
                achievementDetails: {
                    achievementId: 'medal-achievement',
                    achievementTitle: 'Medal Achievement',
                    achievementDescription: 'Earned a medal!',
                    achievementIconKey: 'medal'
                }
            }
        ]
    };

    return (
        <AchievementProvider 
            config={config} 
            storageKey="icons-test"
            icons={customIcons}
        >
            <TestComponent />
        </AchievementProvider>
    );
};

export const CustomIcons = Template.bind({});
CustomIcons.parameters = {
    docs: {
        description: {
            story: 'Tests custom icons for achievements'
        }
    }
};