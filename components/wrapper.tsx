import * as React from 'react';
import styled from '@emotion/styled'
import { Size } from './tokens/size';
import { Breakpoint } from './tokens';

const StyledWrapper = styled.div<{ wide?: boolean; }>`
    padding: 0 ${Size.XXL};
    margin: 0 auto;
    max-width: ${props => props.wide ? '1280px' : '1080px'};

    ${Breakpoint.Tablet} {
        padding: 0 ${Size.L};
    }

    ${Breakpoint.Mobile} {
        padding: 0 ${Size.M};
    }
`

export const Wrapper: React.FunctionComponent<{ children: React.ReactNode; wide?: boolean; }> = props => {
    return (
        <StyledWrapper wide={props.wide}>
            {props.children}
        </StyledWrapper>
    )
}
