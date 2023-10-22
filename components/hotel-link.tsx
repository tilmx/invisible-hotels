import styled from "@emotion/styled";
import { FunctionComponent } from "react";
import { Breakpoint, Color, Size } from "./tokens";
import { ExternalLink } from "lucide-react";
import { Text, TextSize } from "./text";

interface HotelLinkProps {
    link: string;
    color?: string;
}

const StyledLink = styled.a<{ color?: string; }>`
	padding: calc(${Size.XXS} + 4px) ${Size.S};
	border-radius: 24px;
	display: flex;
    background: ${Color.Background};
    color: ${props => props.color};
    transition: transform .3s, box-shadow .3s;
    text-decoration: none;

    &:hover {
        transform: scale(1.1);
        box-shadow: 0 0 ${Size.L} rgba(0,0,0,0.2);
    }

    ${Breakpoint.Mobile} {
        padding: calc(${Size.Special6} + 3px) ${Size.Special6};

        svg {
            height: 20px;
            width: 20px;
        }
    }
`;

const StyledText = styled(Text)`
    padding-left: ${Size.XXS};

    ${Breakpoint.Mobile} {
        display: none;
    }
`


export const HotelLink: FunctionComponent<HotelLinkProps> = props => {
    return (
        <StyledLink href={props.link} target="_blank" color={props.color}>
            <ExternalLink />
            <StyledText size={TextSize.SuperSmall}>Open on <br /> Booking.com</StyledText>
        </StyledLink>
    )
}
