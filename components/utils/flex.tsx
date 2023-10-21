import * as React from 'react';
import styled from '@emotion/styled';

interface FlexProps {
	justifyContent?: FlexJustifyContent;
	alignItems?: FlexAlignItems;
	children?: React.ReactNode;
	gap?: string;
}

export enum FlexJustifyContent {
	SpaceBetween = 'space-between',
	Stretch = 'stretch',
	Center = 'center',
	FlexEnd = 'flex-end',
	FlexStart = 'flex-start'
}

export enum FlexAlignItems {
	Center = 'center',
	FlexStart = 'flex-start',
	FlexEnd = 'flex-end',
	Baseline = 'baseline',
	Stretch = 'stretch'
}

const StyledFlex = styled.div<FlexProps>`
	display: flex;
	justify-content: ${props => props.justifyContent};
	align-items: ${props => props.alignItems};
	gap: ${props => props.gap};
`;

export const Flex: React.FunctionComponent<FlexProps> = props => {
	return (
		<StyledFlex {...props}>{props.children}</StyledFlex>
	);
};
