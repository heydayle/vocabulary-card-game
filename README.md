# LexiPlay – Liquid Glass Vocabulary Studio

An immersive vocabulary trainer with a liquid-glass inspired interface that helps learners practice English vocabulary using bilingual flashcards. Cards are stored locally in IndexedDB, allowing you to create, manage, and play without any backend.

## Features

- 🫧 Liquid glass stage with layered depth, translucent cards, and soft lighting.
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
    ui/        # Header, glass panels, and collection management
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

- Designed with GPU-accelerated gradients and blurs for smooth rendering.
- Low-motion toggle reduces animation for motion-sensitive users.
- Responsive layout adapts for tablets and smaller displays.

Enjoy mastering new words with LexiPlay! ✨
