import styled from '@emotion/styled';
import { Color } from '../tokens';
import { FunctionComponent, ReactNode } from 'react';

const StyledLink = styled.a`
	color: ${Color.Text50};
    text-decoration: inherit;
    text-underline-offset: 6px;

    :active {
        text-decoration: underline;
    }

    @media (hover: hover) {
        :hover {
            text-decoration: underline;
        }
    }
`;

export const ExternalLink: FunctionComponent<{ link?: string; children?: ReactNode; className?: string; }> = props => {
    return (
        <StyledLink href={props.link} target="_blank" className={props.className}>
            {props.children}
        </StyledLink>
    );
};
