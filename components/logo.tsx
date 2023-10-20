import * as React from 'react';
import styled from '@emotion/styled'
import { Text, TextSize } from './text';

const StyledLogoWrapper = styled.div``;

export const Logo: React.FunctionComponent = () => {
	return (
		<StyledLogoWrapper>
			<Text size={TextSize.Huge}>Invisible Hotels</Text>
		</StyledLogoWrapper>
	)
}
