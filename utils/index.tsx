import { Hotel, MountainSnow, TreeDeciduous, Waves } from 'lucide-react';
import { Color } from '../components/tokens/colors';

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

export function getVacationTypeIcon(vacationType: string) {
    switch (vacationType) {
        case "Sea":
            return <Waves />
        case "Mountains":
            return <MountainSnow />
        case "City":
            return <Hotel />
        case "Countryside":
            return <TreeDeciduous />
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

export const getHotelUrl = ({ id, housingType }: { id: string, housingType: string }) => {
    return '/' + housingType.toLowerCase() + '/' + id;
}
