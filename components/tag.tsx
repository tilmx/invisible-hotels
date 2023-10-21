import styled from '@emotion/styled'
import { Text, TextSize } from './text';
import { Breakpoint, Color, Size } from './tokens';
import { FunctionComponent, MouseEventHandler, ReactNode } from 'react';

const StyledTag = styled.div`
	border: 2px solid ${Color.Text};
	padding: ${Size.XXS} ${Size.S};
	border-radius: 24px;
	display: flex;
	gap: ${Size.XXS};
	align-items: center;

	${Breakpoint.Mobile} {
		padding: ${Size.Special6} ${Size.XS};
		gap: ${Size.XXXS};
		svg {
			width: 20px;
			height: 20px;
		}
	}
`;

export const Tag: FunctionComponent<{ icon?: ReactNode; label?: string; children?: ReactNode; onClick?: MouseEventHandler; className?: string; }> = props => {
	return (
		<StyledTag onClick={props.onClick} className={props.className}>
			{props.icon}
			<Text size={TextSize.Small}>{props.label}</Text>
			{props.children}
		</StyledTag>
	)
}
