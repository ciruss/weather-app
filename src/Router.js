import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './views/Home';
import Favorites from './views/Favorites';
import NotFound from './views/NotFound';

const Router = () => (
	<BrowserRouter>
		<Switch>
			<Route exact path="/" component={Home} />
			<Route path="/favorites" component={Favorites} />
			<Route component={NotFound} />
		</Switch>
	</BrowserRouter>
);

export default Router;