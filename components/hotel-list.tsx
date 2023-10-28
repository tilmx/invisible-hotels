import styled from '@emotion/styled';
import hotels from '../data/hotels.json';
import countries from '../data/countries.json';
import { Check, Send, Star, X } from 'lucide-react';
import { FunctionComponent, useEffect, useState } from 'react';
import { Overlay } from './overlay';
import { checkIfCookiesAllowed, getVacationTypeIcon, saveToLocalStorage, setCookieOptIn } from '../utils';
import { Breakpoint, Color, Size } from './tokens';
import { PlaceholderCard } from './placeholder-card';
import { Text, TextSize } from './text';
import { AlignItems, Flex, OutsideClick } from './utils';
import { Button } from './button';
import { Wrapper } from './wrapper';
import { Filter } from './filter';
import { CountrySelect, CountrySelectFlyout } from './country-select';
import { HotelCard } from './hotel-card';

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

const StyledButtonWrapper = styled.a`
    color: inherit;
    text-decoration: inherit;
`;

export const HotelList: FunctionComponent = () => {
    const filterOptions = ["Sea", "Mountains", "Countryside", "City"];
    const [vacationFilter, setVacationFilter] = useState<string | undefined>();
    const [countryFilter, setCountryFilter] = useState<string | undefined>();
    const [countryFilterOpen, setCountryFilterOpen] = useState(false);
    const [starredHotels, setStarredHotels] = useState<string[]>([]);
    useEffect(() => {
        const stored = window.localStorage.getItem('starred-hotels');
        stored && setStarredHotels(JSON.parse(stored));
    }, [])
    const [starredHotelsFilterActive, setStarredHotelsFilterActive] = useState(false);

    const filteredHotels = hotels.filter(hotel =>
        (typeof vacationFilter === 'undefined' ? true : vacationFilter === hotel.vacationType)
        && (typeof countryFilter === 'undefined' ? true : countryFilter === hotel.country)
        && ((starredHotelsFilterActive && starredHotels.length > 0) ? starredHotels.includes(hotel.id) : true)
    )

    const emptyState = filteredHotels.length === 0;

    const [cookieOptOverlayVisible, setCookieOptOverlayVisible] = useState(false);

    function saveStarredHotelsToLocalStorage(list: string[]) {
        saveToLocalStorage({ key: 'starred-hotels', value: JSON.stringify(list) });
    }

    return (
        <StyledContainer>
            {cookieOptOverlayVisible &&
                <Overlay
                    title='Save your favorites locally'
                    description='We will save a little cookie with your favorite hotels in this browser. Fine for you?'
                    onOutsideClick={() => {
                        setCookieOptOverlayVisible(false);
                        // clear list immediately if cookies not accepted
                        setStarredHotels([]);
                    }}
                >
                    <Button iconLeft={<Check />} onClick={() => {
                        setCookieOptIn();
                        saveStarredHotelsToLocalStorage(starredHotels);
                        setCookieOptOverlayVisible(false);
                    }}>Yes, sure</Button>
                    <Button iconLeft={<X />} onClick={() => {
                        setCookieOptOverlayVisible(false);
                        // clear list immediately if cookies not accepted
                        setStarredHotels([]);
                    }}>No thanks</Button>
                </Overlay>
            }
            <Wrapper>
                <StyledLabel size={TextSize.Regular} color={Color.Text50}>{(vacationFilter || countryFilter) ? 'Filtered' : 'Filter all'} {filteredHotels.length} hotels & apartments</StyledLabel>
            </Wrapper>
            <StyledFilterBar>
                <Wrapper>
                    <StyledFilterBarOptions alignItems={AlignItems.FlexStart} flexWrap='wrap'>
                        {filterOptions.map((option, i) => {
                            const selected = vacationFilter === option;
                            return (
                                <Filter key={i} icon={getVacationTypeIcon(option)} label={option} selected={selected} onClick={() => setVacationFilter(selected ? undefined : option)} />
                            )
                        })}
                        <StyledCountrySelect
                            label='All Countries'
                            value={countryFilter}
                            active={typeof countryFilter !== 'undefined' || countryFilterOpen}
                            disabled={countryFilterOpen}
                            onClick={() => setCountryFilterOpen(!countryFilterOpen)}
                        />
                        {starredHotels.length > 0 &&
                            <Filter icon={<Star />} selected={starredHotelsFilterActive} onClick={() => setStarredHotelsFilterActive(!starredHotelsFilterActive)} />
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
                            }}
                        />
                    </OutsideClick>
                </Wrapper>
            </StyledFilterBar>
            <Wrapper wide>
                <StyledGrid>
                    {filteredHotels.map((hotel, i) => {
                        const starred = starredHotels.includes(hotel.id);
                        return (
                            <HotelCard
                                key={i}
                                title={hotel.name}
                                location={`${hotel.city}, ${hotel.country}`}
                                housingType={hotel.housingType}
                                vacationType={hotel.vacationType}
                                visited={hotel.visited}
                                links={{
                                    bookingCom: hotel.links.bookingCom,
                                    hotel: hotel.links.hotel
                                }}
                                image={hotel.image}
                                starred={starred}
                                onStarClick={e => {
                                    e.preventDefault();
                                    const newList = !starred ? [...starredHotels, hotel.id] : [...starredHotels.filter(id => id !== hotel.id)];
                                    setStarredHotels(newList);
                                    if (checkIfCookiesAllowed()) {
                                        saveStarredHotelsToLocalStorage(newList)
                                    }
                                    else {
                                        setCookieOptOverlayVisible(true);
                                    }
                                }}
                            />
                        )
                    }
                    )}
                    <StyledPlaceholderCard emptyState={emptyState}>
                        <Text center size={TextSize.Regular}>{emptyState ? "It looks like we haven't been in such a place. Any tips?" : "You have a secret hotel tip for us or some feedback? Let us know!"}</Text>
                        <StyledButtonWrapper href={`mailto:mail@invisible-hotels.com?subject=${encodeURI('I have a secret hotel tip for you!')}&body=${encodeURI('Hey Annika and Tilman! \n\n I have a super secret hotel tip for you — here it is:')}`}>
                            <Button iconLeft={<Send />} small secondary>Send E-Mail</Button>
                        </StyledButtonWrapper>
                    </StyledPlaceholderCard>
                </StyledGrid>
            </Wrapper>
        </StyledContainer>
    )
}
