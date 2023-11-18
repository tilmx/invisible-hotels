import Head from 'next/head'
import { useState } from 'react';
import { Menu } from '../components/menu';
import { Wrapper } from '../components/wrapper';
import styled from '@emotion/styled';
import hotelsPreview from '../data/hotels-preview.json';
import { getVacationTypeColor } from '../utils';
import { HotelCard } from '../components/hotel-card';
import { Footer } from '../components/footer';
import { Size } from '../components/tokens/size';
import { Breakpoint } from '../components/tokens/breakpoint';
import { Color } from '../components/tokens/colors';
import { Map as MapComponent } from '../components/map';
import { siteTitle } from '../data/site';

const StyledMapElement = styled(MapComponent)`
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

const StyledHotelCardContainer = styled.div`
    position: absolute;
    left: 0;
    bottom: ${Size.L};
    width: 100%;
    pointer-events: none;
    box-sizing: border-box;
    padding: 0 ${Size.S};

    ${Breakpoint.Mobile} {
        bottom: ${Size.S};
    }
`;

const StyledHotelCard = styled(HotelCard)`
    pointer-events: auto;
    max-width: 480px;
    width: 100%;
    box-sizing: border-box;
    margin: 0 auto;
    box-shadow: 0 ${Size.XXS} ${Size.M} ${Color.Shadow};
`;

export default function Map() {
    const [selectedHotel, setSelectedHotel] = useState<string | undefined>();
    const selectedHotelContent = hotelsPreview.find(hotel => hotel.id === selectedHotel)

    return (
        <>
            <Head>
                <title>{'Map — ' + siteTitle}</title>
                <meta name="theme-color" content={Color.Background} />
            </Head>
            <StyledMenuContainer>
                <Wrapper>
                    <Menu flying />
                </Wrapper>
            </StyledMenuContainer>

            <StyledMapElement
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
                <StyledHotelCardContainer>
                    <StyledHotelCard
                        hotel={selectedHotelContent}
                        small
                    />
                </StyledHotelCardContainer>
            }
            <Footer reducedPadding />
        </>
    )
}
