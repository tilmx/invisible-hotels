import Head from 'next/head'
import { Wrapper } from '../components/wrapper'
import { Footer } from '../container/footer'
import { AccentStyle, Color, AccentedText, Logo, Text, TextSize } from '../components'
import { HotelList } from '../container/hotel-list'
import { ScrollIndicator } from '../container/scroll-indicator'
import { useRef } from 'react'

export default function Home() {
	const hotelListRef = useRef<HTMLDivElement>(null);

	return (
		<>
			<Head>
				<title>Invisible Hotels</title>
				<meta name="description" content="Invisible Hotels are all the lovely, minimalistic and fancy hotels & apartments where we stayed already — or would love to." />
			</Head>
			<Wrapper>
				<Logo />
				<Text size={TextSize.Huge} serif>are all the <AccentedText color={Color.Blue} accentStyle={AccentStyle.Scribbled}>lovely</AccentedText>, <AccentedText color={Color.Green} accentStyle={AccentStyle.Circled}>minimalistic</AccentedText> and <AccentedText color={Color.Yellow} accentStyle={AccentStyle.Underlined}>fancy</AccentedText> hotels & apartments where we stayed already — or would love to.</Text>
				<ScrollIndicator onClick={() => hotelListRef.current?.scrollIntoView({ behavior: "smooth" })} />
			</Wrapper>
			<div ref={hotelListRef}>
				<HotelList />
			</div>
			<Footer />
		</>
	)
}
