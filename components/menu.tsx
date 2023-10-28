import styled from "@emotion/styled";
import { FunctionComponent } from "react";
import { AlignItems, Flex, Link } from "./utils";
import { Text, TextSize } from "./text";
import { Color, Size } from "./tokens";
import { useRouter } from "next/router";

const StyledMenu = styled(Flex)`
    padding-top: ${Size.M};
    padding-bottom: ${Size.XXXL};
    gap: ${Size.XXXS};
    align-items: center;
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

    &:active {
        background: ${Color.Text20};
    }
`;

const StyledDot = styled.div`
    height: ${Size.M};
    width: ${Size.M};
    background: ${Color.Text};
    border-radius: 50%;
`;

export const Menu: FunctionComponent<{ className?: string }> = props => {
    return (
        <StyledMenu alignItems={AlignItems.Center} className={props.className}>
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
    color: ${Color.Text80};

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
