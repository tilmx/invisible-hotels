import { FunctionComponent, MouseEventHandler, ReactNode } from "react";
import { Text } from "./text";
import styles from './button.module.scss';
import clsx from "clsx";

export const Button: FunctionComponent<{ iconLeft?: ReactNode; iconRight?: ReactNode; small?: boolean; secondary?: boolean; children?: ReactNode; onClick?: MouseEventHandler; }> = props => {
    return (
        <div className={clsx(
            styles.button,
            props.small && styles.small,
            props.secondary && styles.secondary
        )}
            onClick={props.onClick}
        >
            {props.iconLeft}
            <Text center>
                {props.children}
            </Text>
            {props.iconRight}
        </div>
    )
}
