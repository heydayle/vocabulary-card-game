import { create } from 'zustand';

export type PageKey = 'learn' | 'create' | 'manage' | 'play';

interface UIState {
  activePage: PageKey;
  lowMotion: boolean;
  setActivePage: (page: PageKey) => void;
  toggleLowMotion: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  activePage: 'play',
  lowMotion: false,
  setActivePage: (page) => set({ activePage: page }),
  toggleLowMotion: () => set((state) => ({ lowMotion: !state.lowMotion }))
}));
