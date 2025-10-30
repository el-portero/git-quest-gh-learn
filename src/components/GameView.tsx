import { useState, useEffect } from 'react';
import { Level, Position, Enemy } from '@/lib/game-data';
import { GameCanvas } from './GameCanvas';
import { EnemyBattle } from './EnemyBattle';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Lightbulb, Trophy, ArrowsOutCardinal } from '@phosphor-icons/react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';

interface GameViewProps {
  level: Level;
  onComplete: () => void;
  onBack: () => void;
}

export function GameView({ level, onComplete, onBack }: GameViewProps) {
  const [playerPosition, setPlayerPosition] = useState<Position>(level.startPosition);
  const [objectives, setObjectives] = useState(level.objectives);
  const [showTutorial, setShowTutorial] = useState(true);
  const [showCompletion, setShowCompletion] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [currentEnemy, setCurrentEnemy] = useState<Enemy | null>(null);

  useEffect(() => {
    setPlayerPosition(level.startPosition);
    setObjectives(level.objectives.map(obj => ({ ...obj, completed: false })));
    setShowTutorial(true);
    setShowCompletion(false);
    setCurrentEnemy(null);
  }, [level]);

  useEffect(() => {
    const allCompleted = objectives.every(obj => obj.completed);
    if (allCompleted && objectives.length > 0) {
      setTimeout(() => {
        setShowCompletion(true);
      }, 500);
    }
  }, [objectives]);

  const handleObjectiveComplete = (index: number) => {
    setObjectives(prev => {
      const newObjectives = [...prev];
      if (!newObjectives[index].completed) {
        newObjectives[index].completed = true;
        toast.success('Objective Complete!', {
          description: newObjectives[index].description,
        });
      }
      return newObjectives;
    });
  };

  const handleCommandSuccess = (index: number) => {
    handleObjectiveComplete(index);
  };

  const handleEnemyEncounter = (enemy: Enemy) => {
    setCurrentEnemy(enemy);
  };

  const handleEnemyDefeat = () => {
    if (currentEnemy) {
      currentEnemy.defeated = true;
      
      const enemyObjective = objectives.find(obj => obj.type === 'defeat-enemy' && obj.enemyId === currentEnemy.id);
      if (enemyObjective) {
        const objIndex = objectives.indexOf(enemyObjective);
        if (objIndex !== -1) {
          handleObjectiveComplete(objIndex);
        }
      }
      
      setCurrentEnemy(null);
    }
  };

  const handleEnemyFlee = () => {
    setCurrentEnemy(null);
  };

  const completedCount = objectives.filter(obj => obj.completed).length;
  const progress = (completedCount / objectives.length) * 100;

  const movementObjectives = objectives.filter(obj => obj.type === 'reach');

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={onBack} className="pixel-shadow">
              <ArrowLeft size={20} />
              Back
            </Button>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl pixel-font text-primary">
                  Level {level.id}: {level.title}
                </h2>
                <Badge variant="secondary">{level.type}</Badge>
              </div>
              <p className="text-sm text-muted-foreground">{level.gitConcept}</p>
            </div>
          </div>
          
          <Button 
            variant="outline" 
            onClick={() => setShowHint(true)}
            className="pixel-shadow"
          >
            <Lightbulb size={20} weight="duotone" />
            Hint
          </Button>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Objectives: {completedCount} / {objectives.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="space-y-4">
            <GameCanvas
              level={level}
              onObjectiveComplete={handleObjectiveComplete}
              playerPosition={playerPosition}
              setPlayerPosition={setPlayerPosition}
              onEnemyEncounter={handleEnemyEncounter}
            />
            
            <div className="bg-card p-4 pixel-border space-y-2">
              <div className="flex items-center gap-2 text-secondary">
                <ArrowsOutCardinal size={20} weight="duotone" />
                <span className="text-sm font-bold">CONTROLS</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Use arrow keys (↑ ↓ ← →) to move your character around the map
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-card p-4 pixel-border space-y-3">
              <h3 className="text-sm font-bold text-primary">OBJECTIVES</h3>
              <div className="space-y-2">
                {objectives.map((obj, index) => (
                  <div 
                    key={index}
                    className={`flex items-start gap-2 p-2 border-l-2 ${
                      obj.completed 
                        ? 'border-primary bg-primary/10' 
                        : 'border-muted bg-background'
                    }`}
                  >
                    <span className="text-xl mt-0.5">
                      {obj.completed ? '✓' : obj.type === 'reach' ? '📍' : '⌨️'}
                    </span>
                    <div className="flex-1">
                      <p className={`text-sm ${obj.completed ? 'line-through text-muted-foreground' : ''}`}>
                        {obj.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {currentEnemy && (
        <EnemyBattle
          enemy={currentEnemy}
          onDefeat={handleEnemyDefeat}
          onClose={handleEnemyFlee}
        />
      )}

      <Dialog open={showTutorial} onOpenChange={setShowTutorial}>
        <DialogContent className="pixel-border max-w-2xl">
          <DialogHeader>
            <DialogTitle className="pixel-font text-2xl text-primary">
              Level {level.id}: {level.title}
            </DialogTitle>
            <DialogDescription className="text-base leading-relaxed pt-4">
              {level.tutorial}
            </DialogDescription>
          </DialogHeader>
          <div className="bg-accent/10 p-4 border-l-4 border-accent">
            <p className="text-sm font-bold text-accent mb-2">Learning Goal:</p>
            <p className="text-sm">{level.gitConcept}</p>
          </div>
          <Button onClick={() => setShowTutorial(false)} className="w-full pixel-shadow">
            Start Level
          </Button>
        </DialogContent>
      </Dialog>

      <Dialog open={showCompletion} onOpenChange={setShowCompletion}>
        <DialogContent className="pixel-border max-w-md text-center">
          <DialogHeader>
            <div className="flex justify-center mb-4">
              <Trophy size={64} weight="duotone" className="text-accent" />
            </div>
            <DialogTitle className="pixel-font text-2xl text-primary">
              Level Complete!
            </DialogTitle>
            <DialogDescription className="text-base pt-4">
              Great job! You've mastered {level.gitConcept}.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            <Button onClick={onComplete} className="w-full pixel-shadow">
              Continue
            </Button>
            <Button onClick={onBack} variant="outline" className="w-full">
              Level Select
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showHint} onOpenChange={setShowHint}>
        <DialogContent className="pixel-border">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-primary">
              <Lightbulb size={24} weight="duotone" />
              Hint
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm">{level.description}</p>
            
            {movementObjectives.length > 0 && (
              <div className="bg-secondary/10 p-3 border-l-2 border-secondary">
                <p className="text-sm font-bold mb-1">Movement Tip:</p>
                <p className="text-sm text-muted-foreground">
                  Navigate around obstacles to reach the glowing goal markers on the map.
                </p>
              </div>
            )}
            
            <div className="bg-primary/10 p-3 border-l-2 border-primary">
              <p className="text-sm font-bold mb-1">Battle Tip:</p>
              <p className="text-sm text-muted-foreground">
                When you encounter an enemy, use the correct Git commands to defeat them!
              </p>
            </div>
          </div>
          <Button onClick={() => setShowHint(false)} variant="outline" className="w-full">
            Close
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
