import styled from '@emotion/styled';
import NextLink from 'next/link';
import { CSSProperties, FunctionComponent, HTMLAttributeAnchorTarget, ReactNode } from 'react';

const StyledUnstyledLink = styled(NextLink)`
    color: unset;
    text-decoration: unset;
`;

export const UnstyledLink: FunctionComponent<{ href: string; target?: HTMLAttributeAnchorTarget; children?: ReactNode; className?: string; description?: string; style?: CSSProperties }> = props => {
    return (
        <StyledUnstyledLink aria-label={props.description} href={props.href} target={props.target} className={props.className} style={props.style}>
            {props.children}
        </StyledUnstyledLink>
    );
};

const StyledLink = styled(StyledUnstyledLink)`
    opacity: .6;
    cursor: pointer;
    padding: var(--size-xxs) var(--size-s);
    margin: calc(-1 * var(--size-xxs)) calc(-1 * var(--size-s));
    border-radius: var(--size-m);

    @media (hover: hover) {
        :hover {
            background: var(--color-text10);
            opacity: .8;
        }
    }

    :active {
        background: var(--color-text20);
        opacity: .8;
    }
`;

export const Link: FunctionComponent<{ description?: string; href: string; target?: HTMLAttributeAnchorTarget; children?: ReactNode; className?: string; }> = props => {
    return (
        <StyledLink aria-label={props.description} href={props.href} target={props.target} className={props.className}>
            {props.children}
        </StyledLink>
    );
};

