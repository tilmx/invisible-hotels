import Image from 'next/image';
import { Text, TextSize } from '../text';
import styled from '@emotion/styled';
import Head from 'next/head';
import { Wrapper } from '../wrapper';
import { Menu } from '../menu';
import { checkIfFavoritesStored, getVacationTypeColor, getVacationTypeIcon } from '../../utils';
import { Footer } from '../footer';
import { Flex, JustifyContent } from '../utils/flex';
import { Tag } from '../tag';
import { Table } from '../table';
import { ExternalLinkIcon, ImageIcon, Star, StarIcon } from 'lucide-react';
import { VisitedBadge } from '../visited-badge';
import { Size } from '../tokens/size';
import { Color } from '../tokens/colors';
import { Breakpoint } from '../tokens/breakpoint';
import { siteTitle } from '../../data/site';
import { FunctionComponent, useEffect } from 'react';
import hotels from '../../data/hotels.json';
import { useFavoriteStore } from '../../store/favorites';
import { Button } from '../button';
import { UnstyledLink } from '../utils/link';

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

const StyledImageCopyrightText = styled(Text)`
    opacity: .5;
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
        opacity: .5;
    }
    svg {
        display: block;
        height: ${Size.L};
        width: ${Size.L};
        opacity: .5;
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
    margin: ${Size.XXXL} 0;
    z-index: 5;
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

export const HotelDetailPage: FunctionComponent<HotelDetailProps> = props => {
    const amenitiesFallback = props.hotel.amenities ? false : undefined

    useEffect(() => {
        checkIfFavoritesStored() && useFavoriteStore.persist.rehydrate();
    }, [])

    const favorites = useFavoriteStore(state => state.favorites);
    const addFavorite = useFavoriteStore(state => state.addFavorite);
    const removeFavorite = useFavoriteStore(state => state.removeFavorite);

    const isFavorite = favorites.includes(props.hotel.id);
    const link = props.hotel.links.bookingCom || props.hotel.links.hotel;

    return (
        <StyledBackground color={getVacationTypeColor(props.hotel.vacationType) || Color.Background}>
            <Head>
                <title>{props.hotel.name + ' — ' + siteTitle}</title>
            </Head>
            <Wrapper>
                <Menu />
                <StyledIntro>
                    <StyledIntroTitle>
                        <Text size={TextSize.Huge} bold center>{props.hotel.name}</Text>
                        <Text size={TextSize.SuperLarge} center serif>{props.hotel.city}, {props.hotel.country}</Text>
                    </StyledIntroTitle>
                    <Flex justifyContent={JustifyContent.Center} gap={Size.XXS}>
                        <Tag icon={getVacationTypeIcon(props.hotel.vacationType)} label={props.hotel.vacationType} />
                        <Tag label={props.hotel.housingType} />
                        {isFavorite && <Tag icon={<Star />} />}

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
                            key={i}
                            data-image-number={i}
                            src={'/images/hotels/' + image.url}
                            alt="Image of Hotel"
                            width={i === 0 ? 720 : 480}
                            height={i === 0 ? 720 : 480}
                            sizes={`(max-width: ${i === 0 ? 720 : 480}px) 100vw, ${i === 0 ? 720 : 480}px`}
                        />
                    )}
                    {props.hotel.imageCopyright &&
                        <StyledImageCopyrightText size={TextSize.Small}>
                            © Images: {props.hotel.imageCopyright}
                        </StyledImageCopyrightText>
                    }
                </StyledImageContainer>
                <Table
                    backgroundColor={getVacationTypeColor(props.hotel.vacationType)}
                    data={[
                        { label: props.hotel.housingType === 'Hotel' ? 'Rooms' : 'Apartments', value: props.hotel.rooms },
                        { label: 'Breakfast', value: props.hotel.amenities?.includes('Breakfast') || amenitiesFallback },
                        { label: 'Restaurant', value: props.hotel.amenities?.includes('Restaurant') || amenitiesFallback },
                        { label: 'Bar', value: props.hotel.amenities?.includes('Bar') || amenitiesFallback },
                        { label: 'Pool', value: props.hotel.amenities?.includes('Pool') || amenitiesFallback },
                        { label: 'Sauna', value: props.hotel.amenities?.includes('Sauna') || amenitiesFallback }
                    ]}
                />
                <StyledStickyWrapper>
                    <StyledActionBar>
                        <StyledFavoriteArea active={isFavorite} onClick={isFavorite ? () => removeFavorite(props.hotel.id) : () => addFavorite(props.hotel.id)}>
                            <StarIcon />
                            <Text>Favorit</Text>
                        </StyledFavoriteArea>
                        {link &&
                            <UnstyledLink href={link} target='_blank'>
                                <Button iconRight={<ExternalLinkIcon />}>Open {props.hotel.links.bookingCom ? 'on Booking.com' : `${props.hotel.housingType} Website`}</Button>
                            </UnstyledLink>
                        }
                    </StyledActionBar>
                </StyledStickyWrapper>
            </Wrapper>
            <Footer reducedPadding />
        </StyledBackground>
    )
}
