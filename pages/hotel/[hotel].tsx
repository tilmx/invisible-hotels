import Image from 'next/image';
import { Text, TextSize } from '../../components/text';
import hotels from '../../data/hotels.json';
import styled from '@emotion/styled';
import { Color, Size } from '../../components/tokens';
import Head from 'next/head';
import { siteTitle } from '../_app';
import { Wrapper } from '../../components/wrapper';
import { Menu } from '../../components/menu';
import { getVacationTypeColor, getVacationTypeIcon } from '../../utils';
import { Footer } from '../../components/footer';
import { Flex, JustifyContent } from '../../components/utils';
import { Tag } from '../../components/tag';
import { HotelCard } from '../../components/hotel-card';
import { Button } from '../../components/button';

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

const StyledSimilarSection = styled.div`
    padding-top: ${Size.XXXXXL};
    display: flex;
    flex-direction: column;
    gap: ${Size.S};
`;

const StyledHotelCardWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: ${Size.M};
    padding-top: ${Size.XXL};
`;

const StyledHotelCard = styled(HotelCard)`
    background: ${Color.Background};
`;

export default function Hotel({ hotel }: { hotel: typeof hotels[number] }) {
    const similarHotels = hotels.filter(hotelItem => hotelItem.vacationType === hotel.vacationType && hotelItem.id !== hotel.id);

    return (
        <StyledBackground color={getVacationTypeColor(hotel.vacationType) || Color.Background}>
            <Head>
                <title>{hotel.name} — {siteTitle}</title>
            </Head>
            <Wrapper>
                <Menu />
                <StyledIntro>
                    <Text size={TextSize.Huge} bold center>{hotel.name}</Text>
                    <Text size={TextSize.SuperLarge} center serif>{hotel.city}, {hotel.country}</Text>
                    <Flex justifyContent={JustifyContent.Center} gap={Size.XS}>
                        <Tag icon={getVacationTypeIcon(hotel.vacationType)} label={hotel.vacationType} />
                        <Tag label={hotel.housingType} />
                    </Flex>
                </StyledIntro>
                <StyledImageContainer multipleImages={(hotel.images?.length || 0) > 1}>
                    {hotel.images?.slice(0, 2).map((image, i) =>
                        <StyledImage
                            key={i}
                            src={'/images/hotels/' + image.url}
                            alt="Image of Hotel"
                            width={720}
                            height={720}
                            sizes="(max-width: 720px) 100vw, 720px"
                        />
                    )}
                </StyledImageContainer>
            </Wrapper>
            <Wrapper wide>
                <StyledSimilarSection>
                    <Text size={TextSize.SuperLarge} bold center>Similar Hotels</Text>
                    <Text size={TextSize.Large} serif center>{similarHotels.length} Hotels near {hotel.vacationType} in {hotel.country}</Text>
                    <StyledHotelCardWrapper>
                        {similarHotels.slice(0, 3).map((hotel, i) =>
                            <StyledHotelCard
                                key={i}
                                title={hotel.name}
                                city={hotel.city}
                                country={hotel.country}
                                housingType={hotel.housingType}
                                vacationType={hotel.vacationType}
                            />
                        )}
                    </StyledHotelCardWrapper>
                    <Flex justifyContent={JustifyContent.Center}>
                        <Button>Explore all similar hotels</Button>
                    </Flex>
                </StyledSimilarSection>
            </Wrapper>
            <Footer />
        </StyledBackground>
    )
}

export async function getStaticProps({ params }: { params: { hotel: string } }) {
    return { props: { hotel: hotels.find(hotel => hotel.id === params.hotel) } }
}

export async function getStaticPaths() {
    return {
        paths: hotels.map((hotel) => { return { params: { hotel: hotel.id } } }),
        fallback: false,
    }
}
