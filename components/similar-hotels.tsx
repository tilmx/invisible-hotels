import { FunctionComponent, useState } from "react";
import styled from "@emotion/styled";
import hotelsPreview from '../data/hotels-preview.json';
import { Size } from "./tokens/size";
import { Wrapper } from "./wrapper";
import { HotelListWrapper } from "./hotel-list-wrapper";
import { Text, TextSize } from "./text";
import { HotelCard } from "./hotel-card";
import { Maximize2Icon } from "lucide-react";
import { Button } from "./button";
import { Color } from "./tokens/colors";
import { PlaceholderCard } from "./placeholder-card";
import { AccentStyle, AccentedText } from "./accented-text";

const StyledSimilarHotelSection = styled.div`
    margin: ${Size.XXXL} 0;
`;

const StyledSimilarIntro = styled(Wrapper)`
    display: flex;
    flex-direction: column;
    gap: ${Size.XS};
`;

const StyledHotelListWrapper = styled(HotelListWrapper)`
    margin: ${Size.XXL} 0;
`;

const StyledSimilarButtonWrapper = styled(Wrapper)`
    display: flex;
    justify-content: center;
`;

export const SimilarHotels: FunctionComponent<{ hotels: { id: string; distance: number }[]; accentColor?: string; }> = props => {

    const similarHotelsPreview = props.hotels.slice(0, 3);
    const [similarHotelsExpanded, setSimilarHotelsExpanded] = useState(false);

    const plural = props.hotels.length !== 1;

    return (
        <StyledSimilarHotelSection>
            <StyledSimilarIntro>
                <Text size={TextSize.SuperLarge} bold>You may <AccentedText color={props.accentColor || Color.Text} accentStyle={AccentStyle.Underlined}>also like</AccentedText></Text>
                <Text color={Color.Text50} size={TextSize.Large} serif>{props.hotels.length.toString()} nearby Hotel{plural ? 's' : undefined} & Apartment{plural ? 's' : undefined} within 200 km</Text>
            </StyledSimilarIntro>
            <StyledHotelListWrapper>
                {(similarHotelsExpanded ? props.hotels : similarHotelsPreview).map((hotel, i) => {
                    const hotelContent = hotelsPreview.find(element => element.id === hotel.id)
                    return hotelContent ? (
                        <HotelCard title={hotelContent.name} image={hotelContent.image} city={hotelContent.city} country={hotelContent.country} id={hotelContent.id} vacationType={hotelContent.vacationType} housingType={hotelContent.housingType} key={i} />
                    ) : undefined
                }
                )}
                {props.hotels.length === 0 &&
                    <PlaceholderCard emptyState />
                }
            </StyledHotelListWrapper>
            <StyledSimilarButtonWrapper>
                {(!similarHotelsExpanded && props.hotels.length > 3) &&
                    <Button iconLeft={<Maximize2Icon />} onClick={() => setSimilarHotelsExpanded(true)}>Show more nearby hotels</Button>
                }
            </StyledSimilarButtonWrapper>
        </StyledSimilarHotelSection>
    )
}
