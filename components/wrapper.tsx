import styled from '@emotion/styled'
import { Breakpoint } from './tokens/breakpoint';
import { CSSProperties, FunctionComponent, ReactNode } from 'react';

const StyledWrapper = styled.div<{ wide?: boolean; }>`
    padding: 0 var(--size-xxl);
    margin: 0 auto;
    max-width: ${props => props.wide ? '1280px' : '1080px'};

    ${Breakpoint.Tablet} {
        padding-left: var(--size-l);
        padding-right: var(--size-l);
    }

    ${Breakpoint.Mobile} {
        padding-left: var(--size-m);
        padding-right: var(--size-m);
    }
`

export const Wrapper: FunctionComponent<{ children: ReactNode; wide?: boolean; style?: CSSProperties; className?: string; }> = props => {
    return (
        <StyledWrapper wide={props.wide} style={props.style} className={props.className}>
            {props.children}
        </StyledWrapper>
    )
}
