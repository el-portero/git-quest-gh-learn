import { useEffect, useRef, useState } from 'react';
import { Level, Position, TILE_SIZE, getTileColor, Enemy } from '@/lib/game-data';

interface GameCanvasProps {
  level: Level;
  onObjectiveComplete: (index: number) => void;
  playerPosition: Position;
  setPlayerPosition: (pos: Position) => void;
  onEnemyEncounter: (enemy: Enemy) => void;
}

export function GameCanvas({ 
  level, 
  onObjectiveComplete, 
  playerPosition, 
  setPlayerPosition,
  onEnemyEncounter 
}: GameCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [facingDirection, setFacingDirection] = useState<'up' | 'down' | 'left' | 'right'>('down');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) return;
      
      e.preventDefault();
      
      let newX = playerPosition.x;
      let newY = playerPosition.y;
      let newDirection = facingDirection;

      switch (e.key) {
        case 'ArrowUp':
          newY -= 1;
          newDirection = 'up';
          break;
        case 'ArrowDown':
          newY += 1;
          newDirection = 'down';
          break;
        case 'ArrowLeft':
          newX -= 1;
          newDirection = 'left';
          break;
        case 'ArrowRight':
          newX += 1;
          newDirection = 'right';
          break;
      }

      setFacingDirection(newDirection);

      if (
        newX < 0 ||
        newX >= level.mapSize.width ||
        newY < 0 ||
        newY >= level.mapSize.height
      ) {
        return;
      }

      if (level.obstacles?.some(obs => obs.x === newX && obs.y === newY)) {
        return;
      }

      const enemy = level.enemies?.find(e => e.position.x === newX && e.position.y === newY && !e.defeated);
      if (enemy) {
        onEnemyEncounter(enemy);
        return;
      }

      setPlayerPosition({ x: newX, y: newY });

      level.objectives.forEach((obj, index) => {
        if (obj.type === 'reach' && obj.target && obj.target.x === newX && obj.target.y === newY && !obj.completed) {
          onObjectiveComplete(index);
        }
      });

      level.collectibles?.forEach((collectible) => {
        if (collectible.position.x === newX && collectible.position.y === newY && !collectible.collected) {
          collectible.collected = true;
          
          const collectObjective = level.objectives.find(
            obj => obj.type === 'collect' && obj.itemLabel === collectible.label
          );
          if (collectObjective) {
            const allCollected = level.collectibles?.every(c => c.collected);
            if (allCollected) {
              const objIndex = level.objectives.indexOf(collectObjective);
              if (objIndex !== -1) {
                onObjectiveComplete(objIndex);
              }
            }
          }
        }
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [playerPosition, level, onObjectiveComplete, setPlayerPosition, facingDirection, onEnemyEncounter]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = level.mapSize.width * TILE_SIZE;
    canvas.height = level.mapSize.height * TILE_SIZE;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let y = 0; y < level.mapSize.height; y++) {
      for (let x = 0; x < level.mapSize.width; x++) {
        const isObstacle = level.obstacles?.some(obs => obs.x === x && obs.y === y);
        const color = isObstacle ? getTileColor('wall') : getTileColor('floor');
        
        ctx.fillStyle = color;
        ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
        
        ctx.strokeStyle = '#1A1D23';
        ctx.lineWidth = 1;
        ctx.strokeRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
      }
    }

    level.objectives.forEach((obj) => {
      if (obj.type === 'reach' && obj.target) {
        const { x, y } = obj.target;
        ctx.fillStyle = obj.completed ? getTileColor('grass') : getTileColor('goal');
        ctx.fillRect(x * TILE_SIZE + 8, y * TILE_SIZE + 8, TILE_SIZE - 16, TILE_SIZE - 16);
        
        if (!obj.completed) {
          ctx.strokeStyle = '#F39C12';
          ctx.lineWidth = 2;
          ctx.strokeRect(x * TILE_SIZE + 6, y * TILE_SIZE + 6, TILE_SIZE - 12, TILE_SIZE - 12);
        }
      }
    });

    level.collectibles?.forEach((collectible) => {
      if (!collectible.collected) {
        const { x, y } = collectible.position;
        ctx.fillStyle = getTileColor('collectible');
        ctx.beginPath();
        ctx.arc(x * TILE_SIZE + TILE_SIZE / 2, y * TILE_SIZE + TILE_SIZE / 2, 12, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.fillStyle = '#FFFFFF';
        ctx.font = '10px "Fira Code"';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(collectible.label.slice(0, 3), x * TILE_SIZE + TILE_SIZE / 2, y * TILE_SIZE + TILE_SIZE / 2);
      }
    });

    level.enemies?.forEach((enemy) => {
      if (!enemy.defeated) {
        drawEnemy(ctx, enemy.position.x, enemy.position.y);
      }
    });

    drawPlayer(ctx, playerPosition.x, playerPosition.y, facingDirection);

  }, [level, playerPosition, facingDirection]);

  function drawEnemy(ctx: CanvasRenderingContext2D, x: number, y: number) {
    const centerX = x * TILE_SIZE + TILE_SIZE / 2;
    const centerY = y * TILE_SIZE + TILE_SIZE / 2;
    const size = 18;

    ctx.fillStyle = '#E74C3C';
    ctx.fillRect(centerX - size / 2, centerY - size / 2, size, size);

    ctx.fillStyle = '#C0392B';
    const hornSize = 6;
    ctx.fillRect(centerX - size / 2 - 2, centerY - size / 2 - hornSize, 4, hornSize);
    ctx.fillRect(centerX + size / 2 - 2, centerY - size / 2 - hornSize, 4, hornSize);

    ctx.fillStyle = '#FFFFFF';
    const eyeSize = 3;
    const eyeOffset = 4;
    ctx.fillRect(centerX - eyeOffset, centerY - 2, eyeSize, eyeSize);
    ctx.fillRect(centerX + eyeOffset - eyeSize, centerY - 2, eyeSize, eyeSize);

    ctx.strokeStyle = '#C0392B';
    ctx.lineWidth = 2;
    ctx.strokeRect(centerX - size / 2, centerY - size / 2, size, size);
  }

  function drawPlayer(ctx: CanvasRenderingContext2D, x: number, y: number, direction: string) {
    const centerX = x * TILE_SIZE + TILE_SIZE / 2;
    const centerY = y * TILE_SIZE + TILE_SIZE / 2;
    const size = 16;

    ctx.fillStyle = '#2ECC71';
    ctx.fillRect(centerX - size / 2, centerY - size / 2, size, size);

    ctx.fillStyle = '#FFFFFF';
    const eyeSize = 3;
    const eyeOffset = 4;

    if (direction === 'up') {
      ctx.fillRect(centerX - eyeOffset, centerY - eyeOffset, eyeSize, eyeSize);
      ctx.fillRect(centerX + eyeOffset - eyeSize, centerY - eyeOffset, eyeSize, eyeSize);
    } else if (direction === 'down') {
      ctx.fillRect(centerX - eyeOffset, centerY + eyeOffset - eyeSize, eyeSize, eyeSize);
      ctx.fillRect(centerX + eyeOffset - eyeSize, centerY + eyeOffset - eyeSize, eyeSize, eyeSize);
    } else if (direction === 'left') {
      ctx.fillRect(centerX - eyeOffset, centerY - 2, eyeSize, eyeSize);
      ctx.fillRect(centerX - eyeOffset, centerY + 2 - eyeSize, eyeSize, eyeSize);
    } else {
      ctx.fillRect(centerX + eyeOffset - eyeSize, centerY - 2, eyeSize, eyeSize);
      ctx.fillRect(centerX + eyeOffset - eyeSize, centerY + 2 - eyeSize, eyeSize, eyeSize);
    }

    ctx.strokeStyle = '#27AE60';
    ctx.lineWidth = 2;
    ctx.strokeRect(centerX - size / 2, centerY - size / 2, size, size);
  }

  return (
    <div className="flex justify-center items-center p-4 bg-card">
      <canvas
        ref={canvasRef}
        className="pixel-border"
        style={{ imageRendering: 'pixelated' }}
      />
    </div>
  );
}
