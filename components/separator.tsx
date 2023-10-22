import styled from '@emotion/styled'
import { FunctionComponent } from 'react';
import { Color } from './tokens';

const StyledSeparator = styled.div`
	width: 100%;
	height: 1px;
	background: ${Color.Text20};
	border-radius: 1px;
`;

export const Separator: FunctionComponent = () => {
	return (
		<StyledSeparator />
	)
}
