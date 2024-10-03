import styled from '@emotion/styled';
import NextLink from 'next/link';
import { FunctionComponent, HTMLAttributeAnchorTarget, ReactNode } from 'react';
import { Size } from '../tokens/size';
import { Color } from '../tokens/colors';

const StyledUnstyledLink = styled(NextLink)`
    color: unset;
    text-decoration: unset;
`;

export const UnstyledLink: FunctionComponent<{ href: string; target?: HTMLAttributeAnchorTarget; children?: ReactNode; className?: string; description?: string; }> = props => {
    return (
        <StyledUnstyledLink aria-label={props.description} href={props.href} target={props.target} className={props.className}>
            {props.children}
        </StyledUnstyledLink>
    );
};

const StyledLink = styled(StyledUnstyledLink)`
    opacity: .6;
    cursor: pointer;
    padding: ${Size.XXS} ${Size.S};
    margin: calc(-1 * ${Size.XXS}) calc(-1 * ${Size.S});
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

export const Link: FunctionComponent<{ description?: string; href: string; target?: HTMLAttributeAnchorTarget; children?: ReactNode; className?: string; }> = props => {
    return (
        <StyledLink aria-label={props.description} href={props.href} target={props.target} className={props.className}>
            {props.children}
        </StyledLink>
    );
};

