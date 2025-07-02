import React, { useState, useCallback } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TrophyModal } from '../../src/components/TrophyModal';
import { AchievementProvider } from '../../src/providers/AchievementProvider';
import type { AchievementConfiguration } from '../../src/types';

// Import Lucide icons for visualization
import { Trophy, Star, Flame, Medal, Sparkles, Moon } from 'lucide-react';

/**
 * Map achievement icon keys to actual icon components
 */
const iconMap = {
  trophy: <Trophy className="h-5 w-5 text-yellow-500" />,
  star: <Star className="h-5 w-5 text-yellow-500" />,
  fire: <Flame className="h-5 w-5 text-orange-500" />,
  medal: <Medal className="h-5 w-5 text-blue-500" />,
  sparkles: <Sparkles className="h-5 w-5 text-purple-500" />,
  moon: <Moon className="h-5 w-5 text-indigo-500" />,
};

/**
 * Enhanced achievement configuration with more achievements and proper icons
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
        icon: iconMap.trophy, // Pass the actual icon component
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
        icon: iconMap.star,
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
        icon: iconMap.sparkles,
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
        icon: iconMap.fire,
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
        icon: iconMap.medal,
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
        icon: iconMap.moon,
      },
    },
  ]
};

/**
 * Interactive wrapper component for TrophyModal stories
 */
const InteractiveTrophyModalWrapper = (props) => {
  const [metrics, setMetrics] = useState(props.args.metrics || { 
    clicks: [0], 
    logins: [0], 
    nightOwl: [0] 
  });
  
  // Increment a specific metric
  const incrementMetric = useCallback((metricName) => {
    setMetrics(prev => {
      // Handle array metrics
      if (Array.isArray(prev[metricName])) {
        const newValue = [...prev[metricName]];
        newValue[0] = (newValue[0] || 0) + 1;
        return { ...prev, [metricName]: newValue };
      }
      // Handle non-array metrics
      return { ...prev, [metricName]: (prev[metricName] || 0) + 1 };
    });
  }, []);
  
  // Reset metrics to initial values
  const resetMetrics = useCallback(() => {
    setMetrics(props.args.metrics || { clicks: [0], logins: [0], nightOwl: [0] });
  }, [props.args.metrics]);
  
  // Create an interactive demo component
  const InteractiveDemo = () => (
    <div className="mb-4 p-4 border rounded-md">
      <h3 className="font-bold text-lg mb-2">Interactive Demo</h3>
      <p className="text-sm text-gray-500 mb-3">Click the buttons below to update metrics and see progress changes</p>
      
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
  );
  
  return (
    <div className="space-y-4">
      <InteractiveDemo />
      <AchievementProvider config={props.args.config}>
        <TrophyModal {...props.args} metrics={metrics} />
      </AchievementProvider>
    </div>
  );
};

const meta: Meta<typeof TrophyModal> = {
  title: 'Modals/EnhancedTrophyModal',
  component: TrophyModal,
  decorators: [
    (Story, context) => <InteractiveTrophyModalWrapper args={context.args} Story={Story} />
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

type Story = StoryObj<typeof TrophyModal>;

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
 * Story with custom trigger button
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

/**
 * Story with different achievement theme
 */
export const DarkTheme: Story = {
  render: (args) => (
    <div className="p-8 bg-gray-900 rounded-lg">
      <TrophyModal 
        {...args}
        className="bg-gray-800 text-white border-gray-700 hover:bg-gray-700"
      />
    </div>
  ),
  args: {
    config: achievementConfig,
    metrics: {
      clicks: [20],
      logins: [5],
      nightOwl: [3],
    },
    modalTitle: 'Dark Theme Achievements',
    buttonPosition: 'bottom-left',
  },
};
