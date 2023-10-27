import styled from '@emotion/styled'
import { Text, TextSize } from './text';
import { Breakpoint, Color, Size } from './tokens';
import { FunctionComponent, MouseEventHandler, ReactNode } from 'react';

const StyledTag = styled.div<{ hasIcon?: boolean; hasLabel?: boolean; onImage?: boolean; }>`
	border: 2px solid ${Color.Text};
	padding: ${Size.XXS} ${Size.S};
	${props => props.hasIcon && `padding-left: ${Size.XS};`}
	${props => !props.hasLabel && `padding-right: ${Size.XS};`}
	border-radius: 24px;
	display: flex;
	gap: ${Size.XXS};
	align-items: center;

	${props => props.onImage && `
		backdrop-filter: blur(${Size.S});
		color: ${Color.Background};
		border: none;
		background: ${Color.Text20};
		box-shadow: inset 0 0 0 1px ${Color.Text20};
	`}

	${Breakpoint.Mobile} {
		padding: ${Size.Special6} ${Size.XS};
		${props => props.hasIcon && `padding-left: ${Size.XXS};`}
		${props => !props.hasLabel && `padding-right: ${Size.Special6};`}
		border-width: 1.5px;
		gap: ${Size.XXXS};
		svg {
			width: 20px;
			height: 20px;
		}
	}
`;

export const Tag: FunctionComponent<{ icon?: ReactNode; onImage?: boolean; label?: string; children?: ReactNode; onClick?: MouseEventHandler; className?: string; }> = props => {
	return (
		<StyledTag onImage={props.onImage} hasIcon={typeof props.icon !== 'undefined'} hasLabel={typeof props.label !== 'undefined'} onClick={props.onClick} className={props.className}>
			{props.icon}
			{props.label &&
				<Text size={TextSize.Small}>{props.label}</Text>
			}
			{props.children}
		</StyledTag>
	)
}
