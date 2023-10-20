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
				<meta name="description" content="TODO" />
			</Head>
			<Wrapper>
				<Space vertical={Size.XXXXL} />
				<Logo />
				<Space vertical={Size.XL} />
				<Text size={TextSize.Large} serif>are all the <ColoredText color={Color.Yellow} onMouseEnter={() => setColor(Color.YellowVariant)} onMouseOut={() => setColor(undefined)}>fancy</ColoredText>, <ColoredText color={Color.Blue} onMouseEnter={() => setColor(Color.BlueVariant)} onMouseOut={() => setColor(undefined)}>minimalistic</ColoredText> and <ColoredText color={Color.Red} onMouseEnter={() => setColor(Color.RedVariant)} onMouseOut={() => setColor(undefined)}>lovely</ColoredText> hotels & apartments where we already stayed — or would love to.</Text>
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
