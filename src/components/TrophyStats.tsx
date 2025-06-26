import React from 'react';
import { AchievementDetails } from '../types';

/**
 * Props for the TrophyStats component
 */
export interface TrophyStatsProps {
  /** Array of achievements to calculate statistics for */
  achievements: AchievementDetails[];
  /** Whether to show total achievement count */
  showTotal?: boolean;
  /** Whether to show unlocked achievement count */
  showUnlocked?: boolean;
  /** Whether to show locked achievement count */
  showLocked?: boolean;
  /** Whether to show completion percentage */
  showPercentage?: boolean;
  /** Whether to show a progress bar */
  showProgressBar?: boolean;
  /** Title to display above stats */
  title?: string;
  /** Custom styles for the component */
  customStyles?: {
    container?: React.CSSProperties;
    title?: React.CSSProperties;
    statsContainer?: React.CSSProperties;
    statItem?: React.CSSProperties;
    progressBar?: React.CSSProperties;
    progressFill?: React.CSSProperties;
  };
}

/**
 * TrophyStats - Displays achievement statistics including counts and completion percentage
 * 
 * @example
 * ```tsx
 * <TrophyStats 
 *   achievements={achievements}
 *   showTotal={true}
 *   showUnlocked={true}
 *   showPercentage={true}
 *   showProgressBar={true}
 *   title="Achievement Progress"
 * />
 * ```
 */
const TrophyStats: React.FC<TrophyStatsProps> = ({
  achievements,
  showTotal = true,
  showUnlocked = true,
  showLocked = false,
  showPercentage = true,
  showProgressBar = true,
  title,
  customStyles = {}
}) => {
  // Calculate statistics
  const totalCount = achievements.length;
  const unlockedCount = achievements.filter(a => a.isUnlocked).length;
  const lockedCount = totalCount - unlockedCount;
  const completionPercentage = totalCount > 0 ? Math.round((unlockedCount / totalCount) * 100) : 0;
  
  // Default styles
  const defaultStyles = {
    container: {
      padding: '16px',
      backgroundColor: '#f5f5f5',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
      marginBottom: '16px'
    },
    title: {
      fontSize: '18px',
      fontWeight: 'bold',
      marginTop: 0,
      marginBottom: '12px',
      color: '#333'
    },
    statsContainer: {
      display: 'flex',
      flexWrap: 'wrap' as const,
      gap: '16px',
      marginBottom: '12px'
    },
    statItem: {
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'center'
    },
    statValue: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#333'
    },
    statLabel: {
      fontSize: '14px',
      color: '#666'
    },
    progressBar: {
      height: '10px',
      backgroundColor: '#ddd',
      borderRadius: '5px',
      overflow: 'hidden',
      marginTop: '8px'
    },
    progressFill: {
      height: '100%',
      backgroundColor: '#4CAF50',
      borderRadius: '5px',
      transition: 'width 0.5s ease-in-out'
    }
  };
  
  // Merge default styles with custom styles
  const mergedStyles = {
    container: { ...defaultStyles.container, ...customStyles.container },
    title: { ...defaultStyles.title, ...customStyles.title },
    statsContainer: { ...defaultStyles.statsContainer, ...customStyles.statsContainer },
    statItem: { ...defaultStyles.statItem, ...customStyles.statItem },
    progressBar: { ...defaultStyles.progressBar, ...customStyles.progressBar },
    progressFill: { ...defaultStyles.progressFill, ...customStyles.progressFill }
  };
  
  return (
    <div style={mergedStyles.container}>
      {title && <h3 style={mergedStyles.title}>{title}</h3>}
      
      <div style={mergedStyles.statsContainer}>
        {showTotal && (
          <div style={mergedStyles.statItem}>
            <span style={defaultStyles.statValue}>{totalCount}</span>
            <span style={defaultStyles.statLabel}>Total</span>
          </div>
        )}
        
        {showUnlocked && (
          <div style={mergedStyles.statItem}>
            <span style={defaultStyles.statValue}>{unlockedCount}</span>
            <span style={defaultStyles.statLabel}>Unlocked</span>
          </div>
        )}
        
        {showLocked && (
          <div style={mergedStyles.statItem}>
            <span style={defaultStyles.statValue}>{lockedCount}</span>
            <span style={defaultStyles.statLabel}>Locked</span>
          </div>
        )}
        
        {showPercentage && (
          <div style={mergedStyles.statItem}>
            <span style={defaultStyles.statValue}>{completionPercentage}%</span>
            <span style={defaultStyles.statLabel}>Complete</span>
          </div>
        )}
      </div>
      
      {showProgressBar && (
        <div style={mergedStyles.progressBar}>
          <div 
            style={{
              ...mergedStyles.progressFill,
              width: `${completionPercentage}%`
            }}
          />
        </div>
      )}
    </div>
  );
};

export default TrophyStats;
