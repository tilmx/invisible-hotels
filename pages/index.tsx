import Head from 'next/head'
import { Size } from '../components/tokens/size'
import { Space } from '../components/utils/space'
import { Wrapper } from '../components/wrapper'
import { Footer } from '../container/footer'
import { Color, Logo, Tag, Text, TextSize } from '../components'

export default function Home() {
	return (
		<div>
			<Head>
				<title>Invisible Hotels</title>
				<meta name="description" content="TODO" />
			</Head>
			<Wrapper>
				<Space vertical={Size.XXXXL} />
				<Logo />
				<Space vertical={Size.XL} />
				<Text size={TextSize.Large} serif>are all the <span style={{ color: Color.Yellow, fontStyle: 'italic' }}>fancy</span>, <span style={{ color: Color.Blue, fontStyle: 'italic' }}>minimalistic</span> and <span style={{ color: Color.Red, fontStyle: 'italic' }}>lovely</span> hotels that I already visited — or would love to.</Text>
				<Space vertical={Size.XXL} />
				<Tag>Coming Soon</Tag>
				<Space vertical={Size.XXXL} />
			</Wrapper>
			<Footer />
		</div>
	)
}
