import styled from '@emotion/styled';
import hotelsPreview from '../data/hotels-preview.json';
import { FunctionComponent, useEffect } from 'react';
import { checkIfFavoritesStored } from '../utils';
import { PlaceholderCard } from './placeholder-card';
import { Text, TextSize } from './text';
import { Wrapper } from './wrapper';
import { HotelCard } from './hotel-card';
import { Size } from './tokens/size';
import { Breakpoint } from './tokens/breakpoint';
import { Color } from './tokens/colors';
import { useFilterStore } from '../store/filter';
import { useFavoriteStore } from '../store/favorites';
import { Filter } from './filter';
import { HotelListWrapper } from './hotel-list-wrapper';

const StyledContainer = styled.div`
    margin-top: ${Size.XL};
    padding-top: ${Size.XL};

    ${Breakpoint.Tablet} {
        margin-top: ${Size.XXL};
        grid-template-columns: 1fr;
    }

    ${Breakpoint.Mobile} {
        margin-top: ${Size.XL};
    }
`;

const StyledLabel = styled(Text)`
    z-index: 11;
    position: relative;
    transform: translate3d(0,0,0); 
    margin-bottom: ${Size.XS};
`;

const StyledHotelListWrapper = styled(HotelListWrapper)`
    margin-top: ${Size.XXXL};

    ${Breakpoint.TabletSmall} {
        grid-template-columns: 1fr;
        margin-top: ${Size.XL};
    }
`;

export const HotelList: FunctionComponent = () => {

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
        && (typeof searchTerm === 'undefined' ? true : (
            hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            hotel.city.toLowerCase().includes(searchTerm.toLowerCase())
        ))
    )

    const isEmpty = filteredHotels.length === 0;
    const plural = filteredHotels.length !== 1;

    const labelText = `${(vacationTypeFilter || countryFilter) ? 'Filtered' : 'Filter all'} ${filteredHotels.length.toString()} hotel${plural && 's'} & apartment${plural && 's'}`;

    return (
        <StyledContainer id="hotel-list">
            <Wrapper>
                <StyledLabel size={TextSize.Regular} color={Color.Text60}>{labelText}</StyledLabel>
            </Wrapper>
            <Filter />
            <StyledHotelListWrapper>
                {filteredHotels.map((hotel, i) => {
                    const isFavorite = favorites.includes(hotel.id);
                    return (
                        <HotelCard
                            key={i}
                            hotel={hotel}
                            starred={isFavorite}
                            onStarClick={e => {
                                e.preventDefault();
                                isFavorite ? removeFavorite(hotel.id) : addFavorite(hotel.id);
                            }}
                        />
                    )
                }
                )}
                <PlaceholderCard emptyState={isEmpty} />
            </StyledHotelListWrapper>
        </StyledContainer>
    )
}
