import styled from "@emotion/styled";
import { FunctionComponent, MouseEventHandler } from "react";
import { Breakpoint, Color } from "./tokens";
import { Logo } from "./logo";
import { Wrapper } from "./wrapper";
import { Text, TextSize } from "./text";
import { AccentStyle, AccentedText } from "./accented-text";
import { ScrollIndicator } from "./scroll-indicator";

const StyledHeader = styled.div`
	position: relative;
	background-image: url('data:image/svg+xml;utf8,<svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="35" cy="35" r="1" opacity="0.3" fill="black"/></svg>');
	@media (prefers-color-scheme: dark) {
		background-image: url('data:image/svg+xml;utf8,<svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="35" cy="35" r="1" opacity="0.2" fill="white"/></svg>');
	}
	${Breakpoint.Mobile} {
		background-size: 24px;
	}
	background-position: center;
	
	:after {
		content: '';
		position: absolute;
		bottom: 0;
		width: 100%;
		height: 50%;
		background: linear-gradient(transparent, ${Color.Background});
	}
`;

export const Header: FunctionComponent<{ onScrollIndicatorClick: MouseEventHandler }> = props => {
    return (
        <StyledHeader>
            <Wrapper style={{ position: 'relative', zIndex: 1 }}>
                <Logo />
                <Text size={TextSize.Huge} serif>are all the <AccentedText color={Color.Blue} accentStyle={AccentStyle.Scribbled}>lovely</AccentedText>, <AccentedText color={Color.Green} accentStyle={AccentStyle.Circled}>minimalistic</AccentedText> and <AccentedText color={Color.Yellow} accentStyle={AccentStyle.Underlined}>fancy</AccentedText> hotels & apartments where we stayed already — or would love to.</Text>
                <ScrollIndicator onClick={props.onScrollIndicatorClick} />
            </Wrapper>
        </StyledHeader>
    )
}