import Head from 'next/head'
import { Size } from '../components/tokens/size'
import { Space } from '../components/utils/space'
import { Wrapper } from '../components/wrapper'
import { Footer } from '../container/footer'
import { Logo } from '../components'

export default function Home() {
	return (
		<div>
			<Head>
				<title>Invisible Hotels</title>
				<meta name="description" content="TODO" />
			</Head>
			<Wrapper>
				<Space vertical={Size.XXXL} />
				<Logo />
				<Space vertical={Size.XL} />
			</Wrapper>
			<Footer />
		</div>
	)
}
