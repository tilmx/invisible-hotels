import styled from '@emotion/styled';
import { Color } from '../tokens';
import { FunctionComponent, ReactNode } from 'react';

const StyledLink = styled.a`
	color: ${Color.Text50};
    text-decoration: inherit;
    text-underline-offset: 6px;

    &:hover {
        text-decoration: underline;
    }
`;

export const ExternalLink: FunctionComponent<{ link?: string; children?: ReactNode; }> = props => {
    return (
        <StyledLink href={props.link} target="_blank">
            {props.children}
        </StyledLink>
    );
};
