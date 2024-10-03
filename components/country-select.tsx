import { FunctionComponent, MouseEventHandler } from "react";
import { Text, TextSize } from "./text";
import styled from "@emotion/styled";
import { ChevronDown, X } from "lucide-react";
import { Tag } from "./tag";
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
	gap: var(--size-xxxs);
    cursor: pointer;

    ${props => props.disabled && `
        pointer-events: none;
    `} 

    ${props => props.active && `
        background: var(--color-text);
        color: var(--color-background);
        border-color: var(--color-text);
    `}

    ${props => !props.active && `
        :active {
            border-color: var(--color-text60);
            color: var(--color-text60);
        }
        @media (hover: hover) {
            :hover {
                border-color: var(--color-text60);
                color: var(--color-text60);
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

    padding: var(--size-xs);
    margin-top: calc(var(--size-xs) * -1);
    background: var(--color-background80);
    backdrop-filter: blur(var(--size-m));
    border-radius: var(--size-xs);
    gap: var(--size-xxxxs);
    box-shadow: 0 var(--size-xs) var(--size-l) var(--color-shadow), inset 0 0 0 1px var(--color-text20);

    ${Breakpoint.DesktopSmall} {
        grid-template-columns: repeat(4, 1fr);
    }

    ${Breakpoint.Tablet} {
        grid-template-columns: repeat(3, 1fr);
        margin-left: var(--size-m);
        margin-right: var(--size-m);
    }

    ${Breakpoint.TabletSmall} {
        grid-template-columns: repeat(2, 1fr);
        margin-left: var(--size-xs);
        margin-right: var(--size-xs);
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
    padding: var(--size-xxs) var(--size-s);
    cursor: pointer;
    border-radius: var(--size-xxs);
    gap: var(--size-xxxs);
    display: flex;
    align-items: center;

    ${props => props.selected && `
        background: var(--color-text10);
    `}

    @media (hover: hover) {
        :hover {
            background: var(--color-text10);
        }
    }

    :active {
        background: var(--color-text20);
    }
`;

const StyledCloseIcon = styled(X)`
    color: var(--color-text60);
    margin-left: auto;
`;

const CountrySelectOption: FunctionComponent<{ label: string; selected?: boolean; onClick: MouseEventHandler; }> = props => {
    return (
        <StyledOption
            onClick={props.onClick}
            selected={props.selected}
        >
            <Text size={TextSize.Regular}>
                {getCountryFlag(props.label)}
            </Text>
            <Text size={TextSize.Regular}>
                {props.label}
            </Text>
            {props.selected &&
                <StyledCloseIcon size="16px" />
            }
        </StyledOption>
    )
}
