export const getFromLocalStorage = key => JSON.parse(localStorage.getItem(key));

export function saveToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}
