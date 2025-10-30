import { useState } from 'react';
import { useKV } from '@github/spark/hooks';
import { Toaster } from '@/components/ui/sonner';
import { LevelSelect } from '@/components/LevelSelect';
import { GameView } from '@/components/GameView';
import { LEVELS } from '@/lib/game-data';

type GameState = 'menu' | 'playing';

function App() {
  const [gameState, setGameState] = useState<GameState>('menu');
  const [currentLevelId, setCurrentLevelId] = useState(1);
  const [completedLevels, setCompletedLevels] = useKV<number[]>('completed-levels', []);

  const currentLevel = LEVELS.find(level => level.id === currentLevelId);

  const handleStartGame = () => {
    setCurrentLevelId(1);
    setGameState('playing');
  };

  const handleSelectLevel = (levelId: number) => {
    setCurrentLevelId(levelId);
    setGameState('playing');
  };

  const handleLevelComplete = () => {
    if (!currentLevel) return;

    const updatedCompletedLevels = (completedLevels || []).includes(currentLevel.id)
      ? completedLevels || []
      : [...(completedLevels || []), currentLevel.id];

    if (!(completedLevels || []).includes(currentLevel.id)) {
      setCompletedLevels(updatedCompletedLevels);
    }

    if (currentLevel.id === 4 || currentLevel.id === 5) {
      const otherBranchLevel = currentLevel.id === 4 ? 5 : 4;
      const isOtherBranchComplete = updatedCompletedLevels.includes(otherBranchLevel);
      
      if (isOtherBranchComplete) {
        setCurrentLevelId(6);
      } else {
        setCurrentLevelId(otherBranchLevel);
      }
    } else {
      const nextLevel = LEVELS.find(level => level.id === currentLevelId + 1);
      if (nextLevel) {
        setCurrentLevelId(nextLevel.id);
      } else {
        setGameState('menu');
      }
    }
  };

  const handleBackToMenu = () => {
    setGameState('menu');
  };

  const handleResetProgress = () => {
    setCompletedLevels([]);
  };

  return (
    <>
      {gameState === 'menu' && (
        <LevelSelect
          completedLevels={completedLevels || []}
          onSelectLevel={handleSelectLevel}
          onStartGame={handleStartGame}
          onResetProgress={handleResetProgress}
        />
      )}

      {gameState === 'playing' && currentLevel && (
        <GameView
          level={currentLevel}
          onComplete={handleLevelComplete}
          onBack={handleBackToMenu}
        />
      )}

      <Toaster position="top-right" />
    </>
  );
}

export default App;