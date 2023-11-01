import { create } from 'zustand'

interface FilterState {
    favorites: string[];
    setFavorites: (value?: string[]) => void;
}

export const useFavoriteStore = create<FilterState>((set) => ({
    favorites: [],
    setFavorites: value => set({ favorites: value }),
}))
