import Head from 'next/head'
import { Size } from '../components/tokens/size'
import { Space } from '../components/utils/space'
import { Wrapper } from '../components/wrapper'
import { Footer } from '../container/footer'
import { BackgroundColor, Color, Logo, Tag, Text, TextSize } from '../components'
import { FunctionComponent, MouseEventHandler, useState } from 'react'

export default function Home() {
	const [color, setColor] = useState<string | undefined>();

	return (
		<BackgroundColor color={color || Color.Background}>
			<Head>
				<title>Invisible Hotels</title>
			</Head>
			<Wrapper>
				<Space vertical={Size.XXXXL} />
				<Logo />
				<Space vertical={Size.XL} />
				<Text size={TextSize.Large} serif>are all the <ColoredText color={Color.Blue} onMouseEnter={() => setColor(Color.Blue)} onMouseOut={() => setColor(undefined)}>lovely</ColoredText>, <ColoredText color={Color.Green} onMouseEnter={() => setColor(Color.Green)} onMouseOut={() => setColor(undefined)}>minimalistic</ColoredText> and <ColoredText color={Color.Yellow} onMouseEnter={() => setColor(Color.Yellow)} onMouseOut={() => setColor(undefined)}>fancy</ColoredText> hotels & apartments where we stayed already — or would love to.</Text>
				<Space vertical={Size.XXL} />
				<Tag>Coming Soon</Tag>
				<Space vertical={Size.XXXL} />
			</Wrapper>
			<Footer />
		</BackgroundColor>
	)
}

const ColoredText: FunctionComponent<{ color: string; children?: React.ReactNode; onMouseEnter?: MouseEventHandler; onMouseOut?: MouseEventHandler }> = props => {
	return (
		<span onMouseEnter={props.onMouseEnter} onMouseOut={props.onMouseOut} style={{ color: props.color, fontStyle: 'italic' }}>
			{props.children}
		</span>
	)
}
