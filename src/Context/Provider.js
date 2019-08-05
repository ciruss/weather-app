import React from 'react';
import { getFromLocalStorage, saveToLocalStorage } from '../utils';
import { API_URL } from '../globals';

export const Context = React.createContext();

const Provider = ({ children }) => {
    const [cityName, setCityName] = React.useState('');
    const [favorites, setFavorites] = React.useState(localStorage.favorites ? getFromLocalStorage('favorites') : []);
    const [currentWeather, setCurrentWeather] = React.useState();
    const [favoritesWeather, setFavoritesWeather] = React.useState([]);

    React.useEffect(() => {
        saveToLocalStorage('favorites', favorites);
    }, [favorites]);

    const addToFavorites = (id, cityName) => {
        if (favorites.some(object => object.cityName === cityName)) return alert('city already in favorites');
        setFavorites(favorites => [...favorites, createFavoritesObject(id, cityName)]);
    };

    const removeFromFavorites = id => {
        setFavorites(favorites.filter(favorite => favorite.id !== id));
        setFavoritesWeather(favoritesWeather.filter(favorite => favorite.id !== id));
    };

    const getWeatherForFavorites = cityName => {
        fetch(`${API_URL}weather?q=${cityName}&units=metric&appid=${process.env.REACT_APP_API_KEY}`)
            .then(response => response.json())
            .then(data => setFavoritesWeather(favoritesWeather => [...favoritesWeather, data]))
            .catch(e => console.log(e));
    };

    React.useEffect(() => {
        favorites.forEach(favorite => getWeatherForFavorites(favorite.cityName));
    }, [favorites]);

    const createFavoritesObject = (id, cityName) => ({
        id,
        cityName,
    });

    const getCurrentWeather = cityName => {
        fetch(`${API_URL}weather?q=${cityName}&units=metric&appid=${process.env.REACT_APP_API_KEY}`)
            .then(response => response.json())
            .then(data => setCurrentWeather(data))
            .catch(e => console.log(e));
    };

    React.useEffect(() => {
        if (cityName === '') return;
        getCurrentWeather(cityName);
    }, [cityName]);

    const value = {
        cityName,
        setCityName,
        favorites,
        setFavorites,
        addToFavorites,
        removeFromFavorites,
        getCurrentWeather,
        currentWeather,
        favoritesWeather,
    };

    return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default Provider;
