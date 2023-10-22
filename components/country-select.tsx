import { FunctionComponent, MouseEventHandler, useState } from "react";
import { Text, TextSize } from "./text";
import styled from "@emotion/styled";
import { Breakpoint, Color, Size } from "./tokens";
import { ChevronDown } from "lucide-react";
import { Tag } from "./tag";

interface CountrySelectProps {
    label: string;
    value?: string;
    onClick?: MouseEventHandler;
    className?: string;
    active?: boolean;
}

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

export const CountrySelect: FunctionComponent<CountrySelectProps> = props => {
    return (
        <StyledSelect className={props.className} label={props.value || props.label} onClick={props.onClick} active={props.active}>
            <ChevronDown size="20px" />
        </StyledSelect>
    )
}

interface CountrySelectFlyoutProps {
    options: string[];
    value?: string;
    label: string;
    open: boolean;
    onSet: (country?: string) => void;
}

const StyledFlyoutContainer = styled.div`
    position: relative;
`;

const StyledOptionList = styled.div<{ open: boolean; }>`
    position: absolute;
    left: 0;
    right: 0;
    display: ${props => props.open ? 'grid' : 'none'};
    flex-direction: column;
    grid-template-columns: repeat(5, 1fr);

    padding: ${Size.XS};
    margin-top: ${Size.XS};
    background: ${Color.Background80};
    backdrop-filter: blur(${Size.M});
    border-radius: ${Size.XS};
    gap: ${Size.XXXXS};
    box-shadow: 0 ${Size.XS} ${Size.L} ${Color.Shadow}, inset 0 0 0 1px ${Color.Text20};

    ${Breakpoint.DesktopSmall} {
        grid-template-columns: repeat(4, 1fr);
    }

    ${Breakpoint.Tablet} {
        grid-template-columns: repeat(3, 1fr);
    }

    ${Breakpoint.TabletSmall} {
        grid-template-columns: repeat(2, 1fr);
    }

    ${Breakpoint.MobileSmall} {
        grid-template-columns: repeat(1, 1fr);
    }
`;

export const CountrySelectFlyout: FunctionComponent<CountrySelectFlyoutProps> = props => {
    return (
        <StyledFlyoutContainer>
            <StyledOptionList open={props.open}>
                <CountrySelectOption label={props.label} onClick={() => props.onSet(undefined)} />
                {props.options.map((option, i) =>
                    <CountrySelectOption selected={option === props.value} label={option} key={i} onClick={() => props.onSet(option)} />
                )}
            </StyledOptionList>
        </StyledFlyoutContainer>
    )
}

const StyledOption = styled.div<{ selected?: boolean }>`
    padding: ${Size.XXS} ${Size.S};
    cursor: pointer;
    border-radius: ${Size.XXS};
    gap: ${Size.XXXS};
    display: flex;

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
                {getCountryFlag(props.label)}
            </Text>
            <Text size={TextSize.Small}>
                {props.label}
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
