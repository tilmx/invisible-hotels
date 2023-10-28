import Head from 'next/head'
import { useEffect, useRef, useState } from 'react';
import { Menu } from '../components/menu';
import { Wrapper } from '../components/wrapper';
import styled from '@emotion/styled';
import { Color, Size } from '../components/tokens';
import hotels from '../data/hotels.json';
import { getVacationTypeColor } from '../utils';
import { Button } from '../components/button';
import { Box } from '../components/box';

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
    backdrop-filter: blur(${Size.XS});
    background: ${Color.Background80};
    box-shadow: 0 0 ${Size.L} ${Color.Shadow};
`;

const StyledMenu = styled(Menu)`
    padding-bottom: ${Size.M};
`;

const StyledCookieWrapper = styled(Wrapper)`
    padding-top: ${Size.XXXXL};
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

    useEffect(() => {
        if (mapExists.current || !mapCookiesAllowed) return;

        loadMap(process.env.NEXT_PUBLIC_MAPKIT_TOKEN!).then(() => {
            if (mapExists.current) return;

            setMap(new mapkit.Map(element.current!, {
                center: new mapkit.Coordinate(53.551086, 9.993682),
                showsMapTypeControl: false,
                isRotationEnabled: false,
                showsPointsOfInterest: false,
                annotationForCluster(annotation) {
                    (annotation as any).color = 'black';
                    return annotation;
                },
                annotations: hotels.filter(hotel => hotel.coordinates)?.map(hotel => {
                    if (hotel.coordinates.lat && hotel.coordinates.long) {
                        return new mapkit.MarkerAnnotation(
                            new mapkit.Coordinate(hotel.coordinates?.lat, hotel.coordinates?.long),
                            {
                                title: hotel.name,
                                color: getVacationTypeColor(hotel.vacationType),
                                clusteringIdentifier: hotel.country,
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

    return (
        <>
            <Head>
                <title>Map | Invisible Hotels</title>
                <meta name="description" content="Invisible Hotels are all the lovely, minimalistic and fancy hotels & apartments where we stayed already — or would love to." />
            </Head>
            <StyledMenuContainer>
                <Wrapper>
                    <StyledMenu />
                </Wrapper>
            </StyledMenuContainer>
            {!mapCookiesAllowed &&
                <StyledCookieWrapper>
                    <Box title='Accept cookies' description='To show the hotel map, you need to accept cookies.'>
                        <Button onClick={() => setMapCookiesAllowed(true)}>Accept</Button>
                    </Box>
                </StyledCookieWrapper>
            }
            <StyledMapElement id="mapContainer" ref={element}></StyledMapElement>
        </>
    )
}
