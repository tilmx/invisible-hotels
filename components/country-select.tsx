import { FunctionComponent, MouseEventHandler, useState } from "react";
import { Text, TextSize } from "./text";
import styled from "@emotion/styled";
import { Breakpoint, Color, Size } from "./tokens";
import { ChevronDown } from "lucide-react";
import { Tag } from "./tag";

interface SelectProps {
    label: string;
    options: string[];
    value?: string;
    onChange: (country?: string) => void;
    className?: string;
}

const StyledContainer = styled.div`
    position: relative;
`;

const StyledSelect = styled(Tag) <{ active?: boolean; color?: string; }>`
	gap: ${Size.XXXS};
    cursor: pointer;

    ${props => props.active && `
        background: ${Color.Text};
        color: ${Color.Background};
    `}

    ${props => !props.active && `
        &:hover {
            border-color: ${Color.Text50};
            color: ${Color.Text50};
        }
    `};
`;

const StyledOptionList = styled.div<{ open: boolean; }>`
    position: absolute;
    right: 0;
    display: ${props => props.open ? 'block' : 'none'};
    padding: ${Size.XXS};
    margin-top: ${Size.XXS};
    background: ${Color.Background80};
    backdrop-filter: blur(${Size.M});
    min-width: 220px;
    border-radius: ${Size.XS};
    box-shadow: 0 ${Size.XS} ${Size.L} rgba(0,0,0,0.2);
    text-align: right;

    ${Breakpoint.Tablet} {
        right: auto;
        left: 0;
        text-align: left;
    }
    box-shadow: 0 ${Size.XS} ${Size.L} ${Color.Text20};
`;

export const CountrySelect: FunctionComponent<SelectProps> = props => {
    const [open, setOpen] = useState(false);

    return (
        <StyledContainer className={props.className}>
            <StyledSelect label={props.value || props.label} onClick={() => setOpen(!open)} active={typeof props.value !== 'undefined'}>
                <ChevronDown size="20px" />
            </StyledSelect>
            <StyledOptionList open={open}>
                <CountrySelectOption label={props.label} onClick={() => {
                    props.onChange(undefined);
                    setOpen(false);
                }}></CountrySelectOption>
                {props.options.map((option, i) =>
                    <CountrySelectOption selected={option === props.value} label={option} key={i} onClick={() => {
                        props.onChange(option);
                        setOpen(false);
                    }} />
                )}
            </StyledOptionList>
        </StyledContainer>
    )
}

const StyledOption = styled.div<{ selected?: boolean }>`
    padding: ${Size.XXS} ${Size.S};
    cursor: pointer;
    border-radius: ${Size.XXS};
    ${props => props.selected && `
        background: ${Color.Text20};
    `}

    &:hover {
        background: ${Color.Text20};
    }
`;

const CountrySelectOption: FunctionComponent<{ label: string; selected?: boolean; onClick: MouseEventHandler; }> = props => {
    return (
        <StyledOption onClick={props.onClick} selected={props.selected}>
            <Text size={TextSize.Small}>
                {getCountryFlag(props.label)} {props.label}
            </Text>
        </StyledOption>
    )
}

export function getCountryFlag(country: string) {
    switch (country) {
        case "Austria":
            return "🇦🇹";
        case "Belgium":
            return "🇧🇪";
        case "Denmark":
            return "🇩🇰";
        case "Georgia":
            return "🇬🇪";
        case "Germany":
            return "🇩🇪";
        case "Greece":
            return "🇬🇷";
        case "Island":
            return "🇮🇸";
        case "Italy":
            return "🇮🇹";
        case "Japan":
            return "🇯🇵";
        case "Netherlands":
            return "🇳🇱";
        case "Norway":
            return "🇳🇴";
        case "Portugal":
            return "🇵🇹";
        case "Spain":
            return "🇪🇸";
        case "Sweden":
            return "🇸🇪";
        case "Turkey":
            return "🇹🇷";
        case "United Kingdom":
            return "🇬🇧"
        case "United States":
            return "🇺🇸"
    }
}
