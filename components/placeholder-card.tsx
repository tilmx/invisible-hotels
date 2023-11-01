import styled from '@emotion/styled';
import { FunctionComponent, ReactNode } from 'react';
import { Size } from './tokens/size';
import { Color } from './tokens/colors';
import { Breakpoint } from './tokens/breakpoint';

interface PlaceholderCardProps {
    children?: ReactNode;
    className?: string;
}

const StyledCard = styled.div`
    border-radius: ${Size.M};
    padding: ${Size.L};
    display: flex;
    flex-direction: column;
    gap: ${Size.M};
    box-shadow: inset 0 0 0 2px ${Color.Text10};
    color: ${Color.Text50};
    justify-content: center;
    align-items: center;

    ${Breakpoint.Mobile} {
        padding: ${Size.M};
        border-radius: ${Size.S};
    }
`;

export const PlaceholderCard: FunctionComponent<PlaceholderCardProps> = props => {
    return (
        <StyledCard className={props.className}>
            {props.children}
        </StyledCard>
    )
}
