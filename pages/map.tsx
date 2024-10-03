import Head from 'next/head'
import { useState } from 'react';
import { Menu } from '../components/menu';
import { Wrapper } from '../components/wrapper';
import hotelsPreview from '../data/hotels-preview.json';
import { getVacationTypeColor } from '../utils';
import { HotelCard } from '../components/hotel-card';
import { Footer } from '../components/footer';
import { Color } from '../components/tokens/colors';
import { Map as MapComponent } from '../components/map';
import { siteTitle } from '../data/site';
import styles from './map.module.scss';

export default function Map() {
    const [selectedHotel, setSelectedHotel] = useState<string | undefined>();
    const selectedHotelContent = hotelsPreview.find(hotel => hotel.id === selectedHotel)

    return (
        <>
            <Head>
                <title>{'Map — ' + siteTitle}</title>
                <meta name="theme-color" content={Color.Background} />
            </Head>
            <div className={styles.menuContainer}>
                <Wrapper>
                    <Menu flying />
                </Wrapper>
            </div>

            <MapComponent
                className={styles.map}
                annotations={hotelsPreview.filter(hotel => hotel.coordinates)?.map(hotel => {
                    return {
                        id: hotel.id,
                        name: hotel.name,
                        coordinates: { lat: hotel.coordinates.lat, long: hotel.coordinates.long },
                        color: getVacationTypeColor(hotel.vacationType) || Color.Background,
                        clusteringIdentifier: hotel.country,
                    }
                })}
                onAnnotationClick={id => setSelectedHotel(id)}
            />

            {selectedHotelContent &&
                <div className={styles.hotelCardContainer}>
                    <HotelCard
                        className={styles.hotelCard}
                        hotel={selectedHotelContent}
                        small
                    />
                </div>
            }
            <Footer reducedPadding />
        </>
    )
}
