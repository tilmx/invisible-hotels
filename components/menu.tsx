import styled from "@emotion/styled";
import { FunctionComponent } from "react";
import { AlignItems, Flex } from "./utils/flex";
import { Link } from "./utils/link";
import { Text, TextSize } from "./text";
import { useRouter } from "next/router";
import { Size } from "./tokens/size";
import { Breakpoint } from "./tokens/breakpoint";
import { Color } from "./tokens/colors";

const StyledMenuContainer = styled.div`
    padding-top: ${Size.M};
`;

const StyledMenu = styled(Flex) <{ flying?: boolean; }>`
    padding: ${Size.M};
    padding-right: ${Size.L};
    margin: 0 -${Size.M};
    align-items: center;
    gap: ${Size.L};

    ${props => !props.flying && `
        padding-bottom: ${Size.XXXL};
    `}

    ${props => props.flying && `
        backdrop-filter: blur(${Size.XS});
        background: ${Color.Background80};
        border-radius: ${Size.XL};
        box-shadow: 0 0 ${Size.L} ${Color.Shadow};
    `}

    ${Breakpoint.Mobile} {
        padding: ${Size.XS} ${Size.S};
        margin: ${Size.XS} -${Size.S} 0;
        ${props => !props.flying && `
            padding-bottom: ${Size.XXL};
        `}
    }
`;

const StyledDotLink = styled(Link)`
    padding: ${Size.XS};
    margin: -${Size.XS};
    margin-right: auto;
    border-radius: 50%;
    opacity: 1;

    @media (hover: hover) {
        :hover {
            background: ${Color.Text10};
        }
    }

    :active {
        background: ${Color.Text20};
    }
`;

const StyledDot = styled.div`
    height: ${Size.M};
    width: ${Size.M};
    background: currentColor;
    border-radius: 50%;
`;

export const Menu: FunctionComponent<{ flying?: boolean; className?: string; }> = props => {
    return (
        <StyledMenuContainer>
            <StyledMenu flying={props.flying} alignItems={AlignItems.Center} className={props.className}>
                <StyledDotLink href="/">
                    <StyledDot />
                </StyledDotLink>
                <MenuItem link="/#hotel-list" label="Hotels" />
                <MenuItem link="/map" label="Map" />
                <MenuItem link="/about" label="About" />
            </StyledMenu>
        </StyledMenuContainer>
    )
}

const StyledLink = styled(Link) <{ active: boolean; }>`
    opacity: .8;

    ${props => props.active && `
        background: ${Color.Text10};
    `}
`;

const MenuItem: FunctionComponent<{ label: string; link: string; }> = props => {
    return (
        <StyledLink href={props.link} active={useRouter().pathname === props.link}>
            <Text size={TextSize.Regular}>{props.label}</Text>
        </StyledLink>
    )
}
