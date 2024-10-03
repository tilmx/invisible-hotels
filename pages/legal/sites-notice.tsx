import Head from 'next/head'
import { Header } from '../../components/header';
import { Text } from '../../components/text';
import { Footer } from '../../components/footer';
import { siteTitle } from '../../data/site';
import { Color } from '../../components/tokens/colors';
import styles from './sites-notice.module.scss';

export default function SitesNotice() {
    return (
        <>
            <Head>
                <title>{'Site’s notice — ' + siteTitle}</title>
                <meta name="robots" content="noindex" />
                <meta name="theme-color" content={Color.Background} />
            </Head>
            <Header>
                <div className={styles.sitesNotice}>
                    <div className={styles.intro}>
                        <Text as="h1" size="extralarge" serif>
                            Site’s notice
                        </Text>
                    </div>
                    <div className={styles.content}>
                        {process.env.NEXT_PUBLIC_SITESNOTICE_ADDRESS?.split(', ').map((text, i) =>
                            <Text size="large" serif key={i}>{text}</Text>
                        )}
                        <br />
                        <Text size="large" serif>{process.env.NEXT_PUBLIC_SITESNOTICE_EMAIL}</Text>
                        <Text size="large" serif>{process.env.NEXT_PUBLIC_SITESNOTICE_PHONE}</Text>
                    </div>
                </div>
            </Header>
            <Footer />
        </>
    )
}
