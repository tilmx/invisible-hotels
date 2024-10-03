import { AppProps } from 'next/app';
import Head from 'next/head';
import { siteTitle } from '../data/site';
import PlausibleProvider from 'next-plausible'
import '../components/tokens/globals.scss'

import { DM_Sans, EB_Garamond } from 'next/font/google'
import clsx from 'clsx';

const FontSerif = EB_Garamond({
    weight: '400',
    style: ['normal', 'italic'],
    subsets: ['latin'],
    variable: "--font-serif"
})
const FontSans = DM_Sans({
    weight: ['600', '400'],
    subsets: ['latin'],
    variable: "--font-sans"
})

function App({ Component, pageProps }: AppProps) {
    return (
        <div className={clsx(FontSerif.variable, FontSans.variable)}>
            <Head>
                <link rel="icon" type="image/png" href="/favicon.png" />
                <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=yes" />
                <meta name="language" content="en" />
                <meta name="keywords" content="Hotels, Hotel, Travel, Boutique Hotels, Design Hotels, Hotel Tips, Hotel Collection, Hotel Recommendations" />
                <meta property="og:site_name" content={siteTitle} />
                <meta property="og:type" content="website" />
            </Head>
            <PlausibleProvider domain="invisiblehotels.com" trackOutboundLinks>
                <Component {...pageProps} />
            </PlausibleProvider>
        </div>
    );
}

export default App;
