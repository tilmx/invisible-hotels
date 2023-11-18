import { HotelIcon, MountainSnowIcon, TreeDeciduousIcon, WavesIcon } from 'lucide-react';
import { Color } from '../components/tokens/colors';
import { vacationTypeFilterOptions } from '../data/site';
import { Hotel } from '../types';

type CookieType = "map"

export const checkIfFavoritesStored = () => {
    return window.localStorage.getItem('favorites') !== null;
}

export function checkIfCookiesAllowed(type: CookieType) {
    if (typeof window !== "undefined") {
        return window.localStorage.getItem('cookies-allowed-' + type) === 'true';
    }
    return false;
}

export function setCookieOptIn(type: CookieType) {
    window.localStorage.setItem('cookies-allowed-' + type, 'true');
}

export function getVacationTypeIcon(vacationType: typeof vacationTypeFilterOptions[number], optimized: boolean) {
    if (optimized) {
        return <img src={`/images/icons/${vacationType.toLowerCase()}.svg`} alt="" />;
    }
    switch (vacationType) {
        case "Sea":
            return <WavesIcon />
        case "Mountains":
            return <MountainSnowIcon />
        case "City":
            return <HotelIcon />
        case "Countryside":
            return <TreeDeciduousIcon />
    }
}

export function getVacationTypeColor(vacationType?: string) {
    switch (vacationType) {
        case "Sea":
            return Color.Blue
        case "Mountains":
            return Color.Green
        case "City":
            return Color.Red
        case "Countryside":
            return Color.Yellow
    }
}

export function getVacationTypeDescription(vacationType?: string) {
    switch (vacationType) {
        case "Sea":
            return "near the sea"
        case "Mountains":
            return "near the mountains"
        case "City":
            return "in the city"
        case "Countryside":
            return "in the contryside"
    }
}

export const getHotelUrl = ({ id, housingType }: Pick<Hotel, 'id' | 'housingType'>) => {
    return '/' + housingType.toLowerCase() + '/' + id;
}
