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
    if (currentLevel && !(completedLevels || []).includes(currentLevel.id)) {
      setCompletedLevels(prev => [...(prev || []), currentLevel.id]);
    }

    const nextLevel = LEVELS.find(level => level.id === currentLevelId + 1);
    if (nextLevel) {
      setCurrentLevelId(nextLevel.id);
    } else {
      setGameState('menu');
    }
  };

  const handleBackToMenu = () => {
    setGameState('menu');
  };

  return (
    <>
      {gameState === 'menu' && (
        <LevelSelect
          completedLevels={completedLevels || []}
          onSelectLevel={handleSelectLevel}
          onStartGame={handleStartGame}
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