import Head from 'next/head'
import { Header } from '../components/header';
import { Text } from '../components/text';
import AboutPicture from '../public/images/about.jpg'
import Image from 'next-image-export-optimizer';
import { ArrowRight } from 'lucide-react';
import { UnstyledLink } from '../components/utils/link';
import { AccentStyle, AccentedText } from '../components/accented-text';
import { Button } from '../components/button';
import { Footer } from '../components/footer';
import { Color } from '../components/tokens/colors';
import { siteTitle } from '../data/site';
import styles from './about.module.scss';

export default function About() {
    return (
        <>
            <Head>
                <title>{'About — ' + siteTitle}</title>
                <meta name="description" content="Hej, we're Annika & Tilman. We love hotels — and believe that a beautiful hotel is the best start for any vacation." />
                <meta name="theme-color" content={Color.Background} />
            </Head>
            <Header>
                <div className={styles.wrapper}>
                    <Text size="extralarge" serif>
                        Hej, we're <AccentedText color={Color.Blue} accentStyle={AccentStyle.Scribbled}>Annika</AccentedText> & <AccentedText color={Color.Green} accentStyle={AccentStyle.Underlined}>Tilman</AccentedText>. We love hotels — and believe that a beautiful hotel is the best start for any vacation.
                    </Text>
                    <Image className={styles.image} width={800} src={AboutPicture} alt="Picture of Tilman & Annika" placeholder="blur" />
                    <Text className={styles.paragraph} size="extralarge" serif>
                        For the past 5 years we had a long list on Google Maps with all the pretty hotels where we wanted to stay in this world …
                        <svg style={{ color: Color.Yellow }} width="595" height="186" viewBox="0 0 595 186" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path opacity="0.3" d="M12.6093 12C160.609 12.5 467.109 16.8 509.109 30C561.609 46.5 36.1093 53.5 12.6093 79C-10.8907 104.5 653.609 72 576.109 104.5C498.609 137 -65.3906 131 70.6094 149.5C179.409 164.3 374.609 171.667 458.609 173.5" stroke="currentColor" strokeWidth="24" strokeLinecap="round" />
                        </svg>

                    </Text>
                    <Text className={styles.paragraph} size="extralarge" serif>
                        … and quite some people asked us to share this secret list with them — so we created a little website to make it easier.
                        <svg style={{ color: Color.Blue }} width="480" height="165" viewBox="0 0 480 165" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path opacity="0.3" d="M12 63.2722C28.5206 45.8443 65.8101 12.1353 82.8028 16.7228C104.044 22.4572 20.0917 94.9794 31.5551 108.809C43.0184 122.639 160.012 12 201.819 12C243.626 12 30.8807 152.323 56.8418 152.998C82.8028 153.672 279.702 16.7228 303.977 16.7228C328.252 16.7228 165.069 144.902 192.041 148.95C219.014 152.998 333.31 41.0091 366.688 34.6001C400.067 28.1911 254.078 152.998 290.828 152.998C327.578 152.998 463.115 6.94028 467.835 20.7702C471.611 31.8341 409.619 110.833 378.152 148.95" stroke="currentColor" strokeWidth="24" strokeLinecap="round" />
                        </svg>
                    </Text>
                    <div className={styles.teaserContainer}>
                        <UnstyledLink href='/'>
                            <Button iconRight={<ArrowRight />}>Explore Hotels</Button>
                        </UnstyledLink>
                    </div>
                </div>
            </Header>
            <Footer />
        </>
    )
}
