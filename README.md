# LexiPlay – 3D Vocabulary Flashcards

An interactive 3D mini-game built with React, Vite, and Three.js that helps learners practice English vocabulary using bilingual flashcards. Cards are stored locally in IndexedDB, allowing you to create, manage, and play without any backend.

## Features

- 🎴 3D playground with a card table, animated flips, and orbit controls.
- 🔊 Pronunciation via the Web Speech API with quick speaker buttons.
- 🧠 Mini-game loop: shuffle → flip → self-assess → track stats.
- ✍️ Full CRUD for flashcards (word, Vietnamese meaning, phonetics, examples, tags).
- 💾 Persistent storage using Dexie + IndexedDB with 18 seeded demo cards.
- ⌨️ Keyboard shortcuts: `Space` flip, `J` correct, `K` wrong, `N` next.
- 🧭 Navigation for Learn, Create, Manage, and Play modes.
- 🛡️ Low-motion mode for accessibility.

## Getting Started

```bash
pnpm install
pnpm dev
```

Then open the dev server URL shown in the console (usually http://localhost:5173).

## Project Structure

```
src/
  components/
    3d/        # Three.js / R3F meshes and scene setup
    ui/        # Header, forms, panels, and lists
  db/          # Dexie database + seed data
  game/        # Game loop utilities and shuffle logic
  hooks/       # Custom hooks (speech synthesis)
  models/      # Shared TypeScript interfaces
  pages/       # Page-level UI for nav routes
  stores/      # Zustand stores for cards + game state
```

## Scripts

- `pnpm dev` – start the Vite dev server
- `pnpm build` – type-check and bundle for production
- `pnpm preview` – preview the production build
- `pnpm lint` – run ESLint against the TypeScript sources

## Accessibility & Performance

- Designed for 60 FPS rendering with lightweight lighting and materials.
- Low-motion toggle reduces animation for motion-sensitive users.
- Responsive layout adapts for tablets and smaller displays.

Enjoy mastering new words with LexiPlay! ✨
