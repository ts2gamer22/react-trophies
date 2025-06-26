import React from 'react';
import { AchievementDetails } from '../types';
import { defaultAchievementIcons } from '../assets/defaultIcons';

/**
 * Props for the TrophyCard component
 */
export interface TrophyCardProps {
  /** The achievement data to display */
  achievement: AchievementDetails;
  /** Optional custom styles for the card */
  customStyles?: {
    container?: React.CSSProperties;
    iconContainer?: React.CSSProperties;
    icon?: React.CSSProperties;
    title?: React.CSSProperties;
    description?: React.CSSProperties;
    date?: React.CSSProperties;
    locked?: React.CSSProperties;
  };
  /** Custom icons to use for achievements */
  icons?: Record<string, string>;
  /** Function to call when the card is clicked */
  onClick?: (achievement: AchievementDetails) => void;
  /** Whether to show the achievement description */
  showDescription?: boolean;
  /** Whether to show the date when the achievement was unlocked */
  showDate?: boolean;
  /** Whether to show locked achievements differently */
  showLocked?: boolean;
}

/**
 * TrophyCard - A visually appealing card component to display individual achievements
 * 
 * @example
 * ```tsx
 * <TrophyCard 
 *   achievement={achievement} 
 *   showDescription={true}
 *   onClick={(achievement) => console.log('Clicked:', achievement.achievementId)} 
 * />
 * ```
 */
const TrophyCard: React.FC<TrophyCardProps> = ({
  achievement,
  customStyles = {},
  icons = {},
  onClick,
  showDescription = true,
  showDate = true,
  showLocked = true
}) => {
  // Default styles for the card
  const defaultStyles = {
    container: {
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'center',
      padding: '16px',
      borderRadius: '8px',
      backgroundColor: achievement.isUnlocked === true ? '#ffffff' : '#f0f0f0',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      margin: '8px',
      transition: 'all 0.2s ease',
      cursor: onClick ? 'pointer' : 'default',
      width: '220px',
      position: 'relative' as const,
      opacity: achievement.isUnlocked || !showLocked ? 1 : 0.7,
      border: achievement.isUnlocked ? '1px solid #e0e0e0' : '1px solid #d0d0d0',
      ':hover': {
        transform: onClick ? 'translateY(-4px)' : 'none',
        boxShadow: onClick ? '0 6px 12px rgba(0,0,0,0.15)' : '0 2px 4px rgba(0,0,0,0.1)',
      }
    },
    iconContainer: {
      width: '80px',
      height: '80px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: '16px',
      borderRadius: '50%',
      backgroundColor: achievement.isUnlocked ? '#f8f8f8' : '#e8e8e8',
      padding: '8px',
      boxShadow: achievement.isUnlocked ? '0 2px 8px rgba(0,0,0,0.1)' : 'none'
    },
    icon: {
      width: '100%',
      height: '100%',
      objectFit: 'contain' as const,
      fontSize: '2.5em',
    },
    title: {
      fontSize: '16px',
      fontWeight: 'bold',
      marginBottom: '8px',
      textAlign: 'center' as const,
      color: '#333333',
    },
    description: {
      fontSize: '14px',
      textAlign: 'center' as const,
      color: '#666666',
      marginBottom: '12px',
      lineHeight: '1.4',
    },
    date: {
      fontSize: '12px',
      color: '#888888',
      marginTop: 'auto',
    },
    locked: {
      position: 'absolute' as const,
      top: '10px',
      right: '10px',
      backgroundColor: '#f0f0f0',
      borderRadius: '4px',
      padding: '4px 8px',
      fontSize: '12px',
      color: '#888888',
    }
  };
  
  // Merge default styles with custom styles
  const mergedStyles = {
    container: { ...defaultStyles.container, ...customStyles.container },
    iconContainer: { ...defaultStyles.iconContainer, ...customStyles.iconContainer },
    icon: { ...defaultStyles.icon, ...customStyles.icon },
    title: { ...defaultStyles.title, ...customStyles.title },
    description: { ...defaultStyles.description, ...customStyles.description },
    date: { ...defaultStyles.date, ...customStyles.date },
    locked: { ...defaultStyles.locked, ...customStyles.locked },
  };
  
  // Merge default icons with custom icons
  // Add index signature to allow string indexing
  const mergedIcons: { [key: string]: string } = { ...defaultAchievementIcons, ...icons };
  
  // Get icon for this achievement
  const iconKey = achievement.achievementIconKey || 'default';
  const iconToDisplay = mergedIcons[iconKey] || mergedIcons.default;
  
  // Handle click event
  const handleClick = () => {
    if (onClick) {
      onClick(achievement);
    }
  };
  
  return (
    <div 
      style={mergedStyles.container}
      onClick={handleClick}
    >
      {!achievement.isUnlocked && showLocked && (
        <div style={mergedStyles.locked}>
          Locked
        </div>
      )}
      
      <div style={mergedStyles.iconContainer}>
        {iconToDisplay.startsWith('http') || iconToDisplay.startsWith('data:image') ? (
          <img 
            src={iconToDisplay} 
            alt={achievement.achievementTitle} 
            style={mergedStyles.icon} 
          />
        ) : (
          <div style={mergedStyles.icon}>
            {iconToDisplay}
          </div>
        )}
      </div>
      
      <h3 style={mergedStyles.title}>
        {achievement.achievementTitle}
      </h3>
      
      {showDescription && achievement.achievementDescription && (
        <p style={mergedStyles.description}>
          {achievement.achievementDescription}
        </p>
      )}
      
      {showDate && achievement.isUnlocked && achievement.achievementDate && (
        <div style={mergedStyles.date}>
          Unlocked: {new Date(achievement.achievementDate).toLocaleDateString()}
        </div>
      )}
    </div>
  );
};

export default TrophyCard;
