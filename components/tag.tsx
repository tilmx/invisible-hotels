import * as React from 'react';
import styled from '@emotion/styled'
import { Text, TextSize } from './text';
import { Color, Size } from './tokens';

const StyledTag = styled.div`
	border: 2px solid ${Color.Text};
	padding: ${Size.XXS} ${Size.S};
	border-radius: 24px;
	display: flex;
	gap: ${Size.XXS};
	align-items: center;
`;

export const Tag: React.FunctionComponent<{ icon?: React.ReactNode; label: string; }> = props => {
	return (
		<StyledTag>
			{props.icon}
			<Text size={TextSize.Small}>{props.label}</Text>
		</StyledTag>
	)
}
