export type LevelType = 'movement' | 'command' | 'visual' | 'hybrid';

export interface Position {
  x: number;
  y: number;
}

export interface Enemy {
  id: string;
  position: Position;
  name: string;
  description: string;
  health: number;
  maxHealth: number;
  defeated: boolean;
  correctCommands: string[];
  hint: string;
  blockMessage: string;
}

export interface LevelObjective {
  type: 'reach' | 'defeat-enemy' | 'collect' | 'learn';
  description: string;
  target?: Position;
  enemyId?: string;
  itemLabel?: string;
  completed: boolean;
  learnContent?: {
    title: string;
    concept: string;
    content: string;
    examples?: string[];
  };
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
  enemies?: Enemy[];
  collectibles?: { position: Position; label: string; collected: boolean }[];
  gitConcept: string;
  visualContent?: {
    type: 'commit-tree' | 'branch-diagram' | 'staging-area';
    data: any;
  };
  branchInfo?: {
    branch: 'main' | 'feature' | 'experimental';
    prerequisite?: number[];
  };
}

export const LEVELS: Level[] = [
  {
    id: 1,
    title: "Welcome to Git",
    type: "hybrid",
    description: "Learn what Git is and initialize your first repository",
    tutorial: "Welcome, adventurer! Git is a version control system that tracks changes in your code. To begin your journey, you'll need to defeat the 'Chaos Beast' by initializing a Git repository. Move to the enemy and use the correct Git command to defeat it!",
    mapSize: { width: 10, height: 8 },
    startPosition: { x: 1, y: 4 },
    gitConcept: "Git Basics - Initialization",
    branchInfo: { branch: 'main', prerequisite: [] },
    objectives: [
      {
        type: "defeat-enemy",
        description: "Defeat the Chaos Beast with git init",
        enemyId: "chaos-beast",
        completed: false
      },
      {
        type: "learn",
        description: "Learn about Git repositories",
        target: { x: 8, y: 4 },
        completed: false,
        learnContent: {
          title: "What is a Git Repository?",
          concept: "Git Repository Basics",
          content: "A Git repository (or 'repo') is like a magic chest that stores all your code and its entire history. When you run 'git init', you create a hidden .git folder that tracks every change you make.\n\nThink of it as a time machine for your code - you can travel back to any previous version, see what changed, and even explore alternate timelines (branches)!",
          examples: [
            "git init                    # Initialize a new repository",
            "git init my-project         # Create a new directory with a repo",
            "ls -la                      # See the hidden .git folder"
          ]
        }
      }
    ],
    obstacles: [
      { x: 6, y: 2 }, { x: 6, y: 6 }
    ],
    enemies: [
      {
        id: "chaos-beast",
        position: { x: 4, y: 4 },
        name: "Chaos Beast",
        description: "A wild creature blocking your path. Initialize a repository to tame it!",
        health: 1,
        maxHealth: 1,
        defeated: false,
        correctCommands: ["git init"],
        hint: "Use 'git init' to initialize a new Git repository",
        blockMessage: "The Chaos Beast blocks your path! You must defeat it with the right Git command."
      }
    ],
    collectibles: []
  },
  {
    id: 2,
    title: "Staging Area",
    type: "hybrid",
    description: "Learn how to stage files for commit",
    tutorial: "Before committing changes, you need to stage them. Three File Guardians block your path, each protecting a file. Stage each file in order using 'git add [filename]' to defeat them!",
    mapSize: { width: 12, height: 8 },
    startPosition: { x: 1, y: 4 },
    gitConcept: "Staging Changes",
    branchInfo: { branch: 'main', prerequisite: [1] },
    objectives: [
      {
        type: "defeat-enemy",
        description: "Stage README.md by defeating the first guardian",
        enemyId: "guardian-1",
        completed: false
      },
      {
        type: "defeat-enemy",
        description: "Stage index.html by defeating the second guardian",
        enemyId: "guardian-2",
        completed: false
      },
      {
        type: "defeat-enemy",
        description: "Stage style.css by defeating the third guardian",
        enemyId: "guardian-3",
        completed: false
      }
    ],
    obstacles: [
      { x: 5, y: 3 }, { x: 5, y: 5 },
      { x: 9, y: 2 }, { x: 9, y: 6 }
    ],
    enemies: [
      {
        id: "guardian-1",
        position: { x: 3, y: 4 },
        name: "README Guardian",
        description: "Guards README.md - stage it to pass!",
        health: 1,
        maxHealth: 1,
        defeated: false,
        correctCommands: ["git add README.md"],
        hint: "Use 'git add README.md' to stage this file",
        blockMessage: "The README Guardian blocks your way! Stage the README.md file to defeat it."
      },
      {
        id: "guardian-2",
        position: { x: 6, y: 4 },
        name: "HTML Guardian",
        description: "Guards index.html - stage it to pass!",
        health: 1,
        maxHealth: 1,
        defeated: false,
        correctCommands: ["git add index.html"],
        hint: "Use 'git add index.html' to stage this file",
        blockMessage: "The HTML Guardian blocks your way! Stage the index.html file to defeat it."
      },
      {
        id: "guardian-3",
        position: { x: 10, y: 4 },
        name: "CSS Guardian",
        description: "Guards style.css - stage it to pass!",
        health: 1,
        maxHealth: 1,
        defeated: false,
        correctCommands: ["git add style.css"],
        hint: "Use 'git add style.css' to stage this file",
        blockMessage: "The CSS Guardian blocks your way! Stage the style.css file to defeat it."
      }
    ],
    collectibles: []
  },
  {
    id: 3,
    title: "First Commit",
    type: "hybrid",
    description: "Create your first commit",
    tutorial: "A commit is like a save point in your game. The Commit Keeper guards the commit node - defeat it by creating a proper commit with a message!",
    mapSize: { width: 10, height: 8 },
    startPosition: { x: 1, y: 4 },
    gitConcept: "Committing Changes",
    branchInfo: { branch: 'main', prerequisite: [2] },
    objectives: [
      {
        type: "defeat-enemy",
        description: "Defeat the Commit Keeper with git commit",
        enemyId: "commit-keeper",
        completed: false
      },
      {
        type: "learn",
        description: "Learn about commits and commit messages",
        target: { x: 8, y: 4 },
        completed: false,
        learnContent: {
          title: "Understanding Commits",
          concept: "Git Commits & Messages",
          content: "A commit is a snapshot of your code at a specific point in time. It's like taking a photo of your entire project!\n\nCommit messages are crucial - they tell your future self (and your team) what changed and why. Good commit messages make it easy to understand your project's history.\n\nBest practices:\n• Use present tense ('Add feature' not 'Added feature')\n• Be concise but descriptive\n• Explain the 'why', not just the 'what'",
          examples: [
            'git commit -m "Add user login feature"',
            'git commit -m "Fix navigation bug on mobile"',
            'git commit -m "Update documentation for API endpoints"'
          ]
        }
      }
    ],
    obstacles: [
      { x: 6, y: 3 }, { x: 6, y: 5 }
    ],
    enemies: [
      {
        id: "commit-keeper",
        position: { x: 4, y: 4 },
        name: "Commit Keeper",
        description: "Guards the commit node - create a commit to pass!",
        health: 1,
        maxHealth: 1,
        defeated: false,
        correctCommands: [
          "git commit -m \"Initial commit\"",
          "git commit -m \"initial commit\"",
          "git commit -m 'Initial commit'",
          "git commit -m 'initial commit'"
        ],
        hint: "Use 'git commit -m \"Your message\"' to create a commit",
        blockMessage: "The Commit Keeper blocks your path! Create a commit with a message to defeat it."
      }
    ],
    collectibles: []
  },
  {
    id: 4,
    title: "Checking Status",
    type: "hybrid",
    description: "Learn to check repository status",
    tutorial: "Git status is your map—it shows what's changed, what's staged, and what's committed. Two Status Sentinels guard the path. Use status commands to reveal the way forward!",
    mapSize: { width: 10, height: 8 },
    startPosition: { x: 1, y: 4 },
    gitConcept: "Repository Status",
    branchInfo: { branch: 'feature', prerequisite: [3] },
    objectives: [
      {
        type: "defeat-enemy",
        description: "Check status to defeat the first sentinel",
        enemyId: "status-sentinel",
        completed: false
      },
      {
        type: "defeat-enemy",
        description: "View log to defeat the second sentinel",
        enemyId: "log-sentinel",
        completed: false
      },
      {
        type: "reach",
        description: "Reach the information center",
        target: { x: 8, y: 4 },
        completed: false
      }
    ],
    obstacles: [
      { x: 5, y: 2 }, { x: 5, y: 6 }
    ],
    enemies: [
      {
        id: "status-sentinel",
        position: { x: 3, y: 4 },
        name: "Status Sentinel",
        description: "Tests your knowledge of git status",
        health: 1,
        maxHealth: 1,
        defeated: false,
        correctCommands: ["git status"],
        hint: "Use 'git status' to check repository status",
        blockMessage: "The Status Sentinel blocks your way! Check the repository status to pass."
      },
      {
        id: "log-sentinel",
        position: { x: 6, y: 4 },
        name: "Log Sentinel",
        description: "Tests your knowledge of git log",
        health: 1,
        maxHealth: 1,
        defeated: false,
        correctCommands: ["git log"],
        hint: "Use 'git log' to view commit history",
        blockMessage: "The Log Sentinel blocks your way! View the commit history to pass."
      }
    ],
    collectibles: []
  },
  {
    id: 5,
    title: "Time Travel",
    type: "hybrid",
    description: "Create and switch branches",
    tutorial: "Branches let you work on different versions of your code simultaneously. The Branch Warden guards two paths - create a new branch called 'feature' to unlock both routes!",
    mapSize: { width: 14, height: 10 },
    startPosition: { x: 7, y: 8 },
    gitConcept: "Git Branches",
    branchInfo: { branch: 'main', prerequisite: [4, 7] },
    objectives: [
      {
        type: "defeat-enemy",
        description: "Create a feature branch to defeat the Branch Warden",
        enemyId: "branch-warden",
        completed: false
      },
      {
        type: "reach",
        description: "Explore the feature branch path",
        target: { x: 3, y: 2 },
        completed: false
      },
      {
        type: "reach",
        description: "Return to the main branch path",
        target: { x: 11, y: 2 },
        completed: false
      }
    ],
    obstacles: [
      { x: 7, y: 4 }
    ],
    enemies: [
      {
        id: "branch-warden",
        position: { x: 7, y: 6 },
        name: "Branch Warden",
        description: "Guards the branching paths - create a branch to pass!",
        health: 1,
        maxHealth: 1,
        defeated: false,
        correctCommands: ["git branch feature", "git checkout -b feature", "git switch -c feature"],
        hint: "Use 'git branch feature' or 'git checkout -b feature' to create a new branch",
        blockMessage: "The Branch Warden blocks both paths! Create a 'feature' branch to proceed."
      }
    ],
    collectibles: []
  },
  {
    id: 6,
    title: "Merging Paths",
    type: "hybrid",
    description: "Merge branches together",
    tutorial: "Merging combines changes from different branches. The Merge Guardian stands at the convergence point. Navigate through the maze and merge the feature branch to defeat it!",
    mapSize: { width: 12, height: 10 },
    startPosition: { x: 1, y: 8 },
    gitConcept: "Merging Branches",
    branchInfo: { branch: 'main', prerequisite: [5] },
    objectives: [
      {
        type: "reach",
        description: "Navigate through the branch maze",
        target: { x: 10, y: 5 },
        completed: false
      },
      {
        type: "defeat-enemy",
        description: "Merge the feature branch to defeat the Merge Guardian",
        enemyId: "merge-guardian",
        completed: false
      }
    ],
    obstacles: [
      { x: 3, y: 7 }, { x: 3, y: 6 }, { x: 3, y: 5 },
      { x: 5, y: 7 }, { x: 5, y: 4 }, { x: 5, y: 3 },
      { x: 7, y: 6 }, { x: 7, y: 5 }, { x: 7, y: 4 },
      { x: 9, y: 7 }, { x: 9, y: 3 }
    ],
    enemies: [
      {
        id: "merge-guardian",
        position: { x: 10, y: 2 },
        name: "Merge Guardian",
        description: "Guards the merge point - merge the branches to pass!",
        health: 1,
        maxHealth: 1,
        defeated: false,
        correctCommands: ["git merge feature"],
        hint: "Use 'git merge feature' to merge the feature branch",
        blockMessage: "The Merge Guardian blocks the final path! Merge the feature branch to proceed."
      }
    ],
    collectibles: []
  },
  {
    id: 7,
    title: "Branching Out",
    type: "hybrid",
    description: "Learn to navigate commit history",
    tutorial: "Git lets you travel through time! Three History Keepers guard the timeline. Use history commands to defeat them and collect all commit nodes!",
    mapSize: { width: 14, height: 8 },
    startPosition: { x: 1, y: 4 },
    gitConcept: "Navigating History",
    branchInfo: { branch: 'experimental', prerequisite: [3] },
    objectives: [
      {
        type: "defeat-enemy",
        description: "View concise history to defeat the Oneline Keeper",
        enemyId: "oneline-keeper",
        completed: false
      },
      {
        type: "collect",
        description: "Collect all three commit nodes",
        itemLabel: "C3",
        completed: false
      },
      {
        type: "defeat-enemy",
        description: "Check differences to defeat the Diff Keeper",
        enemyId: "diff-keeper",
        completed: false
      }
    ],
    obstacles: [
      { x: 4, y: 2 }, { x: 4, y: 6 },
      { x: 10, y: 2 }, { x: 10, y: 6 }
    ],
    enemies: [
      {
        id: "oneline-keeper",
        position: { x: 3, y: 4 },
        name: "Oneline Keeper",
        description: "Demands a concise view of history",
        health: 1,
        maxHealth: 1,
        defeated: false,
        correctCommands: ["git log --oneline"],
        hint: "Use 'git log --oneline' for a concise commit history",
        blockMessage: "The Oneline Keeper blocks you! Show commit history in one line format."
      },
      {
        id: "diff-keeper",
        position: { x: 12, y: 4 },
        name: "Diff Keeper",
        description: "Wants to see the differences",
        health: 1,
        maxHealth: 1,
        defeated: false,
        correctCommands: ["git diff"],
        hint: "Use 'git diff' to show differences in working directory",
        blockMessage: "The Diff Keeper blocks you! Show the differences in the working directory."
      }
    ],
    collectibles: [
      { position: { x: 6, y: 4 }, label: "C1", collected: false },
      { position: { x: 8, y: 4 }, label: "C2", collected: false },
      { position: { x: 9, y: 4 }, label: "C3", collected: false }
    ]
  },
  {
    id: 8,
    title: "Under the Hood",
    type: "hybrid",
    description: "Understand Git's internal structure",
    tutorial: "Git stores everything as objects: blobs (files), trees (directories), and commits. Three Object Guardians test your knowledge of Git internals. Defeat them to master Git's inner workings!",
    mapSize: { width: 12, height: 8 },
    startPosition: { x: 1, y: 4 },
    gitConcept: "Git Internals",
    branchInfo: { branch: 'main', prerequisite: [6] },
    objectives: [
      {
        type: "defeat-enemy",
        description: "Show object type to defeat the Type Guardian",
        enemyId: "type-guardian",
        completed: false
      },
      {
        type: "defeat-enemy",
        description: "Display HEAD content to defeat the Content Guardian",
        enemyId: "content-guardian",
        completed: false
      },
      {
        type: "defeat-enemy",
        description: "List objects to defeat the Database Guardian",
        enemyId: "database-guardian",
        completed: false
      },
      {
        type: "reach",
        description: "Reach the Git database core",
        target: { x: 10, y: 4 },
        completed: false
      }
    ],
    obstacles: [
      { x: 5, y: 2 }, { x: 5, y: 6 },
      { x: 8, y: 3 }, { x: 8, y: 5 }
    ],
    enemies: [
      {
        id: "type-guardian",
        position: { x: 3, y: 4 },
        name: "Type Guardian",
        description: "Tests your knowledge of object types",
        health: 1,
        maxHealth: 1,
        defeated: false,
        correctCommands: ["git cat-file -t HEAD"],
        hint: "Use 'git cat-file -t HEAD' to show object type",
        blockMessage: "The Type Guardian blocks you! Show the type of the HEAD object."
      },
      {
        id: "content-guardian",
        position: { x: 6, y: 4 },
        name: "Content Guardian",
        description: "Tests your knowledge of object content",
        health: 1,
        maxHealth: 1,
        defeated: false,
        correctCommands: ["git cat-file -p HEAD"],
        hint: "Use 'git cat-file -p HEAD' to display object content",
        blockMessage: "The Content Guardian blocks you! Display the content of HEAD."
      },
      {
        id: "database-guardian",
        position: { x: 9, y: 4 },
        name: "Database Guardian",
        description: "Tests your knowledge of the object database",
        health: 1,
        maxHealth: 1,
        defeated: false,
        correctCommands: ["git rev-list --objects --all", "git count-objects"],
        hint: "Use 'git rev-list --objects --all' or 'git count-objects'",
        blockMessage: "The Database Guardian blocks you! List objects in the Git database."
      }
    ],
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
