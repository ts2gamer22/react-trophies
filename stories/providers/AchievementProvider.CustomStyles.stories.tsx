import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { AchievementProvider } from '../../src';
import { AchievementConfiguration } from '../../src/types';
import { useAchievement } from '../../src/hooks/useAchievement';

export default {
    title: 'Achievement System/AchievementProvider/CustomStyles',
    component: AchievementProvider,
} as Meta;

const customStyles = {
    achievementModal: {
        modal: {
            backgroundColor: '#2c3e50',
            color: '#ecf0f1',
            borderRadius: '15px',
            padding: '20px',
        },
        title: {
            color: '#e74c3c',
            fontSize: '24px',
        },
        description: {
            color: '#bdc3c7',
            fontSize: '16px',
        },
    },
    badgesModal: {
        modal: {
            backgroundColor: '#34495e',
            borderRadius: '15px',
            padding: '20px',
        },
        title: {
            color: '#e67e22',
            fontSize: '24px',
        },
    },
    badgesButton: {
        button: {
            backgroundColor: '#27ae60',
            borderRadius: '50%',
            width: '60px',
            height: '60px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        },
    },
};

const TestComponent = () => {
    const { metrics, updateMetrics } = useAchievement();

    const triggerAchievement = () => {
        updateMetrics({
            visits: [...(metrics.visits || []), 1]
        });
    };

    return (
        <div>
            <h2>Test Custom Styles</h2>
            <button onClick={triggerAchievement}>Trigger Achievement</button>
            <div>
                <h3>Current State:</h3>
                <pre>{JSON.stringify(metrics, null, 2)}</pre>
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
                    achievementId: 'styled-achievement',
                    achievementTitle: 'Styled Achievement',
                    achievementDescription: 'This achievement shows custom styling!',
                    achievementIconKey: 'star'
                }
            }
        ]
    };

    return (
        <AchievementProvider 
            config={config} 
            storageKey="styles-test"
            styles={customStyles}
        >
            <TestComponent />
        </AchievementProvider>
    );
};

export const CustomStylesTest = Template.bind({});
CustomStylesTest.parameters = {
    docs: {
        description: {
            story: 'Tests custom styling of achievement components'
        }
    }
};