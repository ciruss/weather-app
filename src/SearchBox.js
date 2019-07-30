import React from 'react';
import { withRouter } from 'react-router';
import styled from 'styled-components';
import { Context } from './Context/Provider';

/* const SearchBox = styled.input`
  width: 100%;
  margin-top: auto;
  margin-bottom: 1rem;
  line-height: 2rem;
`; */

const SearchBox = ({ location, history }) => {
    const [searchInput, setSearchInput] = React.useState('');
    const { setCityName } = React.useContext(Context);

    function search(e) {
        e.preventDefault();

        if (location !== '/') {
            history.push('/');
        }

        setCityName(searchInput);
        setSearchInput('');
    }

    return (
        <>
            <form>
                <input
                    type='text'
                    placeholder='Search a city'
                    value={searchInput}
                    onChange={e => setSearchInput(e.target.value)}
                />
                <button onClick={e => search(e)}>Search</button>
            </form>
        </>
    );
};

export default withRouter(SearchBox);
