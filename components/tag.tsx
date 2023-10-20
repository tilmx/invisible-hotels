import * as React from 'react';
import styled from '@emotion/styled'
import { Text, TextSize } from './text';
import { Color, Size } from './tokens';

const StyledTag = styled.div`
	display: inline-block;
	border: 1px solid ${Color.Text};
	padding: ${Size.XXS} ${Size.M};
	border-radius: 24px;
`;

export const Tag: React.FunctionComponent<{ children?: React.ReactNode }> = props => {
	return (
		<StyledTag>
			<Text size={TextSize.Regular}>{props.children}</Text>
		</StyledTag>
	)
}
