import Head from 'next/head'
import { Logo } from '../components/logo'
import { Text, TextSize } from '../components/text'
import { Size } from '../components/tokens/size'
import { Space } from '../components/utils/space'
import { Wrapper } from '../components/wrapper'
import { InternalLink } from '../components/utils/internal-link'
import { Footer } from '../container/footer'
import { Color } from '../components'

export default function Home() {
	return (
		<div>
			<Head>
				<title>Invisible Hotels</title>
				<meta name="description" content="TODO" />
			</Head>
			<Wrapper>
				<InternalLink link='/'>
					<Logo />
				</InternalLink>
				<Space vertical={Size.XXXL} />
				<Text center size={TextSize.Huge} indent>Test</Text>
				<Space vertical={Size.XL} />
				<Text color={Color.TextVariant} center sansserif>Get in touch</Text>
				<Space vertical={Size.M} />
			</Wrapper>
			<Footer />
		</div>
	)
}
