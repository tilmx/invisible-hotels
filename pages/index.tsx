import Head from 'next/head'
import { useRef } from 'react'
import { HotelList } from '../components/hotel-list';
import { Footer } from '../components/footer';
import { Header } from '../components/header';

export default function Home() {
	const hotelListRef = useRef<HTMLDivElement>(null);

	return (
		<>
			<Head>
				<title>Invisible Hotels</title>
				<meta name="description" content="Invisible Hotels are all the lovely, minimalistic and fancy hotels & apartments where we stayed already — or would love to." />
			</Head>
			<Header onScrollIndicatorClick={() => hotelListRef.current?.scrollIntoView({ behavior: "smooth" })} />
			<div ref={hotelListRef}>
				<HotelList />
			</div>
			<Footer />
		</>
	)
}
