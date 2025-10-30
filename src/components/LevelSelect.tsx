import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Lock, CheckCircle, Play, Trash, GitBranch, MagnifyingGlassMinus, MagnifyingGlassPlus, ArrowsOut } from '@phosphor-icons/react';
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface LevelSelectProps {
  completedLevels: number[];
  onSelectLevel: (levelId: number) => void;
  onStartGame: () => void;
  onResetProgress: () => void;
}

export function LevelSelect({ completedLevels, onSelectLevel, onStartGame, onResetProgress }: LevelSelectProps) {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const isLevelUnlocked = (levelId: number) => {
    const level = LEVELS.find(l => l.id === levelId);
    if (!level || !level.branchInfo) return false;
    
    if (!level.branchInfo.prerequisite || level.branchInfo.prerequisite.length === 0) return true;
    
    return level.branchInfo.prerequisite.every(prereqId => 
      completedLevels.includes(prereqId)
    );
  };

  const isLevelCompleted = (levelId: number) => {
    return completedLevels.includes(levelId);
  };

  const progress = (completedLevels.length / LEVELS.length) * 100;

  const getBranchColor = (branch: 'main' | 'feature' | 'experimental') => {
    switch (branch) {
      case 'main': return 'text-primary';
      case 'feature': return 'text-secondary';
      case 'experimental': return 'text-accent';
    }
  };

  const getBranchBgColor = (branch: 'main' | 'feature' | 'experimental') => {
    switch (branch) {
      case 'main': return 'bg-primary';
      case 'feature': return 'bg-secondary';
      case 'experimental': return 'bg-accent';
    }
  };

  const mainBranch = LEVELS.filter(l => l.branchInfo?.branch === 'main');
  const featureBranch = LEVELS.filter(l => l.branchInfo?.branch === 'feature');
  const experimentalBranch = LEVELS.filter(l => l.branchInfo?.branch === 'experimental');

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    setZoom(prev => Math.min(Math.max(prev * delta, 0.5), 3));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button')) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev * 1.2, 3));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev / 1.2, 0.5));
  };

  const handleResetView = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false);
    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => window.removeEventListener('mouseup', handleGlobalMouseUp);
  }, []);

  const renderLevelNode = (level: typeof LEVELS[0] | undefined, isCompact = false) => {
    if (!level) return null;
    
    const unlocked = isLevelUnlocked(level.id);
    const completed = isLevelCompleted(level.id);
    const branch = level.branchInfo?.branch || 'main';

    return (
      <Tooltip key={level.id}>
        <TooltipTrigger asChild>
          <button
            onClick={() => unlocked && onSelectLevel(level.id)}
            disabled={!unlocked}
            className={`
              relative group
              ${isCompact ? 'w-16 h-16' : 'w-20 h-20'}
              flex items-center justify-center
              pixel-border
              transition-all duration-200
              ${unlocked ? 'cursor-pointer hover:scale-110 hover:z-10' : 'opacity-50 cursor-not-allowed'}
              ${completed ? getBranchBgColor(branch) : 'bg-card'}
              ${completed ? 'border-4' : 'border-2'}
              pixel-shadow
            `}
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className={`text-lg pixel-font ${completed ? 'text-primary-foreground' : getBranchColor(branch)}`}>
                {level.id}
              </div>
              {completed && (
                <CheckCircle size={16} weight="fill" className="text-primary-foreground mt-1" />
              )}
              {!unlocked && (
                <Lock size={16} weight="fill" className="text-muted-foreground mt-1" />
              )}
            </div>
          </button>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="max-w-xs pixel-border">
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-bold text-sm pixel-font leading-relaxed">
                {level.title}
              </h3>
              <Badge variant="secondary" className="text-xs">
                {branch}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              {level.description}
            </p>
            <div className="text-xs text-accent">
              {level.gitConcept}
            </div>
            {unlocked && (
              <Button 
                size="sm" 
                className="w-full pixel-shadow mt-2"
                variant={completed ? 'secondary' : 'default'}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectLevel(level.id);
                }}
              >
                <Play size={14} weight="fill" />
                {completed ? 'Replay' : 'Start'}
              </Button>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    );
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-7xl space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-3xl md:text-5xl text-primary pixel-font leading-relaxed">
            GitQuest
          </h1>
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto px-4">
            ⚔️ Battle code-corrupting monsters with the power of Git commands! 🗺️ Journey through 8 epic levels—from taming the Chaos Beast with your first repository to mastering the ancient Git Database. 💪 Each enemy defeated unlocks new version control powers. ✨ No prior Git experience required—just a hero's courage and a willingness to learn! 🎮
          </p>
          
          <div className="max-w-md mx-auto space-y-2 px-4">
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

        <div className="relative bg-card pixel-border overflow-hidden" style={{ height: '400px' }}>
          <div
            ref={containerRef}
            className={`w-full h-full overflow-hidden ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <div
              className="relative transition-transform duration-100"
              style={{
                transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                transformOrigin: 'center center',
              }}
            >
              <svg className="w-full" viewBox="0 0 1200 400" preserveAspectRatio="xMidYMid meet">
                <line x1="100" y1="200" x2="200" y2="200" stroke="var(--primary)" strokeWidth="4" />
                <line x1="200" y1="200" x2="300" y2="200" stroke="var(--primary)" strokeWidth="4" />
                <line x1="300" y1="200" x2="400" y2="200" stroke="var(--primary)" strokeWidth="4" />
                
                <line x1="400" y1="200" x2="550" y2="100" stroke="var(--secondary)" strokeWidth="4" />
                <line x1="400" y1="200" x2="550" y2="300" stroke="var(--accent)" strokeWidth="4" />
                
                <line x1="550" y1="100" x2="700" y2="100" stroke="var(--secondary)" strokeWidth="4" />
                <line x1="550" y1="300" x2="700" y2="300" stroke="var(--accent)" strokeWidth="4" />
                
                <line x1="700" y1="100" x2="825" y2="175" stroke="var(--secondary)" strokeWidth="4" />
                <line x1="700" y1="300" x2="825" y2="225" stroke="var(--accent)" strokeWidth="4" />
                
                <line x1="825" y1="200" x2="925" y2="200" stroke="var(--primary)" strokeWidth="4" />
                <circle cx="825" cy="200" r="8" fill="var(--primary)" stroke="var(--background)" strokeWidth="2" />
                
                <line x1="925" y1="200" x2="1025" y2="200" stroke="var(--primary)" strokeWidth="4" />
                
                <line x1="1025" y1="200" x2="1125" y2="200" stroke="var(--primary)" strokeWidth="4" />
                
                <g transform="translate(100, 200)">
                  <foreignObject x="-40" y="-40" width="80" height="80">
                    <div className="flex items-center justify-center w-full h-full">
                      {renderLevelNode(mainBranch[0])}
                    </div>
                  </foreignObject>
                </g>
                
                <g transform="translate(200, 200)">
                  <foreignObject x="-40" y="-40" width="80" height="80">
                    <div className="flex items-center justify-center w-full h-full">
                      {renderLevelNode(mainBranch[1])}
                    </div>
                  </foreignObject>
                </g>
                
                <g transform="translate(300, 200)">
                  <foreignObject x="-40" y="-40" width="80" height="80">
                    <div className="flex items-center justify-center w-full h-full">
                      {renderLevelNode(mainBranch[2])}
                    </div>
                  </foreignObject>
                </g>
                
                <g transform="translate(400, 200)">
                  <text x="0" y="35" textAnchor="middle" fill="var(--primary)" fontSize="10" fontFamily="Press Start 2P">split</text>
                </g>
                
                <g transform="translate(550, 100)">
                  <foreignObject x="-40" y="-40" width="80" height="80">
                    <div className="flex items-center justify-center w-full h-full">
                      {renderLevelNode(featureBranch[0])}
                    </div>
                  </foreignObject>
                </g>
                
                <g transform="translate(550, 300)">
                  <foreignObject x="-40" y="-40" width="80" height="80">
                    <div className="flex items-center justify-center w-full h-full">
                      {renderLevelNode(experimentalBranch[0])}
                    </div>
                  </foreignObject>
                </g>
                
                <g transform="translate(700, 100)">
                  <foreignObject x="-40" y="-40" width="80" height="80">
                    <div className="flex items-center justify-center w-full h-full">
                      {renderLevelNode(featureBranch[1])}
                    </div>
                  </foreignObject>
                </g>
                
                <g transform="translate(700, 300)">
                  <foreignObject x="-40" y="-40" width="80" height="80">
                    <div className="flex items-center justify-center w-full h-full">
                      {renderLevelNode(experimentalBranch[1])}
                    </div>
                  </foreignObject>
                </g>
                
                <g transform="translate(825, 200)">
                  <text x="0" y="-25" textAnchor="middle" fill="var(--primary)" fontSize="9" fontFamily="Press Start 2P">merge</text>
                </g>
                
                <g transform="translate(925, 200)">
                  <foreignObject x="-40" y="-40" width="80" height="80">
                    <div className="flex items-center justify-center w-full h-full">
                      {renderLevelNode(mainBranch[3])}
                    </div>
                  </foreignObject>
                </g>
                
                <g transform="translate(1025, 200)">
                  <foreignObject x="-40" y="-40" width="80" height="80">
                    <div className="flex items-center justify-center w-full h-full">
                      {renderLevelNode(mainBranch[4])}
                    </div>
                  </foreignObject>
                
                <g transform="translate(1125, 200)">
                <g transform="translate(1125, 200)">
                    <div className="flex items-center justify-center w-full h-full">
                      {renderLevelNode(mainBranch[5])}
                    </div>
                  </foreignObject>
                </g>
              </svg>
            </div>
          </div>
          <div className="absolute top-4 right-4 flex flex-col gap-2">
            <Button
              size="icon"
              variant="secondary"
              className="pixel-shadow w-10 h-10"
              onClick={handleZoomIn}
            >
              <MagnifyingGlassPlus size={20} weight="bold" />
            </Button>
            <Button
              size="icon"
              variant="secondary"
              className="pixel-shadow w-10 h-10"
              onClick={handleZoomOut}
            >
              <MagnifyingGlassMinus size={20} weight="bold" />
            </Button>
            <Button
              size="icon"
              variant="secondary"
              className="pixel-shadow w-10 h-10"
              onClick={handleResetView}
            >
              <ArrowsOut size={20} weight="bold" />
            </Button>
          </div>

          <div className="absolute bottom-4 left-4 flex items-center gap-6 bg-card/80 backdrop-blur-sm px-4 py-2 pixel-border">
            <div className="flex items-center gap-2">
              <GitBranch size={16} className="text-primary" weight="bold" />
              <span className="text-xs pixel-font text-primary">main</span>
            </div>
            <div className="flex items-center gap-2">
              <GitBranch size={16} className="text-secondary" weight="bold" />
              <span className="text-xs pixel-font text-secondary">feature</span>
            </div>
            <div className="flex items-center gap-2">
              <GitBranch size={16} className="text-accent" weight="bold" />
              <span className="text-xs pixel-font text-accent">experimental</span>
            </div>
          </div>

          <div className="absolute bottom-4 right-4 text-xs text-muted-foreground bg-card/80 backdrop-blur-sm px-3 py-1 pixel-border">
            {Math.round(zoom * 100)}%
          </div>
        </div>

        <div className="text-center space-y-4">
          <Button 
            size="lg" 
            onClick={onStartGame}
            className="pixel-shadow text-base md:text-lg pixel-font"
          >
            <Play size={24} weight="fill" />
            Start Adventure
          </Button>

          {completedLevels && completedLevels.length > 0 && (
            <div>
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
    </div>
    </TooltipProvider>
  );
}
