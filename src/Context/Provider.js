import React from 'react';

export const Context = React.createContext();

const Provider = ({ children }) => {
    const [cityName, setCityName] = React.useState('');

    const value = {
        cityName,
        setCityName,
    };

    return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default Provider;
