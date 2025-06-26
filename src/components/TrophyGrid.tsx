import React from 'react';
import { AchievementDetails } from '../types';
import TrophyCard from './TrophyCard';

/**
 * Props for the TrophyGrid component
 */
export interface TrophyGridProps {
  /** Array of achievements to display in the grid */
  achievements: AchievementDetails[];
  /** Function to call when a trophy card is clicked */
  onTrophyClick?: (achievement: AchievementDetails) => void;
  /** Custom styles for the grid and its components */
  customStyles?: {
    container?: React.CSSProperties;
    emptyMessage?: React.CSSProperties;
    cardCustomStyles?: {
      container?: React.CSSProperties;
      iconContainer?: React.CSSProperties;
      icon?: React.CSSProperties;
      title?: React.CSSProperties;
      description?: React.CSSProperties;
      date?: React.CSSProperties;
      locked?: React.CSSProperties;
    };
  };
  /** Custom icons to use for achievements */
  icons?: Record<string, string>;
  /** Whether to show the achievement descriptions on cards */
  showDescriptions?: boolean;
  /** Whether to show the unlock dates on cards */
  showDates?: boolean;
  /** Whether to show locked achievements differently */
  showLocked?: boolean;
  /** Message to display when no achievements are available */
  emptyMessage?: string;
  /** Filter function to determine which achievements to display */
  filter?: (achievement: AchievementDetails) => boolean;
  /** Layout columns (responsive by default using grid-template-columns) */
  columns?: number | 'auto-fill';
  /** Min column width when using auto-fill */
  minColumnWidth?: number;
}

/**
 * TrophyGrid - A responsive grid to display multiple achievement cards
 * 
 * @example
 * ```tsx
 * <TrophyGrid 
 *   achievements={achievements}
 *   onTrophyClick={(achievement) => console.log('Trophy clicked:', achievement.achievementId)}
 *   showDescriptions={true}
 *   columns="auto-fill"
 *   minColumnWidth={250}
 * />
 * ```
 */
const TrophyGrid: React.FC<TrophyGridProps> = ({
  achievements,
  onTrophyClick,
  customStyles = {},
  icons = {},
  showDescriptions = true,
  showDates = true,
  showLocked = true,
  emptyMessage = "No achievements available",
  filter,
  columns = 'auto-fill',
  minColumnWidth = 240
}) => {
  // Filter achievements if filter function is provided
  const displayedAchievements = filter ? achievements.filter(filter) : achievements;
  
  // Create grid template columns based on columns prop
  const gridTemplateColumns = columns === 'auto-fill' 
    ? `repeat(auto-fill, minmax(${minColumnWidth}px, 1fr))` 
    : `repeat(${columns}, 1fr)`;
  
  // Default styles for the grid container
  const defaultStyles = {
    container: {
      display: 'grid',
      gridTemplateColumns,
      gap: '16px',
      padding: '16px',
      width: '100%',
    },
    emptyMessage: {
      textAlign: 'center' as const,
      padding: '24px',
      color: '#666',
      gridColumn: '1 / -1',
      fontSize: '16px'
    }
  };
  
  // Merge default styles with custom styles
  const mergedStyles = {
    container: { ...defaultStyles.container, ...customStyles.container },
    emptyMessage: { ...defaultStyles.emptyMessage, ...customStyles.emptyMessage }
  };
  
  // If there are no achievements to display, show the empty message
  if (displayedAchievements.length === 0) {
    return (
      <div style={mergedStyles.container}>
        <div style={mergedStyles.emptyMessage}>
          {emptyMessage}
        </div>
      </div>
    );
  }
  
  return (
    <div style={mergedStyles.container}>
      {displayedAchievements.map(achievement => (
        <TrophyCard
          key={achievement.achievementId}
          achievement={achievement}
          onClick={onTrophyClick}
          customStyles={customStyles.cardCustomStyles}
          icons={icons}
          showDescription={showDescriptions}
          showDate={showDates}
          showLocked={showLocked}
        />
      ))}
    </div>
  );
};

export default TrophyGrid;
