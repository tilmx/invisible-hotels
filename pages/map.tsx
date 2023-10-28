import Head from 'next/head'
import { useEffect, useRef, useState } from 'react';
import { Menu } from '../components/menu';
import { Wrapper } from '../components/wrapper';
import styled from '@emotion/styled';
import { Color, Size } from '../components/tokens';

const StyledMapElement = styled.div`
    height: 100vh;
    width: 100vw;
`

const StyledMenuContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 10;
    backdrop-filter: blur(${Size.XS});
    background: ${Color.Background80};
    box-shadow: 0 ${Size.XXS} ${Size.L} ${Color.Shadow};
`;

const StyledMenu = styled(Menu)`
    padding-bottom: ${Size.M};
`;

let loadingMapPromise: Promise<void> | null = null;
export function loadMap(token: string): Promise<void> {
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
    const [map, setMap] = useState<mapkit.Map | null>(null);
    const element = useRef<HTMLDivElement>(null);
    const mapExists = useRef(false);

    useEffect(() => {
        loadMap(process.env.NEXT_PUBLIC_MAPKIT_TOKEN!).then(() => {
            if (mapExists.current) return;
            setMap(new mapkit.Map(element.current!, { center: new mapkit.Coordinate(37.334883, -122.008977), showsMapTypeControl: false }));
            mapExists.current = true;
        });
        return () => {
            if (map) {
                map.destroy();
                mapExists.current = false;
            }
        };
    }, [])

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
            <StyledMapElement id="mapContainer" ref={element}></StyledMapElement>
        </>
    )
}
