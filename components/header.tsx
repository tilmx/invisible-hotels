import styled from "@emotion/styled";
import { FunctionComponent, ReactNode } from "react";
import { Breakpoint, Color, Size } from "./tokens";
import { Wrapper } from "./wrapper";

const StyledHeader = styled.div`
	position: relative;
	background-image: url('data:image/svg+xml;utf8,<svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="35" cy="35" r="1" opacity="0.3" fill="black"/></svg>');
	@media (prefers-color-scheme: dark) {
		background-image: url('data:image/svg+xml;utf8,<svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="35" cy="35" r="1" opacity="0.2" fill="white"/></svg>');
	}

	padding-top: ${Size.XXXXL};
	${Breakpoint.Mobile} {
		padding-top: ${Size.XXXL};
		background-size: 24px;
	}
	background-position: center 12px;
	
	:after {
		content: '';
		position: absolute;
		bottom: 0;
		width: 100%;
		height: 50%;
		background: linear-gradient(transparent, ${Color.Background});
	}
`;

export const Header: FunctionComponent<{ children?: ReactNode }> = props => {
	return (
		<StyledHeader>
			<Wrapper style={{ position: 'relative', zIndex: 1 }}>
				{props.children}
			</Wrapper>
		</StyledHeader>
	)
}