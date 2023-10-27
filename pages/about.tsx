import Head from 'next/head'
import { Footer } from '../components/footer';
import { Header } from '../components/header';

export default function About() {
    return (
        <>
            <Head>
                <title>Invisible Hotels</title>
                <meta name="description" content="Invisible Hotels are all the lovely, minimalistic and fancy hotels & apartments where we stayed already — or would love to." />
            </Head>
            <Header>
                About — coming soon
            </Header>
            <Footer />
        </>
    )
}
