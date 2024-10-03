import { Text } from './text';
import { CSSProperties, FunctionComponent, MouseEventHandler, ReactNode } from 'react';
import styles from './tag.module.scss';
import clsx from 'clsx';

export const Tag: FunctionComponent<{ icon?: ReactNode; label?: string; children?: ReactNode; onClick?: MouseEventHandler; className?: string; style?: CSSProperties }> = props => {
	return (
		<Text
			className={clsx(
				styles.tag,
				(typeof props.icon !== 'undefined') && styles.hasIcon,
				(typeof props.label !== 'undefined') && styles.hasLabel,
				props.className
			)}
			onClick={props.onClick}
			style={props.style}
		>
			{props.icon}
			{props.label}
			{props.children}
		</Text>
	)
}
