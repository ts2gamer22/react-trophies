import React from 'react';
import { AchievementDetails } from '../types';
import { defaultAchievementIcons } from '../assets/defaultIcons';

/**
 * Props for the AchievementToastContent component
 */
export interface AchievementToastContentProps {
  /** The achievement to display in the toast */
  achievement: AchievementDetails;
  /** Custom icons to use in place of default icons */
  icons?: Record<string, string>;
  /** Title displayed at the top of the toast (default: "Achievement Unlocked!") */
  title?: string;
  /** Custom styles for the toast container */
  customStyles?: React.CSSProperties;
  /** Optional custom classes for styling */
  className?: string;
}

/**
 * AchievementToastContent - Defines the look of achievement toast notifications
 * This component is used internally by the toast() function but doesn't call toast itself
 * 
 * @example
 * ```tsx
 * <AchievementToastContent 
 *   achievement={achievementObject}
 *   icons={mergedIcons}
 *   toastTitle="Achievement Unlocked!"
 * />
 * ```
 */
export const AchievementToastContent: React.FC<AchievementToastContentProps> = ({ 
  achievement, 
  icons = {}, 
  title = "Achievement Unlocked!",
  customStyles = {},
  className = ""
}) => {
  // Find the appropriate icon to display
  const iconKey = achievement.achievementIconKey || 'default';
  const iconToDisplay = icons[iconKey] || 
                        defaultAchievementIcons[iconKey as keyof typeof defaultAchievementIcons] || 
                        defaultAchievementIcons.default;

  return (
    <div 
      style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '12px',
        ...customStyles
      }} 
      className={`rt-toast-content ${className}`}
      data-testid="achievement-toast-content"
    >
      <div style={{ flexShrink: 0 }} className="rt-toast-icon">
        {iconToDisplay?.startsWith('http') || iconToDisplay?.startsWith('data:image') ? (
          <img 
            src={iconToDisplay} 
            alt={achievement.achievementTitle} 
            style={{ width: '40px', height: '40px', objectFit: 'contain' }} 
          />
        ) : (
          <div style={{ fontSize: '2rem', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {iconToDisplay}
          </div>
        )}
      </div>
      
      <div className="rt-toast-body">
        <h3 style={{ margin: '0 0 4px 0', fontSize: '1rem' }} className="rt-toast-title">
            {title}
        </h3>
        <p style={{ margin: 0, fontSize: '0.9rem' }} className="rt-toast-subtitle">
            {achievement.achievementTitle}
        </p>
        {achievement.achievementDescription && (
          <p style={{ margin: '4px 0 0 0', fontSize: '0.8rem', opacity: 0.7 }} className="rt-toast-description">
            {achievement.achievementDescription}
          </p>
        )}
      </div>
    </div>
  );
};
