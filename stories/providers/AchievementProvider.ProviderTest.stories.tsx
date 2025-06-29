import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { AchievementProvider } from '../../src';
import { AchievementContext } from '../../src/providers/AchievementProvider';
import {
    AchievementConfiguration,
    AchievementMetrics,
    AchievementDetails,
    InitialAchievementMetrics,
    AchievementMetricValue
} from '../../src/types';

// Define achievement details according to the correct interface
const firstVisitAchievement: AchievementDetails = {
    achievementId: 'first-visit',
    achievementTitle: 'Welcome!',
    achievementDescription: 'Visit the application for the first time',
    achievementIconKey: 'star'
};

// Simple test achievement configuration with proper types
const testAchievementConfig: AchievementConfiguration = {
    'pageVisits': [
        {
            isConditionMet: (metricValue: AchievementMetricValue) => typeof metricValue ===
                'number' && metricValue >= 1,
            achievementDetails: firstVisitAchievement
        }
    ]
};

// Initial metrics structure following the AchievementMetrics interface
const initialMetrics: AchievementMetrics = {
    'pageVisits': [1]
};

// Initial state for achievements following InitialAchievementMetrics interface
const initialAchievementState: InitialAchievementMetrics = {
    'pageVisits': 0
};

export default {
    title: 'Achievement System/AchievementProvider Test',
    component: AchievementProvider,
    parameters: {
        controls: { expanded: true },
        docs: {
            description: {
                component: 'This story tests the basic functionality of the AchievementProvider component, including sound playback with Howler.js and notifications with Sonner.'
            }
        }
    },
    argTypes: {
        storageKey: {
            control: 'text',
            description: 'Key used for localStorage',
            defaultValue: 'test-achievements'
        },
        badgesButtonPosition: {
            control: 'select',
            options: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
            description: 'Position of the badges button',
            defaultValue: 'top-right'
        },
        achievementSoundUrl: {
            control: 'text',
            description: 'URL to the achievement sound file',
            defaultValue: '/achievement-sound.mp3'
        }
    }
} as Meta;

// Create a wrapper component for the story
interface ProviderTestProps {
    storageKey?: string;
    badgesButtonPosition?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
    achievementSoundUrl?: string;
}

const ProviderTest = (args: { storageKey?: "test-achievements" | undefined; badgesButtonPosition?: "top-right" | undefined; achievementSoundUrl?: string; }) => {
    const { storageKey = 'test-achievements', badgesButtonPosition = 'top-right', achievementSoundUrl = '/achievement-sound.mp3' } = args;

    // State to track trigger count
    const [triggerCount, setTriggerCount] = React.useState(0);
    
    // Reference to the AchievementContext
    const achievementContextRef = React.useRef<any>(null);
    
    // Function to capture context
    const captureContext = (context: any) => {
        achievementContextRef.current = context;
    };
    
    // Direct trigger using context
    const triggerAchievement = () => {
        if (achievementContextRef.current) {
            // Use the context to update metrics directly
            achievementContextRef.current.updateMetrics({
                'pageVisits': [1]
            });
            setTriggerCount(prevCount => prevCount + 1);
            console.log('Achievement triggered!');
        } else {
            console.error('Achievement context not available!');
        }
    };
    
    // Test sound directly
    const testSound = () => {
        try {
            console.log('Testing sound playback:', achievementSoundUrl);
            // Create and play sound directly using Howler
            const { Howl } = require('howler');
            const testSound = new Howl({
                src: [achievementSoundUrl],
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

    // Create a wrapper component that captures the context
    const ContextCapture = ({ children }: { children: React.ReactNode }) => {
        const context = React.useContext(AchievementContext);
        React.useEffect(() => {
            captureContext(context);
        }, [context]);
        return <>{children}</>;
    };
    
    return (
        <AchievementProvider
            config={testAchievementConfig}
            initialState={initialAchievementState}
            storageKey={storageKey}
            badgesButtonPosition={badgesButtonPosition}
            achievementSoundUrl={achievementSoundUrl}
        >
            <ContextCapture>
            <div style={{
                padding: '2rem',
                border: '1px solid #eaeaea',
                borderRadius: '8px',
                maxWidth: '600px',
                margin: '0 auto',
                background: '#f9f9f9'
            }}>
                <h1>Achievement Provider Test</h1>
                <p>This story tests the basic functionality of the AchievementProvider component.</p>

                <div style={{ marginTop: '2rem' }}>
                    <div style={{ marginBottom: '1rem' }}>
                        <strong>Configuration:</strong>
                        <ul>
                            <li>Storage Key: {storageKey}</li>
                            <li>Badges Button Position: {badgesButtonPosition}</li>
                            <li>Achievement Sound URL: {achievementSoundUrl}</li>
                            <li>Achievement triggers: {triggerCount}</li>
                        </ul>
                    </div>

                    <div style={{
                        marginTop: '1rem',
                        padding: '1rem',
                        background: '#f0f0f0',
                        borderRadius: '4px',
                        fontFamily: 'monospace',
                        fontSize: '14px'
                    }}>
                        <strong>Achievement Configuration:</strong>
                        <pre>{JSON.stringify(testAchievementConfig, null, 2)}</pre>

                        <strong>Initial Metrics:</strong>
                        <pre>{JSON.stringify(initialMetrics, null, 2)}</pre>

                        <strong>Initial Achievement State:</strong>
                        <pre>{JSON.stringify(initialAchievementState, null, 2)}</pre>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
                        <button
                            style={{
                                padding: '0.75rem 1.5rem',
                                background: '#0070f3',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                fontWeight: 'bold'
                            }}
                            onClick={triggerAchievement}
                        >
                            Trigger Achievement
                        </button>

                        <button
                            style={{
                                padding: '0.75rem 1.5rem',
                                background: '#6F42C1',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                fontWeight: 'bold'
                            }}
                            onClick={testSound}
                        >
                            Test Sound Directly
                        </button>

                        <button
                            style={{
                                padding: '0.75rem 1.5rem',
                                background: '#f5f5f5',
                                color: '#333',
                                border: '1px solid #ddd',
                                borderRadius: '4px',
                                cursor: 'pointer'
                            }}
                            onClick={() => {
                                localStorage.removeItem(storageKey);
                                window.location.reload();
                            }}
                        >
                            Reset Storage
                        </button>
                    </div>

                    <div style={{
                        marginTop: '2rem',
                        padding: '1rem',
                        border: '1px dashed #ccc',
                        borderRadius: '4px',
                        background: '#fff'
                    }}>
                        <h3>Test Instructions:</h3>
                        <ol>
                            <li>Click the <strong>"Trigger Achievement"</strong> button to simulate a page visit and trigger the achievement notification</li>
                            <li>Observe the achievement notification that appears with Sonner toast</li>
                            <li>You should hear a sound effect if your browser allows audio playback</li>
                            <li>If no sound plays, try the <strong>"Test Sound Directly"</strong> button to test Howler.js separately</li>
                            <li>Click on the badges button to view unlocked achievements</li>
                            <li>Check browser console for any audio loading/playback messages</li>
                            <li>Use the <strong>"Reset Storage"</strong> button to clear stored achievements and start fresh</li>
                        </ol>
                        
                        <div style={{ marginTop: '1rem', padding: '0.75rem', backgroundColor: '#FFF9DB', border: '1px solid #FFD43B', borderRadius: '4px' }}>
                            <strong>Note:</strong> If sound doesn't play, check that:
                            <ul>
                                <li>Your browser's sound is enabled</li>
                                <li>Autoplay is allowed for this site</li>
                                <li>The sound file path ({achievementSoundUrl}) is accessible</li> 
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            </ContextCapture>
        </AchievementProvider>
    );
};

export const BasicProviderTest = (args: { storageKey?: "test-achievements" | undefined; badgesButtonPosition?: "top-right" | undefined; achievementSoundUrl?: string; }) => (
    <ProviderTest {...args} />
);
BasicProviderTest.storyName = 'Basic Provider Test';