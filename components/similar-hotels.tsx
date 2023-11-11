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
import { getVacationTypeDescription } from "../utils";
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

export const SimilarHotels: FunctionComponent<{ currentHotelId: string, country: string; vacationType: string; accentColor?: string; }> = props => {

    const similarHotels = hotelsPreview.filter(hotel =>
        hotel.vacationType === props.vacationType
        && hotel.country === props.country
        && hotel.id !== props.currentHotelId
    )
    const similarHotelsPreview = similarHotels.slice(0, 3);
    const [similarHotelsExpanded, setSimilarHotelsExpanded] = useState(false);

    const plural = similarHotels.length !== 1;

    return (
        <StyledSimilarHotelSection>
            <StyledSimilarIntro>
                <Text size={TextSize.SuperLarge} bold>You may <AccentedText color={props.accentColor || Color.Text} accentStyle={AccentStyle.Underlined}>also like</AccentedText></Text>
                <Text color={Color.Text50} size={TextSize.Large} serif>{similarHotels.length.toString()} Hotel{plural ? 's' : undefined} & Apartment{plural ? 's' : undefined} {getVacationTypeDescription(props.vacationType)} in {props.country}</Text>
            </StyledSimilarIntro>
            <StyledHotelListWrapper>
                {(similarHotelsExpanded ? similarHotels : similarHotelsPreview).map((hotel, i) =>
                    <HotelCard title={hotel.name} image={hotel.image} city={hotel.city} country={hotel.country} id={hotel.id} vacationType={hotel.vacationType} housingType={hotel.housingType} key={i} />
                )}
                {similarHotels.length === 0 &&
                    <PlaceholderCard emptyState />
                }
            </StyledHotelListWrapper>
            <StyledSimilarButtonWrapper>
                {(!similarHotelsExpanded && similarHotels.length > 3) &&
                    <Button iconLeft={<Maximize2Icon />} onClick={() => setSimilarHotelsExpanded(true)}>Show all similar hotels</Button>
                }
            </StyledSimilarButtonWrapper>
        </StyledSimilarHotelSection>
    )
}
