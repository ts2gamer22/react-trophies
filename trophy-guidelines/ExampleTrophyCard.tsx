import React from 'react';
// Import directly from the package
import { TrophyCard, AchievementDetails } from 'react-trophies';

/**
 * Example of using the TrophyCard component
 * 
 * This is a demonstration file showing how to use the TrophyCard component
 * from the react-trophies package. The actual implementation is in the
 * published library.
 */
function ExampleTrophyCardUsage(): JSX.Element {
  // Example achievement object
  const achievement: AchievementDetails = {
    achievementId: 'high-score',
    achievementTitle: 'High Score Master',
    achievementDescription: 'Score 1000+ points in a single game',
    achievementIconKey: 'trophy',  
    isUnlocked: true,
    achievementDate: new Date()
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px' }}>
      <h2>Basic Trophy Card Example</h2>
      
      {/* Basic usage */}
      {/* Using TrophyCard with React 18 compatible props */}
        <TrophyCard 
        achievement={achievement}
        showDescription={true}
        showDate={true}
      />
      
      <h2>Styled Trophy Card Example</h2>
      
      {/* With custom styling */}
      {/* Using TrophyCard with React 18 compatible props */}
        <TrophyCard 
        achievement={achievement}
        showDescription={true}
        style={{
          border: '2px solid gold',
          borderRadius: '8px',
          backgroundColor: '#1a1a1a',
          color: 'white',
          padding: '16px'
        }}
        onClick={(achievement) => console.log(`Clicked: ${achievement.achievementId}`)}
      />
    </div>
  );
};

export default ExampleTrophyCardUsage;
