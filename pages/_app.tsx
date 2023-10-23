import { css, Global } from '@emotion/react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { Color, Theme } from '../components/tokens/colors';
import PlausibleProvider from 'next-plausible';

function App({ Component, pageProps }: AppProps) {
  return (
    <PlausibleProvider domain="invisible-hotels.com" trackOutboundLinks>
      <Theme>
        <Head>
          <link rel="icon" href="/favicon.png" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=yes" />
          <meta name="language" content="en" />
        </Head>
        <Global styles={css`body { margin: 0; background: ${Color.Background}; color: ${Color.Text}; };`} />
        <Component {...pageProps} />
      </Theme>
    </PlausibleProvider>
  );
}

export default App;
