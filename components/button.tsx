import styled from "@emotion/styled";
import { Color, Size } from "./tokens";
import { FunctionComponent, MouseEventHandler, ReactNode } from "react";
import { Text } from "./text";

const StyledButton = styled.div<{ secondary?: boolean; small?: boolean; }>`
    background: ${props => props.secondary ? Color.Text10 : Color.Text};
    color: ${props => props.secondary ? Color.Text50 : Color.Background};
    padding: ${props => props.small ? `${Size.XXS} ${Size.S}` : Size.S};
    border-radius: ${Size.L};
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
	gap: ${Size.XXS};


    :active {
        background: ${Color.Text80};
    }

    @media (hover: hover) {
        :hover {
            background: ${props => props.secondary ? Color.Text20 : Color.Text80};
            color: ${props => props.secondary ? Color.Text : Color.Background};
        }
    }
`;

export const Button: FunctionComponent<{ icon?: ReactNode; small?: boolean; secondary?: boolean; children?: ReactNode; onClick?: MouseEventHandler; }> = props => {
    return (
        <StyledButton small={props.small} secondary={props.secondary} onClick={props.onClick}>
            {props.icon}
            <Text center>
                {props.children}
            </Text>
        </StyledButton>
    )
}
