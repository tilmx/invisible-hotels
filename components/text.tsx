import { CSSProperties, FunctionComponent, MouseEventHandler, ReactNode } from 'react';
import clsx from 'clsx';
import styles from './text.module.scss';

interface TextProps {
    size?: TextSize;
    color?: string;
    center?: boolean;
    children?: ReactNode;
    serif?: boolean;
    bold?: boolean;
    className?: string;
    style?: CSSProperties;
    onClick?: MouseEventHandler;
    as?: keyof HTMLElementTagNameMap;
}

type TextSize = "regular" | "huge" | "extralarge" | "superlarge" | "large" | "small" | "unset";

export const Text: FunctionComponent<TextProps> = props => {
    const Element = props.as || 'div';
    return (
        <Element className={clsx(
            styles.text,
            props.serif && styles.serif,
            props.center && styles.center,
            props.bold && styles.bold,
            props.size ? styles[props.size] : styles['regular'],
            props.className
        )}
            color={props.color}
            style={{
                ...props.style,
                color: props.color,
            }}
            onClick={props.onClick}
        >
            {props.children}
        </Element>
    );
};
