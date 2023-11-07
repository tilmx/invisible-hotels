import Head from 'next/head'
import { useEffect, useState } from 'react';
import { Menu } from '../components/menu';
import { Wrapper } from '../components/wrapper';
import styled from '@emotion/styled';
import hotelsPreview from '../data/hotels-preview.json';
import { checkIfCookiesAllowed, getVacationTypeColor, setCookieOptIn } from '../utils';
import { Button } from '../components/button';
import { Box } from '../components/box';
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

const StyledCookieContainer = styled.div`
    padding: ${Size.XXXXL} 0;
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
    const [mapCookiesAllowed, setMapCookiesAllowed] = useState<boolean | undefined>(undefined);

    const [selectedHotel, setSelectedHotel] = useState<string | undefined>();

    useEffect(() => {
        setMapCookiesAllowed(checkIfCookiesAllowed("map"))
    })

    const selectedHotelContent = hotelsPreview.find(hotel => hotel.id === selectedHotel)

    return (
        <>
            <Head>
                <title>{'Map — ' + siteTitle}</title>
            </Head>
            <StyledMenuContainer>
                <Wrapper>
                    <Menu flying />
                </Wrapper>
            </StyledMenuContainer>
            {mapCookiesAllowed === false &&
                <Wrapper>
                    <StyledCookieContainer>
                        <Box title='Accept cookies' description='We are using Apple Maps for our hotel map. That‘s why we obviously need to send data to Apple and you need to accept a single cookie from Apple, so it works properly.'>
                            <Button onClick={() => {
                                setMapCookiesAllowed(true);
                                setCookieOptIn("map")
                            }}>Accept</Button>
                        </Box>
                    </StyledCookieContainer>
                </Wrapper>
            }
            {mapCookiesAllowed &&
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
            }

            {selectedHotelContent &&
                <StyledHotelCardContainer>
                    <StyledHotelCard
                        id={selectedHotelContent.id}
                        title={selectedHotelContent.name}
                        city={selectedHotelContent.city}
                        country={selectedHotelContent.country}
                        housingType={selectedHotelContent.housingType}
                        vacationType={selectedHotelContent.vacationType}
                        visited={selectedHotelContent.visited}
                        small
                    />
                </StyledHotelCardContainer>
            }
            <Footer reducedPadding />
        </>
    )
}
