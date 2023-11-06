import { create } from 'zustand'

interface FilterState {
    filterExpanded: boolean;
    toggleFilterExpanded: () => void;

    vacationTypeFilter?: string;
    setVacationTypeFilter: (value?: string) => void;

    countryFilter?: string;
    setCountryFilter: (value?: string) => void;

    favoritesFilter: boolean;
    setFavoritesFilter: (value: boolean) => void;
}

export const useFilterStore = create<FilterState>((set) => ({
    filterExpanded: false,
    toggleFilterExpanded: () => set((state) => ({ filterExpanded: !state.filterExpanded })),

    vacationTypeFilter: undefined,
    setVacationTypeFilter: value => set({ vacationTypeFilter: value }),

    countryFilter: undefined,
    setCountryFilter: value => set({ countryFilter: value }),

    favoritesFilter: false,
    setFavoritesFilter: value => set({ favoritesFilter: value })
}))
