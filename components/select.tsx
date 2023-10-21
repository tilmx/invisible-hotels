import { FunctionComponent } from "react";
import { Text, TextSize } from "./text";
import styled from "@emotion/styled";
import { Color, Size } from "./tokens";
import { ChevronDown } from "lucide-react";

interface SelectProps {
    label: string;
}

const StyledSelect = styled.div<{ selected?: boolean; color?: string; }>`
	border: 2px solid ${props => props.selected ? props.color : Color.Text};
	padding: ${Size.XXS} ${Size.S};
	border-radius: 24px;
	display: flex;
	gap: ${Size.XXXS};
	align-items: center;
    background: ${props => props.selected ? props.color : 'transparent'};
    cursor: pointer;
`;

export const Select: FunctionComponent<SelectProps> = props => {
    return (
        <StyledSelect>
            <Text size={TextSize.Small}>{props.label}</Text>
            <ChevronDown size="20px" />
        </StyledSelect>
    )
}
