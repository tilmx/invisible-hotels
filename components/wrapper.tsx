import styled from '@emotion/styled'
import { Size } from './tokens/size';
import { Breakpoint } from './tokens/breakpoint';
import { CSSProperties, FunctionComponent, ReactNode } from 'react';

const StyledWrapper = styled.div<{ wide?: boolean; }>`
    padding: 0 ${Size.XXL};
    margin: 0 auto;
    max-width: ${props => props.wide ? '1280px' : '1080px'};

    ${Breakpoint.Tablet} {
        padding-left: ${Size.L};
        padding-right: ${Size.L};
    }

    ${Breakpoint.Mobile} {
        padding-left: ${Size.M};
        padding-right: ${Size.M};
    }
`

export const Wrapper: FunctionComponent<{ children: ReactNode; wide?: boolean; style?: CSSProperties; className?: string; }> = props => {
    return (
        <StyledWrapper wide={props.wide} style={props.style} className={props.className}>
            {props.children}
        </StyledWrapper>
    )
}
