import { create } from 'zustand';

export type PageKey = 'learn' | 'manage' | 'play';

interface UIState {
  activePage: PageKey;
  lowMotion: boolean;
  isCreateModalOpen: boolean;
  setActivePage: (page: PageKey) => void;
  toggleLowMotion: () => void;
  openCreateModal: () => void;
  closeCreateModal: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  activePage: 'play',
  lowMotion: false,
  isCreateModalOpen: false,
  setActivePage: (page) => set({ activePage: page }),
  toggleLowMotion: () => set((state) => ({ lowMotion: !state.lowMotion })),
  openCreateModal: () => set({ isCreateModalOpen: true }),
  closeCreateModal: () => set({ isCreateModalOpen: false })
}));
