import { create } from 'zustand'

interface FilterState {
    vacationTypeFilter?: string;
    setVacationTypeFilter: (value?: string) => void;

    countryFilter?: string;
    setCountryFilter: (value?: string) => void;

    favoritesFilter: boolean;
    setFavoritesFilter: (value: boolean) => void;
}

export const useFilterStore = create<FilterState>((set) => ({
    vacationTypeFilter: undefined,
    setVacationTypeFilter: value => set({ vacationTypeFilter: value }),

    countryFilter: undefined,
    setCountryFilter: value => set({ countryFilter: value }),

    favoritesFilter: false,
    setFavoritesFilter: value => set({ favoritesFilter: value })
}))
