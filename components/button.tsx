import styled from "@emotion/styled";
import { FunctionComponent, MouseEventHandler, ReactNode } from "react";
import { Text } from "./text";
import { Color } from "./tokens/colors";
import { Breakpoint } from "./tokens/breakpoint";

const StyledButton = styled.div<{ secondary?: boolean; small?: boolean; }>`
    background: ${props => props.secondary ? Color.Text10 : Color.Text};
    color: ${props => props.secondary ? Color.Text60 : Color.Background};
    padding: ${props => props.small ? `var(--size-xxs) var(--size-s)` : `var(--size-s) var(--size-m)`};
    border-radius: var(--size-l);
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
	gap: var(--size-xxs);

    :active {
        background: ${Color.Text80};
    }

    @media (hover: hover) {
        :hover {
            background: ${props => props.secondary ? Color.Text20 : Color.Text80};
            color: ${props => props.secondary ? Color.Text : Color.Background};
        }
    }

    ${Breakpoint.Mobile} {
        svg {
            height: 20px;
            width: auto;
        }
    }
`;

export const Button: FunctionComponent<{ iconLeft?: ReactNode; iconRight?: ReactNode; small?: boolean; secondary?: boolean; children?: ReactNode; onClick?: MouseEventHandler; }> = props => {
    return (
        <StyledButton small={props.small} secondary={props.secondary} onClick={props.onClick}>
            {props.iconLeft}
            <Text center>
                {props.children}
            </Text>
            {props.iconRight}
        </StyledButton>
    )
}
