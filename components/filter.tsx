import { FunctionComponent, useState } from "react";
import styled from "@emotion/styled";
import { Color } from "./tokens/colors";
import { getVacationTypeIcon, track } from "../utils";
import { CountrySelect, CountrySelectFlyout } from "./country-select";
import { Breakpoint } from "./tokens/breakpoint";
import { Wrapper } from "./wrapper";
import { FilterItem } from "./filter-item";
import { useFilterStore } from "../store/filter";
import { useFavoriteStore } from "../store/favorites";
import { OutsideClick } from "./utils/outside-click";
import { ChevronDownIcon, SearchIcon, StarIcon } from "lucide-react";
import countries from '../data/countries.json';
import { Search } from "./search";
import { vacationTypeFilterOptions } from "../data/site";

const StyledContainer = styled.div`
    position: sticky;
    top: var(--size-m);
    z-index: 10;

    ${Breakpoint.Tablet} {
        top: var(--size-xs);
    }

    ${Breakpoint.Mobile} {
        top: var(--size-xxs);
    }
`;

const StyledFilterBar = styled.div`
    background: var(--color-background80);
    backdrop-filter: blur(16px);
    border-radius: var(--size-xl);
    padding: 0 var(--size-m);
    margin: 0 calc(-1 * var(--size-m));
    box-shadow: 0 var(--size-s) var(--size-xl) var(--color-shadow), inset 0 0 0 1px var(--color-text10);
    position: relative;

    ${Breakpoint.Tablet} {
        padding: 0 var(--size-s);
        margin: 0 calc(-1 * var(--size-s));
        border-radius: calc(var(--size-m) + var(--size-xxs));
    }

    ${Breakpoint.Mobile} {
        padding: 0 var(--size-xs);
        margin: 0 calc(-1 * var(--size-xs));
        border-radius: var(--size-m);
    }
`;

const StyledFilterBarInner = styled.div <{ filterExpanded: boolean; searchActive: boolean; }>`  
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
    gap: var(--size-xxs);
    height: 100%;
    overflow: hidden;
    padding: calc(var(--size-s) + var(--size-xxxs)) 0;
    box-sizing: border-box;

    ${props => props.searchActive && `
        visibility: hidden;
    `}

    ${Breakpoint.Tablet} {
        padding: var(--size-s) 0;
    }

    ${Breakpoint.Mobile} {
        padding: var(--size-xs) 0;
        padding-right: var(--size-l);

        ${props => !props.filterExpanded && `
            max-height: var(--size-xxl);
            mask-image: linear-gradient(black 60%, transparent);
        `}
    }
`;

const StyledCountrySelect = styled(CountrySelect)`
    margin-left: auto;
    flex-shrink: 0;

    ${Breakpoint.Tablet} {
        margin-left: 0;
    }
`;

const StyledExpandArea = styled.div<{ filterExpanded: boolean; }>`
    position: absolute;
    right: 0;
    padding-right: var(--size-xs);
    top: 0;
    height: 100%;
    z-index: 1;
    align-items: center;
    display: none;

    svg {
        padding: var(--size-xxxxs);
        border-radius: 50%;
        background: var(--color-text10);
        width: 20px;
        height: 20px;
        transition: transform .2s;
        transform: rotate(${props => props.filterExpanded ? '180deg' : '0deg'});
    }

    :active svg {
        background: var(--color-text20);
    }

    ${Breakpoint.Mobile} {
        display: flex;
    }
`;

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
        <StyledContainer>
            <Wrapper>
                <StyledFilterBar>
                    <StyledFilterBarInner searchActive={searchActive} filterExpanded={filterExpanded}>
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
                        <StyledCountrySelect
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
                    </StyledFilterBarInner>
                    {(searchActive && setSearchTerm) &&
                        <Search
                            onChange={value => setSearchTerm(value)}
                            onCloseClick={() => toggleSearchActive()}
                        />
                    }
                    {!searchActive &&
                        <StyledExpandArea filterExpanded={filterExpanded} onClick={() => toggleFilterExpanded()}>
                            <ChevronDownIcon color={Color.Text60} />
                        </StyledExpandArea>
                    }
                </StyledFilterBar>
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
        </StyledContainer>
    )
}
