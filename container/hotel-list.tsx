import styled from '@emotion/styled';
import * as React from 'react';
import { Breakpoint, HotelCard, Housing, Region, Size } from '../components';

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
            <HotelCard
                title='Noah Surf House'
                location='A dos Cunhados, Portugal'
                housing={Housing.Hotel}
                region={Region.Sea}
            />
            <HotelCard
                title='Aethos Ericeira'
                location='Encarnação, Portugal'
                housing={Housing.Hotel}
                region={Region.Sea}
            />
        </StyledGrid>
    )
}
