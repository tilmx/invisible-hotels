import Head from 'next/head'
import { Image } from '../components/image'
import { Logo } from '../components/logo'
import { OffsetArea } from '../components/offset-area'
import { Text, TextSize } from '../components/text'
import { Size } from '../components/tokens/size'
import { ExternalLink } from '../components/utils/external-link'
import { Space } from '../components/utils/space'
import { WidthLimiter } from '../components/width-limiter'
import { Wrapper } from '../components/wrapper'
import { BackgroundColor } from '../components/background-color'
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
