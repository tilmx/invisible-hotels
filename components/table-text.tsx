import { FunctionComponent, ReactNode } from "react";
import { Text } from "./text";
import styles from './table-text.module.scss';

export const TableText: FunctionComponent<{ children?: ReactNode; title?: string; }> = props => {
	return (
		<div className={styles.tableText}>
			<Text>{props.title}</Text>
			<div className={styles.content}>
				{props.children}
			</div>
		</div>
	)
}