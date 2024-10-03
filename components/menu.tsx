import styled from "@emotion/styled";
import { FunctionComponent } from "react";
import { AlignItems, Flex } from "./utils/flex";
import { Link } from "./utils/link";
import { Text, TextSize } from "./text";
import { useRouter } from "next/router";
import { Breakpoint } from "./tokens/breakpoint";

const StyledMenuContainer = styled.div`
    padding-top: var(--size-m);

    ${Breakpoint.TabletSmall} {
        padding-top: var(--size-xxxxs);
    }
`;

const StyledMenu = styled(Flex) <{ flying?: boolean; }>`
    padding: var(--size-m);
    padding-right: var(--size-l);
    margin: 0 calc(-1 * var(--size-m));
    align-items: center;
    gap: var(--size-l);

    ${props => !props.flying && `
        padding-bottom: var(--size-xxxl);
    `}

    ${props => props.flying && `
        backdrop-filter: blur(var(--size-xs));
        background: var(--color-background80);
        border-radius: var(--size-xl);
        box-shadow: 0 0 var(--size-l) var(--color-shadow);
    `}

    ${Breakpoint.Mobile} {
        padding: var(--size-xs) var(--size-s);
        margin: var(--size-xs) calc(-1 * var(--size-s)) 0;
        ${props => !props.flying && `
            padding-bottom: var(--size-xxl);
        `}
    }
`;

const StyledDotLink = styled(Link)`
    padding: var(--size-xxs);
    margin: calc(-1 * var(--size-xxs));
    margin-right: auto;
    border-radius: 50%;
    opacity: 1;

    @media (hover: hover) {
        :hover {
            background: var(--color-text10);
        }
    }

    :active {
        background: var(--color-text20);
    }
`;

const StyledDot = styled.svg`
    height: var(--size-l);
    width: var(--size-l);
    display: block;
`;

export const Menu: FunctionComponent<{ flying?: boolean; className?: string; }> = props => {
    return (
        <StyledMenuContainer>
            <StyledMenu flying={props.flying} alignItems={AlignItems.Center} className={props.className}>
                <StyledDotLink href="/" description="Back to home page">
                    <StyledDot width="128" height="128" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd"
                            d="M64 116C92.7188 116 116 92.7188 116 64C116 35.2812 92.7188 12 64 12C35.2812 12 12 35.2812 12 64C12 92.7188 35.2812 116 64 116ZM64 128C99.3462 128 128 99.3462 128 64C128 28.6538 99.3462 0 64 0C28.6538 0 0 28.6538 0 64C0 99.3462 28.6538 128 64 128Z"
                            fill="currentColor" />
                        <path
                            d="M48 92V36C48 33.7909 49.7909 32 52 32H56C58.2091 32 60 33.7909 60 36V54C60 56.2091 61.7909 58 64 58H80C82.2091 58 84 59.7909 84 62V66C84 68.2091 82.2091 70 80 70H64C61.7909 70 60 71.7909 60 74V92C60 94.2091 58.2091 96 56 96H52C49.7909 96 48 94.2091 48 92Z"
                            fill="currentColor" />
                    </StyledDot>
                </StyledDotLink>
                <MenuItem link="/" label="Hotels" />
                <MenuItem link="/map" label="Map" />
                <MenuItem link="/about" label="About" />
            </StyledMenu>
        </StyledMenuContainer>
    )
}

const StyledLink = styled(Link) <{ active: boolean; }>`
    opacity: .8;

    ${props => props.active && `
        background: var(--color-text10);
    `}
`;

const MenuItem: FunctionComponent<{ label: string; link: string; }> = props => {
    return (
        <StyledLink href={props.link} active={useRouter().pathname === props.link}>
            <Text size={TextSize.Regular}>{props.label}</Text>
        </StyledLink>
    )
}
