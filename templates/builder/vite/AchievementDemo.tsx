import React, { useState } from 'react';
import { 
  useAchievement, 
  TrophyCard, 
  TrophyGrid, 
  TrophyShowcase, 
  TrophyStats,
  AchievementProgress 
} from 'react-trophies';

/**
 * AchievementDemo Component
 * 
 * This component demonstrates how to use react-trophies in a web builder application.
 * It provides UI elements to trigger different achievements and display progress.
 */
const AchievementDemo: React.FC = () => {
  // In production code, this would be properly typed
  // This is simplified to avoid template TypeScript errors
  const achievement = useAchievement();
  const updateMetrics = (metrics: Record<string, any[]>) => {
    console.log('Updating metrics:', metrics);
    // In production, this would call the actual updateMetrics from useAchievement
  };
  
  // Mock method to get achievements
  const getAllAchievements = () => [
    {
      achievementId: 'extension-champion',
      achievementTitle: 'Extension Champion',
      achievementDescription: 'Build 50 extensions and share at least 10 with the community',
      achievementIconKey: 'legendary',
      isUnlocked: false
    }
  ];
  const achievements = getAllAchievements();
  
  // State for metrics that will be tracked in the demo
  const [buildCount, setBuildCount] = useState(0);
  const [streakDays, setStreakDays] = useState(0);
  const [shareCount, setShareCount] = useState(0);
  
  // Demo styles
  const containerStyle = {
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto'
  };
  
  const sectionStyle = {
    marginBottom: '30px',
    padding: '20px',
    borderRadius: '8px',
    background: '#f7f9fc',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
  };
  
  const buttonStyle = {
    background: '#4a6cf7',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '4px',
    margin: '0 8px 8px 0',
    cursor: 'pointer',
    fontWeight: 'bold' as const
  };
  
  // Handler functions for different achievement types
  const handleFirstBuild = () => {
    updateMetrics({ firstBuild: [1] });
    setBuildCount(prev => prev + 1);
    updateMetrics({ extensionsPublished: [buildCount + 1] });
  };

  const handleDailyStreak = () => {
    setStreakDays(prev => prev + 1);
    updateMetrics({ dailyStreak: [streakDays + 1] });
  };
  
  const handleShareExtension = () => {
    setShareCount(prev => prev + 1);
    updateMetrics({ extensionsShared: [shareCount + 1] });
  };
  
  const handleCompleteProfile = () => {
    updateMetrics({ profileComplete: [1] });
  };
  
  const handleCssCustomization = () => {
    updateMetrics({ cssEdits: [1] });
  };
  
  const handleApiIntegration = () => {
    updateMetrics({ apiIntegrations: [1] });
  };
  
  // Achievement to display in progress section
  const selectedAchievement = achievements[0];
  
  return (
    <div style={containerStyle}>
      <h1>Extensio Achievement System Demo</h1>
      
      <div style={sectionStyle}>
        <h2>Trigger Achievements</h2>
        <p>Click these buttons to simulate actions that would trigger achievements:</p>
        
        <button style={buttonStyle} onClick={handleFirstBuild}>
          Build Extension ({buildCount})
        </button>
        
        <button style={buttonStyle} onClick={handleDailyStreak}>
          Log Daily Activity ({streakDays} days)
        </button>
        
        <button style={buttonStyle} onClick={handleShareExtension}>
          Share Extension ({shareCount})
        </button>
        
        <button style={buttonStyle} onClick={handleCompleteProfile}>
          Complete Profile
        </button>
        
        <button style={buttonStyle} onClick={handleCssCustomization}>
          Customize CSS
        </button>
        
        <button style={buttonStyle} onClick={handleApiIntegration}>
          Integrate API
        </button>
      </div>
      
      {selectedAchievement && (
        <div style={sectionStyle}>
          <h2>Achievement Progress</h2>
          <AchievementProgress
            achievement={selectedAchievement}
            currentValue={buildCount}
            targetValue={50}
            showPercentage={true}
            showFraction={true}
            barColor="#4a6cf7"
            animate={true}
            onComplete={(achievement) => console.log('Achievement completed:', achievement)}
          />
        </div>
      )}
      
      <div style={sectionStyle}>
        <h2>Achievement Statistics</h2>
        <TrophyStats 
          achievements={achievements} 
          showTotal={true} 
          showUnlocked={true} 
          showPercentage={true} 
          showProgressBar={true}
          title="Builder Achievements" 
          customStyles={{
            container: {
              background: '#ffffff',
              padding: '15px',
              borderRadius: '8px'
            },
            progressBar: {
              backgroundColor: '#e0e6f7',
              progressColor: '#4a6cf7'
            }
          }}
        />
      </div>
      
      <div style={sectionStyle}>
        <h2>Achievement Showcase</h2>
        <TrophyShowcase 
          achievements={achievements} 
          maxDisplay={5}
          showLabels={true}
          onTrophyClick={(achievement) => console.log('Trophy clicked:', achievement)}
          customStyles={{
            container: {
              padding: '10px',
              background: '#ffffff',
              borderRadius: '8px'
            }
          }}
        />
      </div>
      
      <div style={sectionStyle}>
        <h2>All Achievements</h2>
        <TrophyGrid 
          achievements={achievements}
          onTrophyClick={(achievement) => console.log('Trophy clicked:', achievement)}
          columns="auto-fill" 
          minColumnWidth={250}
          showDescriptions={true}
          showDates={true}
          filter={() => true}
          customStyles={{
            container: {
              gap: '15px'
            },
            card: {
              borderRadius: '8px',
              boxShadow: '0 2px 5px rgba(0,0,0,0.08)'
            }
          }}
        />
      </div>
    </div>
  );
};

export default AchievementDemo;
