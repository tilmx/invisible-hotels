import { FunctionComponent, useEffect } from "react";
import { useFavoriteStore } from "../store/favorites";
import { checkIfCookiesAllowed } from "../utils";

export const CookieManager: FunctionComponent = () => {
    const setFavorites = useFavoriteStore(state => state.setFavorites);

    useEffect(() => {
        console.log('fetch cookies')
        if (checkIfCookiesAllowed("favorites")) {
            const stored = window.localStorage.getItem('starred-hotels');
            stored && setFavorites(JSON.parse(stored));
        }
    }, [])

    return (
        <div />
    )
}