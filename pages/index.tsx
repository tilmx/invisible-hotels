import Head from 'next/head'
import { useRef } from 'react'
import { HotelList } from '../components/hotel-list';
import { Header } from '../components/header';
import { Logo } from '../components/logo';
import { Text, TextSize } from '../components/text';
import { ScrollIndicator } from '../components/scroll-indicator';
import { AccentStyle, AccentedText } from '../components/accented-text';
import { Color } from '../components/tokens/colors';
import { Share } from '../components/share';
import { Footer } from '../components/footer';
import { siteDescription, siteTitle } from '../data/site';

export default function Home() {
	const hotelListRef = useRef<HTMLDivElement>(null);

	return (
		<>
			<Head>
				<title>{siteTitle}</title>
				<meta name="description" content={siteDescription} />
			</Head>
			<Header>
				<Logo />
				<Text size={TextSize.Huge} serif>are all the <AccentedText italic color={Color.Blue} accentStyle={AccentStyle.Scribbled}>lovely</AccentedText>, <AccentedText italic color={Color.Green} accentStyle={AccentStyle.Circled}>minimalistic</AccentedText> and <AccentedText italic color={Color.Yellow} accentStyle={AccentStyle.Underlined}>fancy</AccentedText> hotels & apartments where we stayed already — or would love to.</Text>
				<ScrollIndicator onClick={() => hotelListRef.current?.scrollIntoView({ behavior: "smooth" })} />
			</Header>
			<div ref={hotelListRef}>
				<HotelList />
			</div>
			<Share />
			<Footer />
		</>
	)
}
