import styled from '@emotion/styled';
import { Breakpoint, Color, Filter, Flex, AlignItems, HotelCard, CountrySelect, Size, Text, TextSize, Wrapper, CountrySelectFlyout, OutsideClick } from '../components';
import hotels from '../data/hotels.json';
import countries from '../data/countries.json';
import { Glasses } from 'lucide-react';
import { FunctionComponent, useState } from 'react';

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

const StyledFilterLabel = styled(Text)`
    margin-bottom: ${Size.XS};
    z-index: 11;
    position: relative;
    transform: translate3d(0,0,0);

    ${Breakpoint.Tablet} {
        margin-bottom: -${Size.M};
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

const StyledEmptyState = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    max-width: 400px;
    align-items: center;
    gap: ${Size.XS};
`;

export const HotelList: FunctionComponent = () => {
    const filterOptions = ["Sea", "Mountains", "Countryside", "City"];
    const [vacationFilter, setVacationFilter] = useState<string | undefined>();
    const [countryFilter, setCountryFilter] = useState<string | undefined>();

    const [countrySelectOpen, setCountrySelectOpen] = useState(false);

    const filteredHotelsByVacationType = typeof vacationFilter === 'undefined' ? hotels : hotels.filter(hotel => vacationFilter === hotel.vacationType);
    const filteredHotelsByVacationTypeAndCountry = typeof countryFilter === 'undefined' ? filteredHotelsByVacationType : filteredHotelsByVacationType.filter(hotel => countryFilter === hotel.country);

    return (
        <StyledContainer>
            <Wrapper>
                <StyledFilterLabel size={TextSize.Small} color={Color.Text50}>{(vacationFilter || countryFilter) ? 'Filtered' : 'Filter all'} {filteredHotelsByVacationTypeAndCountry.length} hotels & apartments</StyledFilterLabel>
            </Wrapper>
            <StyledFilterBar>
                <Wrapper>
                    <StyledFilterBarOptions alignItems={AlignItems.FlexStart} flexWrap='wrap'>
                        {filterOptions.map((option, i) => {
                            const selected = vacationFilter === option;
                            return (
                                <Filter key={i} label={option} selected={selected} onClick={() => setVacationFilter(selected ? undefined : option)} />
                            )
                        })}
                        <StyledCountrySelect
                            label='All Countries'
                            value={countryFilter}
                            active={typeof countryFilter !== 'undefined' || countrySelectOpen}
                            disabled={countrySelectOpen}
                            onClick={() => setCountrySelectOpen(!countrySelectOpen)}
                        />
                    </StyledFilterBarOptions>
                    <OutsideClick onOutsideClick={() => setCountrySelectOpen(false)}>
                        <CountrySelectFlyout
                            options={countries}
                            label='All Countries'
                            open={countrySelectOpen}
                            value={countryFilter}
                            onSet={country => {
                                setCountryFilter(country);
                                setCountrySelectOpen(false);
                            }}
                        />
                    </OutsideClick>
                </Wrapper>
            </StyledFilterBar>
            <Wrapper wide>
                <StyledGrid>
                    {filteredHotelsByVacationTypeAndCountry.map((hotel, i) =>
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
                        />
                    )}
                </StyledGrid>
                {filteredHotelsByVacationTypeAndCountry.length === 0 &&
                    <StyledEmptyState>
                        <Glasses color={Color.Text50} />
                        <Text size={TextSize.Small} color={Color.Text50} center>We're very sorry — but it looks like we haven't been in such a place.</Text>
                    </StyledEmptyState>
                }
            </Wrapper>
        </StyledContainer>
    )
}
