import Image from 'next-image-export-optimizer';
import { Text } from '../text';
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
import { siteTitle } from '../../data/site';
import { CSSProperties, FunctionComponent, useEffect } from 'react';
import { useFavoriteStore } from '../../store/favorites';
import { Button } from '../button';
import { RoomDistribution } from '../room-distribution';
import { SimilarHotels } from '../similar-hotels';
import { Hotel } from '../../types';
import styles from './hotel-detail.module.scss';
import clsx from 'clsx';

interface HotelDetailProps {
    hotel: Hotel;
}

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
            <div className={styles.hotelDetail} style={{ '--color': getVacationTypeColor(props.hotel.vacationType) || Color.Background } as CSSProperties}>
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
                    <div className={styles.intro}>
                        <div className={styles.introTitle}>
                            <Text as="h1" size="huge" bold center>{props.hotel.name}</Text>
                            <Text size="superlarge" center serif>{props.hotel.city}, {props.hotel.country}</Text>
                        </div>
                        <div className={styles.tags}>
                            <Tag icon={getVacationTypeIcon(props.hotel.vacationType, true)} label={props.hotel.vacationType} />
                            <Tag label={props.hotel.housingType} />
                        </div>
                    </div>
                    <div className={clsx(styles.images, ((props.hotel.images?.length || 0) > 1) && styles.multipleImages)}>
                        {(props.hotel.images && props.hotel.visited) &&
                            <VisitedBadge className={styles.visitedBadge} />
                        }
                        {!props.hotel.images &&
                            <div className={styles.noImages}>
                                {props.hotel.visited &&
                                    <VisitedBadge className={styles.visitedBadgeNoImages} small />
                                }
                                <div className={styles.noImagesContent}>
                                    <ImageIcon />
                                    <Text center>Unfortunately we don't have any pictures of this {props.hotel.housingType.toLocaleLowerCase()} yet</Text>
                                </div>
                            </div>
                        }
                        {props.hotel.images?.slice(0, 3).map((image, i) =>
                            <Image
                                className={styles.image}
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
                            <Text className={styles.copyrightNote} size="small">
                                © Images: {props.hotel.imageCopyright}
                            </Text>
                        }
                    </div>
                    {props.hotel.description &&
                        <div className={styles.descriptionContainer}>
                            <Text className={styles.descriptionLabel} as="h3" center>About the {props.hotel.housingType.toLowerCase()}</Text>
                            <Text serif center size="extralarge">
                                {props.hotel.description}
                            </Text>
                        </div>
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

                    <div className={styles.stickyWrapper}>
                        <div className={styles.actionBar}>
                            <div
                                className={clsx(styles.favoriteArea, isFavorite && styles.active)}
                                onClick={() => {
                                    isFavorite ? removeFavorite(props.hotel.id) : addFavorite(props.hotel.id);
                                    track(isFavorite ? 'Remove from Favorites' : 'Add to Favorites', { Hotel: props.hotel.id, Page: "Hotel Detail" });
                                }}
                            >
                                <StarIcon />
                                <Text className={styles.favoriteLabel}>Favorite</Text>
                            </div>
                            {link &&
                                <a className={styles.outLink} href={link} target='_blank' onClick={() => track('Outbound Link Click', { Hotel: props.hotel.id })}>
                                    <Button iconRight={<ExternalLinkIcon />}>Open {props.hotel.links.hotel ? `${props.hotel.housingType} Website` : 'on Booking.com'}</Button>
                                </a>
                            }
                        </div>
                    </div>
                </Wrapper>
            </div>
            <SimilarHotels
                accentColor={getVacationTypeColor(props.hotel.vacationType)}
                hotels={props.hotel.nearby}
            />
            <Footer reducedPadding />
        </>
    )
}
