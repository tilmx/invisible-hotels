import Head from 'next/head'
import { Wrapper } from '../components/wrapper'
import { Footer } from '../container/footer'
import { AccentStyle, Color, AccentedText, Logo, Text, TextSize, Size, Breakpoint } from '../components'
import { HotelList } from '../container/hotel-list'
import { ScrollIndicator } from '../container/scroll-indicator'
import { useRef } from 'react'
import styled from '@emotion/styled'

const StyledHeader = styled.div`
	position: relative;
	background-image: url('data:image/svg+xml;utf8,<svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="35" cy="35" r="1" opacity="0.3" fill="black"/></svg>');
	@media (prefers-color-scheme: dark) {
		background-image: url('data:image/svg+xml;utf8,<svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="35" cy="35" r="1" opacity="0.3" fill="white"/></svg>');
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

export default function Home() {
	const hotelListRef = useRef<HTMLDivElement>(null);

	return (
		<>
			<Head>
				<title>Invisible Hotels</title>
				<meta name="description" content="Invisible Hotels are all the lovely, minimalistic and fancy hotels & apartments where we stayed already — or would love to." />
			</Head>
			<StyledHeader>
				<Wrapper style={{ position: 'relative', zIndex: 1 }}>
					<Logo />
					<Text size={TextSize.Huge} serif>are all the <AccentedText color={Color.Blue} accentStyle={AccentStyle.Scribbled}>lovely</AccentedText>, <AccentedText color={Color.Green} accentStyle={AccentStyle.Circled}>minimalistic</AccentedText> and <AccentedText color={Color.Yellow} accentStyle={AccentStyle.Underlined}>fancy</AccentedText> hotels & apartments where we stayed already — or would love to.</Text>
					<ScrollIndicator onClick={() => hotelListRef.current?.scrollIntoView({ behavior: "smooth" })} />
				</Wrapper>
			</StyledHeader>
			<div ref={hotelListRef}>
				<HotelList />
			</div>
			<Footer />
		</>
	)
}
