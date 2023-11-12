import Head from 'next/head'
import { useRef } from 'react'
import { HotelList } from '../components/hotel-list';
import { Header } from '../components/header';
import { Intro } from '../components/intro';
import { ScrollIndicator } from '../components/scroll-indicator';
import { Share } from '../components/share';
import { Footer } from '../components/footer';
import { siteDescription, siteTitle } from '../data/site';
import { Color } from '../components/tokens/colors';

export default function Home() {
	const hotelListRef = useRef<HTMLDivElement>(null);

	return (
		<>
			<Head>
				<title>{siteTitle}</title>
				<meta name="description" content={siteDescription} />
				<meta property="og:title" content={siteTitle} />
				<meta property="og:description" content={siteDescription} />
				<meta property="og:image" content={`https://${process.env.NEXT_PUBLIC_DOMAIN}/images/og-image.jpg`} />
				<meta property="og:url" content={`https://${process.env.NEXT_PUBLIC_DOMAIN}/`} />
				<meta name="theme-color" content={Color.Background} />
			</Head>
			<Header>
				<Intro />
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
