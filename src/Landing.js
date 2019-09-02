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
            return setWeather(info);
        };
        saveWeatherInfo();
    }, [cityName, isMetric]);

    return (
        <>
            <h1>Landing</h1>
            {weather ? (
                <div>
                    <span>{`${weather.name}, ${weather.sys.country}`}</span>
                    <button onClick={() => addToFavorites(weather.id, cityName)}>
                        Add to Favorites
                    </button>
                    <div className="weather">
                        <p>
                            Temp: {weather.main.temp.toFixed(1)}{' '}
                            <WeatherIcon iconCode={weather.weather[0].icon} />
                        </p>
                    </div>
                </div>
            ) : (
                cityName && <span>Failed getting data</span>
            )}
        </>
    );
};

export default Landing;
