import styled from '@emotion/styled';
import { Color } from '../tokens';
import { FunctionComponent, MouseEventHandler, ReactNode } from 'react';

const StyledLink = styled.a`
	color: ${Color.Text50};
    text-decoration: inherit;
    text-underline-offset: 6px;
    cursor: pointer;

    :active {
        text-decoration: underline;
    }

    @media (hover: hover) {
        :hover {
            text-decoration: underline;
        }
    }
`;

export const ExternalLink: FunctionComponent<{ link?: string; children?: ReactNode; className?: string; onClick?: MouseEventHandler; }> = props => {
    return (
        <StyledLink href={props.link} target="_blank" className={props.className} onClick={props.onClick}>
            {props.children}
        </StyledLink>
    );
};
