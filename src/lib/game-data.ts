export type LevelType = 'movement' | 'command' | 'visual' | 'hybrid';

export interface Position {
  x: number;
  y: number;
}

export interface LevelObjective {
  type: 'reach' | 'command' | 'sequence';
  description: string;
  target?: Position;
  commands?: string[];
  completed: boolean;
}

export interface Level {
  id: number;
  title: string;
  type: LevelType;
  description: string;
  tutorial: string;
  mapSize: { width: number; height: number };
  startPosition: Position;
  objectives: LevelObjective[];
  obstacles?: Position[];
  collectibles?: { position: Position; label: string; collected: boolean }[];
  gitConcept: string;
  visualContent?: {
    type: 'commit-tree' | 'branch-diagram' | 'staging-area';
    data: any;
  };
}

export const LEVELS: Level[] = [
  {
    id: 1,
    title: "Welcome to Git",
    type: "hybrid",
    description: "Learn what Git is and initialize your first repository",
    tutorial: "Welcome, adventurer! Git is a version control system that tracks changes in your code. Let's start your journey by learning the very first command.",
    mapSize: { width: 10, height: 8 },
    startPosition: { x: 1, y: 4 },
    gitConcept: "Git Basics - Initialization",
    objectives: [
      {
        type: "command",
        description: "Initialize a Git repository",
        commands: ["git init"],
        completed: false
      },
      {
        type: "reach",
        description: "Walk to the repository marker",
        target: { x: 8, y: 4 },
        completed: false
      }
    ],
    obstacles: [
      { x: 4, y: 3 }, { x: 4, y: 4 }, { x: 4, y: 5 },
      { x: 6, y: 2 }, { x: 6, y: 6 }
    ],
    collectibles: [
      { position: { x: 5, y: 4 }, label: ".git", collected: false }
    ]
  },
  {
    id: 2,
    title: "Staging Area",
    type: "hybrid",
    description: "Learn how to stage files for commit",
    tutorial: "Before committing changes, you need to stage them. Think of staging as preparing items for a journey. Use 'git add' to stage files.",
    mapSize: { width: 12, height: 8 },
    startPosition: { x: 1, y: 4 },
    gitConcept: "Staging Changes",
    objectives: [
      {
        type: "sequence",
        description: "Stage files in the correct order",
        commands: ["git add README.md", "git add index.html", "git add style.css"],
        completed: false
      },
      {
        type: "reach",
        description: "Reach the staging area",
        target: { x: 10, y: 4 },
        completed: false
      }
    ],
    obstacles: [
      { x: 5, y: 3 }, { x: 5, y: 5 },
      { x: 7, y: 2 }, { x: 7, y: 6 }
    ],
    collectibles: [
      { position: { x: 3, y: 4 }, label: "README.md", collected: false },
      { position: { x: 6, y: 4 }, label: "index.html", collected: false },
      { position: { x: 9, y: 4 }, label: "style.css", collected: false }
    ]
  },
  {
    id: 3,
    title: "First Commit",
    type: "hybrid",
    description: "Create your first commit",
    tutorial: "A commit is like a save point in your game. It captures the current state of your staged files with a message describing what changed.",
    mapSize: { width: 10, height: 8 },
    startPosition: { x: 1, y: 4 },
    gitConcept: "Committing Changes",
    objectives: [
      {
        type: "command",
        description: "Create a commit with a message",
        commands: ["git commit -m \"Initial commit\"", "git commit -m \"initial commit\"", "git commit -m 'Initial commit'", "git commit -m 'initial commit'"],
        completed: false
      },
      {
        type: "reach",
        description: "Walk to the commit node",
        target: { x: 8, y: 4 },
        completed: false
      }
    ],
    obstacles: [
      { x: 4, y: 2 }, { x: 4, y: 6 },
      { x: 6, y: 3 }, { x: 6, y: 5 }
    ],
    collectibles: []
  },
  {
    id: 4,
    title: "Checking Status",
    type: "command",
    description: "Learn to check repository status",
    tutorial: "Git status is your map—it shows what's changed, what's staged, and what's committed. Use it often to know where you are!",
    mapSize: { width: 10, height: 8 },
    startPosition: { x: 5, y: 4 },
    gitConcept: "Repository Status",
    objectives: [
      {
        type: "command",
        description: "Check the status of your repository",
        commands: ["git status"],
        completed: false
      },
      {
        type: "command",
        description: "View the commit history",
        commands: ["git log"],
        completed: false
      }
    ],
    obstacles: [],
    collectibles: []
  },
  {
    id: 5,
    title: "Branching Out",
    type: "hybrid",
    description: "Create and switch branches",
    tutorial: "Branches let you work on different versions of your code simultaneously. Like parallel universes for your project!",
    mapSize: { width: 14, height: 10 },
    startPosition: { x: 7, y: 8 },
    gitConcept: "Git Branches",
    objectives: [
      {
        type: "command",
        description: "Create a new branch called 'feature'",
        commands: ["git branch feature", "git checkout -b feature", "git switch -c feature"],
        completed: false
      },
      {
        type: "reach",
        description: "Walk to the feature branch",
        target: { x: 3, y: 2 },
        completed: false
      },
      {
        type: "reach",
        description: "Walk back to main branch",
        target: { x: 11, y: 2 },
        completed: false
      }
    ],
    obstacles: [
      { x: 7, y: 6 }, { x: 7, y: 5 }, { x: 7, y: 4 }
    ],
    collectibles: []
  },
  {
    id: 6,
    title: "Merging Paths",
    type: "hybrid",
    description: "Merge branches together",
    tutorial: "Merging combines changes from different branches. When your feature is ready, merge it back into main!",
    mapSize: { width: 12, height: 10 },
    startPosition: { x: 1, y: 8 },
    gitConcept: "Merging Branches",
    objectives: [
      {
        type: "reach",
        description: "Navigate through the branch maze",
        target: { x: 10, y: 1 },
        completed: false
      },
      {
        type: "command",
        description: "Merge the feature branch",
        commands: ["git merge feature"],
        completed: false
      }
    ],
    obstacles: [
      { x: 3, y: 7 }, { x: 3, y: 6 }, { x: 3, y: 5 },
      { x: 5, y: 7 }, { x: 5, y: 4 }, { x: 5, y: 3 },
      { x: 7, y: 6 }, { x: 7, y: 5 }, { x: 7, y: 4 },
      { x: 9, y: 7 }, { x: 9, y: 3 }
    ],
    collectibles: []
  },
  {
    id: 7,
    title: "Time Travel",
    type: "hybrid",
    description: "Learn to navigate commit history",
    tutorial: "Git lets you travel through time! Use checkout to visit previous commits and see your code as it was.",
    mapSize: { width: 14, height: 8 },
    startPosition: { x: 1, y: 4 },
    gitConcept: "Navigating History",
    objectives: [
      {
        type: "reach",
        description: "Collect all commit nodes",
        target: { x: 12, y: 4 },
        completed: false
      },
      {
        type: "command",
        description: "View commit history in one line",
        commands: ["git log --oneline"],
        completed: false
      },
      {
        type: "command",
        description: "Show differences in working directory",
        commands: ["git diff"],
        completed: false
      }
    ],
    obstacles: [
      { x: 4, y: 2 }, { x: 4, y: 6 },
      { x: 7, y: 3 }, { x: 7, y: 5 },
      { x: 10, y: 2 }, { x: 10, y: 6 }
    ],
    collectibles: [
      { position: { x: 3, y: 4 }, label: "C1", collected: false },
      { position: { x: 6, y: 4 }, label: "C2", collected: false },
      { position: { x: 9, y: 4 }, label: "C3", collected: false }
    ]
  },
  {
    id: 8,
    title: "Under the Hood",
    type: "command",
    description: "Understand Git's internal structure",
    tutorial: "Git stores everything as objects: blobs (files), trees (directories), and commits. The .git folder contains all your history!",
    mapSize: { width: 10, height: 8 },
    startPosition: { x: 5, y: 4 },
    gitConcept: "Git Internals",
    objectives: [
      {
        type: "command",
        description: "Show the type of a Git object",
        commands: ["git cat-file -t HEAD"],
        completed: false
      },
      {
        type: "command",
        description: "Display the content of HEAD",
        commands: ["git cat-file -p HEAD"],
        completed: false
      },
      {
        type: "command",
        description: "List all objects in the database",
        commands: ["git rev-list --objects --all", "git count-objects"],
        completed: false
      }
    ],
    obstacles: [],
    collectibles: []
  }
];

export const TILE_SIZE = 48;

export type TileType = 'floor' | 'wall' | 'grass' | 'water' | 'goal' | 'collectible';

export function getTileColor(type: TileType): string {
  switch (type) {
    case 'floor': return '#2C3E50';
    case 'wall': return '#1A1D23';
    case 'grass': return '#27AE60';
    case 'water': return '#3498DB';
    case 'goal': return '#F39C12';
    case 'collectible': return '#9B59B6';
    default: return '#2C3E50';
  }
}
