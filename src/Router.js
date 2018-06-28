import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Home, Favorites, NotFound } from './views';

const Router = () => (
	<BrowserRouter>
		<Switch>
			<Route exact path="/" component={Home} />
			<Route exact path="/favorites" component={Favorites} />
			<Route component={NotFound} />
		</Switch>
	</BrowserRouter>
);

export default Router;