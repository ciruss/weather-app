import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import SearchBox from './SearchBox';
import { Context } from './Context/Provider';

const StyledHeader = styled.nav`
    display: flex;
    justify-content: space-evenly;
    flex-direction: row;
    border-bottom: 0.5rem solid;
`;

const Title = styled.h1`
    text-align: center;
    font-size: 3rem;
    margin-top: 0;
`;

const FavoritesLink = styled.span`
    font-size: 2rem;
    margin-top: auto;
    font-weight: 700;
    margin-bottom: 1rem;
`;

const SearchContainer = styled.div``;

const Header = () => {
    const { isMetric, setIsMetric } = React.useContext(Context);

    const changeUnits = () => {
        setIsMetric(!isMetric);
    };

    return (
        <StyledHeader className="header">
            <Link to="/favorites">
                <FavoritesLink>Favorites</FavoritesLink>
            </Link>
            <Link to="/">
                <Title>My Weather</Title>
            </Link>
            <SearchContainer>
                <SearchBox />
            </SearchContainer>
            <button onClick={changeUnits}>Change to {isMetric ? 'Farenheit' : 'Metric'}</button>
        </StyledHeader>
    );
};

export default Header;
