import styled from "@emotion/styled";
import { FunctionComponent } from "react";
import { AlignItems, Flex } from "./utils";
import { Text, TextSize } from "./text";
import { Color, Size } from "./tokens";
import Link from 'next/link';
import { useRouter } from "next/router";

const StyledMenu = styled(Flex)`
    padding-bottom: ${Size.XXXXL};
    gap: ${Size.XS};
    margin-left: -${Size.S};
`;

export const Menu: FunctionComponent = () => {
    return (
        <StyledMenu alignItems={AlignItems.Center}>
            <MenuItem link="/" label="Hotels" />
            <MenuItem link="/about" label="About" />
        </StyledMenu>
    )
}

const StyledLink = styled(Link)`
text-decoration: none;
color: inherit;
`;

const StyledMenuItem = styled.div <{ active: boolean; }>`
    padding: ${Size.XXS} ${Size.XS};
    border-radius: ${Size.S};

    @media (hover: hover) {
        :hover {
            background: ${Color.Text10};
        }
    }
`;

const MenuItem: FunctionComponent<{ label: string; link: string; }> = props => {
    return (
        <StyledLink href={props.link}>
            <StyledMenuItem active={useRouter().pathname === props.link}>
                <Text size={TextSize.Regular}>{props.label}</Text>
            </StyledMenuItem>
        </StyledLink>
    )
}
