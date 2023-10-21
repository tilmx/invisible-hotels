import styled from "@emotion/styled";
import { FunctionComponent } from "react";
import { Color, Size } from "./tokens";
import { ExternalLink } from "lucide-react";

interface HotelLinkProps {
    link: string;
    color?: string;
}

const StyledLink = styled.a<{ color?: string; }>`
	border: 2px solid ${Color.Background};
	padding: ${Size.XXS};
	border-radius: 24px;
	display: flex;
    background: ${Color.Background};
    color: ${props => props.color};
`;


export const HotelLink: FunctionComponent<HotelLinkProps> = props => {
    return (
        <StyledLink href={props.link} target="_blank" color={props.color}>
            <ExternalLink />
        </StyledLink>
    )
}
