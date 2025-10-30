# GitQuest: An 8-Bit Git Learning Adventure

An interactive 8-bit style game that teaches users Git fundamentals through engaging gameplay, progressing from basic concepts to advanced Git internals.

**Experience Qualities**:
1. **Playful & Nostalgic** - Evokes classic 8-bit gaming memories while making Git learning feel like an adventure rather than a chore
2. **Progressive & Rewarding** - Each level builds upon previous knowledge with clear achievements and visible progress markers
3. **Interactive & Hands-on** - Players actively type commands and move characters, creating muscle memory for Git operations

**Complexity Level**: Light Application (multiple features with basic state)
- Single-purpose educational game with progressive levels, character movement, command typing validation, and persistent progress tracking

## Essential Features

### Level-Based Progression System
- **Functionality**: 8+ progressive levels covering Git basics to internals, with locked/unlocked states
- **Purpose**: Structured learning path prevents overwhelming beginners while maintaining engagement
- **Trigger**: User completes level objectives (command tasks + movement challenges)
- **Progression**: Start screen → Select unlocked level → Play level (move character, type commands) → Complete objectives → Level complete animation → Unlock next level → Return to level select
- **Success criteria**: Levels unlock sequentially, progress persists between sessions, each level teaches distinct Git concept

### Character Movement System
- **Functionality**: Top-down 2D grid movement using arrow keys (up/down/left/right) on pixelated tilemap
- **Purpose**: Adds game element to make learning fun, creates spatial puzzles around Git concepts
- **Trigger**: Arrow key press while in gameplay
- **Progression**: Key press → Character sprite updates facing direction → Character moves one tile → Check collision/boundaries → Update position → Check if reached objective marker
- **Success criteria**: Smooth 8-bit style animation, collision detection works, character can navigate to Git-themed objectives (repositories, commits, branches)

### Git Command Input System
- **Functionality**: Terminal-style input field where players type exact Git commands to progress
- **Purpose**: Builds actual Git command muscle memory, validates understanding of syntax
- **Trigger**: Level requires command execution (tutorial prompts player)
- **Progression**: Prompt displays ("Initialize a repository") → Player types command → Validation on enter → Correct: visual feedback + progress → Incorrect: helpful hint → Retry
- **Success criteria**: Accepts valid Git commands, provides helpful error messages, validates syntax accurately, shows command history

### Visual Tutorial System
- **Functionality**: Pixel art diagrams showing Git internals (commits as nodes, branches as pointers, staging area)
- **Purpose**: Visual learners understand abstract Git concepts through concrete representations
- **Trigger**: Level start or when player approaches info markers on map
- **Progression**: Level loads → Tutorial overlay appears → Animated pixel art shows concept → Player dismisses → Gameplay begins with learned concept
- **Success criteria**: Clear visual metaphors for commits/branches/HEAD, animations show Git operations, skippable for repeat players

### Progress Persistence
- **Functionality**: Saves completed levels, current level, and command history using useKV
- **Purpose**: Players can return and continue their learning journey
- **Trigger**: Level completion, command submission
- **Progression**: User completes objective → Save to KV → Update level select UI → Show completion badge
- **Success criteria**: Progress survives page refresh, shows completion percentage, allows replaying levels

### 8-Bit Audio & Visual Feedback
- **Functionality**: Retro sound effects and pixel art animations for actions (command success, level complete, movement)
- **Purpose**: Reinforces actions with satisfying feedback, enhances nostalgic gaming feel
- **Trigger**: Command validation, level events, character movement
- **Progression**: Action occurs → Play appropriate sound → Show pixel animation → Return to gameplay
- **Success criteria**: Sounds are pleasant not annoying, animations are smooth, enhances rather than distracts

## Edge Case Handling

- **Invalid Commands**: Parse common Git command mistakes, provide specific helpful hints ("Did you mean `git commit` instead of `git comit`?")
- **Stuck Players**: Hint button appears after 60 seconds of inactivity, provides contextual guidance
- **Level Skip**: Advanced users can unlock all levels via secret command for review purposes
- **Keyboard Conflicts**: Trap arrow keys only during gameplay to prevent page scrolling
- **Progress Loss Prevention**: Auto-save every action, confirmation before level restart

## Design Direction

The design should feel like a love letter to classic 8-bit RPGs—think retro Game Boy aesthetics meets modern Git workflows. Minimal UI chrome keeps focus on gameplay and learning, with pixel art that's crisp and colorful. The interface should feel immediate and responsive, celebrating each small victory with satisfying feedback while maintaining the tight, focused feeling of retro games where every pixel mattered.

## Color Selection

Custom palette inspired by classic 8-bit gaming consoles with high contrast for clarity

- **Primary Color**: Deep Terminal Green (#2ECC71 / oklch(0.72 0.15 145)) - Evokes classic terminal/Matrix aesthetic, used for correct commands and success states, communicates "code" and "programming"
- **Secondary Colors**: 
  - Retro Blue (#3498DB / oklch(0.62 0.13 230)) for informational elements and water/ground tiles
  - Pixel Purple (#9B59B6 / oklch(0.52 0.15 310)) for advanced concepts and special items
- **Accent Color**: Warning Yellow (#F39C12 / oklch(0.72 0.16 65)) - High visibility for hints, objectives, and interactive elements that demand attention
- **Foreground/Background Pairings**:
  - Background (Dark Slate #1A1D23 / oklch(0.15 0.01 265)): Bright White text (#FFFFFF / oklch(1 0 0)) - Ratio 13.2:1 ✓
  - Card (Deep Gray #2C3E50 / oklch(0.28 0.02 250)): Bright White text - Ratio 10.1:1 ✓
  - Primary (Terminal Green): White text (#FFFFFF) - Ratio 4.8:1 ✓
  - Secondary (Retro Blue): White text (#FFFFFF) - Ratio 5.2:1 ✓
  - Accent (Warning Yellow): Dark text (#1A1D23) - Ratio 8.5:1 ✓
  - Muted (Medium Gray #5A6C7D / oklch(0.48 0.02 240)): White text - Ratio 6.2:1 ✓

## Font Selection

Typography should feel both nostalgic and legible—a pixel font for game UI and headings to nail the 8-bit aesthetic, paired with a clean monospace for command input to feel like a real terminal.

- **Typographic Hierarchy**:
  - H1 (Game Title): Press Start 2P Bold / 32px / wide letter-spacing (2px) - Authentic 8-bit game feel
  - H2 (Level Titles): Press Start 2P Regular / 20px / normal spacing - Section headers
  - H3 (Instructions): Press Start 2P Regular / 14px / normal spacing - Tutorial text
  - Body (General UI): Fira Code Regular / 16px / standard monospace - Readable yet technical
  - Input (Command Terminal): Fira Code Medium / 18px / standard monospace - Terminal authenticity
  - Small (Hints): Fira Code Regular / 14px / standard monospace - Secondary information

## Animations

Animations should feel snappy and responsive like classic 8-bit games—no smooth easing curves here, but rather stepped keyframes that give that authentic pixel-perfect feel. Movement is instant and grid-based, while feedback animations are quick celebratory flourishes.

- **Purposeful Meaning**: Every animation reinforces the retro gaming metaphor—character walk cycles use frame-by-frame sprite animation, command success triggers screen shake and particle effects, level completion shows expanding pixel rings
- **Hierarchy of Movement**: Character movement is immediate (no easing), UI feedback animations are 150-200ms stepped animations, tutorial overlays slide in with 8-frame stepped motion

## Component Selection

- **Components**: 
  - Dialog for level start tutorials and completion screens with pixel border styling
  - Card for level select tiles with hover states (lift effect)
  - Input for command terminal with monospace font and terminal styling
  - Button with pixel art borders for navigation (Start, Next Level, Hint)
  - Progress bar with pixel block segments showing level completion
  - Badge for completed level indicators
  - Tabs for switching between different learning sections (Commands, Concepts, Internals)
  
- **Customizations**: 
  - Custom pixel art Canvas component for game rendering (character, tilemap, Git visualizations)
  - Custom CommandTerminal component styled as retro CRT display
  - Custom LevelMap component for progression tree visualization
  
- **States**: 
  - Buttons: Default has pixel border shadow, hover lifts up 2px with brighter colors, active shows pressed state (drops back down), disabled shows grayed out with reduced opacity
  - Input: Focus shows blinking cursor animation, valid command shows green border flash, invalid shows red shake animation
  - Level cards: Locked shows grayscale with lock icon, unlocked shows full color with pulse animation, completed shows checkmark badge
  
- **Icon Selection**: 
  - Phosphor icons in duotone style sized 24px for UI chrome: GitBranch, GitCommit, GitFork, GitPullRequest for Git concepts; ArrowUp/Down/Left/Right for movement hints; Play, Pause for game controls; LightbulbFilament for hints; Trophy for completion
  
- **Spacing**: 
  - Base unit of 8px (one pixel tile) for authentic grid feel
  - Card padding: 16px (2 tiles)
  - Section gaps: 24px (3 tiles)
  - Level select grid: gap-4 (16px between tiles)
  
- **Mobile**: 
  - Desktop-first with game canvas centered, commands below
  - Mobile shows virtual D-pad overlay for movement (positioned bottom-left)
  - Command input becomes sticky bottom sheet on mobile
  - Level select switches from grid to single column vertical scroll
  - Touch targets minimum 44x44px for virtual buttons
