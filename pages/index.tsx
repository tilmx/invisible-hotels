import Head from 'next/head'
import { Wrapper } from '../components/wrapper'
import { Footer } from '../container/footer'
import { AccentStyle, BackgroundColor, Color, AccentedText, Logo, Tag, Text, TextSize, HotelCard, Housing, Region, HotelList } from '../components'
import { useState } from 'react'

export default function Home() {
	const [color, setColor] = useState<string | undefined>();

	return (
		<BackgroundColor color={color || Color.Background}>
			<Head>
				<title>Invisible Hotels</title>
			</Head>
			<Wrapper>
				<Logo />
				<Text size={TextSize.Huge} serif>are all the <AccentedText color={Color.Blue} accentStyle={AccentStyle.Scribbled} onMouseEnter={() => setColor(Color.Blue)} onMouseOut={() => setColor(undefined)}>lovely</AccentedText>, <AccentedText color={Color.Green} accentStyle={AccentStyle.Circled} onMouseEnter={() => setColor(Color.Green)} onMouseOut={() => setColor(undefined)}>minimalistic</AccentedText> and <AccentedText color={Color.Yellow} accentStyle={AccentStyle.Underlined} onMouseEnter={() => setColor(Color.Yellow)} onMouseOut={() => setColor(undefined)}>fancy</AccentedText> hotels & apartments where we stayed already — or would love to.</Text>
			</Wrapper>
			<Wrapper wide>
				<HotelList>
					<HotelCard
						title='Noah Surf House'
						location='A dos Cunhados, Portugal'
						housing={Housing.Hotel}
						region={Region.Sea}
					/>
					<HotelCard
						title='Aethos Ericeira'
						location='Encarnação, Portugal'
						housing={Housing.Hotel}
						region={Region.Sea}
					/>
				</HotelList>
			</Wrapper>
			<Footer />
		</BackgroundColor>
	)
}
