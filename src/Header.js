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

const SwitchWrapper = styled.div`
    position: relative;
`;

const SwitchLabel = styled.label`
    position: absolute;
    top: 0;
    left: 0;
    width: 42px;
    height: 26px;
    border-radius: 0;
    background: #bebebe;
    cursor: pointer;
    &::after {
        content: '';
        display: block;
        border-radius: 0;
        width: 18px;
        height: 18px;
        margin: 3px;
        background: #ffffff;
        box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.2);
        transition: 0.2s;
        background: #4fbe79;
    }
`;

const Switch = styled.input`
    opacity: 0;
    z-index: 1;
    border-radius: 0;
    width: 42px;
    height: 26px;
    &:checked + ${SwitchLabel} {
        /* background: #4fbe79; */
        &::after {
            content: '';
            display: block;
            border-radius: 0;
            width: 18px;
            height: 18px;
            margin-left: 21px;
            transition: 0.2s;
        }
    }
`;

const Header = () => {
    const { isMetric, setIsMetric } = React.useContext(Context);

    const changeUnits = e => {
        setIsMetric(e.target.checked);
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
            <SwitchWrapper>
                <Switch
                    id="temperature-switch"
                    type="checkbox"
                    checked={isMetric}
                    onChange={changeUnits}
                />
                <SwitchLabel htmlFor="temperature-switch" />
            </SwitchWrapper>
        </StyledHeader>
    );
};

export default Header;
