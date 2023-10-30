import styled from '@emotion/styled';
import { FunctionComponent, ReactNode } from 'react';

interface FlexProps {
	justifyContent?: JustifyContent;
	alignItems?: AlignItems;
	children?: ReactNode;
	direction?: FlexDirection;
	gap?: string;
	flexWrap?: 'wrap';
	className?: string;
}

export enum FlexDirection {
	Row = 'row',
	Column = 'column',
}

export enum JustifyContent {
	SpaceBetween = 'space-between',
	Stretch = 'stretch',
	Center = 'center',
	FlexEnd = 'flex-end',
	FlexStart = 'flex-start'
}

export enum AlignItems {
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
	flex-direction: ${props => props.direction};
`;

export const Flex: FunctionComponent<FlexProps> = props => {
	return (
		<StyledFlex {...props}>{props.children}</StyledFlex>
	);
};
