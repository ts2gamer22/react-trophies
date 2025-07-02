import React, { useState, useCallback } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TrophyModal } from '../../src/components/TrophyModal';
import { AchievementProvider } from '../../src/providers/AchievementProvider';
import type { AchievementConfiguration } from '../../src/types';

// Import Lucide icons for visualization
import { Trophy, Star, Flame, Medal, Sparkles, Moon } from 'lucide-react';

/**
 * Map achievement icon keys to their Lucide components for the custom wrapper
 */
const iconComponents = {
  trophy: Trophy,
  star: Star,
  fire: Flame,
  medal: Medal,
  sparkles: Sparkles,
  moon: Moon,
};

/**
 * Custom wrapper to add icons to achievements and fix button issues
 */
const IconEnhancedTrophyModal = (props) => {
  const hasCustomTrigger = !!props.trigger;
  
  // Apply custom styling with icons via CSS and data attributes
  return (
    <div className="trophy-modal-wrapper">
      {/* Add icon styling with CSS */}
      <style>{`
        /* Fix the double button issue */
        .trophy-modal-wrapper [data-custom-trigger="true"] + [class*="fixed"] {
          display: none !important;
        }
        
        /* Add icon styling for achievement cards */
        .achievement-card {
          position: relative;
          padding-left: 2.5rem !important;
        }
        .achievement-card:before {
          content: '';
          position: absolute;
          left: 0.75rem;
          top: 1rem;
          width: 24px;
          height: 24px;
          background-size: cover;
        }
        .achievement-card[data-icon="trophy"]:before {
          background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="gold" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path><path d="M4 22h16"></path><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path></svg>');
        }
        .achievement-card[data-icon="star"]:before {
          background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="gold" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>');
        }
        .achievement-card[data-icon="fire"]:before {
          background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="orange" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path></svg>');
        }
        .achievement-card[data-icon="medal"]:before {
          background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="blue" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"></circle><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"></path></svg>');
        }
        .achievement-card[data-icon="sparkles"]:before {
          background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="purple" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.287 1.288L3 12l5.8 1.9a2 2 0 0 1 1.288 1.287L12 21l1.9-5.8a2 2 0 0 1 1.287-1.288L21 12l-5.8-1.9a2 2 0 0 1-1.288-1.287Z"></path></svg>');
        }
        .achievement-card[data-icon="moon"]:before {
          background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="indigo" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></svg>');
        }
      `}</style>
      
      {/* Process achievement cards when they appear in the DOM */}
      <script dangerouslySetInnerHTML={{ __html: `
        document.addEventListener('DOMNodeInserted', function(e) {
          if (e.target && e.target.nodeType === 1) {
            // Find achievement cards by their distinctive classes
            const possibleCards = e.target.querySelectorAll('[class*="rounded-lg"][class*="border"]');
            
            possibleCards.forEach(card => {
              const title = card.querySelector('h3')?.textContent || '';
              let iconType = '';
              
              // Match title to icon type
              if (title.includes('First Click')) iconType = 'trophy';
              else if (title.includes('Click Master')) iconType = 'star';
              else if (title.includes('Click Professional')) iconType = 'sparkles';
              else if (title.includes('Login Streak')) iconType = 'fire';
              else if (title.includes('Login Master')) iconType = 'medal';
              else if (title.includes('Night Owl')) iconType = 'moon';
              
              if (iconType && !card.classList.contains('achievement-card')) {
                card.classList.add('achievement-card');
                card.dataset.icon = iconType;
              }
            });
          }
        });
      `}} />

      {/* Render the TrophyModal, adding data-custom-trigger if there's a custom trigger */}
      <div data-custom-trigger={hasCustomTrigger}>
        <TrophyModal {...props} />
      </div>
    </div>
  );
};

/**
 * Interactive wrapper component with metrics controls
 */
const InteractiveWrapper = (props) => {
  const [metrics, setMetrics] = useState(props.args.metrics || { 
    clicks: [0], 
    logins: [0], 
    nightOwl: [0] 
  });
  
  // Increment a specific metric
  const incrementMetric = useCallback((metricName) => {
    setMetrics(prev => {
      if (Array.isArray(prev[metricName])) {
        const newValue = [...prev[metricName]];
        newValue[0] = (newValue[0] || 0) + 1;
        return { ...prev, [metricName]: newValue };
      }
      return { ...prev, [metricName]: (prev[metricName] || 0) + 1 };
    });
  }, []);
  
  // Reset metrics
  const resetMetrics = useCallback(() => {
    setMetrics(props.args.metrics || { clicks: [0], logins: [0], nightOwl: [0] });
  }, [props.args.metrics]);
  
  return (
    <div className="space-y-4">
      {/* Interactive controls panel */}
      <div className="mb-4 p-4 border rounded-md">
        <h3 className="font-bold text-lg mb-2">Interactive Demo</h3>
        <p className="text-sm text-gray-500 mb-3">Click the buttons below to update metrics and see achievement progress</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          <button 
            onClick={() => incrementMetric('clicks')}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            + Click ({metrics.clicks?.[0] || 0})
          </button>
          
          <button 
            onClick={() => incrementMetric('logins')}
            className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
          >
            + Login ({metrics.logins?.[0] || 0})
          </button>
          
          <button 
            onClick={() => incrementMetric('nightOwl')}
            className="px-3 py-1 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
          >
            + Night Owl ({metrics.nightOwl?.[0] || 0})
          </button>
          
          <button 
            onClick={resetMetrics}
            className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
          >
            Reset Metrics
          </button>
        </div>
        
        <div className="text-sm text-gray-700">
          <strong>Current Metrics:</strong> 
          <pre className="mt-1 p-2 bg-gray-100 rounded overflow-x-auto">
            {JSON.stringify(metrics, null, 2)}
          </pre>
        </div>
      </div>
      
      {/* Achievement provider with our custom TrophyModal */}
      <AchievementProvider config={props.args.config}>
        <IconEnhancedTrophyModal {...props.args} metrics={metrics} />
      </AchievementProvider>
    </div>
  );
};

/**
 * Enhanced achievement configuration with proper icons via iconKey mapping
 */
const achievementConfig: AchievementConfiguration = {
  clicks: [
    {
      isConditionMet: (value) => typeof value === 'number' && value >= 1,
      achievementDetails: {
        achievementId: 'first-click',
        achievementTitle: 'First Click!',
        achievementDescription: 'You made your first click',
        achievementIconKey: 'trophy',
        targetValue: 1,
      },
    },
    {
      isConditionMet: (value) => typeof value === 'number' && value >= 10,
      achievementDetails: {
        achievementId: 'click-master',
        achievementTitle: 'Click Master',
        achievementDescription: 'Clicked 10 times',
        achievementIconKey: 'star',
        targetValue: 10,
      },
    },
    {
      isConditionMet: (value) => typeof value === 'number' && value >= 25,
      achievementDetails: {
        achievementId: 'click-pro',
        achievementTitle: 'Click Professional',
        achievementDescription: 'Clicked 25 times',
        achievementIconKey: 'sparkles',
        targetValue: 25,
      },
    },
  ],
  logins: [
    {
      isConditionMet: (value) => typeof value === 'number' && value >= 3,
      achievementDetails: {
        achievementId: 'login-streak',
        achievementTitle: 'Login Streak',
        achievementDescription: 'Logged in 3 times',
        achievementIconKey: 'fire',
        targetValue: 3,
      },
    },
    {
      isConditionMet: (value) => typeof value === 'number' && value >= 7,
      achievementDetails: {
        achievementId: 'login-master',
        achievementTitle: 'Login Master',
        achievementDescription: 'Logged in 7 times',
        achievementIconKey: 'medal',
        targetValue: 7,
      },
    },
  ],
  nightOwl: [
    {
      isConditionMet: (value) => typeof value === 'number' && value >= 5,
      achievementDetails: {
        achievementId: 'night-owl',
        achievementTitle: 'Night Owl',
        achievementDescription: 'Used the app 5 times late at night',
        achievementIconKey: 'moon',
        targetValue: 5,
      },
    },
  ]
};

const meta: Meta<typeof IconEnhancedTrophyModal> = {
  title: 'Modals/IconTrophyModal',
  component: IconEnhancedTrophyModal,
  decorators: [
    (Story, context) => <InteractiveWrapper args={context.args} Story={Story} />
  ],
  argTypes: {
    config: { control: 'object' },
    metrics: { control: 'object' },
    buttonPosition: {
      control: { type: 'select' },
      options: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
    },
    className: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<typeof IconEnhancedTrophyModal>;

/**
 * Default story with standard position and styling
 */
export const Default: Story = {
  args: {
    config: achievementConfig,
    metrics: {
      clicks: [5],
      logins: [2],
      nightOwl: [0],
    },
    modalTitle: 'Your Trophies',
    buttonPosition: 'bottom-right',
  },
};

/**
 * Story with custom trigger button and no duplicate buttons
 */
export const WithCustomTrigger: Story = {
  args: {
    config: achievementConfig,
    metrics: {
      clicks: [8],
      logins: [1],
      nightOwl: [1],
    },
    modalTitle: 'Your Achievements',
    trigger: (
      <button className="px-3 py-2 bg-purple-600 text-white rounded-md flex items-center gap-2 hover:bg-purple-700 transition-colors">
        <Trophy className="h-4 w-4" /> View Achievements
      </button>
    ),
  },
};

/**
 * Story with custom styling using Tailwind classes
 */
export const WithCustomStyling: Story = {
  args: {
    config: achievementConfig,
    metrics: {
      clicks: [15],
      logins: [4],
      nightOwl: [2],
    },
    modalTitle: 'Achievement Gallery',
    buttonPosition: 'top-right',
    className: 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-none shadow-lg hover:from-indigo-600 hover:to-purple-700',
  },
};
