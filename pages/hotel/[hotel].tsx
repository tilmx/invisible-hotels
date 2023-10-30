import Image from 'next/image';
import { Text, TextSize } from '../../components/text';
import hotels from '../../data/hotels.json';
import styled from '@emotion/styled';
import { Color, Size } from '../../components/tokens';
import Head from 'next/head';
import { siteTitle } from '../_app';
import { Wrapper } from '../../components/wrapper';
import { Menu } from '../../components/menu';
import { getVacationTypeColor } from '../../utils';
import { Footer } from '../../components/footer';

const StyledBackground = styled.div<{ color: string; }>`
    background: ${props => props.color}
`;

const StyledIntro = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${Size.M};
    padding-bottom: ${Size.XXXL};
`;

const StyledImageContainer = styled.div<{ multipleImages: boolean }>`
    position: relative;

    ${props => props.multipleImages ? `
        img:last-of-type {
            margin-left: auto;
            margin-top: -${Size.XXXXXL};
        }
    `: `
        img {
            margin-left: auto;
            margin-right: auto;
        }
    `}
`;

const StyledImage = styled(Image)`
    display: block;
    margin: 0;
    padding: 0;
    border: none;
    border-radius: ${Size.M};
    width: 100%;
    max-width: 720px;
    height: auto;
    box-shadow: 0 ${Size.M} ${Size.XXXL} ${Color.Shadow};
`


export default function Hotel({ hotel }: { hotel: typeof hotels[number] }) {
    return (
        <StyledBackground color={getVacationTypeColor(hotel.vacationType) || Color.Background}>
            <Head>
                <title>{hotel.name} | {siteTitle}</title>
            </Head>
            <Wrapper>
                <Menu />
                <StyledIntro>
                    <Text size={TextSize.Huge} bold center>{hotel.name}</Text>
                    <Text size={TextSize.SuperLarge} center serif>{hotel.city}, {hotel.country}</Text>
                </StyledIntro>
                <StyledImageContainer multipleImages={(hotel.images?.length || 0) > 1}>
                    {hotel.images?.slice(0, 2).map((image, i) =>
                        <StyledImage key={i} src={'/images/hotels/' + image.url} alt="Image of Hotel" width={720} height={720} />
                    )}
                </StyledImageContainer>
            </Wrapper>
            <Footer />
        </StyledBackground>
    )
}

export async function getStaticProps({ params }: { params: { hotel: string } }) {
    const hotel = hotels.find(hotel => hotel.id === params.hotel)
    return {
        props: {
            hotel: hotel,
        },
    }
}

export async function getStaticPaths() {
    return {
        paths: hotels.map((hotel) => {
            return {
                params: {
                    hotel: hotel.id,
                },
            }
        }),
        fallback: false,
    }
}