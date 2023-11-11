import styled from '@emotion/styled';
import { FunctionComponent, ReactNode } from 'react';
import { Wrapper } from './wrapper';
import { Size } from './tokens/size';
import { Breakpoint } from './tokens/breakpoint';

const StyledGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: ${Size.M};

    ${Breakpoint.DesktopSmall} {
        grid-template-columns: repeat(2, 1fr);
    }
    ${Breakpoint.TabletSmall} {
        grid-template-columns: 1fr;
    }
    ${Breakpoint.Mobile} {
        gap: ${Size.XS};
    }
`;

export const HotelListWrapper: FunctionComponent<{ children?: ReactNode; className?: string; }> = props => {
    return (
        <Wrapper wide className={props.className}>
            <StyledGrid>
                {props.children}
            </StyledGrid>
        </Wrapper>
    )
}
