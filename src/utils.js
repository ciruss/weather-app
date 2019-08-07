import { API_URL } from './globals';

export function getFromLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}

export function saveToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

export const getCurrentWeather = async (cityName, isMetric) => {
    const response = await fetch(
        `${API_URL}weather?q=${cityName}&units=${isMetric ? 'metric' : 'imperial'}&appid=${
            process.env.REACT_APP_API_KEY
        }`,
    );
    return await response.json();
};
