import React from 'react';
import Header from './Header';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Favorites from './Favorites';
import Landing from './Landing';
import Provider from './Context/Provider';

function App() {
    return (
        <Router>
            <Provider>
                <div className='App'>
                    <Header />
                    <Route exact path='/' component={Landing} />
                    <Route exact path='/favorites' component={Favorites} />
                </div>
            </Provider>
        </Router>
    );
}

export default App;
