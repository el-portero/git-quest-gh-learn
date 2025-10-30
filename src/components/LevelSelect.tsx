import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Lock, CheckCircle, Play } from '@phosphor-icons/react';
import { LEVELS } from '@/lib/game-data';

interface LevelSelectProps {
  completedLevels: number[];
  onSelectLevel: (levelId: number) => void;
  onStartGame: () => void;
}

export function LevelSelect({ completedLevels, onSelectLevel, onStartGame }: LevelSelectProps) {
  const isLevelUnlocked = (levelId: number) => {
    if (levelId === 1) return true;
    return completedLevels.includes(levelId - 1);
  };

  const isLevelCompleted = (levelId: number) => {
    return completedLevels.includes(levelId);
  };

  const progress = (completedLevels.length / LEVELS.length) * 100;

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-8">
      <div className="max-w-5xl w-full space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl text-primary pixel-font leading-relaxed">
            GitQuest
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Master Git through an 8-bit adventure. Complete levels to unlock new concepts!
          </p>
          
          <div className="max-w-md mx-auto space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Progress</span>
              <span>{completedLevels.length} / {LEVELS.length}</span>
            </div>
            <div className="h-3 bg-card pixel-border overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {LEVELS.map((level) => {
            const unlocked = isLevelUnlocked(level.id);
            const completed = isLevelCompleted(level.id);

            return (
              <Card
                key={level.id}
                className={`p-4 space-y-3 transition-all cursor-pointer hover:scale-105 pixel-shadow ${
                  !unlocked ? 'opacity-50 grayscale' : ''
                } ${completed ? 'border-primary border-2' : ''}`}
                onClick={() => unlocked && onSelectLevel(level.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl pixel-font text-primary">
                      {level.id}
                    </span>
                    {completed && (
                      <CheckCircle size={20} weight="fill" className="text-primary" />
                    )}
                    {!unlocked && (
                      <Lock size={20} weight="fill" className="text-muted-foreground" />
                    )}
                  </div>
                  <Badge variant={completed ? 'default' : 'secondary'} className="text-xs">
                    {level.type}
                  </Badge>
                </div>

                <div className="space-y-1">
                  <h3 className="font-bold text-sm pixel-font leading-relaxed">
                    {level.title}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {level.description}
                  </p>
                </div>

                <div className="text-xs text-accent">
                  {level.gitConcept}
                </div>

                {unlocked && (
                  <Button 
                    size="sm" 
                    className="w-full pixel-shadow"
                    variant={completed ? 'secondary' : 'default'}
                  >
                    <Play size={16} weight="fill" />
                    {completed ? 'Replay' : 'Start'}
                  </Button>
                )}
              </Card>
            );
          })}
        </div>

        <div className="text-center">
          <Button 
            size="lg" 
            onClick={onStartGame}
            className="pixel-shadow text-lg pixel-font"
          >
            <Play size={24} weight="fill" />
            Start Adventure
          </Button>
        </div>
      </div>
    </div>
  );
}
