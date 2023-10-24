import styled from "@emotion/styled";
import { Color, Size } from "./tokens";
import { FunctionComponent, MouseEventHandler, ReactNode } from "react";
import { Text, TextSize } from "./text";

const StyledButton = styled.div`
    background: ${Color.Text};
    color: ${Color.Background};
    padding: ${Size.S};
    border-radius: ${Size.L};
    cursor: pointer;

    :active {
        background: ${Color.Text80};
    }

    @media (hover: hover) {
        :hover {
            background: ${Color.Text80};
        }
    }
`;

export const Button: FunctionComponent<{ children?: ReactNode; onClick?: MouseEventHandler; }> = props => {
    return (
        <StyledButton onClick={props.onClick}>
            <Text center size={TextSize.Small}>
                {props.children}
            </Text>
        </StyledButton>
    )
}
