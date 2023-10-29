import Head from 'next/head'
import { useEffect, useRef, useState } from 'react';
import { Menu } from '../components/menu';
import { Wrapper } from '../components/wrapper';
import styled from '@emotion/styled';
import { Size } from '../components/tokens';
import hotels from '../data/hotels.json';
import { checkIfCookiesAllowed, getVacationTypeColor, setCookieOptIn } from '../utils';
import { Button } from '../components/button';
import { Box } from '../components/box';
import { HotelCard } from '../components/hotel-card';

const StyledMapElement = styled.div`
    height: 100vh;
    width: 100vw;
`;

const StyledMenuContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 10;
`;

const StyledCookieContainer = styled.div`
    padding: ${Size.XXXXL} 0;
`;

const StyledHotelCardContainer = styled.div`
    position: absolute;
    left: 0;
    bottom: ${Size.L};
    width: 100%;
    display: flex;
    justify-content: center;
    pointer-events: none;
`;

const StyledHotelCard = styled(HotelCard)`
    pointer-events: auto;
    max-width: 480px;
    width: 90vw;
`;

let loadingMapPromise: Promise<void> | null = null;
function loadMap(token: string): Promise<void> {
    if (loadingMapPromise !== null) {
        return loadingMapPromise;
    }
    loadingMapPromise = new Promise((resolve) => {
        const scriptTag = document.createElement('script');
        scriptTag.addEventListener('load', () => {
            mapkit.init({ authorizationCallback: (done) => done(token) });
            resolve();
        }, { once: true });
        scriptTag.src = 'https://cdn.apple-mapkit.com/mk/5.x.x/mapkit.js';
        scriptTag.crossOrigin = '';
        document.head.appendChild(scriptTag);
    });
    return loadingMapPromise;
}

export default function Map() {
    const [mapCookiesAllowed, setMapCookiesAllowed] = useState(false);

    const [map, setMap] = useState<mapkit.Map | null>(null);
    const element = useRef<HTMLDivElement>(null);
    const mapExists = useRef(false);

    const [darkMode, setDarkMode] = useState(false);

    const [selectedHotel, setSelectedHotel] = useState<string | undefined>();

    useEffect(() => {
        checkIfCookiesAllowed("map") && setMapCookiesAllowed(true)
    })

    useEffect(() => {
        setDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches)
    }, []);

    useEffect(() => {
        if (mapExists.current || !mapCookiesAllowed) return;

        loadMap(process.env.NEXT_PUBLIC_MAPKIT_TOKEN!).then(() => {
            if (mapExists.current) return;

            setMap(new mapkit.Map(element.current!, {
                center: new mapkit.Coordinate(53.551086, 9.993682),
                showsMapTypeControl: false,
                isRotationEnabled: false,
                showsPointsOfInterest: false,
                mapType: 'mutedStandard',
                annotationForCluster(annotation) {
                    (annotation as any).color = 'black';
                    return annotation;
                },
                colorScheme: darkMode ? mapkit.Map.ColorSchemes.Dark : mapkit.Map.ColorSchemes.Light,
                annotations: hotels.filter(hotel => hotel.coordinates)?.map(hotel => {
                    if (hotel.coordinates.lat && hotel.coordinates.long) {
                        return new mapkit.MarkerAnnotation(
                            new mapkit.Coordinate(hotel.coordinates?.lat, hotel.coordinates?.long),
                            {
                                title: hotel.name,
                                color: getVacationTypeColor(hotel.vacationType),
                                clusteringIdentifier: hotel.country,
                                data: { id: hotel.id }
                            }
                        );
                    }
                }) as any
            }));
            mapExists.current = true;
        });
        return () => {
            if (map) {
                map.destroy();
                mapExists.current = false;
            }
        };
    }, [mapCookiesAllowed])

    useEffect(() => {
        if (!map) { return }
        const listenToSelect = (e: mapkit.EventBase<mapkit.Map> & { annotation?: mapkit.Annotation | undefined }) => {
            setSelectedHotel(e.annotation?.data.id)
        }
        const listenToDeselect = () => {
            setSelectedHotel(undefined)
        }
        map?.addEventListener('select', listenToSelect)
        map?.addEventListener('deselect', listenToDeselect)
        return () => {
            map.removeEventListener('select', listenToSelect)
            map?.addEventListener('deselect', listenToDeselect)

        }
    }, [map])

    const selectedHotelContent = hotels.find(hotel => hotel.id === selectedHotel)

    return (
        <>
            <Head>
                <title>Map | Invisible Hotels</title>
                <meta name="description" content="Invisible Hotels are all the lovely, minimalistic and fancy hotels & apartments where we stayed already — or would love to." />
            </Head>
            <StyledMenuContainer>
                <Wrapper>
                    <Menu flying />
                </Wrapper>
            </StyledMenuContainer>
            {!mapCookiesAllowed &&
                <Wrapper>
                    <StyledCookieContainer>
                        <Box title='Accept cookies' description='We are using Apple Maps for our hotel map. That‘s why we obviously need to send data to Apple and also you need to a single cookie from Apple, so it works properly.'>
                            <Button onClick={() => {
                                setMapCookiesAllowed(true);
                                setCookieOptIn("map")
                            }}>Accept</Button>
                        </Box>
                    </StyledCookieContainer>
                </Wrapper>
            }
            {mapCookiesAllowed && <StyledMapElement id="mapContainer" ref={element}></StyledMapElement>}

            {selectedHotelContent &&
                <StyledHotelCardContainer>
                    <StyledHotelCard
                        title={selectedHotelContent.name}
                        location={`${selectedHotelContent.city}, ${selectedHotelContent.country} `}
                        housingType={selectedHotelContent.housingType}
                        vacationType={selectedHotelContent.vacationType}
                        visited={selectedHotelContent.visited}
                        links={{
                            bookingCom: selectedHotelContent.links.bookingCom,
                            hotel: selectedHotelContent.links.hotel
                        }}
                        small
                    />
                </StyledHotelCardContainer>
            }
        </>
    )
}
