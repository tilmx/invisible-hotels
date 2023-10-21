import { FunctionComponent, MouseEventHandler, useState } from "react";
import { Text, TextSize } from "./text";
import styled from "@emotion/styled";
import { Color, Size } from "./tokens";
import { ChevronDown } from "lucide-react";

interface SelectProps {
    label: string;
    options: string[];
    value?: string;
    onChange: (country?: string) => void;
}

const StyledContainer = styled.div`
    position: relative;
`;

const StyledSelect = styled.div<{ selected?: boolean; color?: string; }>`
	border: 2px solid ${props => props.selected ? props.color : Color.Text};
	padding: ${Size.XXS} ${Size.S};
	border-radius: 24px;
	display: flex;
	gap: ${Size.XXXS};
	align-items: center;
    background: ${props => props.selected ? props.color : 'transparent'};
    cursor: pointer;

    &:hover {
        border-color: ${Color.TextVariant};
        color: ${Color.TextVariant};
    }
`;

const StyledOptionList = styled.div<{ open: boolean; }>`
    position: absolute;
    right: 0;
    display: ${props => props.open ? 'block' : 'none'};
    padding: ${Size.XXS} 0;
    margin-top: ${Size.XXS};
    background: rgba(255,255,255,.9);
    backdrop-filter: blur(${Size.M});
    min-width:  200px;
    border-radius: ${Size.XS};
    box-shadow: 0 ${Size.XS} ${Size.L} rgba(0,0,0,0.2);
    overflow: hidden;
`;

export const Select: FunctionComponent<SelectProps> = props => {
    const [open, setOpen] = useState(true);

    return (
        <StyledContainer>
            <StyledSelect onClick={() => setOpen(!open)}>
                <Text size={TextSize.Small}>{props.value || props.label}</Text>
                <ChevronDown size="20px" />
            </StyledSelect>
            <StyledOptionList open={open}>
                <SelectOption label="All countries" onClick={() => {
                    props.onChange(undefined);
                    setOpen(false);
                }}></SelectOption>
                {props.options.map((option, i) =>
                    <SelectOption label={option} key={i} onClick={() => {
                        props.onChange(option);
                        setOpen(false);
                    }} />
                )}
            </StyledOptionList>
        </StyledContainer>
    )
}

const StyledOption = styled.div`
    padding: ${Size.XXS} ${Size.S};
    cursor: pointer;

    &:hover {
        color: ${Color.TextVariant};
    }
`;

const SelectOption: FunctionComponent<{ label: string; onClick: MouseEventHandler; }> = props => {
    return (
        <StyledOption onClick={props.onClick}>
            <Text size={TextSize.Small} style={{ textAlign: 'right' }}>
                {props.label}
            </Text>
        </StyledOption>
    )
}
