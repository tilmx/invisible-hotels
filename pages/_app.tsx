import { css, Global } from '@emotion/react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { Color, Theme } from '../components/tokens';
import PlausibleProvider from 'next-plausible';
import { Footer } from '../components/footer';

export const siteTitle = "Invisible Hotels"
const siteDescription = "Invisible Hotels are all the lovely, minimalistic and fancy hotels & apartments where we stayed already — or would love to.";

function App({ Component, pageProps }: AppProps) {
    return (
        <PlausibleProvider domain="invisible-hotels.com" trackOutboundLinks>
            <Theme>
                <Head>
                    <link rel="icon" href="/favicon.png" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=yes" />
                    <meta name="language" content="en" />
                    <meta name="description" content={siteDescription} />
                    <meta property="og:title" content={siteTitle} />
                    <meta property="og:description" content={siteDescription} />
                    <meta property="og:image" content="/images/og-image.jpg" />
                    <meta property="og:url" content="https://invisible-hotels.com/" />
                    <meta property="og:type" content="website" />
                </Head>
                <Global styles={css`body { margin: 0; background: ${Color.Background}; color: ${Color.Text}; };`} />
                <Component {...pageProps} />
                <Footer />
            </Theme>
        </PlausibleProvider>
    );
}

export default App;
