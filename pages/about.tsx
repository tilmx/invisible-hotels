import Head from 'next/head'
import { Footer } from '../components/footer';
import { Header } from '../components/header';
import { Text, TextSize } from '../components/text';
import styled from '@emotion/styled';
import { Breakpoint, Color, Size } from '../components/tokens';
import AboutPicture from '../public/images/about.jpg'
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Flex } from '../components/utils';
import { AccentStyle, AccentedText } from '../components/accented-text';

const StyledWrapper = styled.div`
    max-width: 800px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: ${Size.XXXL};

    ${Breakpoint.TabletSmall} {
        gap: ${Size.XL}
    }
`;

const StyledImage = styled(Image)`
    border-radius: ${Size.M};
    width: 100%;
    height: auto;
`;

const StyledBackButton = styled(Link)`
    display: flex;
    gap: ${Size.XXS};
    text-decoration: none;
    color: inherit;
    padding: ${Size.XXS};
    margin: -${Size.XXS};
    border-radius: ${Size.XS};
    @media (hover: hover) {
        :hover {
                background: ${Color.Text10};
            }
        }
    }
`;

export default function About() {
    return (
        <>
            <Head>
                <title>Invisible Hotels</title>
                <meta name="description" content="Invisible Hotels are all the lovely, minimalistic and fancy hotels & apartments where we stayed already — or would love to." />
            </Head>
            <Header>
                <StyledWrapper>
                    <Flex>
                        <StyledBackButton href="/">
                            <ArrowLeft />
                            <Text>Back to home</Text>
                        </StyledBackButton>
                    </Flex>
                    <Text size={TextSize.ExtraLarge} serif>Hej, we're <AccentedText color={Color.Blue} accentStyle={AccentStyle.Scribbled}>Annika</AccentedText> & <AccentedText color={Color.Green} accentStyle={AccentStyle.Underlined}>Tilman</AccentedText>. We’re hotel lovers — we believe that a lovely hotel is the best start for any vacation.</Text>
                    <StyledImage width={800} src={AboutPicture} alt="Picture of Tilman & Annika" />
                    <Text size={TextSize.ExtraLarge} serif>For the past 5 years we had a long list on Google Maps with all the pretty hotels where we wanted to go in this world …</Text>
                    <Text size={TextSize.ExtraLarge} serif>… and quite some people asked us to share the list with them — so we created this little website to make it easier.</Text>
                </StyledWrapper>
            </Header>
            <Footer />
        </>
    )
}
