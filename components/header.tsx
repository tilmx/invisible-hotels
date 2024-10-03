import { FunctionComponent, ReactNode } from "react";
import { Wrapper } from "./wrapper";
import { Menu } from "./menu";
import styles from './header.module.scss';

export const Header: FunctionComponent<{ children?: ReactNode }> = props => {
	return (
		<div className={styles.header}>
			<Wrapper className={styles.wrapper}>
				<Menu />
				{props.children}
			</Wrapper>
		</div>
	)
}