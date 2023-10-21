import styled from '@emotion/styled';
import * as React from 'react';
import { Breakpoint, HotelCard, Size } from '../components';

import hotels from '../data/hotels.json';

const StyledGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: ${Size.M};
    margin-top: ${Size.XXXXL};

    ${Breakpoint.Tablet} {
        margin-top: ${Size.XXXL};
        grid-template-columns: 1fr;
    }

    ${Breakpoint.Mobile} {
        margin-top: ${Size.XXL};
    }
`;

export const HotelList: React.FunctionComponent = props => {
    return (
        <StyledGrid>
            {hotels.map((hotel, i) =>
                <HotelCard
                    title={hotel.name}
                    location={`${hotel.city}, ${hotel.country}`}
                    housingType={hotel.housingType}
                    vacationType={hotel.vacationType}
                />
            )}
        </StyledGrid>
    )
}
