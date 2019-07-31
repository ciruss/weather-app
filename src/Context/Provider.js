import React from 'react';
import { getFromLocalStorage, saveToLocalStorage } from '../utils';

export const Context = React.createContext();

const Provider = ({ children }) => {
    const [cityName, setCityName] = React.useState('');
    const [favorites, setFavorites] = React.useState(
        localStorage.favorites ? getFromLocalStorage('favorites') : [],
    );

    React.useEffect(() => {
        saveToLocalStorage('favorites', favorites);
    }, [favorites]);

    const addToFavorites = cityName => {
        if (favorites.some(object => object.cityName === cityName))
            return alert('city already in favorites');
        setFavorites(favorites => [
            ...favorites,
            createFavoritesObject(cityName),
        ]);
    };

    const removeFromFavorites = id => {
        setFavorites(favorites.filter(favorite => favorite.id !== id));
    };

    const createFavoritesObject = cityName => ({
        id: new Date().getTime(),
        cityName,
    });

    const value = {
        cityName,
        setCityName,
        favorites,
        setFavorites,
        addToFavorites,
        removeFromFavorites,
    };

    return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default Provider;
