import React from 'react';

const WeatherIcon = ({ iconCode, largeIcon }) => (
    <img
        alt="weatherIcon"
        src={`http://openweathermap.org/img/wn/${iconCode}${largeIcon ? '@2x' : ''}.png`}
    />
);

export default WeatherIcon;
