import Image from 'next/image';
import { Text, TextSize } from '../components/text';
import styled from '@emotion/styled';
import Head from 'next/head';
import { Wrapper } from '../components/wrapper';
import { Menu } from '../components/menu';
import { getVacationTypeColor, getVacationTypeIcon } from '../utils';
import { Footer } from '../components/footer';
import { Flex, JustifyContent } from '../components/utils/flex';
import { Tag } from '../components/tag';
import { Table } from '../components/table';
import { ExternalLinkIcon, ImageIcon } from 'lucide-react';
import { VisitedBadge } from '../components/visited-badge';
import { Size } from '../components/tokens/size';
import { Color } from '../components/tokens/colors';
import { Breakpoint } from '../components/tokens/breakpoint';
import { siteTitle } from '../data/site';
import { FunctionComponent } from 'react';
import hotels from '../data/hotels.json';

interface HotelDetailProps {
    hotel: typeof hotels[number]
}

const StyledBackground = styled.div<{ color: string; }>`
    background: ${props => props.color};
    color: ${Color.TextAlways};
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
    padding-bottom: ${Size.XXXL};

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

const StyledNoImagesBanner = styled.div`
    position: relative;
    padding: ${Size.L};
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${Size.S};
    max-width: 560px;
    margin: 0 auto;
    box-sizing: border-box;

    :after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: ${Color.TextAlways};
        border-radius: ${Size.S};
        opacity: .1;
        pointer-events: none;
    }

    svg {
        display: block;
        height: ${Size.L};
        width: ${Size.L};
        opacity: .5;
    }

    div {
        opacity: .5;
    }
`;

const StyledVisitedBadge = styled(VisitedBadge)`
    position: absolute;
    top: -${Size.L};
    left: 660px;

    ${Breakpoint.Tablet} {
        left: unset;
        right: ${Size.XL};
    }

    ${Breakpoint.TabletSmall} {
        right: ${Size.L};
        top: -${Size.XL};
    }
`;

const StyledStickyContainer = styled.div`
    position: sticky;
    width: 100%;
    bottom: ${Size.M};
    left: 0;
    box-sizing: border-box;
    padding: 0 ${Size.M};
    pointer-events: none;
    margin: ${Size.XXXL} 0;
`;

const StyledBookingArea = styled.a`
    max-width: 560px;
    margin: 0 auto ${Size.M};
    background: ${Color.Text80};
    color: ${Color.Background};
    box-sizing: border-box;
    padding: ${Size.M};
    border-radius: ${Size.M};
    display: flex;
    justify-content: center;
    align-items: center;
    gap: ${Size.XS};
    backdrop-filter: blur(${Size.XS});
    cursor: pointer;
    pointer-events: auto;
    text-decoration: unset;
    box-shadow: 0 ${Size.XXS} ${Size.L} ${Color.Shadow};

    @media (hover: hover) {
        :hover {
            background: ${Color.Text};
        }
    }

    ${Breakpoint.Mobile} {
        padding: ${Size.S};

        svg {
            width: 20px;
            height: 20px;
        }
    }
`;

export const HotelDetailPage: FunctionComponent<HotelDetailProps> = props => {
    const amenitieFallback = props.hotel.amenities ? false : undefined
    const hotel = props.hotel;

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
                    {hotel.images && <StyledVisitedBadge />}
                    {!hotel.images &&
                        <StyledNoImagesBanner>
                            <ImageIcon />
                            <Text center>Unfortunately we don't have any pictures of this {hotel.housingType.toLocaleLowerCase()} yet</Text>
                        </StyledNoImagesBanner>
                    }
                    {hotel.images?.slice(0, 3).map((image, i) =>
                        <StyledImage
                            key={i}
                            data-image-number={i}
                            src={'/images/hotels/' + image.url}
                            alt="Image of Hotel"
                            width={i === 0 ? 720 : 480}
                            height={i === 0 ? 720 : 480}
                            sizes={`(max-width: ${i === 0 ? 720 : 480}px) 100vw, ${i === 0 ? 720 : 480}px`}
                        />
                    )}
                </StyledImageContainer>
                <Table
                    backgroundColor={getVacationTypeColor(hotel.vacationType)}
                    data={[
                        { label: hotel.housingType === 'Hotel' ? 'Rooms' : 'Apartments', value: hotel.rooms },
                        { label: 'Breakfast', value: hotel.amenities?.includes('Breakfast') || amenitieFallback },
                        { label: 'Restaurant', value: hotel.amenities?.includes('Restaurant') || amenitieFallback },
                        { label: 'Bar', value: hotel.amenities?.includes('Bar') || amenitieFallback },
                        { label: 'Pool', value: hotel.amenities?.includes('Pool') || amenitieFallback },
                        { label: 'Sauna', value: hotel.amenities?.includes('Sauna') || amenitieFallback }
                    ]}
                />
                <StyledStickyContainer>
                    <StyledBookingArea href={hotel.links.bookingCom || hotel.links.hotel} target='_blank'>
                        <Text>Open {hotel.links.bookingCom ? 'on Booking.com' : 'Hotel Website'}</Text>
                        <ExternalLinkIcon />
                    </StyledBookingArea>
                </StyledStickyContainer>
            </Wrapper>
            <Footer reducedPadding />
        </StyledBackground>
    )
}
