import React from 'react';
import { Context } from './Context/Provider';

const Landing = () => {
    const { cityName, addToFavorites, currentWeather } = React.useContext(Context);

    return (
        <>
            <h1>Landing</h1>
            {cityName ? (
                <div>
                    <span>{cityName}</span>
                    <button onClick={() => addToFavorites(currentWeather.id, cityName)}>Add to Favorites</button>
                    <div className="weather">
                        {currentWeather && <p>Temp: {Math.round(currentWeather.main.temp * 10) / 10}</p>}
                    </div>
                </div>
            ) : null}
        </>
    );
};

export default Landing;
