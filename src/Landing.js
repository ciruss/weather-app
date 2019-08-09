import React from 'react';
import { Context } from './Context/Provider';
import { getCurrentWeather } from './utils';
import WeatherIcon from './WeatherIcon';

const Landing = () => {
    const { cityName, addToFavorites, isMetric } = React.useContext(Context);
    const [weather, setWeather] = React.useState();

    React.useEffect(() => {
        if (!cityName) return;
        const saveWeatherInfo = async () => {
            const info = await getCurrentWeather(cityName, isMetric);
            return await setWeather(info);
        };
        saveWeatherInfo();
    }, [cityName, isMetric]);

    return (
        <>
            <h1>Landing</h1>
            {cityName ? (
                <div>
                    <span>{cityName}</span>
                    <button onClick={() => addToFavorites(weather.id, cityName)}>
                        Add to Favorites
                    </button>
                    <div className="weather">
                        {weather && weather.main ? (
                            <p>
                                Temp: {Math.round(weather.main.temp * 10) / 10}{' '}
                                <WeatherIcon iconCode={weather.weather[0].icon} />
                            </p>
                        ) : null}
                    </div>
                </div>
            ) : null}
        </>
    );
};

export default Landing;
