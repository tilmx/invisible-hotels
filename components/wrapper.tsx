import styled from '@emotion/styled'
import { Size } from './tokens/size';
import { Breakpoint } from './tokens';
import { FunctionComponent, ReactNode } from 'react';

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

export const Wrapper: FunctionComponent<{ children: ReactNode; wide?: boolean; }> = props => {
    return (
        <StyledWrapper wide={props.wide}>
            {props.children}
        </StyledWrapper>
    )
}
