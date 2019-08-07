import React from 'react';
import { withRouter } from 'react-router';
import { Context } from './Context/Provider';
import { getCurrentWeather } from './utils';

const Favorite = ({ cityName, id, history }) => {
    const { removeFromFavorites, setCityName, isMetric } = React.useContext(Context);
    const [weather, setWeather] = React.useState();

    React.useEffect(() => {
        if (!cityName) return;
        const saveWeatherInfo = async () => {
            const info = await getCurrentWeather(cityName, isMetric);
            return await setWeather(info);
        };
        saveWeatherInfo();
    }, [cityName, isMetric]);

    const openDetailView = cityName => {
        setCityName(cityName);
        history.push('/');
    };

    return (
        <div>
            <span onClick={() => openDetailView(cityName)}>{cityName}</span>
            {weather ? <p>{weather.main.temp}</p> : null}
            <button onClick={() => removeFromFavorites(id)}>Remove from favorites</button>
        </div>
    );
};

export default withRouter(Favorite);
