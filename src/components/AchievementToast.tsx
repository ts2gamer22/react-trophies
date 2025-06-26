import React, { useEffect } from 'react';
import { toast, Toaster } from 'sonner';
import { useAchievementContext } from '../providers/AchievementProvider';
import { defaultAchievementIcons } from '../assets/defaultIcons';
import { AchievementDetails } from '../types';

// Define our own toast options interface since sonner doesn't export it
interface ToastOptions {
  description?: React.ReactNode;
  duration?: number;
  icon?: React.ReactNode;
  style?: React.CSSProperties;
  action?: {
    label: string;
    onClick: () => void;
  };
}

/**
 * Props for the AchievementToast component
 */
export interface AchievementToastProps {
  /** Duration in milliseconds for toasts to remain visible (default: 4000) */
  duration?: number;
  /** Position for the toast notifications */
  position?: 'top-left' | 'top-right' | 'top-center' | 'bottom-left' | 'bottom-right' | 'bottom-center';
  /** Gap between toasts in pixels */
  gap?: number;
  /** Custom icons to use for achievements */
  icons?: Record<string, string>;
  /** Whether toasts have close buttons */
  closeButton?: boolean;
  /** Custom toast title (default: "Achievement Unlocked!") */
  toastTitle?: string;
  /** Whether to expand toasts on hover */
  expandOnHover?: boolean;
  /** Custom styles for the toasts */
  customToastStyles?: React.CSSProperties;
}

/**
 * AchievementToast - Automatically shows toast notifications when achievements are unlocked
 * Uses sonner for toast UI
 * 
 * @example
 * ```tsx
 * <AchievementToast 
 *   position="bottom-right" 
 * />
 * ```
 */
const AchievementToast: React.FC<AchievementToastProps> = ({
  duration = 4000,
  position = 'bottom-right',
  gap = 8,
  icons = {},
  closeButton = true,
  toastTitle = 'Achievement Unlocked!',
  expandOnHover = true,
  customToastStyles = {},
}) => {
  // Get access to the achievement context
  const achievementContext = useAchievementContext();

  // Effect hook to listen for newly unlocked achievements
  useEffect(() => {
    if (!achievementContext || achievementContext.notifications.length === 0) return;
    
    achievementContext.notifications.forEach(achievement => {
      // Get the appropriate icon for this achievement
      const mergedIcons = { ...defaultAchievementIcons, ...icons };
      const iconKey = achievement.achievementIconKey || 'default';
      const iconToDisplay = mergedIcons[iconKey as keyof typeof mergedIcons] || mergedIcons.default;

      // Create toast options that are compatible with sonner
      const toastOptions: ToastOptions = {
        description: achievement.achievementDescription,
        duration: duration,
        icon: iconToDisplay,
        style: customToastStyles
      };

      // Add close action if needed
      if (closeButton) {
        toastOptions.action = {
          label: 'Close',
          onClick: () => {/* Close action handled by sonner */}
        };
      }

      // Create the toast
      toast(toastTitle, toastOptions);
    });

    // Clear notifications after displaying them
    achievementContext.clearNotifications();
    
  }, [achievementContext, achievementContext?.notifications, duration, icons, toastTitle, customToastStyles, closeButton]);

  return (
    <div>
      <Toaster 
        position={position}
        gap={gap}
        expand={expandOnHover}
        visibleToasts={5}
        closeButton={closeButton}
      />
    </div>
  );
};

export default AchievementToast;
