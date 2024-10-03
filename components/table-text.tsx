import styled from "@emotion/styled";
import { FunctionComponent, ReactNode } from "react";
import { Text } from "./text";
import { Color } from "./tokens/colors";
import { Breakpoint } from "./tokens/breakpoint";

const StyledTable = styled.div`
	display: grid;
	grid-template-columns: 1fr 2fr;
	gap: var(--size-l);
	border-top: 1px solid ${Color.Text20};
	padding-top: var(--size-xl);
	margin-top: var(--size-xl);

	${Breakpoint.Mobile} {
		grid-template-columns: 1fr;
	}
`;

const StyledContent = styled.div`
	color: ${Color.Text60};
	display: flex;
	flex-direction: column;
	gap: var(--size-s);
`;

export const TableText: FunctionComponent<{ children?: ReactNode; title?: string; }> = props => {
	return (
		<StyledTable>
			<Text>{props.title}</Text>
			<StyledContent>
				{props.children}
			</StyledContent>
		</StyledTable>
	)
}