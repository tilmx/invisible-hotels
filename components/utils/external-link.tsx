import * as React from 'react';
import styled from '@emotion/styled';
import { Color } from '../tokens';

const StyledLink = styled.a`
	color: ${Color.TextVariant};
    text-decoration: inherit;
    text-underline-offset: 6px;

    &:hover {
        text-decoration: underline;
    }
`;

export const ExternalLink: React.FunctionComponent<{ link?: string; children?: React.ReactNode; noHighlighting?: boolean }> = props => {
    return (
        <StyledLink href={props.link} target="_blank">
            {props.children}
        </StyledLink>
    );
};
