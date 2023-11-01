import styled from '@emotion/styled';
import NextLink from 'next/link';
import { FunctionComponent, HTMLAttributeAnchorTarget, ReactNode } from 'react';
import { Color, Size } from '../tokens';

const StyledUnstyledLink = styled(NextLink)`
    color: unset;
    text-decoration: unset;
`;

export const UnstyledLink: FunctionComponent<{ href: string; target?: HTMLAttributeAnchorTarget; children?: ReactNode; className?: string; }> = props => {
    return (
        <StyledUnstyledLink href={props.href} target={props.target} className={props.className}>
            {props.children}
        </StyledUnstyledLink>
    );
};

const StyledLink = styled(StyledUnstyledLink)`
    opacity: .5;
    cursor: pointer;
    padding: ${Size.XXS} ${Size.S};
    margin: -${Size.XXS} -${Size.S};
    border-radius: ${Size.M};

    @media (hover: hover) {
        :hover {
            background: ${Color.Text10};
            opacity: .8;
        }
    }

    :active {
        background: ${Color.Text20};
        opacity: .8;
    }
`;

export const Link: FunctionComponent<{ href: string; target?: HTMLAttributeAnchorTarget; children?: ReactNode; className?: string; }> = props => {
    return (
        <StyledLink href={props.href} target={props.target} className={props.className}>
            {props.children}
        </StyledLink>
    );
};

