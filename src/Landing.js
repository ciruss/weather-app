import React from 'react';
import { Context } from './Context/Provider';

const Landing = () => {
    const { cityName } = React.useContext(Context);
    return (
        <>
            <h1>Landing</h1>
            {cityName ? <p>{cityName}</p> : null}
        </>
    );
};

export default Landing;
