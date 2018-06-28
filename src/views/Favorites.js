import React, { Component } from 'react';
import Header from '../components/Header';
import FavoritesTable from '../components/FavoritesTable';

class Favorites extends Component {
	render() {
		return (
			<div>
				<Header />
				<FavoritesTable />
			</div>
		);
	}
}

export default Favorites;