import { css, Global } from '@emotion/react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { Color, Theme } from '../components/tokens/colors';
import PlausibleProvider from 'next-plausible';
import { siteTitle } from '../data/site';

function App({ Component, pageProps }: AppProps) {
    return (
        <PlausibleProvider domain="invisiblehotels.com" trackOutboundLinks>
            <Theme>
                <Head>
                    <link rel="icon" href="/favicon.png" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=yes" />
                    <meta name="language" content="en" />
                    <meta name="keywords" content="Hotels, Hotel, Travel, Boutique Hotels, Design Hotels, Hotel Tips, Hotel Collection, Hotel Recommendations" />
                    <meta property="og:site_name" content={siteTitle} />
                    <meta property="og:type" content="website" />
                </Head>
                <Global styles={css`body { margin: 0; background: ${Color.Background}; color: ${Color.Text}; }`} />
                <Component {...pageProps} />
            </Theme>
        </PlausibleProvider>
    );
}

export default App;
