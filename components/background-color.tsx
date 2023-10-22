import styled from '@emotion/styled'
import { CSSProperties, FunctionComponent, ReactNode } from 'react';

const StyledBackgroundColor = styled.div`
    background-color: ${props => props.color};
    transition: background-color .1s;
`

export const BackgroundColor: FunctionComponent<{ color: string; children?: ReactNode; style?: CSSProperties }> = props => {
    return (
        <StyledBackgroundColor color={props.color} style={props.style}>
            {props.children}
        </StyledBackgroundColor>
    )
}
