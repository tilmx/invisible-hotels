import * as React from 'react';
import styled from '@emotion/styled'
import { Text } from './text';
import { Color, Size } from './tokens';
import { Box } from 'lucide-react';

const StyledTag = styled.div`
	border: 1px solid ${Color.Text};
	padding: ${Size.XXS} ${Size.M};
	border-radius: 24px;
	display: flex;
	gap: ${Size.XXS};
	align-items: center;
`;

export const Tag: React.FunctionComponent<{ icon?: string; label: string; }> = props => {
	return (
		<StyledTag>
			<Box />
			<Text>{props.label}</Text>
		</StyledTag>
	)
}
