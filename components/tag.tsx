import { Text } from './text';
import { FunctionComponent, MouseEventHandler, ReactNode } from 'react';
import styles from './tag.module.scss';
import clsx from 'clsx';

export const Tag: FunctionComponent<{ icon?: ReactNode; label?: string; children?: ReactNode; onClick?: MouseEventHandler; className?: string; }> = props => {
	return (
		<Text
			className={clsx(
				styles.tag,
				(typeof props.icon !== 'undefined') && styles.hasIcon,
				(typeof props.label !== 'undefined') && styles.hasLabel,
				props.className
			)}
			onClick={props.onClick}
		>
			{props.icon}
			{props.label}
			{props.children}
		</Text>
	)
}
