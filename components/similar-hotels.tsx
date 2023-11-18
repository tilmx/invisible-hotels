import { FunctionComponent, useState } from "react";
import styled from "@emotion/styled";
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
import { NearbyHotelPreview } from "../types";

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

export const SimilarHotels: FunctionComponent<{ hotels: NearbyHotelPreview[]; accentColor?: string; }> = props => {

    const similarHotelsPreview = props.hotels.slice(0, 3);
    const [similarHotelsExpanded, setSimilarHotelsExpanded] = useState(false);

    const plural = props.hotels.length !== 1;

    return (
        <StyledSimilarHotelSection>
            <StyledSimilarIntro>
                <Text size={TextSize.SuperLarge} bold>You may <AccentedText color={props.accentColor || Color.Text} accentStyle={AccentStyle.Underlined}>also like</AccentedText></Text>
                <Text color={Color.Text60} size={TextSize.Large} serif>{(props.hotels.length || 'No').toString()} nearby hotel{plural ? 's' : undefined} & apartment{plural ? 's' : undefined}</Text>
            </StyledSimilarIntro>
            <StyledHotelListWrapper>
                {(similarHotelsExpanded ? props.hotels : similarHotelsPreview).map((hotel, i) =>
                    <HotelCard
                        key={i}
                        hotel={hotel}
                    />
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
