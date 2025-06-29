import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { AchievementProvider } from '../../src';
import { AchievementConfiguration } from '../../src/types';
import { useAchievement } from '../../src/hooks/useAchievement';

export default {
    title: 'Achievement System/AchievementProvider/MultipleMetrics',
    component: AchievementProvider,
    parameters: {
        controls: { expanded: true },
        docs: {
            description: {
                component: 'Tests achievement system with multiple metric types and sound notifications.'
            }
        }
    },
    argTypes: {
        achievementSoundUrl: {
            control: 'text',
            description: 'URL to the achievement sound file',
            defaultValue: '/achievement-sound.mp3'
        }
    }
} as Meta;

const TestComponent = () => {
    const { metrics, updateMetrics } = useAchievement();
    const [triggerCount, setTriggerCount] = React.useState({ clicks: 0, points: 0, level: 0 });

    const handleClick = () => {
        const currentClicks = typeof metrics.clicks?.[0] === 'number' ? metrics.clicks[0] : 0;
        updateMetrics({
            ...metrics,
            clicks: [currentClicks + 1]
        });
        setTriggerCount(prev => ({ ...prev, clicks: prev.clicks + 1 }));
        console.log('Click metric updated: +1');
    };

    const handlePointsGain = () => {
        const currentPoints = typeof metrics.points?.[0] === 'number' ? metrics.points[0] : 0;
        updateMetrics({
            ...metrics,
            points: [currentPoints + 10]
        });
        setTriggerCount(prev => ({ ...prev, points: prev.points + 10 }));
        console.log('Points metric updated: +10');
    };

    const handleLevelUp = () => {
        const currentLevel = typeof metrics.level?.[0] === 'number' ? metrics.level[0] : 0;
        updateMetrics({
            ...metrics,
            level: [currentLevel + 1]
        });
        setTriggerCount(prev => ({ ...prev, level: prev.level + 1 }));
        console.log('Level metric updated: +1');
    };
    
    // Test sound directly
    const testSound = () => {
        try {
            const soundUrl = '/achievement-sound.mp3';
            console.log('Testing sound playback:', soundUrl);
            // Create and play sound directly using Howler
            const { Howl } = require('howler');
            const testSound = new Howl({
                src: [soundUrl],
                volume: 1.0,
                preload: true,
                onload: () => console.log('Test sound loaded successfully'),
                onloaderror: (id: number, err: Error) => console.error('Error loading test sound:', err)
            });
            testSound.play();
        } catch (error) {
            console.error('Failed to play test sound:', error);
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '700px', margin: '0 auto' }}>
            <h2>Test Multiple Achievement Types</h2>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
                <button 
                    style={{ padding: '8px 16px', background: '#0070f3', color: 'white', border: 'none', borderRadius: '4px' }}
                    onClick={handleClick}>
                    Click (Count: {triggerCount.clicks})
                </button>
                <button 
                    style={{ padding: '8px 16px', background: '#28a745', color: 'white', border: 'none', borderRadius: '4px' }}
                    onClick={handlePointsGain}>
                    Gain Points (Total: {triggerCount.points})
                </button>
                <button 
                    style={{ padding: '8px 16px', background: '#fd7e14', color: 'white', border: 'none', borderRadius: '4px' }}
                    onClick={handleLevelUp}>
                    Level Up (Level: {triggerCount.level})
                </button>
                <button 
                    style={{ padding: '8px 16px', background: '#6F42C1', color: 'white', border: 'none', borderRadius: '4px' }}
                    onClick={testSound}>
                    Test Sound
                </button>
            </div>
            
            <div style={{ marginTop: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '4px', background: '#f8f9fa' }}>
                <h3>Current Metrics:</h3>
                <pre style={{ background: '#f1f1f1', padding: '10px', borderRadius: '3px' }}>
                    {JSON.stringify(metrics, null, 2)}
                </pre>
                
                <div style={{ marginTop: '15px', fontSize: '0.9em', color: '#555' }}>
                    <p><strong>Achievement Goals:</strong></p>
                    <ul>
                        <li>Clicks: 5 clicks to unlock &quot;Dedicated Clicker&quot; achievement</li>
                        <li>Points: 50 points to unlock &quot;Point Collector&quot; achievement</li>
                        <li>Level: Level 3 to unlock &quot;Level Master&quot; achievement</li>
                    </ul>
                </div>
            </div>
            
            <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#FFF9DB', border: '1px solid #FFD43B', borderRadius: '4px' }}>
                <p><strong>Note:</strong> When an achievement is unlocked, a sound should play and a notification should appear.</p>
                <p>If you don't hear the sound, use the &quot;Test Sound&quot; button to check your browser's audio settings.</p>
            </div>
        </div>
    );
};

const Template: StoryFn = (args: { achievementSoundUrl?: string }) => {
    const config: AchievementConfiguration = {
        clicks: [
            {
                isConditionMet: (value) => typeof value === 'number' && value >= 5,
                achievementDetails: {
                    achievementId: 'clicker',
                    achievementTitle: 'Dedicated Clicker',
                    achievementDescription: 'Clicked 5 times!',
                    achievementIconKey: 'star'
                }
            }
        ],
        points: [
            {
                isConditionMet: (value) => typeof value === 'number' && value >= 50,
                achievementDetails: {
                    achievementId: 'point-collector',
                    achievementTitle: 'Point Collector',
                    achievementDescription: 'Earned 50 points!',
                    achievementIconKey: 'trophy'
                }
            }
        ],
        level: [
            {
                isConditionMet: (value) => typeof value === 'number' && value >= 3,
                achievementDetails: {
                    achievementId: 'level-master',
                    achievementTitle: 'Level Master',
                    achievementDescription: 'Reached level 3!',
                    achievementIconKey: 'medal'
                }
            }
        ]
    };

    return (
        <AchievementProvider 
            config={config} 
            storageKey="multiple-metrics-test"
            achievementSoundUrl={args.achievementSoundUrl || '/achievement-sound.mp3'}
        >
            <TestComponent />
        </AchievementProvider>
    );
};

export const MultipleMetricsTest = Template.bind({});
MultipleMetricsTest.parameters = {
    docs: {
        description: {
            story: 'Tests tracking and achieving multiple types of metrics simultaneously'
        }
    }
};