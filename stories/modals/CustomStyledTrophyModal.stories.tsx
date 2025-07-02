import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TrophyModal } from '../../src/components/TrophyModal';
import { AchievementProvider } from '../../src/providers/AchievementProvider';
import type { AchievementConfiguration } from '../../src/types';

// Import Lucide icons for custom triggers
import { Trophy, Award, Flame, Crown, Rocket } from 'lucide-react';

/**
 * Achievement configuration with various types of achievements for demonstration
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

/**
 * Interactive wrapper component with metrics controls for styling stories
 */
const StylingDemoWrapper = (props) => {
  // Set initial metrics including some "unlocked" achievements for demonstration
  const [metrics, setMetrics] = useState({
    clicks: [15],  // This will unlock the first two click achievements
    logins: [4],   // This will unlock the first login achievement
    nightOwl: [2], // This won't unlock the night owl achievement
  });
  
  // Increment a specific metric
  const incrementMetric = (metricName) => {
    setMetrics(prev => {
      const newValues = { ...prev };
      if (Array.isArray(newValues[metricName])) {
        newValues[metricName] = [newValues[metricName][0] + 1];
      } else {
        newValues[metricName] = [(newValues[metricName] || 0) + 1];
      }
      return newValues;
    });
  };
  
  // Reset metrics to initial values
  const resetMetrics = () => {
    setMetrics({
      clicks: [15],
      logins: [4],
      nightOwl: [2],
    });
  };

  // Unlock all achievements
  const unlockAll = () => {
    setMetrics({
      clicks: [30],
      logins: [10],
      nightOwl: [10],
    });
  };
  
  return (
    <div className="space-y-6">
      {/* Interactive controls panel */}
      <div className="mb-4 p-4 border rounded-md">
        <h3 className="font-bold text-lg mb-2">Interactive Demo Controls</h3>
        <p className="text-sm text-gray-500 mb-3">Adjust metrics to see how achievements respond with different styling</p>
        
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
          
          <button 
            onClick={unlockAll}
            className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors"
          >
            Unlock All
          </button>
        </div>
        
        <div className="text-sm text-gray-700 bg-gray-50 p-3 rounded">
          <strong>Current Metrics:</strong> 
          <pre className="mt-1 p-2 bg-gray-100 rounded overflow-x-auto">
            {JSON.stringify(metrics, null, 2)}
          </pre>
        </div>
      </div>
      
      {/* Render the TrophyModal with styling from story args */}
      <div className="p-4 border rounded-md">
        <h3 className="font-bold text-lg mb-2">Styled TrophyModal</h3>
        <p className="text-sm text-gray-500 mb-4">Click the button below to open the modal with custom styling</p>
        
        <AchievementProvider config={achievementConfig}>
          <TrophyModal 
            {...props.args}
            metrics={metrics} 
            config={achievementConfig}
          />
        </AchievementProvider>
      </div>
    </div>
  );
};

/**
 * Metadata for Storybook
 */
const meta: Meta<typeof TrophyModal> = {
  title: 'Modals/CustomStyledTrophyModal',
  component: TrophyModal,
  decorators: [(Story, context) => <StylingDemoWrapper args={context.args} />],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    className: { control: 'text' },
    modalClassName: { control: 'text' },
    cardClassName: { control: 'text' },
    unlockedCardClassName: { control: 'text' },
    iconClassName: { control: 'text' },
    buttonPosition: {
      control: { type: 'select' },
      options: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
    },
    modalTitle: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof TrophyModal>;

/**
 * Default story with standard styling
 */
export const DefaultStyling: Story = {
  args: {
    modalTitle: 'Your Achievements',
    buttonPosition: 'bottom-right',
  },
};

/**
 * Modern blue theme
 */
export const BlueTheme: Story = {
  args: {
    modalTitle: 'Blue Achievement Theme',
    buttonPosition: 'bottom-right',
    className: 'bg-blue-500 text-white hover:bg-blue-600',
    modalClassName: 'border-blue-200 shadow-blue-100/20',
    cardClassName: 'rounded-lg shadow-sm',
    unlockedCardClassName: 'bg-blue-500/10 border-blue-500/50',
    iconClassName: 'text-blue-500',
    trigger: (
      <button className="px-3 py-2 bg-blue-500 text-white rounded-md flex items-center gap-2 hover:bg-blue-600 transition-colors">
        <Trophy className="h-4 w-4" /> View Blue Achievements
      </button>
    ),
  },
};

/**
 * Dark gaming theme
 */
export const GamingTheme: Story = {
  args: {
    modalTitle: 'Gaming Achievements',
    buttonPosition: 'top-right',
    modalClassName: 'bg-slate-900 text-white border-purple-500/30',
    cardClassName: 'bg-slate-800 text-white border-slate-700 rounded-xl',
    unlockedCardClassName: 'bg-gradient-to-r from-purple-500/20 to-blue-500/20 border-purple-500',
    iconClassName: 'text-purple-400',
    trigger: (
      <button className="px-3 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-md flex items-center gap-2 hover:from-purple-700 hover:to-blue-700 transition-colors shadow-lg">
        <Trophy className="h-5 w-5" /> Gaming Achievements
      </button>
    ),
  },
};

/**
 * Elegant gold theme
 */
export const GoldTheme: Story = {
  args: {
    modalTitle: 'Premium Achievements',
    buttonPosition: 'bottom-left',
    className: 'bg-amber-500 text-white',
    modalClassName: 'bg-gradient-to-b from-slate-50 to-amber-50 border-amber-200',
    cardClassName: 'border-amber-200 rounded-lg shadow-sm',
    unlockedCardClassName: 'bg-gradient-to-r from-amber-500/10 to-yellow-500/10 border-amber-500',
    iconClassName: 'text-amber-500',
    trigger: (
      <button className="px-3 py-2 bg-gradient-to-r from-amber-500 to-yellow-500 text-white rounded-md flex items-center gap-2 hover:from-amber-600 hover:to-yellow-600 transition-colors shadow-md">
        <Crown className="h-4 w-4" /> Premium Achievements
      </button>
    ),
  },
};

/**
 * Modern green eco theme
 */
export const EcoTheme: Story = {
  args: {
    modalTitle: 'Sustainability Achievements',
    buttonPosition: 'top-left',
    modalClassName: 'bg-white border-green-200 shadow-xl',
    cardClassName: 'rounded-xl shadow-sm border-gray-100',
    unlockedCardClassName: 'bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-green-500',
    iconClassName: 'text-green-600',
    trigger: (
      <button className="px-4 py-2 bg-green-600 text-white rounded-full flex items-center gap-2 hover:bg-green-700 transition-colors shadow-md">
        <Rocket className="h-4 w-4" /> Eco Achievements
      </button>
    ),
  },
};

/**
 * Fiery orange theme
 */
export const FireTheme: Story = {
  args: {
    modalTitle: '🔥 Hot Achievements',
    buttonPosition: 'bottom-right',
    modalClassName: 'bg-gradient-to-b from-orange-50 to-white border-orange-200',
    cardClassName: 'rounded-lg shadow border-orange-100',
    unlockedCardClassName: 'bg-gradient-to-r from-orange-500/10 to-red-500/10 border-orange-500',
    iconClassName: 'text-orange-500',
    trigger: (
      <button className="px-3 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-md flex items-center gap-2 hover:from-orange-600 hover:to-red-600 transition-colors">
        <Flame className="h-4 w-4" /> Hot Streaks
      </button>
    ),
  },
};
