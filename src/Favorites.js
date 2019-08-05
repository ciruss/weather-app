import React from 'react';

import { Context } from './Context/Provider';

const Favorites = () => {
    const { removeFromFavorites, favoritesWeather } = React.useContext(Context);

    return (
        <>
            <h1>Have a look at your favorites</h1>
            <ul>
                {favoritesWeather.map(item => (
                    <li key={item.id}>
                        <p>{item.name}</p>
                        <p>{item.main.temp}</p>
                        <button onClick={() => removeFromFavorites(item.id)}>Remove from favorites</button>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default Favorites;
