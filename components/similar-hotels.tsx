import { FunctionComponent, useState } from "react";
import { Wrapper } from "./wrapper";
import { HotelListWrapper } from "./hotel-list-wrapper";
import { Text } from "./text";
import { HotelCard } from "./hotel-card";
import { Maximize2Icon } from "lucide-react";
import { Button } from "./button";
import { Color } from "./tokens/colors";
import { PlaceholderCard } from "./placeholder-card";
import { AccentStyle, AccentedText } from "./accented-text";
import { NearbyHotelPreview } from "../types";
import styles from './similar-hotels.module.scss';

export const SimilarHotels: FunctionComponent<{ hotels: NearbyHotelPreview[]; accentColor?: string; }> = props => {
    const similarHotelsPreview = props.hotels.slice(0, 3);
    const [similarHotelsExpanded, setSimilarHotelsExpanded] = useState(false);

    const plural = props.hotels.length !== 1;

    return (
        <div className={styles.similar}>
            <Wrapper className={styles.intro}>
                <Text size="superlarge" as="h2" bold>You may <AccentedText color={props.accentColor || Color.Text} accentStyle={AccentStyle.Underlined}>also like</AccentedText></Text>
                <Text color={Color.Text60} size="large" serif>{(props.hotels.length || 'No').toString()} nearby hotel{plural ? 's' : undefined} & apartment{plural ? 's' : undefined}</Text>
            </Wrapper>
            <HotelListWrapper className={styles.list}>
                {(similarHotelsExpanded ? props.hotels : similarHotelsPreview).map((hotel, i) =>
                    <HotelCard
                        key={i}
                        hotel={hotel}
                    />
                )}
                {props.hotels.length === 0 &&
                    <PlaceholderCard emptyState />
                }
            </HotelListWrapper>
            <Wrapper className={styles.buttonWrapper}>
                {(!similarHotelsExpanded && props.hotels.length > 3) &&
                    <Button iconLeft={<Maximize2Icon />} onClick={() => setSimilarHotelsExpanded(true)}>Show more nearby hotels</Button>
                }
            </Wrapper>
        </div>
    )
}
