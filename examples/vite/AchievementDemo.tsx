/**
 * Example component demonstrating achievement usage with TypeScript
 * 
 * This component shows various ways to use the react-trophies
 * components and hooks in a Vite + React + TypeScript application.
 */
import React, { useState, useEffect } from 'react';
import { 
  useAchievement, 
  TrophyCard, 
  TrophyGrid, 
  TrophyStats, 
  TrophyShowcase,
  AchievementDetails
} from 'react-trophies';

/**
 * Demo component that showcases all the trophy components
 * and demonstrates how to trigger achievements.
 */
export function AchievementDemo(): JSX.Element {
  // Get the achievement hook functions
  const { updateMetrics, unlockedAchievements } = useAchievement();
  
  // Track user score for demonstration
  const [score, setScore] = useState(0);
  // Track page visits for demonstration
  const [visits, setVisits] = useState(0);
  // Track time spent for demonstration
  const [timeSpent, setTimeSpent] = useState(0);
  // Keep achievements in state for rendering
  const [achievements, setAchievements] = useState<AchievementDetails[]>([]);

  // Example of how to get achievements from the achievement store
  useEffect(() => {
    // Get achievements from the store or your config
    // This is a simplified example - you'd normally get these from your achievement store
    import('./config').then(module => {
      const allAchievements = module.getAllAchievements();
      setAchievements(allAchievements);
    });
    
    // Set up a timer to track "time spent" for demonstration
    const timer = setInterval(() => {
      setTimeSpent(prev => {
        const newTime = prev + 1;
        // Update the time spent metric every minute
        if (newTime % 60 === 0) {
          updateMetrics({ timeSpent: [newTime / 60] });
        }
        return newTime;
      });
    }, 1000); // every second
    
    return () => clearInterval(timer);
  }, [updateMetrics]);
  
  // Handler for incrementing score
  const handleScoreIncrement = () => {
    const newScore = score + 25;
    setScore(newScore);
    
    // Update the achievement metrics
    updateMetrics({ score: [newScore] });
  };
  
  // Handler for incrementing page visits
  const handlePageVisit = () => {
    const newVisits = visits + 1;
    setVisits(newVisits);
    
    // Update the achievement metrics
    updateMetrics({ pageVisits: [newVisits] });
  };
  
  // Enable dark mode achievement
  const enableDarkMode = () => {
    updateMetrics({ features: [['darkMode']] });
  };
  
  return (
    <div className="achievement-demo" style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1>Achievement Demo</h1>
      <p>This demo shows how to use react-trophies in a Vite + React + TypeScript application.</p>
      
      {/* Stats component shows overall achievement progress */}
      <section className="stats-section" style={{ marginBottom: '30px' }}>
        <h2>Your Trophy Progress</h2>
        {/* Using TrophyStats with React 18 compatible props */}
        <TrophyStats 
          achievements={achievements}
          showTotal={true}
          showUnlocked={true}
          showPercentage={true}
          showProgressBar={true}
          title="Achievement Progress"
          style={{ 
            background: '#f5f5f5', 
            padding: '20px', 
            borderRadius: '8px'
          }}
          progressBarStyle={{
            height: '12px',
            borderRadius: '6px'
          }}
        />
      </section>
      
      {/* Actions section to trigger achievements */}
      <section className="actions-section" style={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        gap: '10px',
        marginBottom: '30px'
      }}>
        <div>
          <h2>Trigger Achievements</h2>
          <p>Current Score: {score}</p>
          <p>Page Visits: {visits}</p>
          <p>Time Spent: {Math.floor(timeSpent / 60)} minutes {timeSpent % 60} seconds</p>
        </div>
        
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button
            onClick={handleScoreIncrement}
            style={{
              background: '#4a90e2',
              color: 'white',
              border: 'none',
              padding: '10px 15px',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Add 25 Points
          </button>
          
          <button
            onClick={handlePageVisit}
            style={{
              background: '#50c878',
              color: 'white',
              border: 'none',
              padding: '10px 15px',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Simulate Page Visit
          </button>
          
          <button
            onClick={enableDarkMode}
            style={{
              background: '#333',
              color: 'white',
              border: 'none',
              padding: '10px 15px',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Enable Dark Mode
          </button>
        </div>
      </section>
      
      {/* Showcase component displays a horizontal list of achievements */}
      <section className="showcase-section" style={{ marginBottom: '30px' }}>
        <h2>Recently Unlocked</h2>
        {/* Using TrophyShowcase with React 18 compatible props */}
        <TrophyShowcase           achievements={achievements.filter(a => a.isUnlocked === true)}
          maxDisplay={3}
          showLabels={true}
          trophySize="medium"
        />
      </section>
      
      {/* Grid component displays all achievements in a responsive grid */}
      <section className="grid-section">
        <h2>All Achievements</h2>
        {/* Using TrophyGrid with React 18 compatible props */}
        <TrophyGrid 
          achievements={achievements}
          columns="auto-fill"
          minColumnWidth={250}
          showDescriptions={true}
          showDates={true}
          onTrophyClick={(achievement) => {
            console.log('Clicked trophy:', achievement.achievementTitle);
            // You could show more details, open a modal, etc.
          }}
        />
      </section>
    </div>
  );
}
