import { FunctionComponent, MouseEventHandler } from "react";
import { Text, TextSize } from "./text";
import styled from "@emotion/styled";
import { ChevronDown, X } from "lucide-react";
import { Tag } from "./tag";
import { Size } from "./tokens/size";
import { Color } from "./tokens/colors";
import { Breakpoint } from "./tokens/breakpoint";
import { getCountryFlag } from "../utils";

interface CountrySelectProps {
    label: string;
    value?: string;
    onClick?: MouseEventHandler;
    className?: string;
    active?: boolean;
    disabled?: boolean;
}

const StyledSelect = styled(Tag) <{ active?: boolean; color?: string; disabled?: boolean; }>`
	gap: ${Size.XXXS};
    cursor: pointer;

    ${props => props.disabled && `
        pointer-events: none;
    `} 

    ${props => props.active && `
        background: ${Color.Text};
        color: ${Color.Background};
        border-color: ${Color.Text};
    `}

    ${props => !props.active && `
        :active {
            border-color: ${Color.Text60};
            color: ${Color.Text60};
        }
        @media (hover: hover) {
            :hover {
                border-color: ${Color.Text60};
                color: ${Color.Text60};
            }
        }
    `};
`;

export const CountrySelect: FunctionComponent<CountrySelectProps> = props => {
    return (
        <StyledSelect disabled={props.disabled} className={props.className} label={props.value ? getCountryFlag(props.value) + ' ' + props.value : props.label} onClick={props.onClick} active={props.active}>
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
    margin-top: -${Size.XS};
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
        margin-left: ${Size.M};
        margin-right: ${Size.M};
    }

    ${Breakpoint.TabletSmall} {
        grid-template-columns: repeat(2, 1fr);
        margin-left: ${Size.XS};
        margin-right: ${Size.XS};
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
                    <CountrySelectOption
                        selected={option === props.value}
                        label={option}
                        key={i}
                        onClick={() => props.onSet(props.value === option ? undefined : option)}
                    />
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
    align-items: center;

    ${props => props.selected && `
        background: ${Color.Text10};
    `}

    @media (hover: hover) {
        :hover {
            background: ${Color.Text10};
        }
    }

    :active {
        background: ${Color.Text20};
    }
`;

const StyledCloseIcon = styled(X)`
    color: ${Color.Text60};
    margin-left: auto;
`;

const CountrySelectOption: FunctionComponent<{ label: string; selected?: boolean; onClick: MouseEventHandler; }> = props => {
    return (
        <StyledOption
            onClick={props.onClick}
            selected={props.selected}
            pirsch-event="Enable filter"
            pirsch-meta-filter="Country"
            pirsch-meta-country={props.label}
        >
            <Text size={TextSize.Regular}>
                {getCountryFlag(props.label)}
            </Text>
            <Text size={TextSize.Regular}>
                {props.label}
            </Text>
            {props.selected &&
                <StyledCloseIcon size={Size.S} />
            }
        </StyledOption>
    )
}
