import styled from "@emotion/styled";
import { FunctionComponent } from "react";
import { AlignItems, Flex, Link } from "./utils";
import { Text, TextSize } from "./text";
import { Color, Size, Breakpoint } from "./tokens";
import { useRouter } from "next/router";

const StyledMenu = styled(Flex) <{ flying?: boolean; }>`
    padding-top: ${Size.M};
    padding-bottom: ${Size.XXXL};
    gap: ${Size.XXXS};
    align-items: center;

    ${props => props.flying && `
        padding: ${Size.XS} ${Size.M};
        margin: ${Size.XS} -${Size.M} 0;

        backdrop-filter: blur(${Size.XS});
        background: ${Color.Background80};
        border-radius: ${Size.XL};
        box-shadow: 0 0 ${Size.L} ${Color.Shadow};

        ${Breakpoint.Mobile} {
            padding: ${Size.XS} ${Size.S};
            margin: ${Size.XS} -${Size.S} 0;
        }
    `}
`;

const StyledDotLink = styled(Link)`
    padding: ${Size.XS};
    margin: -${Size.XS};
    margin-right: auto;
    border-radius: 50%;

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
        <StyledMenu flying={props.flying} alignItems={AlignItems.Center} className={props.className}>
            <StyledDotLink href="/">
                <StyledDot />
            </StyledDotLink>
            <MenuItem link="/" label="Hotels" />
            <MenuItem link="/map" label="Map" />
            <MenuItem link="/about" label="About" />
        </StyledMenu>
    )
}

const StyledMenuItem = styled.div <{ active: boolean; }>`
    padding: ${Size.XXS} ${Size.S};
    border-radius: ${Size.S};
    opacity: .8;

    ${props => props.active && `
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

const MenuItem: FunctionComponent<{ label: string; link: string; }> = props => {
    return (
        <Link href={props.link}>
            <StyledMenuItem active={useRouter().pathname === props.link}>
                <Text size={TextSize.Regular}>{props.label}</Text>
            </StyledMenuItem>
        </Link>
    )
}
