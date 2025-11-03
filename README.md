# 🎮 GitQuest - Learn Git Through 8-Bit Adventure

**🏆 Winner - Creativity Category, GitHub Spark Challenge @GitHub Universe 2025** [Spark Challenge](https://github.com/ghlearn-universe/git-visualizer-instructions/discussions/1)

GitQuest is an interactive 8-bit adventure game that teaches Git concepts through engaging gameplay. Battle code monsters, learn Git commands, and master version control while enjoying a retro gaming experience!

## ✨ Created with GitHub Spark

This application was built using [GitHub Spark](https://github.com/features/spark), an AI-powered tool that helps you create micro-apps instantly. GitHub Spark enables rapid development of beautiful, functional web applications through natural language prompts.

## :space_invader: Demo

https://git-quest-gh-learn--el-portero.github.app

## 🚀 Features

- **Interactive Learning**: Learn Git commands through hands-on gameplay
- **8-Bit Aesthetic**: Retro pixel art design with authentic CRT scanline effects
- **Progressive Levels**: 6 levels covering essential Git concepts from basics to branching
- **Real Commands**: Practice actual Git commands in a safe, game-like environment
- **Persistent Progress**: Your game progress is automatically saved

## 🛠️ Technical Stack

- **Framework**: React 19 with TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui v4
- **Build Tool**: Vite
- **Icons**: Phosphor Icons
- **Fonts**: Press Start 2P, Fira Code
- **State Management**: GitHub Spark KV (persistent storage)

## 🏃 How to Run

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)

### Installation & Development

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser**:
   Navigate to `http://localhost:5173` (or the port shown in your terminal)

### Build for Production

```bash
npm run build
```

The production build will be created in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## 🎯 How to Play

1. Start from the main menu or select a level
2. Read the tutorial to learn about Git concepts
3. Battle enemies by typing Git commands
4. Complete all levels to master Git fundamentals!

## :question: Answers

Level 1
- `git init`

Level 2
- `git add readme.md`
- `git add index.html`
- `git add style.css`

Level 3
- `git commit -m "test"`

Level 4
- `git status`
- `git log`

Level 5
- `git log --oneline`
- `git diff`

Level 6
- `git merge feature`

Level 7
- `git checkout -b feature`

Level 8
- `git cat-file -t HEAD`
- `git cat-file -p HEAD`
- `git rev-list --objects --all`
