import { FunctionComponent, useEffect, useRef, useState } from "react";
import { checkIfCookiesAllowed, setCookieOptIn } from "../utils";
import styled from "@emotion/styled";
import { Button } from "./button";
import { Box } from "./box";

interface MapProps {
    className?: string;
    center?: { lat: number; long: number; }
    annotations?: ({
        id: string;
        name: string;
        coordinates: { lat: number; long: number };
        color: string;
        clusteringIdentifier: string;
    })[];
    onAnnotationClick?: (id?: string) => void;
}

const StyledContainer = styled.div`
    width: 100%;
    height: 480px;
`;

const StyledCookieContainer = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    padding: var(--size-m);
    box-sizing: border-box;
`;

const StyledMapContainer = styled.div`
    width: 100%;
    height: 100%;
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
        scriptTag.src = 'https://cdn.apple-mapkit.com/mk/5.45.x/mapkit.js';
        scriptTag.crossOrigin = '';
        scriptTag.dataset.libraries = 'map, annotations'
        document.head.appendChild(scriptTag);
    });
    return loadingMapPromise;
}

export const Map: FunctionComponent<MapProps> = props => {
    const [map, setMap] = useState<mapkit.Map | null>(null);
    const element = useRef<HTMLDivElement>(null);
    const mapExists = useRef(false);

    const [darkMode, setDarkMode] = useState(false);

    const [mapCookiesAllowed, setMapCookiesAllowed] = useState<boolean | undefined>(undefined);

    useEffect(() => {
        setMapCookiesAllowed(checkIfCookiesAllowed("map"))
    })

    useEffect(() => {
        setDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches)
    }, []);

    useEffect(() => {
        if (mapExists.current || !mapCookiesAllowed) return;

        loadMap(process.env.NEXT_PUBLIC_MAPKIT_TOKEN!).then(() => {
            if (mapExists.current) return;

            setMap(new mapkit.Map(element.current!, {
                center: new mapkit.Coordinate(props.center?.lat || 53.551086, props.center?.long || 9.993682),
                showsMapTypeControl: false,
                isRotationEnabled: false,
                showsPointsOfInterest: false,
                annotationForCluster(annotation) {
                    (annotation as any).color = 'black';
                    return annotation;
                },
                colorScheme: darkMode ? mapkit.Map.ColorSchemes.Dark : mapkit.Map.ColorSchemes.Light,
                annotations: props.annotations?.map(annotation => {
                    return new mapkit.MarkerAnnotation(
                        new mapkit.Coordinate(annotation.coordinates?.lat, annotation.coordinates?.long),
                        {
                            title: annotation.name,
                            color: annotation.color,
                            clusteringIdentifier: annotation.clusteringIdentifier,
                            data: { id: annotation.id }
                        }
                    )
                })
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
            props.onAnnotationClick && props.onAnnotationClick(e.annotation?.data.id)
        }
        const listenToDeselect = () => {
            props.onAnnotationClick && props.onAnnotationClick(undefined)
        }
        map?.addEventListener('select', listenToSelect)
        map?.addEventListener('deselect', listenToDeselect)
        return () => {
            map.removeEventListener('select', listenToSelect)
            map?.addEventListener('deselect', listenToDeselect)
        }
    }, [map])

    return (
        <StyledContainer className={props.className} >
            {mapCookiesAllowed === false &&
                <StyledCookieContainer>
                    <Box title='Show Hotel Map' description='We are using Apple Maps for our hotel map. That‘s why we obviously need to send data to Apple and you need to accept a single cookie from Apple, so it works properly.'>
                        <Button onClick={() => {
                            setMapCookiesAllowed(true);
                            setCookieOptIn("map")
                        }}>Accept</Button>
                    </Box>
                </StyledCookieContainer>
            }
            {mapCookiesAllowed &&
                <StyledMapContainer id="mapContainer" ref={element} />
            }
        </StyledContainer>
    )
}