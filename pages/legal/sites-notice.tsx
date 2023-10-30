import Head from 'next/head'
import { Header } from '../../components/header';
import { Text, TextSize } from '../../components/text';
import styled from '@emotion/styled';
import { Size } from '../../components/tokens';
import { siteTitle } from '../_app';
import { Footer } from '../../components/footer';

const StyledWrapper = styled.div`
    max-width: 800px;
    margin: 0 auto;
`;

const StyledIntro = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${Size.M};
`;

const StyledContent = styled.div`
    margin-top: ${Size.XL};
    display: flex;
    flex-direction: column;
    gap: ${Size.XXS};
`;


export default function SitesNotice() {
    return (
        <>
            <Head>
                <title>Site’s notice | {siteTitle}</title>
                <meta name="robots" content="noindex" />
            </Head>
            <Header>
                <StyledWrapper>
                    <StyledIntro>
                        <Text size={TextSize.ExtraLarge} serif>
                            Site’s notice
                        </Text>
                    </StyledIntro>
                    <StyledContent>
                        {process.env.NEXT_PUBLIC_SITESNOTICE_ADDRESS?.split(', ').map((text, i) =>
                            <Text size={TextSize.Large} serif key={i}>{text}</Text>
                        )}
                        <br />
                        <Text size={TextSize.Large} serif>{process.env.NEXT_PUBLIC_SITESNOTICE_EMAIL}</Text>
                        <Text size={TextSize.Large} serif>{process.env.NEXT_PUBLIC_SITESNOTICE_PHONE}</Text>
                    </StyledContent>
                </StyledWrapper>
            </Header>
            <Footer />
        </>
    )
}
