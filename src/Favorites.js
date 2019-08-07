import React from 'react';

import { Context } from './Context/Provider';
import Favorite from './Favorite';

const Favorites = () => {
    const { favorites } = React.useContext(Context);

    return (
        <>
            <h1>Have a look at your favorites</h1>
            {favorites.map(item => (
                <Favorite cityName={item.cityName} key={item.id} id={item.id} />
            ))}
        </>
    );
};

export default Favorites;
