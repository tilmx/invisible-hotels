import { FunctionComponent, MouseEventHandler, ReactNode } from "react";
import styled from "@emotion/styled";
import { Tag } from "./tag";
import { Color } from "./tokens/colors";
import { getVacationTypeColor } from "../utils";

interface FilterProps {
    label?: string;
    icon?: ReactNode;
    selected?: boolean;
    onClick?: MouseEventHandler;
}

const StyledTag = styled(Tag, { shouldForwardProp: () => true }) <{ selected?: boolean; color?: string; }>`
    cursor: pointer;

    ${props => props.selected && `
        background: ${props.color};
        border-color: ${props.color}; 
    `}

    :active {
        border-color: ${props => props.color};
        color: ${props => props.selected ? undefined : props.color};  
    }

    @media (hover: hover) {
        :hover {
            border-color: ${props => props.color};
            color: ${props => props.selected ? undefined : props.color};  
        }
    }
`;

export const FilterItem: FunctionComponent<FilterProps> = props => {
    return (
        <StyledTag {...props} color={getVacationTypeColor(props.label) || Color.Text60} />
    )
}
