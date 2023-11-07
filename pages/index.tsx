import Head from 'next/head'
import { useRef } from 'react'
import { HotelList } from '../components/hotel-list';
import { Header } from '../components/header';
import { Intro } from '../components/logo';
import { ScrollIndicator } from '../components/scroll-indicator';
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
				<meta property="og:title" content={siteTitle} />
				<meta property="og:description" content={siteDescription} />
				<meta property="og:image" content="https://invisible-hotels.com/images/og-image.jpg" />
				<meta property="og:url" content="https://invisible-hotels.com/" />
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
