import Head from 'next/head'
import { useEffect, useRef, useState } from 'react';
import Script from 'next/script'
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

export default function Map() {
    const [map, setMap] = useState<mapkit.Map | null>(null);
    const element = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (typeof mapkit !== 'undefined') {
            mapkit.init({
                authorizationCallback: function (done: any) {
                    done(process.env.NEXT_PUBLIC_MAPKIT_TOKEN);
                }
            });
            let map = new mapkit.Map('mapContainer', { center: new mapkit.Coordinate(37.334883, -122.008977), showsMapTypeControl: false });

            return (
                () => map.destroy()
            )
        }
    }, [])

    return (
        <>
            <Script
                src="https://cdn.apple-mapkit.com/mk/5.x.x/mapkit.core.js"
                crossOrigin=""
                async
                data-callback="initMapKit"
                data-libraries="services,full-map,geojson"
            />
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
