import styled from '@emotion/styled';
import * as React from 'react';
import { Breakpoint, Size } from './tokens';

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

export const HotelList: React.FunctionComponent<{ children?: React.ReactNode }> = props => {
    return (
        <StyledGrid>
            {props.children}
        </StyledGrid>
    )
}
