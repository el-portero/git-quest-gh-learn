import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Lock, CheckCircle, Play, Trash } from '@phosphor-icons/react';
import { LEVELS } from '@/lib/game-data';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface LevelSelectProps {
  completedLevels: number[];
  onSelectLevel: (levelId: number) => void;
  onStartGame: () => void;
  onResetProgress: () => void;
}

export function LevelSelect({ completedLevels, onSelectLevel, onStartGame, onResetProgress }: LevelSelectProps) {
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
            ⚔️ Battle code-corrupting monsters with the power of Git commands! 🗺️ Journey through 8 epic levels—from taming the Chaos Beast with your first repository to mastering the ancient Git Database. 💪 Each enemy defeated unlocks new version control powers. ✨ No prior Git experience required—just a hero's courage and a willingness to learn! 🎮
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

        {completedLevels.length > 0 && (
          <div className="text-center">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button 
                  variant="destructive"
                  size="sm"
                  className="pixel-shadow"
                >
                  <Trash size={16} weight="fill" />
                  Reset Progress
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="pixel-border">
                <AlertDialogHeader>
                  <AlertDialogTitle className="pixel-font text-lg leading-relaxed">
                    Reset All Progress?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    This will clear your progress for all levels. This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="pixel-shadow">Cancel</AlertDialogCancel>
                  <AlertDialogAction 
                    onClick={onResetProgress}
                    className="pixel-shadow bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    Reset Progress
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        )}
      </div>
    </div>
  );
}
