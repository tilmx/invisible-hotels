import styled from '@emotion/styled';
import * as React from 'react';
import { Breakpoint, Color, Filter, Flex, FlexAlignItems, FlexJustifyContent, HotelCard, CountrySelect, Size, Text, TextSize, Wrapper, CountrySelectFlyout } from '../components';
import hotels from '../data/hotels.json';
import countries from '../data/countries.json';
import { Glasses } from 'lucide-react';

const StyledContainer = styled.div`
    margin-top: ${Size.XXXXL};

    ${Breakpoint.Tablet} {
        margin-top: ${Size.XXXL};
        grid-template-columns: 1fr;
    }

    ${Breakpoint.Mobile} {
        margin-top: ${Size.XXL};
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
`;

const StyledFilterLabel = styled(Text)`
    margin-bottom: -${Size.XXS};
    z-index: 11;
    position: relative;
    transform: translate3d(0,0,0);
`;

const StyledFilterBar = styled.div`
    position: sticky;
    top: 0;
    padding: ${Size.M} 0;
    z-index: 10;
    background: ${Color.Background80};
    backdrop-filter: blur(16px);
    transition: background-color .1s;

    ${Breakpoint.Tablet} {
        position: relative;
        background: transparent;
        backdrop-filter: none;
    }
`;

const StyledFilterBarOptions = styled(Flex)`
    gap: ${Size.XS};

    ${Breakpoint.Mobile} {
        gap: ${Size.XXS};
    }
`;

const StyledCountrySelect = styled(CountrySelect)`
    margin-left: auto;

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

export const HotelList: React.FunctionComponent = () => {
    const filterOptions = ["Sea", "Mountains", "Countryside", "City"];
    const [vacationFilter, setVacationFilter] = React.useState<string | undefined>();
    const [countryFilter, setCountryFilter] = React.useState<string | undefined>();

    const [countrySelectOpen, setCountrySelectOpen] = React.useState(false);

    const filteredHotelsByVacationType = typeof vacationFilter === 'undefined' ? hotels : hotels.filter(hotel => vacationFilter === hotel.vacationType);
    const filteredHotelsByVacationTypeAndCountry = typeof countryFilter === 'undefined' ? filteredHotelsByVacationType : filteredHotelsByVacationType.filter(hotel => countryFilter === hotel.country);

    return (
        <StyledContainer>
            <Wrapper>
                <StyledFilterLabel size={TextSize.Small} color={Color.Text50}>{(vacationFilter || countryFilter) ? 'Filtered' : 'Filter all'} {filteredHotelsByVacationTypeAndCountry.length} hotels & apartments</StyledFilterLabel>
            </Wrapper>
            <StyledFilterBar>
                <Wrapper>
                    <StyledFilterBarOptions alignItems={FlexAlignItems.FlexStart} flexWrap='wrap'>
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
                            onClick={() => setCountrySelectOpen(!countrySelectOpen)}
                        />
                    </StyledFilterBarOptions>
                    <CountrySelectFlyout
                        options={countries}
                        label='All Countries'
                        open={countrySelectOpen}
                        onSet={country => {
                            setCountryFilter(country);
                            setCountrySelectOpen(false);
                        }}
                    />
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
