import Image from 'next-image-export-optimizer';
import { Text } from '../text';
import styled from '@emotion/styled';
import Head from 'next/head';
import { Wrapper } from '../wrapper';
import { Menu } from '../menu';
import { checkIfFavoritesStored, getHotelUrl, getVacationTypeColor, getVacationTypeDescription, getVacationTypeIcon, track } from '../../utils';
import { Footer } from '../footer';
import { Tag } from '../tag';
import { Table } from '../table';
import { ExternalLinkIcon, ImageIcon, StarIcon } from 'lucide-react';
import { VisitedBadge } from '../visited-badge';
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
import styles from './hotel-detail.module.scss';

interface HotelDetailProps {
    hotel: Hotel;
}

const StyledBackground = styled.div<{ color: string; }>`
    background: ${props => props.color};
    color: var(--color-text-always);
    padding-bottom: var(--size-xxxl);
`;

const StyledIntro = styled.div`
    display: flex;
    flex-direction: column;
    gap: var(--size-m);
    padding-bottom: var(--size-xxxl);
`;

const StyledIntroTitle = styled.div`
    display: flex;
    flex-direction: column;
    gap: var(--size-s);
`;

const StyledImageContainer = styled.div<{ multipleImages: boolean }>`
    position: relative;
    padding-bottom: var(--size-xxxl);

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
        margin-top: calc(-1 * var(--size-xxxxxl));
        max-width: 480px;

        ${Breakpoint.DesktopSmall} {
            margin-top: calc(-1 * var(--size-xxxxl));
            margin-right: var(--size-m);
        }

        ${Breakpoint.TabletSmall} {
            margin-top: calc(-1 * var(--size-xl));
        }

        ${Breakpoint.Mobile} {
            margin-top: var(--size-s);
            margin-left: auto;
            margin-right: 0;
            width: 80%;
            max-width: none;
        }
    }

    [data-image-number="2"] {
        margin-left: var(--size-xxl);
        margin-top: calc(-1 * var(--size-xxxxxl));
        max-width: 480px;

        ${Breakpoint.DesktopSmall} {
            margin-left: var(--size-m);
        }

        ${Breakpoint.Tablet} {
            margin-top: calc(-1 * var(--size-xxxl));
        }

        ${Breakpoint.TabletSmall} {
            margin-top: calc(-1 * var(--size-xl));
        }

        ${Breakpoint.Mobile} {
            margin-top: calc(-1 * var(--size-l));
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
    border-radius: var(--size-s);
    width: 100%;
    max-width: 720px;
    height: auto;
    box-shadow: 0 var(--size-m) var(--size-xxxl) var(--color-shadow);
    background: var(--color-text60);
    backdrop-filter: blur(var(--size-xl));
`;

const StyledImageCopyrightText = styled(Text)`
    opacity: .6;
    margin-top: var(--size-xs);
    margin-left: var(--size-xxl);

    ${Breakpoint.DesktopSmall} {
        margin-left: var(--size-m);
    }
`;

const StyledNoImagesBannerContainer = styled.div`
    position: relative;
    padding: var(--size-l);
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
        background: var(--color-text-always);
        border-radius: var(--size-s);
        opacity: .1;
        pointer-events: none;
    }
`;

const StyledNoImagesBanner = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--size-s);

    div {
        opacity: .6;
    }
    svg {
        display: block;
        height: var(--size-l);
        width: var(--size-l);
        opacity: .6;
    }
`;

const StyledVisitedBadge = styled(VisitedBadge)`
    position: absolute;
    top: calc(-1 * var(--size-l));
    left: 660px;
    z-index: 2;

    ${Breakpoint.Tablet} {
        left: unset;
        right: var(--size-xl);
    }

    ${Breakpoint.TabletSmall} {
        right: var(--size-l);
        top: calc(-1 * var(--size-xl));
    }
`;

const StyledVisitedBadgeWithNoImages = styled(VisitedBadge)`
    position: absolute;
    right: calc(-1 * var(--size-xl));
    top: calc(-1 * var(--size-xxl));
    z-index: 2;

    ${Breakpoint.TabletSmall} {
        right: var(--size-xs);
    }

    ${Breakpoint.Mobile} {
        right: var(--size-s);
        top: calc(-1 * var(--size-l));
    }
`;

const StyledStickyWrapper = styled.div`
    position: sticky;
    width: 100%;
    bottom: var(--size-m);
    left: 0;
    box-sizing: border-box;
    pointer-events: none;
    margin-top: var(--size-xxxl);
    z-index: 5;

    ${Breakpoint.Mobile} {
        bottom: var(--size-xs);
    }
`;

const StyledActionBar = styled.div`
    max-width: 560px;
    margin: 0 auto var(--size-m);
    background: var(--color-background80);
    border-radius: var(--size-xl);
    backdrop-filter: blur(var(--size-xs));
    box-shadow: 0 var(--size-xxs) var(--size-l) var(--color-shadow);
    padding: var(--size-s);
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    pointer-events: auto;
    gap: var(--size-xxs);

    ${Breakpoint.Mobile} {
        margin-left: calc(-1 * var(--size-s));
        margin-right: calc(-1 * var(--size-s));
        padding: var(--size-xxs);
    }
`;

const StyledFavoriteArea = styled.div<{ active: boolean }>`
    color: var(--color-text);
    display: flex;
    padding: var(--size-s) var(--size-m) var(--size-s) var(--size-s);
    gap: var(--size-xxs);
    box-shadow: inset 0 0 0 2px var(--color-text);
    border-radius: var(--size-l);
    cursor: pointer;

    ${props => props.active && `
        background: var(--color-yellow);
        box-shadow: none;

        svg {
            fill: currentColor;
        }
    `}
    
    ${props => !props.active && `
        @media (hover: hover) {
            :hover {
                color: var(--color-yellow);
                box-shadow: inset 0 0 0 2px var(--color-yellow);
            }
        }
    `}

    ${Breakpoint.TabletSmall} {
        padding: var(--size-s);

        div {
            display: none;
        }
    }

    ${Breakpoint.Mobile} {
        padding: var(--size-s);

        svg {
            width: 20px;
            height: 20px;
        }
    }
`;

const StyledMap = styled(Map)`
    height: 560px;
    border-radius: var(--size-xs);
    margin-top: var(--size-xxxl);
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
    padding: var(--size-xxl) 0 var(--size-xxxxl);
`;

const StyledDescriptionLabel = styled(Text)`
    padding-bottom: var(--size-m);
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
                            <Text as="h1" size="huge" bold center>{props.hotel.name}</Text>
                            <Text size="superlarge" center serif>{props.hotel.city}, {props.hotel.country}</Text>
                        </StyledIntroTitle>
                        <div className={styles.tags}>
                            <Tag icon={getVacationTypeIcon(props.hotel.vacationType, true)} label={props.hotel.vacationType} />
                            <Tag label={props.hotel.housingType} />
                        </div>
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
                            <StyledImageCopyrightText size="small">
                                © Images: {props.hotel.imageCopyright}
                            </StyledImageCopyrightText>
                        }
                    </StyledImageContainer>
                    {props.hotel.description &&
                        <StyledDescriptionContainer>
                            <StyledDescriptionLabel as="h3" center>About the {props.hotel.housingType.toLowerCase()}</StyledDescriptionLabel>
                            <Text serif center size="extralarge">
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
                                        <div className={styles.roomDistributionContainer}>
                                            <RoomDistribution rooms={props.hotel.rooms} />
                                        </div>
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
