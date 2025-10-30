import { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Sword, CheckCircle, XCircle, Lightbulb } from '@phosphor-icons/react';
import { toast } from 'sonner';
import { Enemy } from '@/lib/game-data';
import { Badge } from '@/components/ui/badge';

interface EnemyBattleProps {
  enemy: Enemy;
  onDefeat: () => void;
  onClose: () => void;
}

export function EnemyBattle({ enemy, onDefeat, onClose }: EnemyBattleProps) {
  const [command, setCommand] = useState('');
  const [history, setHistory] = useState<{ command: string; success: boolean }[]>([]);
  const [currentHealth, setCurrentHealth] = useState(enemy.health);
  const [showHint, setShowHint] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const validateCommand = (cmd: string): boolean => {
    const trimmedCmd = cmd.trim().toLowerCase();
    
    return enemy.correctCommands.some(expected => {
      const expectedLower = expected.toLowerCase();
      
      if (expectedLower.includes('git commit -m')) {
        const commitPattern = /^git\s+commit\s+-m\s+["'].+["']$/i;
        return commitPattern.test(trimmedCmd);
      }
      
      return trimmedCmd === expectedLower;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!command.trim()) return;

    const isValid = validateCommand(command);
    
    setHistory(prev => [...prev, { command, success: isValid }]);

    if (isValid) {
      const newHealth = Math.max(0, currentHealth - 1);
      setCurrentHealth(newHealth);
      
      if (newHealth === 0) {
        toast.success('Enemy Defeated!', {
          description: `You defeated the ${enemy.name}!`,
        });
        setTimeout(() => {
          onDefeat();
        }, 800);
      } else {
        toast.success('Hit!', {
          description: 'Keep going!',
        });
      }
      setCommand('');
    } else {
      toast.error('Command Failed', {
        description: 'That command had no effect!',
      });
    }
  };

  const healthPercentage = (currentHealth / enemy.maxHealth) * 100;

  return (
    <div className="fixed inset-0 bg-background/95 z-50 flex items-center justify-center p-4">
      <div className="bg-card max-w-2xl w-full pixel-border p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Sword size={32} className="text-destructive" weight="duotone" />
            <div>
              <h2 className="text-2xl pixel-font text-destructive">{enemy.name}</h2>
              <Badge variant="secondary" className="mt-1">Enemy Encounter</Badge>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={onClose}>
            Flee
          </Button>
        </div>

        <div className="bg-accent/10 p-3 border-l-2 border-accent">
          <p className="text-sm">{enemy.description}</p>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-destructive font-bold">Enemy Health</span>
            <span>{currentHealth} / {enemy.maxHealth}</span>
          </div>
          <Progress value={healthPercentage} className="h-3" />
        </div>

        <div className="bg-background p-4 scanline min-h-[140px] max-h-[180px] overflow-y-auto font-mono text-sm">
          <div className="text-muted-foreground mb-2">Battle Log:</div>
          {history.length === 0 && (
            <div className="text-muted-foreground italic">Issue a Git command to attack...</div>
          )}
          {history.map((entry, idx) => (
            <div key={idx} className="flex items-start gap-2 mb-1">
              {entry.success ? (
                <CheckCircle size={16} className="text-primary mt-0.5 flex-shrink-0" weight="fill" />
              ) : (
                <XCircle size={16} className="text-destructive mt-0.5 flex-shrink-0" weight="fill" />
              )}
              <span className={entry.success ? 'text-primary' : 'text-destructive'}>
                $ {entry.command}
              </span>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-primary font-bold">$</span>
              <Input
                ref={inputRef}
                value={command}
                onChange={(e) => setCommand(e.target.value)}
                placeholder="Enter a Git command to attack..."
                className="font-mono pl-8 bg-background border-2 border-input focus:border-primary"
              />
            </div>
            <Button type="submit" className="pixel-shadow">
              <Sword size={20} weight="bold" />
              Attack
            </Button>
          </div>
          
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setShowHint(!showHint)}
            className="w-full"
          >
            <Lightbulb size={16} weight="duotone" />
            {showHint ? 'Hide Hint' : 'Show Hint'}
          </Button>

          {showHint && (
            <div className="text-xs text-accent bg-accent/10 p-3 border-l-2 border-accent">
              💡 Hint: {enemy.hint}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
