import styled from '@emotion/styled';
import NextLink from 'next/link';
import { FunctionComponent, ReactNode } from 'react';

const StyledLink = styled(NextLink)`
	color: inherit;
    text-decoration: inherit;
`;

export const Link: FunctionComponent<{ href: string; children?: ReactNode; className?: string; }> = props => {
    return (
        <StyledLink href={props.href} className={props.className}>
            {props.children}
        </StyledLink>
    );
};
