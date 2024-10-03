import clsx from 'clsx';
import { CSSProperties, FunctionComponent, ReactNode } from 'react';
import styles from './wrapper.module.scss';

export const Wrapper: FunctionComponent<{ children: ReactNode; wide?: boolean; style?: CSSProperties; className?: string; }> = props => {
    return (
        <div className={clsx(styles.wrapper, props.wide && styles.wide, props.className)} style={props.style}>
            {props.children}
        </div>
    )
}
