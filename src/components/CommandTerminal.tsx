import { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Terminal, CheckCircle, XCircle } from '@phosphor-icons/react';
import { toast } from 'sonner';

interface CommandTerminalProps {
  expectedCommands: string[];
  onCommandSuccess: () => void;
  commandDescription: string;
  isSequence?: boolean;
}

export function CommandTerminal({ 
  expectedCommands, 
  onCommandSuccess, 
  commandDescription,
  isSequence = false 
}: CommandTerminalProps) {
  const [command, setCommand] = useState('');
  const [history, setHistory] = useState<{ command: string; success: boolean }[]>([]);
  const [currentSequenceIndex, setCurrentSequenceIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const validateCommand = (cmd: string): boolean => {
    const trimmedCmd = cmd.trim().toLowerCase();
    
    if (isSequence) {
      const expectedLower = expectedCommands[currentSequenceIndex].toLowerCase();
      
      if (expectedLower.includes('git commit -m')) {
        const commitPattern = /^git\s+commit\s+-m\s+["'].+["']$/i;
        return commitPattern.test(trimmedCmd);
      }
      
      return trimmedCmd === expectedLower;
    }
    
    return expectedCommands.some(expected => {
      const expectedLower = expected.toLowerCase();
      
      if (expectedLower.includes('git commit -m')) {
        const commitPattern = /^git\s+commit\s+-m\s+["'].+["']$/i;
        return commitPattern.test(trimmedCmd);
      }
      
      return trimmedCmd === expectedLower;
    });
  };

  const getHint = (): string => {
    const hints: { [key: string]: string } = {
      'git init': 'Try: git init',
      'git add': 'Remember to specify the filename, like: git add filename.ext',
      'git commit': 'Don\'t forget the message flag: git commit -m "your message"',
      'git status': 'Try: git status',
      'git log': 'Try: git log',
      'git branch': 'Try: git branch branch-name',
      'git checkout': 'Try: git checkout branch-name or git checkout -b new-branch',
      'git merge': 'Try: git merge branch-name',
      'git diff': 'Try: git diff',
      'git cat-file': 'Try: git cat-file -t or -p followed by object reference'
    };

    if (isSequence) {
      const expected = expectedCommands[currentSequenceIndex];
      return `Next command: ${expected}`;
    }

    for (const [key, hint] of Object.entries(hints)) {
      if (expectedCommands.some(cmd => cmd.includes(key))) {
        return hint;
      }
    }
    
    return 'Type a git command and press Enter';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!command.trim()) return;

    const isValid = validateCommand(command);
    
    setHistory(prev => [...prev, { command, success: isValid }]);

    if (isValid) {
      toast.success('Command executed successfully!', {
        description: command,
      });
      
      if (isSequence) {
        if (currentSequenceIndex < expectedCommands.length - 1) {
          setCurrentSequenceIndex(prev => prev + 1);
          setCommand('');
        } else {
          onCommandSuccess();
          setCommand('');
          setCurrentSequenceIndex(0);
        }
      } else {
        onCommandSuccess();
        setCommand('');
      }
    } else {
      toast.error('Invalid command', {
        description: 'Check your syntax and try again',
      });
    }
  };

  return (
    <div className="w-full space-y-4 bg-card p-4 pixel-border">
      <div className="flex items-center gap-2 mb-2">
        <Terminal size={20} className="text-primary" weight="duotone" />
        <span className="text-sm text-primary font-bold">TERMINAL</span>
      </div>

      <div className="text-sm text-muted-foreground mb-2">
        {commandDescription}
        {isSequence && ` (${currentSequenceIndex + 1}/${expectedCommands.length})`}
      </div>

      <div className="bg-background p-3 scanline min-h-[120px] max-h-[160px] overflow-y-auto font-mono text-sm">
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

      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="flex-1 relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-primary font-bold">$</span>
          <Input
            ref={inputRef}
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            placeholder={getHint()}
            className="font-mono pl-8 bg-background border-2 border-input focus:border-primary"
          />
        </div>
        <Button type="submit" className="pixel-shadow">
          Execute
        </Button>
      </form>

      {history.length > 0 && !history[history.length - 1].success && (
        <div className="text-xs text-accent bg-accent/10 p-2 border-l-2 border-accent">
          💡 Hint: {getHint()}
        </div>
      )}
    </div>
  );
}
