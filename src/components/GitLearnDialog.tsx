import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { BookOpen, CheckCircle } from '@phosphor-icons/react';

interface GitLearnDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  concept: string;
  content: string;
  examples?: string[];
}

export function GitLearnDialog({ open, onClose, title, concept, content, examples }: GitLearnDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="pixel-border max-w-2xl">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <BookOpen size={32} weight="duotone" className="text-primary" />
            <DialogTitle className="pixel-font text-xl text-primary">
              {title}
            </DialogTitle>
          </div>
          <DialogDescription className="text-base leading-relaxed pt-2">
            <span className="font-bold text-accent">{concept}</span>
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="bg-card p-4 border-l-4 border-primary">
            <p className="text-sm leading-relaxed whitespace-pre-line">
              {content}
            </p>
          </div>

          {examples && examples.length > 0 && (
            <div className="bg-muted/50 p-4 space-y-2">
              <p className="text-sm font-bold text-primary">Examples:</p>
              {examples.map((example, index) => (
                <div key={index} className="bg-background p-2 font-mono text-xs border-l-2 border-accent">
                  {example}
                </div>
              ))}
            </div>
          )}

          <div className="flex items-start gap-2 bg-accent/10 p-3 border-l-2 border-accent">
            <CheckCircle size={20} weight="duotone" className="text-accent mt-0.5 flex-shrink-0" />
            <p className="text-xs text-muted-foreground">
              You've now learned about {concept}. Continue exploring to master Git!
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button onClick={onClose} className="w-full pixel-shadow">
            Continue Adventure
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
