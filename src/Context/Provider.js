import React from 'react';
import { getFromLocalStorage, saveToLocalStorage } from '../utils';

export const Context = React.createContext();

const Provider = ({ children }) => {
    const [cityName, setCityName] = React.useState('');
    const [favorites, setFavorites] = React.useState(
        localStorage.favorites ? getFromLocalStorage('favorites') : [],
    );
    const [isMetric, setIsMetric] = React.useState(true);

    React.useEffect(() => {
        saveToLocalStorage('favorites', favorites);
    }, [favorites]);

    const addToFavorites = (id, cityName) => {
        if (favorites.some(object => object.cityName === cityName))
            return alert('city already in favorites');
        setFavorites(favorites => [...favorites, createFavoritesObject(id, cityName)]);
    };

    const removeFromFavorites = id => {
        setFavorites(favorites.filter(favorite => favorite.id !== id));
    };

    const createFavoritesObject = (id, cityName) => ({
        id,
        cityName,
    });

    const value = {
        cityName,
        setCityName,
        favorites,
        setFavorites,
        addToFavorites,
        removeFromFavorites,
        isMetric,
        setIsMetric,
    };

    return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default Provider;
