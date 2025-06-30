import React from 'react';
import { AchievementDetails } from '../types';

/**
 * Props for the AchievementProgress component
 */
export interface AchievementProgressProps {
  /** The achievement to display progress for */
  achievement: AchievementDetails;
  /** Current value towards the achievement */
  currentValue: number;
  /** Target value required to complete the achievement */
  targetValue?: number;
  /** Custom height for the progress bar */
  height?: number;
  /** Custom color for the filled part of the progress bar */
  barColor?: string;
  /** Custom color for the unfilled part of the progress bar */
  backgroundColor?: string;
  /** Whether to show percentage text */
  showPercentage?: boolean;
  /** Whether to show fraction text (e.g. "7/10") */
  showFraction?: boolean;
  /** Whether to animate the progress bar */
  animate?: boolean;
  /** Custom styles to apply to different parts of the component */
  customStyles?: {
    container?: React.CSSProperties;
    label?: React.CSSProperties;
    progressContainer?: React.CSSProperties;
    progressBar?: React.CSSProperties;
    progressText?: React.CSSProperties;
  };
  /** Called when the progress reaches 100% */
  onComplete?: (achievement: AchievementDetails) => void;
}

/**
 * AchievementProgress - Shows progress towards completing an achievement
 * 
 * @example
 * ```tsx
 * <AchievementProgress
 *   achievement={achievement}
 *   currentValue={5}
 *   targetValue={10}
 *   showPercentage={true}
 *   showFraction={true}
 *   barColor="#4CAF50"
 * />
 * ```
 */
const AchievementProgress: React.FC<AchievementProgressProps> = ({
  achievement,
  currentValue,
  targetValue,
  height = 12,
  barColor = '#4CAF50',
  backgroundColor = '#e0e0e0',
  showPercentage = true,
  showFraction = false,
  animate = true,
  customStyles = {},
  onComplete
}) => {
  // Use the provided targetValue or default to 100
  const finalTargetValue = targetValue || 100;
  
  // Calculate progress percentage
  const percentage = Math.min(100, Math.round((currentValue / finalTargetValue) * 100));
  
  // Default styles
  const defaultStyles = {
    container: {
      marginBottom: '16px',
      width: '100%',
    },
    label: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '4px',
      fontSize: '14px',
      color: '#555',
    },
    progressContainer: {
      height: `${height}px`,
      backgroundColor: backgroundColor,
      borderRadius: `${height / 2}px`,
      overflow: 'hidden',
      position: 'relative' as const,
    },
    progressBar: {
      height: '100%',
      width: `${percentage}%`,
      backgroundColor: barColor,
      borderRadius: `${height / 2}px`,
      transition: animate ? 'width 0.3s ease-in-out' : 'none',
    },
    progressText: {
      position: 'absolute' as const,
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      color: percentage > 50 ? '#fff' : '#333',
      fontSize: `${Math.max(10, height - 2)}px`,
      fontWeight: 'bold',
      textShadow: '0px 0px 2px rgba(0, 0, 0, 0.3)',
    }
  };
  
  // Merge default styles with custom styles
  const mergedStyles = {
    container: { ...defaultStyles.container, ...customStyles.container },
    label: { ...defaultStyles.label, ...customStyles.label },
    progressContainer: { ...defaultStyles.progressContainer, ...customStyles.progressContainer },
    progressBar: { ...defaultStyles.progressBar, ...customStyles.progressBar },
    progressText: { ...defaultStyles.progressText, ...customStyles.progressText },
  };
  
  // Call onComplete when progress reaches 100%
  React.useEffect(() => {
    if (percentage === 100 && onComplete) {
      onComplete(achievement);
    }
  }, [percentage, achievement, onComplete]);
  
  return (
    <div style={mergedStyles.container}>
      <div style={mergedStyles.label}>
        <span>{achievement.achievementTitle}</span>
        {showFraction && (
          <span>
            {currentValue}/{finalTargetValue}
          </span>
        )}
      </div>
      
      <div style={mergedStyles.progressContainer}>
        <div style={mergedStyles.progressBar} />
        
        {showPercentage && (
          <div style={mergedStyles.progressText}>
            {percentage}%
          </div>
        )}
      </div>
    </div>
  );
};

export default AchievementProgress;
