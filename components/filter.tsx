import { FunctionComponent } from "react";
import { Color, Size } from "./tokens";
import { Text, TextSize } from "./text";
import styled from "@emotion/styled";
import { getVacationTypeColor, getVacationTypeIcon } from "./hotel-card";

interface FilterProps {
    label: string;
    selected?: boolean;
    onClick?: React.MouseEventHandler;
}

const StyledTag = styled.div<{ selected?: boolean; color?: string; }>`
	border: 2px solid ${props => props.selected ? props.color : Color.Text};
	padding: ${Size.XXS} ${Size.S};
	border-radius: 24px;
	display: flex;
	gap: ${Size.XXS};
	align-items: center;
    background: ${props => props.selected ? props.color : 'transparent'};
    cursor: pointer;

    &:hover {
        border: 2px solid ${props => props.color};
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
