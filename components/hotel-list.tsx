import styled from '@emotion/styled';
import hotelsPreview from '../data/hotels-preview.json';
import countries from '../data/countries.json';
import { Send, Star } from 'lucide-react';
import { FunctionComponent, useEffect, useState } from 'react';
import { checkIfFavoritesStored, getVacationTypeIcon } from '../utils';
import { PlaceholderCard } from './placeholder-card';
import { Text, TextSize } from './text';
import { AlignItems, Flex } from './utils/flex';
import { OutsideClick } from './utils/outside-click';
import { UnstyledLink } from './utils/link';
import { Button } from './button';
import { Wrapper } from './wrapper';
import { Filter } from './filter';
import { CountrySelect, CountrySelectFlyout } from './country-select';
import { HotelCard } from './hotel-card';
import { Size } from './tokens/size';
import { Breakpoint } from './tokens/breakpoint';
import { Color } from './tokens/colors';
import { useFilterStore } from '../store/filter';
import { useFavoriteStore } from '../store/favorites';
import { usePlausible } from 'next-plausible';

const StyledContainer = styled.div`
    margin-top: ${Size.XXXL};
    padding-top: ${Size.XL};

    ${Breakpoint.Tablet} {
        margin-top: ${Size.XXL};
        grid-template-columns: 1fr;
    }

    ${Breakpoint.Mobile} {
        margin-top: ${Size.XL};
    }
`;

const StyledGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: ${Size.M};
    margin-top: ${Size.XXXL};

    ${Breakpoint.DesktopSmall} {
        grid-template-columns: repeat(2, 1fr);
    }

    ${Breakpoint.TabletSmall} {
        grid-template-columns: 1fr;
        margin-top: ${Size.XL};
    }
    ${Breakpoint.Mobile} {
        gap: ${Size.XS};
    }
`;

const StyledPlaceholderCard = styled(PlaceholderCard) <{ emptyState: boolean; }>`
    ${props => props.emptyState && `
        max-width: 400px;
        place-self: center;
        grid-column: 1/4;
    `}
`;

const StyledLabel = styled(Text)`
    z-index: 11;
    position: relative;
    transform: translate3d(0,0,0); 
    margin-bottom: ${Size.XS};
`;

const StyledFilterBar = styled.div`
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

const StyledFilterBarOptions = styled(Flex)`
    background: ${Color.Background80};
    backdrop-filter: blur(16px);
    border-radius: ${Size.XL};
    padding: calc(${Size.S} + ${Size.XXXS}) ${Size.M};
    margin: 0 -${Size.M};
    box-shadow: 0 ${Size.S} ${Size.XL} ${Color.Shadow}, inset 0 0 0 1px ${Color.Text10};
    gap: ${Size.XXS};

    ${Breakpoint.Tablet} {
        padding: ${Size.S};
        margin: 0 -${Size.S};
        border-radius: calc(${Size.M} + ${Size.XXS});
    }

    ${Breakpoint.Mobile} {
        padding: ${Size.XS};
        margin: 0 -${Size.XS};
        border-radius: ${Size.M};
    }
`;

const StyledCountrySelect = styled(CountrySelect)`
    margin-left: auto;
    flex-shrink: 0;

    ${Breakpoint.Tablet} {
        margin-left: 0;
    }
`;

export const HotelList: FunctionComponent = () => {
    const plausible = usePlausible()

    useEffect(() => {
        checkIfFavoritesStored() && useFavoriteStore.persist.rehydrate();
    }, [])

    const vacationTypeFilterOptions = ["Sea", "Mountains", "Countryside", "City"];

    const vacationTypeFilter = useFilterStore(state => state.vacationTypeFilter);
    const setVacationTypeFilter = useFilterStore(state => state.setVacationTypeFilter);

    const countryFilter = useFilterStore(state => state.countryFilter);
    const setCountryFilter = useFilterStore(state => state.setCountryFilter);

    const [countryFilterOpen, setCountryFilterOpen] = useState(false);

    const favoritesFilter = useFilterStore(state => state.favoritesFilter);
    const setFavoritesFilter = useFilterStore(state => state.setFavoritesFilter);

    const favorites = useFavoriteStore(state => state.favorites);
    const addFavorite = useFavoriteStore(state => state.addFavorite);
    const removeFavorite = useFavoriteStore(state => state.removeFavorite);

    const filteredHotels = hotelsPreview.filter(hotel =>
        (typeof vacationTypeFilter === 'undefined' ? true : vacationTypeFilter === hotel.vacationType)
        && (typeof countryFilter === 'undefined' ? true : countryFilter === hotel.country)
        && ((favoritesFilter && favorites.length > 0) ? favorites.includes(hotel.id) : true)
    )

    const isEmpty = filteredHotels.length === 0;

    return (
        <StyledContainer>
            <Wrapper>
                <StyledLabel size={TextSize.Regular} color={Color.Text50}>{(vacationTypeFilter || countryFilter) ? 'Filtered' : 'Filter all'} {filteredHotels.length} hotels & apartments</StyledLabel>
            </Wrapper>
            <StyledFilterBar>
                <Wrapper>
                    <StyledFilterBarOptions alignItems={AlignItems.FlexStart} flexWrap='wrap'>
                        {vacationTypeFilterOptions.map((option, i) => {
                            const selected = vacationTypeFilter === option;
                            return (
                                <Filter key={i} icon={getVacationTypeIcon(option)} label={option} selected={selected} onClick={() => {
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
                            <Filter icon={<Star />} selected={favoritesFilter} onClick={() => {
                                !favoritesFilter && plausible('enable-filter', { props: { filter: 'Favorites' } })
                                setFavoritesFilter(!favoritesFilter);
                            }} />
                        }
                    </StyledFilterBarOptions>
                    <OutsideClick onOutsideClick={() => setCountryFilterOpen(false)}>
                        <CountrySelectFlyout
                            options={countries}
                            label='All Countries'
                            open={countryFilterOpen}
                            value={countryFilter}
                            onSet={country => {
                                setCountryFilter(country);
                                setCountryFilterOpen(false);
                                plausible('select-country-filter', { props: { country: country } })
                            }}
                        />
                    </OutsideClick>
                </Wrapper>
            </StyledFilterBar>
            <Wrapper wide>
                <StyledGrid>
                    {filteredHotels.map((hotel, i) => {
                        const isFavorite = favorites.includes(hotel.id);
                        return (
                            <HotelCard
                                key={i}
                                title={hotel.name}
                                city={hotel.city}
                                country={hotel.country}
                                housingType={hotel.housingType}
                                vacationType={hotel.vacationType}
                                visited={hotel.visited}
                                id={hotel.id}
                                image={hotel.image}
                                starred={isFavorite}
                                onStarClick={e => {
                                    e.preventDefault();
                                    if (isFavorite) {
                                        removeFavorite(hotel.id)
                                        plausible('remove-from-favorites', { props: { hotel: hotel.id } })
                                    }
                                    else {
                                        addFavorite(hotel.id)
                                        plausible('add-to-favorites', { props: { hotel: hotel.id } })
                                    }
                                }}
                            />
                        )
                    }
                    )}
                    <StyledPlaceholderCard emptyState={isEmpty}>
                        <Text center size={TextSize.Regular}>{isEmpty ? "It looks like we haven't been in such a place. Any tips?" : "You have a secret hotel tip for us or some feedback? Let us know!"}</Text>
                        <UnstyledLink href={`mailto:mail@invisible-hotels.com?subject=${encodeURI('I have a secret hotel tip for you!')}&body=${encodeURI('Hey Annika and Tilman! \n\n I have a super secret hotel tip for you — here it is:')}`}>
                            <Button iconLeft={<Send />} small secondary>Send E-Mail</Button>
                        </UnstyledLink>
                    </StyledPlaceholderCard>
                </StyledGrid>
            </Wrapper>
        </StyledContainer>
    )
}
