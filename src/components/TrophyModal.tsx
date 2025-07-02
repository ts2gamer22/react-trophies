"use client"; // For compatibility with Next.js App Router

import React, { useState, useMemo } from 'react';
import { useAchievementContext } from '../providers/AchievementProvider';
import { AchievementDetails, AchievementConfiguration } from '../types';

// Note: We're implementing a Shadcn-compatible component, but consumers need to install these UI components
// The README instructs users to run: npx shadcn-ui@latest add dialog button scroll-area progress
interface TrophyModalProps {
  /** The text or element that triggers the modal. */
  trigger?: React.ReactNode;
  /** Custom title for the modal. */
  modalTitle?: string;
  /** Additional class names for the trigger button. */
  className?: string;
  /** Position of the trigger button on the screen. */
  buttonPosition?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  /** Full achievement configuration (required because context doesn't expose it) */
  config: AchievementConfiguration;
  /** Current metrics values (required because context doesn't expose it) */
  metrics?: Record<string, number | string | number[]>;
  /** Custom class name for the modal content. Use this to style the modal container */
  modalClassName?: string;
  /** Custom class name for achievement cards. Applied to all cards as base styling */
  cardClassName?: string;
  /** Custom class name for unlocked achievement cards. Applied in addition to cardClassName */
  unlockedCardClassName?: string;
  /** Custom class name for the achievement icon */
  iconClassName?: string;
}

// Extended interface for AchievementDetails with progress tracking
interface AchievementWithProgress extends AchievementDetails {
  isUnlocked: boolean;
  progress: number;
}

// Map of icon keys to their emoji representations for fallback
const ICON_MAP: Record<string, string> = {
  trophy: '🏆',
  star: '⭐',
  fire: '🔥',
  medal: '🥇',
  sparkles: '✨',
  moon: '🌙',
  default: '🎯'
};

/**
 * A modal dialog to display all achievements, their status, and progress.
 * Integrates with Shadcn UI for styling and requires peer dependencies.
 * 
 * @requires Shadcn UI components (Dialog, Button, ScrollArea, Progress)
 * @example
 * // Make sure you've installed the required components:
 * // npx shadcn-ui@latest add dialog button scroll-area progress
 * 
 * // import { TrophyModal } from 'react-trophies';
 * 
 * // function App() {
 * //   return (
 * //     <>
 * //       <TrophyModal 
 * //         modalTitle="Your Achievements" 
 * //         config={achievementConfig} 
 * //         metrics={currentMetrics}
 * //       />
 * //     </>
 * //   );
 * // }
 */
export const TrophyModal: React.FC<TrophyModalProps> = ({
  trigger,
  modalTitle = 'Your Trophies',
  className,
  buttonPosition = 'bottom-right',
  config,
  metrics = {},
  modalClassName = '',
  cardClassName: customCardClassName = '',
  unlockedCardClassName: customUnlockedClassName = '',
  iconClassName: customIconClassName = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Get unlockedAchievements from the context
  const { unlockedAchievements } = useAchievementContext();

  // We use useMemo to calculate the achievement list only when data changes
  const allAchievements = useMemo(() => {
    if (!config || Object.keys(config).length === 0) {
      return [];
    }

    // 1. Flatten all achievements from the configuration
    const flattened: AchievementDetails[] = [];
    Object.entries(config).forEach(([_, conditions]) => {
      conditions.forEach(condition => {
        flattened.push(condition.achievementDetails);
      });
    });
      
    // 2. Add `isUnlocked` and `progress` to each one
    const processed = flattened.map(ach => {
      const isUnlocked = unlockedAchievements.includes(ach.achievementId);
      let progress = 0;

      // Calculate progress for locked, numeric achievements
      if (!isUnlocked && typeof ach.targetValue === 'number' && ach.targetValue > 0) {
        const metricName = Object.keys(config).find(key => 
          config[key].some(c => c.achievementDetails.achievementId === ach.achievementId)
        );
        if (metricName && metrics[metricName]) {
          const metricValue = metrics[metricName];
          const currentValue = Array.isArray(metricValue) 
            ? Math.max(...metricValue.map(v => Number(v) || 0), 0)
            : Number(metricValue) || 0;
          progress = Math.min(100, Math.round((currentValue / ach.targetValue) * 100));
        }
      } else if (isUnlocked) {
        progress = 100;
      }
      
      return { ...ach, isUnlocked, progress };
    });

    // 3. Sort the list to show unlocked achievements first
    return processed.sort((a, b) => Number(b.isUnlocked) - Number(a.isUnlocked));
  }, [config, metrics, unlockedAchievements]);

  const unlockedCount = allAchievements.filter(a => a.isUnlocked).length;
  
  // Create position style for the fixed button
  const positionStyle: React.CSSProperties = {
    position: 'fixed',
    [buttonPosition.split('-')[0]]: '1rem',
    [buttonPosition.split('-')[1]]: '1rem',
    zIndex: 50,
  };

  // For SSR safety, check if we're in a browser environment
  if (typeof window === 'undefined') {
    return null;
  }
  
  // Define component types for UI elements with proper typing
  type DialogComponentsType = {
    Dialog: React.ElementType;
    DialogTrigger: React.ElementType;
    DialogContent: React.ElementType;
    DialogHeader: React.ElementType;
    DialogTitle: React.ElementType;
  };
  
  // Use typed placeholders for UI components
  let DialogComponents: DialogComponentsType = {
    Dialog: 'div',
    DialogTrigger: 'button', 
    DialogContent: 'div',
    DialogHeader: 'div',
    DialogTitle: 'h2'
  };
  let ButtonComponent: React.ElementType = 'button';
  let ScrollAreaComponent: React.ElementType = 'div';
  let ProgressComponent: React.ElementType = 'div';

  try {
    // We use require with a dynamic string to avoid bundling dependencies
    // This allows graceful fallbacks when dependencies aren't installed
    const dialog = require('@/components/ui/dialog');
    const button = require('@/components/ui/button');
    const scrollArea = require('@/components/ui/scroll-area');
    const progress = require('@/components/ui/progress');
    
    // Update components with Shadcn UI equivalents if found
    DialogComponents = {
      Dialog: dialog.Dialog,
      DialogTrigger: dialog.DialogTrigger,
      DialogContent: dialog.DialogContent,
      DialogHeader: dialog.DialogHeader,
      DialogTitle: dialog.DialogTitle
    };
    ButtonComponent = button.Button;
    ScrollAreaComponent = scrollArea.ScrollArea;
    ProgressComponent = progress.Progress;
  } catch (error) {
    console.error('Failed to import Shadcn UI components. Make sure you have installed them:', error);
    
    return (
      <div style={{ 
        border: '1px solid red', 
        padding: '16px', 
        borderRadius: '4px',
        color: 'red',
        marginBottom: '16px'
      }}>
        <h3>TrophyModal Error</h3>
        <p>Could not find Shadcn UI components. Please install them by running:</p>
        <pre>npx shadcn-ui@latest add dialog button scroll-area progress</pre>
      </div>
    );
  }

  // Defines the AchievementCard component to display individual achievements
  const AchievementCard = ({ achievement }: { achievement: AchievementWithProgress }) => {
    const { isUnlocked, progress, achievementIconKey } = achievement;
    
    // Get the appropriate icon emoji based on achievementIconKey or default
    const iconEmoji = achievementIconKey && ICON_MAP[achievementIconKey] ? ICON_MAP[achievementIconKey] : ICON_MAP.default;
    
    // Instead of using template literals which cause TypeScript errors,
    // use conditional classNames approach
    let cardClassName = `p-4 rounded-lg border transition-all duration-300 ${customCardClassName}`;
    if (isUnlocked) {
      // Green theme for unlocked achievements, can be overridden with custom classes
      cardClassName += ` border-green-500/50 bg-green-500/10 ${customUnlockedClassName}`;
    } else {
      cardClassName += " bg-secondary/20";
    }
    
    let badgeClassName = "px-2 py-0.5 text-xs font-semibold rounded-full";
    if (isUnlocked) {
      badgeClassName += " bg-green-600 text-white";
    } else {
      badgeClassName += " bg-gray-200 text-gray-700";
    }

    // Add CSS class for achievement icon styling
    let iconClassName = `mr-2 inline-flex items-center justify-center ${customIconClassName}`;
    if (achievementIconKey) {
      iconClassName += ` icon-${achievementIconKey}`;
    }
    
    return (
      <div className={cardClassName} data-icon-key={achievementIconKey || 'default'}>
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-lg flex items-center">
            <span className={iconClassName} role="img" aria-label={achievementIconKey || 'achievement icon'}>
              {iconEmoji}
            </span>
            {achievement.achievementTitle}
          </h3>
          <span className={badgeClassName}>
            {isUnlocked ? 'Unlocked! 🎉' : 'Locked'}
          </span>
        </div>
        
        <p className="text-sm text-muted-foreground mt-1">
          {achievement.achievementDescription}
        </p>
        
        {!isUnlocked && typeof achievement.targetValue === 'number' && (
          <div className="mt-3">
            <div className="flex justify-between text-xs text-muted-foreground mb-1">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <ProgressComponent value={progress} className="h-2" />
          </div>
        )}
      </div>
    );
  };

  // Construct button className safely to avoid template literals in JSX props
  let buttonClassName = "gap-2 bg-background/80 backdrop-blur-sm shadow-md hover:bg-primary/20";
  if (className) {
    buttonClassName += " " + className;
  }
  
  // Check if we have all required Dialog components
  if (!DialogComponents.Dialog || !DialogComponents.DialogTrigger || !DialogComponents.DialogContent) {
    return (
      <div style={{ 
        border: '1px solid red', 
        padding: '16px', 
        borderRadius: '4px',
        color: 'red',
        marginBottom: '16px'
      }}>
        <h3>TrophyModal Error</h3>
        <p>Could not find required UI components. Please install them by running:</p>
        <pre>npx shadcn-ui@latest add dialog button scroll-area progress</pre>
      </div>
    );
  }
  
  // Destructure components for easier use
  const { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } = DialogComponents;
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger ? (
          React.cloneElement(trigger as React.ReactElement, {
            onClick: (e: React.MouseEvent) => {
              e.preventDefault();
              setIsOpen(true);
            }
          })
        ) : (
          <ButtonComponent
            variant="outline"
            size="sm"
            className={buttonClassName}
            style={positionStyle}
          >
            <span className="h-4 w-4">🏆</span>
            Achievements ({unlockedCount})
          </ButtonComponent>
        )}
      </DialogTrigger>
      <DialogContent className={`sm:max-w-lg ${modalClassName}`}>
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <span className="h-6 w-6 text-yellow-500" role="img" aria-label="trophy">🏆</span>
            {modalTitle}
          </DialogTitle>
        </DialogHeader>

        <ScrollAreaComponent className="h-[60vh] pr-4">
          <div className="flex flex-col gap-4">
            {allAchievements.map(ach => (
              <AchievementCard key={ach.achievementId} achievement={ach} />
            ))}
          </div>
        </ScrollAreaComponent>
      </DialogContent>
    </Dialog>
  );
};

export default TrophyModal;
