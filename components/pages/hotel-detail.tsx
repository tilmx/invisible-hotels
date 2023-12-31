import Image from 'next-image-export-optimizer';
import { Text, TextSize } from '../text';
import styled from '@emotion/styled';
import Head from 'next/head';
import { Wrapper } from '../wrapper';
import { Menu } from '../menu';
import { checkIfFavoritesStored, getHotelUrl, getVacationTypeColor, getVacationTypeDescription, getVacationTypeIcon, track } from '../../utils';
import { Footer } from '../footer';
import { Flex, JustifyContent } from '../utils/flex';
import { Tag } from '../tag';
import { Table } from '../table';
import { ExternalLinkIcon, ImageIcon, StarIcon } from 'lucide-react';
import { VisitedBadge } from '../visited-badge';
import { Size } from '../tokens/size';
import { Color } from '../tokens/colors';
import { Breakpoint } from '../tokens/breakpoint';
import { siteTitle } from '../../data/site';
import { FunctionComponent, useEffect } from 'react';
import { useFavoriteStore } from '../../store/favorites';
import { Button } from '../button';
import { Map } from '../map';
import { RoomDistribution } from '../room-distribution';
import { SimilarHotels } from '../similar-hotels';
import { Hotel } from '../../types';

interface HotelDetailProps {
    hotel: Hotel;
}

const StyledBackground = styled.div<{ color: string; }>`
    background: ${props => props.color};
    color: ${Color.TextAlways};
    padding-bottom: ${Size.XXXL};
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
            margin-top: ${Size.S};
            margin-left: auto;
            margin-right: 0;
            width: 80%;
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
            margin-top: -${Size.L};
            margin-right: auto;
            margin-left: 0;
            width: 80%;
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
    background: ${Color.Text60};
    backdrop-filter: blur(${Size.XL});
`;

const StyledImageCopyrightText = styled(Text)`
    opacity: .6;
    margin-top: ${Size.XS};
    margin-left: ${Size.XXL};

    ${Breakpoint.DesktopSmall} {
        margin-left: ${Size.M};
    }
`;

const StyledNoImagesBannerContainer = styled.div`
    position: relative;
    padding: ${Size.L};
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
`;

const StyledNoImagesBanner = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${Size.S};

    div {
        opacity: .6;
    }
    svg {
        display: block;
        height: ${Size.L};
        width: ${Size.L};
        opacity: .6;
    }
`;

const StyledVisitedBadge = styled(VisitedBadge)`
    position: absolute;
    top: -${Size.L};
    left: 660px;
    z-index: 2;

    ${Breakpoint.Tablet} {
        left: unset;
        right: ${Size.XL};
    }

    ${Breakpoint.TabletSmall} {
        right: ${Size.L};
        top: -${Size.XL};
    }
`;

const StyledVisitedBadgeWithNoImages = styled(VisitedBadge)`
    position: absolute;
    right: -${Size.XL};
    top: -${Size.XXL};
    z-index: 2;

    ${Breakpoint.TabletSmall} {
        right: ${Size.XS};
    }

    ${Breakpoint.Mobile} {
        right: ${Size.S};
        top: -${Size.L};
    }
`;

const StyledStickyWrapper = styled.div`
    position: sticky;
    width: 100%;
    bottom: ${Size.M};
    left: 0;
    box-sizing: border-box;
    pointer-events: none;
    margin-top: ${Size.XXXL};
    z-index: 5;

    ${Breakpoint.Mobile} {
        bottom: ${Size.XS};
    }
`;

const StyledActionBar = styled.div`
    max-width: 560px;
    margin: 0 auto ${Size.M};
    background: ${Color.Background80};
    border-radius: ${Size.XL};
    backdrop-filter: blur(${Size.XS});
    box-shadow: 0 ${Size.XXS} ${Size.L} ${Color.Shadow};
    padding: ${Size.S};
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    pointer-events: auto;
    gap: ${Size.XXS};

    ${Breakpoint.Mobile} {
        margin-left: -${Size.S};
        margin-right: -${Size.S};
        padding: ${Size.XXS};
    }
`;

const StyledFavoriteArea = styled.div<{ active: boolean }>`
    color: ${Color.Text};
    display: flex;
    padding: ${Size.S} ${Size.M} ${Size.S} ${Size.S};
    gap: ${Size.XXS};
    box-shadow: inset 0 0 0 2px ${Color.Text};
    border-radius: ${Size.L};
    cursor: pointer;

    ${props => props.active && `
        background: ${Color.Yellow};
        box-shadow: none;

        svg {
            fill: currentColor;
        }
    `}
    
    ${props => !props.active && `
        @media (hover: hover) {
            :hover {
                color: ${Color.Yellow};
                box-shadow: inset 0 0 0 2px ${Color.Yellow};
            }
        }
    `}

    ${Breakpoint.TabletSmall} {
        padding: ${Size.S};

        div {
            display: none;
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

const StyledMap = styled(Map)`
    height: 560px;
    border-radius: ${Size.XS};
    margin-top: ${Size.XXXL};
    overflow: hidden;
    box-shadow: inset 0 0 0 2px currentColor;

    ${Breakpoint.Tablet} {
        height: 480px;
    }

    ${Breakpoint.Mobile} {
        height: 420px;
    }
`;

const StyledDescriptionContainer = styled.div`
    padding: ${Size.XXL} 0 ${Size.XXXXL};
`;

const StyledDescriptionLabel = styled(Text)`
    padding-bottom: ${Size.M};
    opacity: .6;
`;

const StyledOutLink = styled.a`
    color: unset;
    text-decoration: unset;
`;

export const HotelDetailPage: FunctionComponent<HotelDetailProps> = props => {
    const amenitiesFallback = props.hotel.amenities ? false : undefined

    useEffect(() => {
        checkIfFavoritesStored() && useFavoriteStore.persist.rehydrate();
    }, [])

    const favorites = useFavoriteStore(state => state.favorites);
    const addFavorite = useFavoriteStore(state => state.addFavorite);
    const removeFavorite = useFavoriteStore(state => state.removeFavorite);

    const isFavorite = favorites.includes(props.hotel.id);
    const link = props.hotel.links.hotel || props.hotel.links.bookingCom;

    const description = props.hotel.description || `${props.hotel.name} is a lovely ${props.hotel.housingType.toLocaleLowerCase()} ${getVacationTypeDescription(props.hotel.vacationType)} in ${props.hotel.city}, ${props.hotel.country}. ${props.hotel.housingType === "Hotel" ? `It has ${props.hotel.rooms.toString()} beautiful rooms.` : ''}`;

    return (
        <>
            <StyledBackground color={getVacationTypeColor(props.hotel.vacationType) || Color.Background}>
                <Head>
                    <title>{props.hotel.name + ' — ' + siteTitle}</title>
                    <meta name="description" content={description} />
                    <meta property="og:description" content={description} />
                    <meta property="og:title" content={props.hotel.name} />
                    <meta property="og:image" content={props.hotel.images ? `https://${process.env.NEXT_PUBLIC_DOMAIN}/images/hotels/` + props.hotel.images.at(0)?.url : `https://${process.env.NEXT_PUBLIC_DOMAIN}/images/og-image.jpg`} />
                    <meta property="og:url" content={"https://" + process.env.NEXT_PUBLIC_DOMAIN + getHotelUrl({ id: props.hotel.id, housingType: props.hotel.housingType })} />
                    <meta name="theme-color" content={getVacationTypeColor(props.hotel.vacationType)} />
                </Head>
                <Wrapper>
                    <Menu />
                    <StyledIntro>
                        <StyledIntroTitle>
                            <Text as="h1" size={TextSize.Huge} bold center>{props.hotel.name}</Text>
                            <Text size={TextSize.SuperLarge} center serif>{props.hotel.city}, {props.hotel.country}</Text>
                        </StyledIntroTitle>
                        <Flex justifyContent={JustifyContent.Center} gap={Size.XXS}>
                            <Tag icon={getVacationTypeIcon(props.hotel.vacationType, true)} label={props.hotel.vacationType} />
                            <Tag label={props.hotel.housingType} />
                        </Flex>
                    </StyledIntro>
                    <StyledImageContainer multipleImages={(props.hotel.images?.length || 0) > 1}>
                        {(props.hotel.images && props.hotel.visited) && <StyledVisitedBadge />}
                        {!props.hotel.images &&
                            <StyledNoImagesBannerContainer>
                                {props.hotel.visited &&
                                    <StyledVisitedBadgeWithNoImages small />
                                }
                                <StyledNoImagesBanner>
                                    <ImageIcon />
                                    <Text center>Unfortunately we don't have any pictures of this {props.hotel.housingType.toLocaleLowerCase()} yet</Text>
                                </StyledNoImagesBanner>
                            </StyledNoImagesBannerContainer>
                        }
                        {props.hotel.images?.slice(0, 3).map((image, i) =>
                            <StyledImage
                                priority={i === 0}
                                key={i}
                                data-image-number={i}
                                src={'/images/hotels/' + image.url}
                                alt={`Picture of ${props.hotel.name}`}
                                width={i === 0 ? 720 : 480}
                                height={i === 0 ? 720 : 480}
                                sizes={`(max-width: ${i === 0 ? 720 : 480}px) 100vw, ${i === 0 ? 720 : 480}px`}
                                placeholder="blur"
                            />
                        )}
                        {props.hotel.imageCopyright &&
                            <StyledImageCopyrightText size={TextSize.Small}>
                                © Images: {props.hotel.imageCopyright}
                            </StyledImageCopyrightText>
                        }
                    </StyledImageContainer>
                    {props.hotel.description &&
                        <StyledDescriptionContainer>
                            <StyledDescriptionLabel as="h3" center>About the {props.hotel.housingType.toLowerCase()}</StyledDescriptionLabel>
                            <Text serif center size={TextSize.ExtraLarge}>
                                {props.hotel.description}
                            </Text>
                        </StyledDescriptionContainer>
                    }
                    <Table
                        backgroundColor={getVacationTypeColor(props.hotel.vacationType)}
                        data={[
                            {
                                label: props.hotel.housingType === 'Hotel' ? 'Rooms' : 'Apartments', value: props.hotel.rooms, content:
                                    props.hotel.housingType === 'Hotel' ?
                                        <Flex justifyContent={JustifyContent.FlexEnd}>
                                            <RoomDistribution rooms={props.hotel.rooms} />
                                        </Flex>
                                        : undefined
                            },
                            { label: 'Breakfast', value: props.hotel.amenities?.includes('Breakfast') || amenitiesFallback },
                            { label: 'Restaurant', value: props.hotel.amenities?.includes('Restaurant') || amenitiesFallback },
                            { label: 'Bar', value: props.hotel.amenities?.includes('Bar') || amenitiesFallback },
                            { label: 'Pool', value: props.hotel.amenities?.includes('Pool') || amenitiesFallback },
                            { label: 'Sauna', value: props.hotel.amenities?.includes('Sauna') || amenitiesFallback }
                        ]}
                    />
                    <StyledMap
                        center={{ lat: props.hotel.coordinates.lat, long: props.hotel.coordinates.long }}
                        annotations={[{
                            id: props.hotel.id,
                            name: props.hotel.name,
                            coordinates: { lat: props.hotel.coordinates.lat, long: props.hotel.coordinates.long },
                            color: getVacationTypeColor(props.hotel.vacationType) || Color.Text,
                            clusteringIdentifier: ''
                        }]}
                    />

                    <StyledStickyWrapper>
                        <StyledActionBar>
                            <StyledFavoriteArea
                                active={isFavorite}
                                onClick={() => {
                                    isFavorite ? removeFavorite(props.hotel.id) : addFavorite(props.hotel.id);
                                    track(isFavorite ? 'Remove from Favorites' : 'Add to Favorites', { Hotel: props.hotel.id, Page: "Hotel Detail" });
                                }}
                            >
                                <StarIcon />
                                <Text>Favorite</Text>
                            </StyledFavoriteArea>
                            {link &&
                                <StyledOutLink href={link} target='_blank' onClick={() => track('Outbound Link Click', { Hotel: props.hotel.id })}>
                                    <Button iconRight={<ExternalLinkIcon />}>Open {props.hotel.links.hotel ? `${props.hotel.housingType} Website` : 'on Booking.com'}</Button>
                                </StyledOutLink>
                            }
                        </StyledActionBar>
                    </StyledStickyWrapper>
                </Wrapper>
            </StyledBackground>
            <SimilarHotels
                accentColor={getVacationTypeColor(props.hotel.vacationType)}
                hotels={props.hotel.nearby}
            />
            <Footer reducedPadding />
        </>
    )
}
