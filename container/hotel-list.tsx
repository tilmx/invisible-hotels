import styled from '@emotion/styled';
import { Breakpoint, Color, Filter, Flex, AlignItems, HotelCard, CountrySelect, Size, Text, TextSize, Wrapper, CountrySelectFlyout, OutsideClick, PlaceholderCard, Button, getVacationTypeIcon } from '../components';
import hotels from '../data/hotels.json';
import countries from '../data/countries.json';
import { Send, Star } from 'lucide-react';
import { FunctionComponent, useEffect, useState } from 'react';

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
    grid-template-columns: 1fr 1fr 1fr;
    gap: ${Size.M};
    margin-top: ${Size.XXXL};

    ${Breakpoint.DesktopSmall} {
        grid-template-columns: 1fr 1fr;
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

    ${Breakpoint.Tablet} {
        margin-bottom: -${Size.L};
    }
`;

const StyledFilterBar = styled.div`
    position: sticky;
    top: ${Size.M};
    z-index: 10;

    ${Breakpoint.Tablet} {
        position: relative;
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
        box-shadow: none;
        background: transparent;
        backdrop-filter: none;
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
    const filterOptions = ["Sea", "Mountains", "Countryside", "City"];
    const [vacationFilter, setVacationFilter] = useState<string | undefined>();
    const [countryFilter, setCountryFilter] = useState<string | undefined>();
    const [countryFilterOpen, setCountryFilterOpen] = useState(false);
    const [starredHotels, setStarredHotels] = useState<string[]>([]);

    const [starredHotelsFilterActive, setStarredHotelsFilterActive] = useState(false);

    const filteredHotelsByVacationType = typeof vacationFilter === 'undefined' ? hotels : hotels.filter(hotel => vacationFilter === hotel.vacationType);
    const filteredHotelsByVacationTypeAndCountry = typeof countryFilter === 'undefined' ? filteredHotelsByVacationType : filteredHotelsByVacationType.filter(hotel => countryFilter === hotel.country);
    const filteredByStarredAndEverythingElse = starredHotelsFilterActive ? filteredHotelsByVacationTypeAndCountry.filter(hotel => starredHotels.includes(hotel.id)) : filteredHotelsByVacationTypeAndCountry;

    const emptyState = filteredByStarredAndEverythingElse.length === 0;

    return (
        <StyledContainer>
            <Wrapper>
                <StyledLabel size={TextSize.Small} color={Color.Text50}>{(vacationFilter || countryFilter) ? 'Filtered' : 'Filter all'} {filteredByStarredAndEverythingElse.length} hotels & apartments</StyledLabel>
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
                    {filteredByStarredAndEverythingElse.map((hotel, i) => {
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
                                starred={starred}
                                onStarClick={e => {
                                    e.preventDefault();
                                    if (!starred) {
                                        const newList = [...starredHotels, hotel.id]
                                        setStarredHotels(newList)
                                        window.localStorage.setItem('starred-hotels', JSON.stringify(newList));
                                    }
                                    else {
                                        const newList = [...starredHotels.filter(id => id !== hotel.id)];
                                        setStarredHotels(newList)
                                        window.localStorage.setItem('starred-hotels', JSON.stringify(newList));
                                    }
                                }}
                            />
                        )
                    }
                    )}
                    <StyledPlaceholderCard emptyState={emptyState}>
                        <Text center size={TextSize.Small}>{emptyState ? "It looks like we haven't been in such a place. Any tips?" : "You have a secret hotel tip for us? Let us know!"}</Text>
                        <Button icon={<Send />} url={`mailto:invisiblehotels@tilman.io?subject=${encodeURI('I have a secret hotel tip for you!')}&body=${encodeURI('Hey Annika and Tilman! \n\n I have a super secret hotel tip for you — here it is:')}`}>Send E-Mail</Button>
                    </StyledPlaceholderCard>
                </StyledGrid>
            </Wrapper>
        </StyledContainer>
    )
}
