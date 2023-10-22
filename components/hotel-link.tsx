import styled from "@emotion/styled";
import { FunctionComponent } from "react";
import { Breakpoint, Color, Size } from "./tokens";
import { ExternalLink } from "lucide-react";
import { Text, TextSize } from "./text";
import { Tag } from "./tag";

interface HotelLinkProps {
    link: string;
    color?: string;
}

const StyledLink = styled.a`
    text-decoration: none;
    color: inherit;
`;

const StyledTag = styled(Tag) <{ color?: string; }>`    
    background: ${Color.Background};
    border-color: ${Color.Background};
    color: ${props => props.color};
    transition: transform .3s, box-shadow .3s;

    &:hover {
        transform: scale(1.1);
        box-shadow: 0 0 ${Size.L} rgba(0,0,0,0.2);
    }
`;

const StyledText = styled(Text)`
    ${Breakpoint.Mobile} {
        display: none;
    }
`

export const HotelLink: FunctionComponent<HotelLinkProps> = props => {
    return (
        <StyledLink href={props.link} target="_blank">
            <StyledTag icon={<ExternalLink />} color={props.color}>
                <StyledText size={TextSize.SuperSmall}>Open on <br /> Booking.com</StyledText>
            </StyledTag>
        </StyledLink>
    )
}
