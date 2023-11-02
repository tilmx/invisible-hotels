import { create } from 'zustand'

interface FilterState {
    favorites: string[];
    addFavorite: (value: string) => void;
    removeFavorite: (value: string) => void;
    setFavorites: (value?: string[]) => void;
    clearFavorites: () => void;
}

export const useFavoriteStore = create<FilterState>((set) => ({
    favorites: [],
    addFavorite: value => set(state => ({ favorites: [...state.favorites, value] })),
    removeFavorite: value => set(state => ({ favorites: [...state.favorites.filter(favorite => favorite !== value)] })),
    setFavorites: value => set({ favorites: value }),
    clearFavorites: () => set({ favorites: [] })
}))
