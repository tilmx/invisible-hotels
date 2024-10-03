import { FunctionComponent, useState } from "react";
import { Color } from "./tokens/colors";
import { getVacationTypeIcon, track } from "../utils";
import { CountrySelect, CountrySelectFlyout } from "./country-select";
import { Wrapper } from "./wrapper";
import { FilterItem } from "./filter-item";
import { useFilterStore } from "../store/filter";
import { useFavoriteStore } from "../store/favorites";
import { OutsideClick } from "./utils/outside-click";
import { ChevronDownIcon, SearchIcon, StarIcon } from "lucide-react";
import countries from '../data/countries.json';
import { Search } from "./search";
import { vacationTypeFilterOptions } from "../data/site";
import styles from './filter.module.scss';
import clsx from "clsx";

export const Filter: FunctionComponent = () => {
    const filterExpanded = useFilterStore(state => state.filterExpanded);
    const toggleFilterExpanded = useFilterStore(state => state.toggleFilterExpanded);

    const vacationTypeFilter = useFilterStore(state => state.vacationTypeFilter);
    const setVacationTypeFilter = useFilterStore(state => state.setVacationTypeFilter);

    const countryFilter = useFilterStore(state => state.countryFilter);
    const setCountryFilter = useFilterStore(state => state.setCountryFilter);

    const [countryFilterOpen, setCountryFilterOpen] = useState(false);

    const favoritesFilter = useFilterStore(state => state.favoritesFilter);
    const setFavoritesFilter = useFilterStore(state => state.setFavoritesFilter);

    const favorites = useFavoriteStore(state => state.favorites);

    const searchActive = useFilterStore(state => state.searchActive);
    const toggleSearchActive = useFilterStore(state => state.toggleSearchActive);
    const setSearchTerm = useFilterStore(state => state.setSearchTerm);

    return (
        <div className={styles.filter}>
            <Wrapper>
                <div className={styles.filterBar}>
                    <div className={clsx(styles.filterBarInner, searchActive && styles.searchActive, filterExpanded && styles.expanded)}>
                        {vacationTypeFilterOptions.map((option, i) => {
                            const selected = vacationTypeFilter === option;
                            return (
                                <FilterItem
                                    key={i}
                                    icon={getVacationTypeIcon(option, false)}
                                    label={option}
                                    selected={selected}
                                    onClick={() => {
                                        setVacationTypeFilter(selected ? undefined : option);
                                        !selected && track('Enable Filter', { Filter: option })
                                    }}
                                />
                            )
                        })}
                        <CountrySelect
                            className={styles.countrySelect}
                            label='All Countries'
                            value={countryFilter}
                            active={typeof countryFilter !== 'undefined' || countryFilterOpen}
                            disabled={countryFilterOpen}
                            onClick={() => setCountryFilterOpen(!countryFilterOpen)}
                        />
                        {favorites.length > 0 &&
                            <FilterItem
                                icon={<StarIcon />}
                                selected={favoritesFilter}
                                onClick={() => {
                                    setFavoritesFilter(!favoritesFilter)
                                    !favoritesFilter && track('Enable Filter', { Filter: 'Favorites' })
                                }}
                            />
                        }
                        <FilterItem icon={<SearchIcon />} selected={searchActive} onClick={() => toggleSearchActive()} />
                    </div>
                    {(searchActive && setSearchTerm) &&
                        <Search
                            onChange={value => setSearchTerm(value)}
                            onCloseClick={() => toggleSearchActive()}
                        />
                    }
                    {!searchActive &&
                        <div className={clsx(styles.expand, filterExpanded && styles.expanded)} onClick={() => toggleFilterExpanded()}>
                            <ChevronDownIcon color={Color.Text60} />
                        </div>
                    }
                </div>
                <OutsideClick onOutsideClick={() => setCountryFilterOpen(false)}>
                    <CountrySelectFlyout
                        options={countries}
                        label='All Countries'
                        open={countryFilterOpen}
                        value={countryFilter}
                        onSet={country => {
                            setCountryFilter(country);
                            setCountryFilterOpen(false);
                            track('Enable Filter', { Filter: 'Country', Country: country || 'All' })
                        }}
                    />
                </OutsideClick>
            </Wrapper>
        </div>
    )
}
