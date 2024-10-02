import { css, Global } from '@emotion/react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { Color, Theme } from '../components/tokens/colors';
import { siteTitle } from '../data/site';
import PlausibleProvider from 'next-plausible'

function App({ Component, pageProps }: AppProps) {
    return (
        <Theme>
            <Head>
                <link rel="icon" type="image/png" href="/favicon.png" />
                <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=yes" />
                <meta name="language" content="en" />
                <meta name="keywords" content="Hotels, Hotel, Travel, Boutique Hotels, Design Hotels, Hotel Tips, Hotel Collection, Hotel Recommendations" />
                <meta property="og:site_name" content={siteTitle} />
                <meta property="og:type" content="website" />
            </Head>
            <Global styles={css`body { margin: 0; background: ${Color.Background}; color: ${Color.Text}; }`} />
            <PlausibleProvider domain="invisiblehotels.com" trackOutboundLinks>
                <Component {...pageProps} />
            </PlausibleProvider>
        </Theme>
    );
}

export default App;
