import Head from 'next/head'
import { Header } from '../../components/header';
import { Text, TextSize } from '../../components/text';
import styled from '@emotion/styled';
import { Size } from '../../components/tokens';
import { BackButton } from '../../components/back-button';

const StyledWrapper = styled.div`
    max-width: 800px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: ${Size.XL};
`;

export default function SitesNotice() {
    return (
        <>
            <Head>
                <title>Invisible Hotels | Site’s notice</title>
                <meta name="description" content="Invisible Hotels are all the lovely, minimalistic and fancy hotels & apartments where we stayed already — or would love to." />
                <meta name="robots" content="noindex" />
            </Head>
            <Header>
                <StyledWrapper>
                    <BackButton label="Back to home" href="/" />
                    <Text size={TextSize.ExtraLarge} serif>
                        Site’s notice
                    </Text>
                    <Text size={TextSize.Large} serif>{process.env.NEXT_PUBLIC_SITESNOTICE_ADDRESS}</Text>
                    <Text size={TextSize.Large} serif>{process.env.NEXT_PUBLIC_SITESNOTICE_EMAIL}</Text>
                    <Text size={TextSize.Large} serif>{process.env.NEXT_PUBLIC_SITESNOTICE_PHONE}</Text>
                </StyledWrapper>
            </Header>
        </>
    )
}
