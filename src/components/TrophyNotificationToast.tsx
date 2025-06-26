import React, { useEffect, useState } from 'react';
import { toast, Toaster } from 'sonner';
import { Howl } from 'howler';
import { useAchievementContext } from '../providers/AchievementProvider';
import { defaultAchievementIcons } from '../assets/defaultIcons';
import { AchievementDetails } from '../types';
import { useAchievementStore } from '../store/useAchievementStore';

/**
 * Props for the TrophyNotificationToast component
 */
export interface TrophyNotificationToastProps {
  /** Position for the toast notifications */
  position?: 'top-left' | 'top-right' | 'top-center' | 'bottom-left' | 'bottom-right' | 'bottom-center';
  /** Duration in milliseconds for how long toasts should be displayed */
  duration?: number;
  /** URL for the sound file to play when achievements are unlocked */
  soundUrl?: string;
  /** Volume level for sound effects (0.0 to 1.0) */
  volume?: number;
  /** Whether sound effects should be enabled */
  soundEnabled?: boolean;
  /** Custom icons to use for achievements */
  icons?: Record<string, string>;
  /** Theme for the toast notifications */
  theme?: 'light' | 'dark' | 'system';
  /** Whether to close toast on click */
  closeOnClick?: boolean;
  /** Custom render function for achievement toasts */
  renderAchievement?: (achievement: AchievementDetails) => React.ReactNode;
}

/**
 * TrophyNotificationToast - Shows toast notifications when achievements are unlocked
 * Includes sound effects using howler.js
 * 
 * @example
 * ```tsx
 * <TrophyNotificationToast 
 *   position="top-right" 
 *   duration={4000} 
 *   soundEnabled={true} 
 * />
 * ```
 */
const TrophyNotificationToast: React.FC<TrophyNotificationToastProps> = ({
  position = 'top-right',
  duration = 5000,
  soundUrl = '/sounds/achievement-unlocked.mp3',
  volume = 0.5,
  soundEnabled = true,
  icons = {},
  theme = 'dark',
  closeOnClick = true,
  renderAchievement
}) => {
  // We need to get the context to access achievements
  const context = useAchievementContext();
  
  // If no context, return null
  if (!context) {
    console.warn('TrophyNotificationToast: No Achievement Context found. Make sure to use this component within an AchievementProvider.');
    return null;
  }
  
  const { unlockedAchievements } = context;
  
  // Get the store to access all achievement details
  const achievementStore = useAchievementStore();
  
  // Track achievements that have been shown in toast already
  const [shownAchievements, setShownAchievements] = useState<string[]>([]);
  
  // Merge default icons with custom icons
  const mergedIcons = { ...defaultAchievementIcons, ...icons };
  
  useEffect(() => {
    // Check for newly unlocked achievements
    const newlyUnlocked = unlockedAchievements.filter(id => !shownAchievements.includes(id));
    
    if (newlyUnlocked.length > 0) {
      // Play sound if enabled
      if (soundEnabled) {
        try {
          const sound = new Howl({
            src: [soundUrl],
            volume: volume
          });
          sound.play();
        } catch (error) {
          console.error('Error playing achievement sound:', error);
        }
      }
      
      // Show toast for each newly unlocked achievement
      newlyUnlocked.forEach(achievementId => {
        // Find achievement details from config in the store
        const achievement = Object.values(achievementStore.config || {})
          .flat()
          .map(condition => condition.achievementDetails)
          .find((a: AchievementDetails) => a.achievementId === achievementId);
        
        if (achievement) {
          if (renderAchievement) {
            // Use custom render function if provided
            toast(renderAchievement(achievement));
          } else {
            // Default toast UI
            const iconKey = achievement.achievementIconKey || 'default';
            const iconToDisplay = mergedIcons[iconKey as keyof typeof mergedIcons] || mergedIcons.default;
            
            toast(
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ flexShrink: 0 }}>
                  {iconToDisplay.startsWith('http') || iconToDisplay.startsWith('data:image') ? (
                    <img 
                      src={iconToDisplay} 
                      alt={achievement.achievementTitle} 
                      style={{ width: '48px', height: '48px', objectFit: 'contain' }} 
                    />
                  ) : (
                    <div style={{ fontSize: '2rem', width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {iconToDisplay}
                    </div>
                  )}
                </div>
                
                <div>
                  <h3 style={{ margin: '0 0 4px 0', fontSize: '1rem' }}>Achievement Unlocked!</h3>
                  <p style={{ margin: 0, fontSize: '0.9rem' }}>{achievement.achievementTitle}</p>
                  {achievement.achievementDescription && (
                    <p style={{ margin: '4px 0 0 0', fontSize: '0.8rem', opacity: 0.7 }}>
                      {achievement.achievementDescription}
                    </p>
                  )}
                </div>
              </div>,
              {
                duration: duration,
              }
            );
          }
        }
      });
      
      // Mark these achievements as shown
      setShownAchievements(prev => [...prev, ...newlyUnlocked]);
    }
  }, [unlockedAchievements, shownAchievements, soundEnabled, soundUrl, volume, duration, achievementStore.config, mergedIcons, renderAchievement]);
  
  // Note: closeOnClick is not supported in the sonner Toaster component according to TypeScript
  return <Toaster position={position} theme={theme} closeButton={true} richColors />;
};

export default TrophyNotificationToast;
