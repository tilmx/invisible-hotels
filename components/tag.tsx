import styled from '@emotion/styled'
import { Text } from './text';
import { FunctionComponent, MouseEventHandler, ReactNode } from 'react';
import { Breakpoint } from './tokens/breakpoint';

const StyledTag = styled(Text) <{ hasIcon?: boolean; hasLabel?: boolean; }>`
	border: 2px solid currentColor;
	padding: var(--size-xxs) var(--size-s);
	${props => props.hasIcon && `padding-left: var(--size-xs);`}
	${props => !props.hasLabel && `padding-right: var(--size-xs);`}
	border-radius: 24px;
	display: flex;
	gap: var(--size-xxs);
	align-items: center;

	${Breakpoint.Mobile} {
		padding: var(--size-special6) var(--size-xs);
		${props => props.hasIcon && `padding-left: var(--size-xxs);`}
		${props => !props.hasLabel && `padding-right: var(--size-xxs);`}
		border-width: 1.5px;
		gap: var(--size-xxxs);
		svg, img {
			width: 20px;
			height: 20px;
		}
	}
`;

export const Tag: FunctionComponent<{ icon?: ReactNode; label?: string; children?: ReactNode; onClick?: MouseEventHandler; className?: string; }> = props => {
	return (
		<StyledTag hasIcon={typeof props.icon !== 'undefined'} hasLabel={typeof props.label !== 'undefined'} onClick={props.onClick} className={props.className}>
			{props.icon}
			{props.label}
			{props.children}
		</StyledTag>
	)
}
