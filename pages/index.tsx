import Head from 'next/head'
import { Wrapper } from '../components/wrapper'
import { Footer } from '../container/footer'
import { AccentStyle, BackgroundColor, Color, AccentedText, Logo, Text, TextSize } from '../components'
import { useState } from 'react'
import { HotelList } from '../container/hotel-list'
import { ScrollIndicator } from '../container/scroll-indicator'

export default function Home() {
	const [color, setColor] = useState<string | undefined>();

	return (
		<BackgroundColor color={color || Color.Background}>
			<Head>
				<title>Invisible Hotels</title>
				<meta name="description" content="Invisible Hotels are all the lovely, minimalistic and fancy hotels & apartments where we stayed already — or would love to." />
			</Head>
			<Wrapper>
				<Logo />
				<Text size={TextSize.Huge} serif>are all the <AccentedText color={Color.Blue} accentStyle={AccentStyle.Scribbled} onMouseEnter={() => setColor(Color.Blue)} onMouseOut={() => setColor(undefined)}>lovely</AccentedText>, <AccentedText color={Color.Green} accentStyle={AccentStyle.Circled} onMouseEnter={() => setColor(Color.Green)} onMouseOut={() => setColor(undefined)}>minimalistic</AccentedText> and <AccentedText color={Color.Yellow} accentStyle={AccentStyle.Underlined} onMouseEnter={() => setColor(Color.Yellow)} onMouseOut={() => setColor(undefined)}>fancy</AccentedText> hotels & apartments where we stayed already — or would love to.</Text>
				<ScrollIndicator />
			</Wrapper>
			<HotelList backgroundColor={color} />
			<Footer />
		</BackgroundColor>
	)
}
