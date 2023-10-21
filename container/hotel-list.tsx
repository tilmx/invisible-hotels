import styled from '@emotion/styled';
import * as React from 'react';
import { Breakpoint, Color, Filter, Flex, FlexJustifyContent, HotelCard, Select, Size, Text, TextSize, Wrapper } from '../components';
import hotels from '../data/hotels.json';


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
    grid-template-columns: 1fr 1fr;
    gap: ${Size.M};
    margin-top: ${Size.XXXL};

    ${Breakpoint.Tablet} {
        grid-template-columns: 1fr;
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
    background: rgba(255,255,255,.8);
    backdrop-filter: blur(16px);

    ${Breakpoint.Tablet} {
        position: relative;
    }
`;

export const HotelList: React.FunctionComponent = () => {
    const filterOptions = ["Sea", "Mountains", "Countryside", "City"];
    const [vacationFilter, setVacationFilter] = React.useState<string | undefined>();
    const filteredHotels = typeof vacationFilter === 'undefined' ? hotels : hotels.filter(hotel => vacationFilter === hotel.vacationType);

    return (
        <StyledContainer>
            <Wrapper>
                <StyledFilterLabel size={TextSize.Small} color={Color.TextVariant}>Filter all hotels & apartments</StyledFilterLabel>
            </Wrapper>
            <StyledFilterBar>
                <Wrapper>
                    <Flex justifyContent={FlexJustifyContent.SpaceBetween}>
                        <Flex gap={Size.XS} flexWrap='wrap'>
                            {filterOptions.map((option, i) => {
                                const selected = vacationFilter === option;
                                return (
                                    <Filter key={i} label={option} selected={selected} onClick={() => setVacationFilter(selected ? undefined : option)} />
                                )
                            })}
                        </Flex>
                    </Flex>
                </Wrapper>
            </StyledFilterBar>
            <Wrapper wide>
                <StyledGrid>
                    {filteredHotels.map((hotel, i) =>
                        <HotelCard
                            key={i}
                            title={hotel.name}
                            location={`${hotel.city}, ${hotel.country}`}
                            housingType={hotel.housingType}
                            vacationType={hotel.vacationType}
                            link={hotel.links.bookingCom}
                        />
                    )}
                </StyledGrid>
            </Wrapper>
        </StyledContainer>
    )
}
