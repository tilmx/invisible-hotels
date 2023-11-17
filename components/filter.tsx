import { FunctionComponent, useState } from "react";
import styled from "@emotion/styled";
import { Color } from "./tokens/colors";
import { getVacationTypeIcon } from "../utils";
import { CountrySelect, CountrySelectFlyout } from "./country-select";
import { Breakpoint } from "./tokens/breakpoint";
import { Wrapper } from "./wrapper";
import { AlignItems, Flex } from "./utils/flex";
import { FilterItem } from "./filter-item";
import { useFilterStore } from "../store/filter";
import { useFavoriteStore } from "../store/favorites";
import { usePlausible } from "next-plausible";
import { Size } from "./tokens/size";
import { OutsideClick } from "./utils/outside-click";
import { ChevronDownIcon, SearchIcon, StarIcon } from "lucide-react";
import countries from '../data/countries.json';
import { Search } from "./search";
import { vacationTypeFilterOptions } from "../data/site";

const StyledContainer = styled.div`
    position: sticky;
    top: ${Size.M};
    z-index: 10;

    ${Breakpoint.Tablet} {
        top: ${Size.XS};
    }

    ${Breakpoint.Mobile} {
        top: ${Size.XXS};
    }
`;

const StyledFilterBar = styled.div`
    background: ${Color.Background80};
    backdrop-filter: blur(16px);
    border-radius: ${Size.XL};
    padding: 0 ${Size.M};
    margin: 0 -${Size.M};
    box-shadow: 0 ${Size.S} ${Size.XL} ${Color.Shadow}, inset 0 0 0 1px ${Color.Text10};
    position: relative;

    ${Breakpoint.Tablet} {
        padding: 0 ${Size.S};
        margin: 0 -${Size.S};
        border-radius: calc(${Size.M} + ${Size.XXS});
    }

    ${Breakpoint.Mobile} {
        padding: 0 ${Size.XS};
        margin: 0 -${Size.XS};
        border-radius: ${Size.M};
    }
`;

const StyledFilterBarInner = styled(Flex) <{ filterExpanded: boolean; searchActive: boolean; }>`  
    gap: ${Size.XXS};
    height: 100%;
    overflow: hidden;
    padding: calc(${Size.S} + ${Size.XXXS}) 0;
    box-sizing: border-box;

    ${props => props.searchActive && `
        visibility: hidden;
    `}

    ${Breakpoint.Tablet} {
        padding: ${Size.S} 0;
    }

    ${Breakpoint.Mobile} {
        padding: ${Size.XS} 0;
        padding-right: ${Size.L};

        ${props => !props.filterExpanded && `
            max-height: ${Size.XXL};
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
    padding-right: ${Size.XS};
    top: 0;
    height: 100%;
    z-index: 1;
    align-items: center;
    display: none;

    svg {
        padding: ${Size.XXXXS};
        border-radius: 50%;
        background: ${Color.Text10};
        width: 20px;
        height: 20px;
        transition: transform .2s;
        transform: rotate(${props => props.filterExpanded ? '180deg' : '0deg'});
    }

    :active svg {
        background: ${Color.Text20};
    }

    ${Breakpoint.Mobile} {
        display: flex;
    }
`;

export const Filter: FunctionComponent = () => {
    const plausible = usePlausible();

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
                    <StyledFilterBarInner searchActive={searchActive} filterExpanded={filterExpanded} alignItems={AlignItems.FlexStart} flexWrap='wrap'>
                        {vacationTypeFilterOptions.map((option, i) => {
                            const selected = vacationTypeFilter === option;
                            return (
                                <FilterItem key={i} icon={getVacationTypeIcon(option)} label={option} selected={selected} onClick={() => {
                                    setVacationTypeFilter(selected ? undefined : option);
                                    !selected && plausible('enable-filter', { props: { filter: option } })
                                }} />
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
                            <FilterItem icon={<StarIcon />} selected={favoritesFilter} onClick={() => {
                                !favoritesFilter && plausible('enable-filter', { props: { filter: 'Favorites' } })
                                setFavoritesFilter(!favoritesFilter);
                            }} />
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
                            plausible('enable-filter', { props: { filter: 'Country', country: country } })
                        }}
                    />
                </OutsideClick>
            </Wrapper>
        </StyledContainer>
    )
}
