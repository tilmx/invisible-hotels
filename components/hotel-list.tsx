import styled from '@emotion/styled';
import hotelsPreview from '../data/hotels-preview.json';
import { Send } from 'lucide-react';
import { FunctionComponent, useEffect } from 'react';
import { checkIfFavoritesStored } from '../utils';
import { PlaceholderCard } from './placeholder-card';
import { Text, TextSize } from './text';
import { UnstyledLink } from './utils/link';
import { Button } from './button';
import { Wrapper } from './wrapper';
import { HotelCard } from './hotel-card';
import { Size } from './tokens/size';
import { Breakpoint } from './tokens/breakpoint';
import { Color } from './tokens/colors';
import { useFilterStore } from '../store/filter';
import { useFavoriteStore } from '../store/favorites';
import { usePlausible } from 'next-plausible';
import { Filter } from './filter';

const StyledContainer = styled.div`
    margin-top: ${Size.XXXL};
    padding-top: ${Size.XL};

    ${Breakpoint.Tablet} {
        margin-top: ${Size.XXL};
        grid-template-columns: 1fr;
    }

    ${Breakpoint.Mobile} {
        margin-top: ${Size.XL};
    }
`;

const StyledGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: ${Size.M};
    margin-top: ${Size.XXXL};

    ${Breakpoint.DesktopSmall} {
        grid-template-columns: repeat(2, 1fr);
    }

    ${Breakpoint.TabletSmall} {
        grid-template-columns: 1fr;
        margin-top: ${Size.XL};
    }
    ${Breakpoint.Mobile} {
        gap: ${Size.XS};
    }
`;

const StyledPlaceholderCard = styled(PlaceholderCard) <{ emptyState: boolean; }>`
    ${props => props.emptyState && `
        max-width: 400px;
        place-self: center;
        grid-column: 1/4;
    `}
`;

const StyledLabel = styled(Text)`
    z-index: 11;
    position: relative;
    transform: translate3d(0,0,0); 
    margin-bottom: ${Size.XS};
`;

export const HotelList: FunctionComponent = () => {
    const plausible = usePlausible()

    useEffect(() => {
        checkIfFavoritesStored() && useFavoriteStore.persist.rehydrate();
    }, [])

    const vacationTypeFilter = useFilterStore(state => state.vacationTypeFilter);
    const countryFilter = useFilterStore(state => state.countryFilter);
    const favoritesFilter = useFilterStore(state => state.favoritesFilter);
    const searchTerm = useFilterStore(state => state.searchTerm);

    const favorites = useFavoriteStore(state => state.favorites);
    const addFavorite = useFavoriteStore(state => state.addFavorite);
    const removeFavorite = useFavoriteStore(state => state.removeFavorite);

    const filteredHotels = hotelsPreview.filter(hotel =>
        (typeof vacationTypeFilter === 'undefined' ? true : vacationTypeFilter === hotel.vacationType)
        && (typeof countryFilter === 'undefined' ? true : countryFilter === hotel.country)
        && ((favoritesFilter && favorites.length > 0) ? favorites.includes(hotel.id) : true)
        && (typeof searchTerm === 'undefined' ? true : hotel.name.toLowerCase().includes(searchTerm.toLowerCase()))
    )

    const isEmpty = filteredHotels.length === 0;

    return (
        <StyledContainer>
            <Wrapper>
                <StyledLabel size={TextSize.Regular} color={Color.Text50}>{(vacationTypeFilter || countryFilter) ? 'Filtered' : 'Filter all'} {filteredHotels.length} hotels & apartments</StyledLabel>
            </Wrapper>
            <Filter />
            <Wrapper wide>
                <StyledGrid>
                    {filteredHotels.map((hotel, i) => {
                        const isFavorite = favorites.includes(hotel.id);
                        return (
                            <HotelCard
                                key={i}
                                title={hotel.name}
                                city={hotel.city}
                                country={hotel.country}
                                housingType={hotel.housingType}
                                vacationType={hotel.vacationType}
                                visited={hotel.visited}
                                id={hotel.id}
                                image={hotel.image}
                                starred={isFavorite}
                                onStarClick={e => {
                                    e.preventDefault();
                                    if (isFavorite) {
                                        removeFavorite(hotel.id)
                                        plausible('remove-from-favorites', { props: { hotel: hotel.id } })
                                    }
                                    else {
                                        addFavorite(hotel.id)
                                        plausible('add-to-favorites', { props: { hotel: hotel.id } })
                                    }
                                }}
                            />
                        )
                    }
                    )}
                    <StyledPlaceholderCard emptyState={isEmpty}>
                        <Text center size={TextSize.Regular}>{isEmpty ? "It looks like we haven't been in such a place. Any tips?" : "You have a secret hotel tip for us or some feedback? Let us know!"}</Text>
                        <UnstyledLink href={`mailto:mail@invisible-hotels.com?subject=${encodeURI('I have a secret hotel tip for you!')}&body=${encodeURI('Hey Annika and Tilman! \n\n I have a super secret hotel tip for you — here it is:')}`}>
                            <Button iconLeft={<Send />} small secondary>Send E-Mail</Button>
                        </UnstyledLink>
                    </StyledPlaceholderCard>
                </StyledGrid>
            </Wrapper>
        </StyledContainer>
    )
}
