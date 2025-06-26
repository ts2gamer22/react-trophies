import { TrophyCard, TrophyGrid, TrophyShowcase, TrophyStats } from 'react-trophies';
import { useAchievement } from 'react-trophies';
import styles from '../styles/Home.module.css';

// Example achievements for demo purposes
const demoAchievements = [
  {
    achievementId: 'welcome',
    achievementTitle: 'Welcome!',
    achievementDescription: 'Visit the homepage for the first time',
    achievementIconKey: 'trophy',
    isUnlocked: true,
    achievementDate: new Date()
  },
  {
    achievementId: 'explorer',
    achievementTitle: 'Explorer',
    achievementDescription: 'View all sections of the website',
    achievementIconKey: 'explorer',
    isUnlocked: false,
    achievementDate: null
  },
  {
    achievementId: 'collector',
    achievementTitle: 'Collector',
    achievementDescription: 'Save 10 items to your collection',
    achievementIconKey: 'growth',
    isUnlocked: true,
    achievementDate: new Date(Date.now() - 86400000) // 1 day ago
  },
  {
    achievementId: 'social',
    achievementTitle: 'Social Butterfly',
    achievementDescription: 'Share content with friends',
    achievementIconKey: 'shared',
    isUnlocked: false,
    achievementDate: null
  }
];

export default function Home() {
  const { updateMetrics } = useAchievement();

  const unlockRandomAchievement = () => {
    // This would typically be triggered by a specific user action
    // Here we're simulating with a button click
    const metrics = ['score', 'visits', 'shares', 'likes'];
    const randomMetric = metrics[Math.floor(Math.random() * metrics.length)];
    const randomValue = Math.floor(Math.random() * 100) + 1;
    
    console.log(`Updating metric: ${randomMetric} with value: ${randomValue}`);
    updateMetrics({ [randomMetric]: [randomValue] });
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          React-Trophies Next.js Demo
        </h1>

        <p className={styles.description}>
          A showcase of trophy components available in the react-trophies package
        </p>

        <button 
          onClick={unlockRandomAchievement}
          className={styles.button}
        >
          Trigger Random Achievement
        </button>

        <div className={styles.grid}>
          <div className={styles.card}>
            <h2>Trophy Showcase</h2>
            <TrophyShowcase
              achievements={demoAchievements}
              maxDisplay={3}
              showLabels={true}
            />
          </div>

          <div className={styles.card}>
            <h2>Trophy Stats</h2>
            <TrophyStats
              achievements={demoAchievements}
              showTotal={true}
              showUnlocked={true}
              showPercentage={true}
              showProgressBar={true}
            />
          </div>

          <div className={styles.card} style={{ gridColumn: "span 2" }}>
            <h2>Trophy Grid</h2>
            <TrophyGrid
              achievements={demoAchievements}
              columns="auto-fill"
              minColumnWidth={200}
              showDescriptions={true}
              showDates={true}
            />
          </div>

          <div className={styles.card}>
            <h2>Individual Trophy Card</h2>
            <TrophyCard
              achievement={demoAchievements[0]}
              showDescription={true}
              showDate={true}
            />
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <p>
          Examples of react-trophies components
        </p>
      </footer>
    </div>
  );
}
