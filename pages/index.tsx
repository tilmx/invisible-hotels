import Head from 'next/head'
import { useRef } from 'react'
import { HotelList } from '../components/hotel-list';
import { Footer } from '../components/footer';
import { Header } from '../components/header';
import { Logo } from '../components/logo';
import { Text, TextSize } from '../components/text';
import { ScrollIndicator } from '../components/scroll-indicator';
import { AccentStyle, AccentedText } from '../components/accented-text';
import { Color } from '../components/tokens';

export default function Home() {
	const hotelListRef = useRef<HTMLDivElement>(null);

	return (
		<>
			<Head>
				<title>Invisible Hotels</title>
				<meta name="description" content="Invisible Hotels are all the lovely, minimalistic and fancy hotels & apartments where we stayed already — or would love to." />
			</Head>
			<Header>
				<Logo />
				<Text size={TextSize.Huge} serif>are all the <AccentedText color={Color.Blue} accentStyle={AccentStyle.Scribbled}>lovely</AccentedText>, <AccentedText color={Color.Green} accentStyle={AccentStyle.Circled}>minimalistic</AccentedText> and <AccentedText color={Color.Yellow} accentStyle={AccentStyle.Underlined}>fancy</AccentedText> hotels & apartments where we stayed already — or would love to.</Text>
				<ScrollIndicator onClick={() => hotelListRef.current?.scrollIntoView({ behavior: "smooth" })} />
			</Header>
			<div ref={hotelListRef}>
				<HotelList />
			</div>
			<Footer />
		</>
	)
}
