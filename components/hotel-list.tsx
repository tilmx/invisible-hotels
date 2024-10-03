import hotelsPreview from '../data/hotels-preview.json';
import { FunctionComponent, useEffect } from 'react';
import { checkIfFavoritesStored, track } from '../utils';
import { PlaceholderCard } from './placeholder-card';
import { Text } from './text';
import { Wrapper } from './wrapper';
import { HotelCard } from './hotel-card';
import { Color } from './tokens/colors';
import { useFilterStore } from '../store/filter';
import { useFavoriteStore } from '../store/favorites';
import { Filter } from './filter';
import { HotelListWrapper } from './hotel-list-wrapper';
import styles from './hotel-list.module.scss';

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

    const labelText = `${(vacationTypeFilter || countryFilter) ? 'Filtered' : 'Filter all'} ${filteredHotels.length.toString()} hotel${plural ? 's' : ''} & apartment${plural ? 's' : ''}`;

    return (
        <div className={styles.hotelList} id="hotel-list">
            <Wrapper>
                <Text className={styles.label} size="regular" color={Color.Text60}>{labelText}</Text>
            </Wrapper>
            <Filter />
            <HotelListWrapper className={styles.hotelListWrapper}>
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
                                track(isFavorite ? 'Remove from Favorites' : 'Add to Favorites', { Hotel: hotel.id, Page: 'Hotel List' });
                            }}
                        />
                    )
                }
                )}
                <PlaceholderCard emptyState={isEmpty} />
            </HotelListWrapper>
        </div>
    )
}
