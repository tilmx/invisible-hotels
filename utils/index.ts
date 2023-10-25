export function checkIfCookiesAllowed() {
    return window.localStorage.getItem('cookies-allowed') === 'true';
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
