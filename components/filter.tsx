import { FunctionComponent, MouseEventHandler, ReactNode } from "react";
import styled from "@emotion/styled";
import { getVacationTypeColor } from "./hotel-card";
import { Tag } from "./tag";
import { Color } from "./tokens";

interface FilterProps {
    label?: string;
    icon?: ReactNode;
    selected?: boolean;
    onClick?: MouseEventHandler;
}

const StyledTag = styled(Tag) <{ selected?: boolean; color?: string; }>`
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

export const Filter: FunctionComponent<FilterProps> = props => {
    return (
        <StyledTag label={props.label} icon={props.icon} onClick={props.onClick} color={getVacationTypeColor(props.label) || Color.Yellow} selected={props.selected} />
    )
}
