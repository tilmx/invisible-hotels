import { Hotel, MountainSnow, TreeDeciduous, Waves } from 'lucide-react';
import { Color } from '../components/tokens';

export function checkIfCookiesAllowed() {
    if (typeof window !== "undefined") {
        return window.localStorage.getItem('cookies-allowed') === 'true';
    }
}

export function setCookieOptIn() {
    window.localStorage.setItem('cookies-allowed', 'true');
}

export function saveToLocalStorage(content: { key: string, value: string }) {
    // check if set cookies is allowed
    const savingIsAllowed = window.localStorage.getItem('cookies-allowed') === 'true';

    if (savingIsAllowed) {
        // save to localstorage
        window.localStorage.setItem(content.key, content.value);
    }
    else {
        console.error('No cookies are allowed')
    }
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

