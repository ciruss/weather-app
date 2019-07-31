import React from 'react';
import { Context } from './Context/Provider';

const Landing = () => {
    const { cityName, addToFavorites } = React.useContext(Context);

    return (
        <>
            <h1>Landing</h1>
            {cityName ? (
                <div>
                    <span>{cityName}</span>
                    <button onClick={() => addToFavorites(cityName)}>
                        Add to Favorites
                    </button>
                </div>
            ) : null}
        </>
    );
};

export default Landing;
