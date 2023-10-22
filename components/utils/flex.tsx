import styled from '@emotion/styled';
import { FunctionComponent, ReactNode } from 'react';

interface FlexProps {
	justifyContent?: FlexJustifyContent;
	alignItems?: FlexAlignItems;
	children?: ReactNode;
	gap?: string;
	flexWrap?: 'wrap';
	className?: string;
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
	flex-wrap: ${props => props.flexWrap};
`;

export const Flex: FunctionComponent<FlexProps> = props => {
	return (
		<StyledFlex {...props}>{props.children}</StyledFlex>
	);
};
