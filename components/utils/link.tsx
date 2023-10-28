import styled from '@emotion/styled';
import NextLink from 'next/link';
import { FunctionComponent, HTMLAttributeAnchorTarget, ReactNode } from 'react';

const StyledLink = styled(NextLink)`
	color: inherit;
    text-decoration: inherit;
`;

export const Link: FunctionComponent<{ href: string; target?: HTMLAttributeAnchorTarget; children?: ReactNode; className?: string; }> = props => {
    return (
        <StyledLink href={props.href} target={props.target} className={props.className}>
            {props.children}
        </StyledLink>
    );
};
