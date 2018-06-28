import React, { Component } from 'react';

import Header from './components/Header';
import Search from './components/Search';
import CurrentWeather from './components/CurrentWeather';
import FavoritesTable from './components/FavoritesTable';

class App extends Component {
	render() {
		return (
			<div className="App">
				<Header />
				<Search />
			</div>
		);
	}
}

export default App;
