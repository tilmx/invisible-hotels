import { FunctionComponent } from "react";
import { Breakpoint, Color, Size } from "./tokens";
import { Text, TextSize } from "./text";
import styled from "@emotion/styled";
import { getVacationTypeColor, getVacationTypeIcon } from "./hotel-card";
import { Tag } from "./tag";

interface FilterProps {
    label: string;
    selected?: boolean;
    onClick?: React.MouseEventHandler;
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
        <StyledTag onClick={props.onClick} color={getVacationTypeColor(props.label)} selected={props.selected}>
            {getVacationTypeIcon(props.label)}
            <Text size={TextSize.Small}>{props.label}</Text>
        </StyledTag>
    )
}
