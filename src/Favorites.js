import React from 'react';

import { Context } from './Context/Provider';

const Favorites = () => {
    const { favorites, removeFromFavorites } = React.useContext(Context);

    return (
        <>
            <h1>Have a look at your favorites</h1>
            {favorites.map(item => (
                <div>
                    <span key={item.id}>{item.cityName}</span>
                    <button onClick={() => removeFromFavorites(item.id)}>
                        Remove from favorites
                    </button>
                </div>
            ))}
        </>
    );
};

export default Favorites;
