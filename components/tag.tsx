import styled from '@emotion/styled'
import { Text, TextSize } from './text';
import { FunctionComponent, MouseEventHandler, ReactNode } from 'react';
import { Size } from './tokens/size';
import { Breakpoint } from './tokens/breakpoint';

const StyledTag = styled.div<{ hasIcon?: boolean; hasLabel?: boolean; }>`
	border: 2px solid currentColor;
	padding: ${Size.XXS} ${Size.S};
	${props => props.hasIcon && `padding-left: ${Size.XS};`}
	${props => !props.hasLabel && `padding-right: ${Size.XS};`}
	border-radius: 24px;
	display: flex;
	gap: ${Size.XXS};
	align-items: center;

	${Breakpoint.Mobile} {
		padding: ${Size.Special6} ${Size.XS};
		${props => props.hasIcon && `padding-left: ${Size.XXS};`}
		${props => !props.hasLabel && `padding-right: ${Size.XXS};`}
		border-width: 1.5px;
		gap: ${Size.XXXS};
		svg {
			width: 20px;
			height: 20px;
		}
	}
`;

export const Tag: FunctionComponent<{ icon?: ReactNode; label?: string; children?: ReactNode; onClick?: MouseEventHandler; className?: string; }> = props => {
	return (
		<StyledTag hasIcon={typeof props.icon !== 'undefined'} hasLabel={typeof props.label !== 'undefined'} onClick={props.onClick} className={props.className}>
			{props.icon}
			{props.label &&
				<Text size={TextSize.Regular}>{props.label}</Text>
			}
			{props.children}
		</StyledTag>
	)
}
