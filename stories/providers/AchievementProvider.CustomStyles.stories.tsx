import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { AchievementProvider } from '../../src';
import { AchievementConfiguration } from '../../src/types';
import { useAchievement } from '../../src/hooks/useAchievement';
import { ToastContainer } from 'react-toastify';

export default {
    title: 'Achievement System/AchievementProvider/CustomStyles',
    component: AchievementProvider,
} as Meta;

const customStyles = {
    // Custom toast styles are handled via CSS classes and react-toastify's options
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
        content: {
            color: '#ecf0f1',
        },
        badge: {
            backgroundColor: '#2c3e50',
            padding: '15px',
            borderRadius: '8px',
            margin: '10px',
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
            <style>
                {`
                    .Toastify__toast {
                        background-color: #2c3e50;
                        color: #ecf0f1;
                        border-radius: 10px;
                    }
                    .Toastify__toast-body {
                        font-family: Arial, sans-serif;
                    }
                    .Toastify__progress-bar {
                        background: #27ae60;
                    }
                `}
            </style>
        </div>
    );
};

const Template: StoryFn = () => {
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
            story: 'Tests custom styling of achievement notifications and badges components'
        }
    }
};