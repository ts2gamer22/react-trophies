import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TrophyModal } from '../../src/components/TrophyModal';
import { AchievementProvider } from '../../src/providers/AchievementProvider';
import type { AchievementConfiguration } from '../../src/types';

const meta: Meta<typeof TrophyModal> = {
  title: 'Modals/TrophyModal',
  component: TrophyModal,
  decorators: [
    (Story, { args }) => (
      <AchievementProvider config={args.config}>
        <Story {...args} />
      </AchievementProvider>
    ),
  ],
  argTypes: {
    config: { control: 'object' },
    metrics: { control: 'object' },
    buttonPosition: {
      control: { type: 'select' },
      options: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof TrophyModal>;

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
  ],
  logins: [
    {
        isConditionMet: (value) => typeof value === 'number' && value >= 5,
        achievementDetails: {
            achievementId: 'login-streak',
            achievementTitle: 'Login Streak',
            achievementDescription: 'Logged in 5 times',
            achievementIconKey: 'fire',
            targetValue: 5,
        },
    },
  ]
};

export const Default: Story = {
  args: {
    config: achievementConfig,
    metrics: {
      clicks: [5],
      logins: [5],
    },
    modalTitle: 'Your Trophies',
    buttonPosition: 'bottom-right',
  },
};

export const WithCustomTrigger: Story = {
  args: {
    config: achievementConfig,
    metrics: {
      clicks: [10],
      logins: [2],
    },
    modalTitle: 'Your Achievements',
    trigger: <button>View Achievements</button>,
  },
};
