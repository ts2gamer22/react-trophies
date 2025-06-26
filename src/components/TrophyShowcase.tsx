import React from 'react';
import { AchievementDetails } from '../types';
import { defaultAchievementIcons } from '../assets/defaultIcons';

/**
 * Props for the TrophyShowcase component
 */
export interface TrophyShowcaseProps {
  /** Array of achievements to display in the showcase */
  achievements: AchievementDetails[];
  /** Maximum number of achievements to display */
  maxDisplay?: number;
  /** Whether to only show unlocked achievements */
  onlyShowUnlocked?: boolean;
  /** Whether to show trophy titles */
  showLabels?: boolean;
  /** Custom icons to use for achievements */
  icons?: Record<string, string>;
  /** Function to call when a trophy is clicked */
  onTrophyClick?: (achievement: AchievementDetails) => void;
  /** Custom styles for the showcase */
  customStyles?: {
    container?: React.CSSProperties;
    showcaseItem?: React.CSSProperties;
    showcaseIcon?: React.CSSProperties;
    showcaseLabel?: React.CSSProperties;
    moreIndicator?: React.CSSProperties;
  };
}

/**
 * TrophyShowcase - Displays achievements in a horizontal, scrollable showcase
 * Perfect for profile pages or headers where space is limited
 * 
 * @example
 * ```tsx
 * <TrophyShowcase 
 *   achievements={achievements}
 *   maxDisplay={5}
 *   onlyShowUnlocked={true}
 *   onTrophyClick={(achievement) => console.log('Trophy clicked:', achievement.achievementId)}
 * />
 * ```
 */
const TrophyShowcase: React.FC<TrophyShowcaseProps> = ({
  achievements,
  maxDisplay = 5,
  onlyShowUnlocked = true,
  showLabels = true,
  icons = {},
  onTrophyClick,
  customStyles = {}
}) => {
  // Filter achievements if onlyShowUnlocked is true
  const displayAchievements = onlyShowUnlocked 
    ? achievements.filter(a => a.isUnlocked).slice(0, maxDisplay)
    : achievements.slice(0, maxDisplay);
    
  // Count how many more achievements there are beyond what we're showing
  const moreCount = onlyShowUnlocked
    ? achievements.filter(a => a.isUnlocked).length - displayAchievements.length
    : achievements.length - displayAchievements.length;
  
  // Merge default icons with custom icons
  const mergedIcons = { ...defaultAchievementIcons, ...icons };
  
  // Default styles for the showcase
  const defaultStyles = {
    container: {
      display: 'flex',
      overflowX: 'auto',
      padding: '12px',
      gap: '16px',
      alignItems: 'center',
      width: '100%',
      msOverflowStyle: 'none', // Hide scrollbar in IE/Edge
      scrollbarWidth: 'none', // Hide scrollbar in Firefox
      '::-webkit-scrollbar': { // Hide scrollbar in Chrome/Safari
        display: 'none'
      }
    },
    showcaseItem: {
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'center',
      minWidth: '80px',
      cursor: onTrophyClick ? 'pointer' : 'default',
      transition: 'transform 0.2s',
      ':hover': {
        transform: onTrophyClick ? 'scale(1.05)' : 'none'
      }
    },
    showcaseIcon: {
      width: '60px',
      height: '60px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '50%',
      backgroundColor: '#f5f5f5',
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
      marginBottom: '8px',
      padding: '8px',
      boxSizing: 'border-box' as const
    },
    showcaseLabel: {
      fontSize: '12px',
      textAlign: 'center' as const,
      color: '#555',
      maxWidth: '80px',
      whiteSpace: 'nowrap' as const,
      overflow: 'hidden' as const,
      textOverflow: 'ellipsis' as const
    },
    moreIndicator: {
      fontSize: '14px',
      fontWeight: 'bold',
      color: '#888',
      display: 'flex',
      alignItems: 'center',
      height: '60px'
    }
  };
  
  // Merge default styles with custom styles
  const mergedStyles = {
    container: { ...defaultStyles.container, ...customStyles.container },
    showcaseItem: { ...defaultStyles.showcaseItem, ...customStyles.showcaseItem },
    showcaseIcon: { ...defaultStyles.showcaseIcon, ...customStyles.showcaseIcon },
    showcaseLabel: { ...defaultStyles.showcaseLabel, ...customStyles.showcaseLabel },
    moreIndicator: { ...defaultStyles.moreIndicator, ...customStyles.moreIndicator }
  };
  
  return (
    <div style={mergedStyles.container as React.CSSProperties}>
      {displayAchievements.map(achievement => {
        // Get icon for this achievement
        const iconKey = achievement.achievementIconKey || 'default';
        // Use type assertion to tell TypeScript this is a valid key
        const iconToDisplay = mergedIcons[iconKey as keyof typeof mergedIcons] || mergedIcons.default;
        
        return (
          <div 
            key={achievement.achievementId}
            style={mergedStyles.showcaseItem as React.CSSProperties}
            onClick={() => onTrophyClick && onTrophyClick(achievement)}
          >
            <div style={mergedStyles.showcaseIcon as React.CSSProperties}>
              {iconToDisplay.startsWith('http') || iconToDisplay.startsWith('data:image') ? (
                <img 
                  src={iconToDisplay} 
                  alt={achievement.achievementTitle}
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
                />
              ) : (
                <span style={{ fontSize: '1.8rem' }}>{iconToDisplay}</span>
              )}
            </div>
            
            {showLabels && (
              <div style={mergedStyles.showcaseLabel as React.CSSProperties} title={achievement.achievementTitle}>
                {achievement.achievementTitle}
              </div>
            )}
          </div>
        );
      })}
      
      {moreCount > 0 && (
        <div style={mergedStyles.moreIndicator as React.CSSProperties}>
          +{moreCount} more
        </div>
      )}
    </div>
  );
};

export default TrophyShowcase;
