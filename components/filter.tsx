import { FunctionComponent, MouseEventHandler } from "react";
import styled from "@emotion/styled";
import { getVacationTypeColor, getVacationTypeIcon } from "./hotel-card";
import { Tag } from "./tag";

interface FilterProps {
    label: string;
    selected?: boolean;
    onClick?: MouseEventHandler;
}

const StyledTag = styled(Tag) <{ selected?: boolean; color?: string; }>`
    cursor: pointer;

    ${props => props.selected && `
        background: ${props.color};
        border-color: ${props.color}; 
    `}

    &:hover {
        border-color: ${props => props.color};
        color: ${props => props.selected ? undefined : props.color};  
    }
`;

export const Filter: FunctionComponent<FilterProps> = props => {
    return (
        <StyledTag label={props.label} icon={getVacationTypeIcon(props.label)} onClick={props.onClick} color={getVacationTypeColor(props.label)} selected={props.selected} />
    )
}
