import Image from 'next/image';
import { Text, TextSize } from '../../components/text';
import hotels from '../../data/hotels.json';
import styled from '@emotion/styled';
import { Breakpoint, Color, Size } from '../../components/tokens';
import Head from 'next/head';
import { siteTitle } from '../_app';
import { Wrapper } from '../../components/wrapper';
import { Menu } from '../../components/menu';
import { getVacationTypeColor, getVacationTypeIcon } from '../../utils';
import { Footer } from '../../components/footer';
import { Flex, JustifyContent } from '../../components/utils';
import { Tag } from '../../components/tag';

const StyledBackground = styled.div<{ color: string; }>`
    background: ${props => props.color}
`;

const StyledIntro = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${Size.M};
    padding-bottom: ${Size.XXXL};
`;

const StyledIntroTitle = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${Size.S};
`;

const StyledImageContainer = styled.div<{ multipleImages: boolean }>`
    position: relative;

    ${props => !props.multipleImages && `
        img {
            margin-left: auto;
            margin-right: auto;
        }
    `}

    img {
        width: 100%;
    }

    [data-image-number="1"] {
        margin-left: auto;
        margin-top: -${Size.XXXXXL};
        max-width: 480px;

        ${Breakpoint.DesktopSmall} {
            margin-top: -${Size.XXXXL};
            margin-right: ${Size.M};
        }

        ${Breakpoint.TabletSmall} {
            margin-top: -${Size.XL};
        }

        ${Breakpoint.Mobile} {
            margin-top: ${Size.M};
            width: 100%;
            max-width: none;
        }
    }

    [data-image-number="2"] {
        margin-left: ${Size.XXL};
        margin-top: -${Size.XXXXXL};
        max-width: 480px;

        ${Breakpoint.DesktopSmall} {
            margin-left: ${Size.M};
        }

        ${Breakpoint.Tablet} {
            margin-top: -${Size.XXXL};
        }

        ${Breakpoint.TabletSmall} {
            margin-top: -${Size.XL};
        }

        ${Breakpoint.Mobile} {
            margin-top: ${Size.M};
            margin-left: 0;
            width: 100%;
            max-width: none;
        }
    }
`;

const StyledImage = styled(Image)`
    display: block;
    margin: 0;
    padding: 0;
    border: none;
    border-radius: ${Size.S};
    width: 100%;
    max-width: 720px;
    height: auto;
    box-shadow: 0 ${Size.M} ${Size.XXXL} ${Color.Shadow};
`;

export default function Hotel({ hotel }: { hotel: typeof hotels[number] }) {
    return (
        <StyledBackground color={getVacationTypeColor(hotel.vacationType) || Color.Background}>
            <Head>
                <title>{hotel.name + ' — ' + siteTitle}</title>
            </Head>
            <Wrapper>
                <Menu />
                <StyledIntro>
                    <StyledIntroTitle>
                        <Text size={TextSize.Huge} bold center>{hotel.name}</Text>
                        <Text size={TextSize.SuperLarge} center serif>{hotel.city}, {hotel.country}</Text>
                    </StyledIntroTitle>
                    <Flex justifyContent={JustifyContent.Center} gap={Size.XXS}>
                        <Tag icon={getVacationTypeIcon(hotel.vacationType)} label={hotel.vacationType} />
                        <Tag label={hotel.housingType} />
                    </Flex>
                </StyledIntro>
                <StyledImageContainer multipleImages={(hotel.images?.length || 0) > 1}>
                    {hotel.images?.slice(0, 3).map((image, i) =>
                        <StyledImage
                            key={i}
                            data-image-number={i}
                            src={'/images/hotels/' + image.url}
                            alt="Image of Hotel"
                            width={720}
                            height={720}
                            sizes="(max-width: 720px) 100vw, 720px"
                        />
                    )}
                </StyledImageContainer>
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
