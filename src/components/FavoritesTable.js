import React, { Component } from 'react';
import { Collapse } from 'react-collapse';

import CollapseHandler from './CollapseHandler';

class FavoritesTable extends Component {
	state = {
			favorites: JSON.parse(localStorage.getItem('favoriteCitys')) || [],
	}

	componentDidUpdate(prevState) {
		if (this.state.favorites !== prevState.favorites) {
			localStorage.setItem('favoriteCitys', JSON.stringify(this.state.favorites));
		}
	}

	deleteItem(name) {
		const list = [...this.state.favorites];
		const updatedList = list.filter(item => item !== name);

		this.setState({ favorites: updatedList });
	}

	render() {
		return (
			<div className='favorites'>
				{this.state.favorites.map((city, index) =>
					<CollapseHandler key={index} favorite={city} />
				)}
			</div>
		);
	}
}

export default FavoritesTable;