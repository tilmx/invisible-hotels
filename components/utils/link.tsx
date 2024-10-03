import NextLink from 'next/link';
import { CSSProperties, FunctionComponent, HTMLAttributeAnchorTarget, ReactNode } from 'react';
import styles from './link.module.scss';
import clsx from 'clsx';

export const UnstyledLink: FunctionComponent<{ href: string; target?: HTMLAttributeAnchorTarget; children?: ReactNode; className?: string; description?: string; style?: CSSProperties }> = props => {
    return (
        <NextLink className={clsx(styles.unstyledLink, props.className)} aria-label={props.description} href={props.href} target={props.target} style={props.style}>
            {props.children}
        </NextLink>
    );
};

export const Link: FunctionComponent<{ description?: string; href: string; target?: HTMLAttributeAnchorTarget; children?: ReactNode; className?: string; }> = props => {
    return (
        <NextLink className={clsx(styles.styledLink, props.className)} aria-label={props.description} href={props.href} target={props.target} >
            {props.children}
        </NextLink>
    );
};

