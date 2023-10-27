import styled from '@emotion/styled'
import { Text, TextSize } from './text';
import { FunctionComponent, ReactNode } from 'react';
import { Color, Size } from './tokens';

const StyledButton = styled.a`
	color: inherit;
	text-decoration: none;
	background: ${Color.Text10};
	padding: ${Size.XXS} ${Size.S};
	border-radius: ${Size.L};
	display: flex;
	gap: ${Size.XXS};
	align-items: center;
	cursor: pointer;

	svg {
		width: 20px;
		height: 20px;
	}

	&:active {
		color: ${Color.Text};
		background: ${Color.Text50};
	}

	@media (hover: hover) {
		&:hover {
			color: ${Color.Text};
			background: ${Color.Text20};
		}
	}
`;

export const ButtonMini: FunctionComponent<{ icon?: ReactNode; children?: ReactNode; url: string; }> = props => {
	return (
		<StyledButton href={props.url} target='_blank'>
			{props.icon}
			<Text size={TextSize.Regular}>
				{props.children}
			</Text>
		</StyledButton>
	)
}
