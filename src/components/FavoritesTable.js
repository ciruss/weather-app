import React, { Component } from 'react';

class FavoritesTable extends Component {
	constructor(props) {
		super(props);
		this.state = {
			favorites: JSON.parse(localStorage.getItem('favoriteCitys')) || [],
			favoritesWeather: [],
		};
		this.getCurrentWeather = this.getCurrentWeather.bind(this);
	}

	/* componentWillUpdate(nextState) {
		localStorage.setItem('favoriteCitys', JSON.stringify(nextState.favorites));
	} */

	deleteItem(id) {
		const list = [...this.state.favorites];
		const updatedList = list.filter(item => item.id !== id);

		this.setState({ favorites: updatedList });
	}

	getCurrentWeather(value) {
		return fetch(`http://api.openweathermap.org/data/2.5/weather?q=${value}&appid=51ac1e71f3bb963bdf6c1efe8dd0e33a&units=metric`)
			.then(response => {
				if(!response.ok) {
					throw Error(response.status);
				}
				return response.json();
			})
			.then(data => {
				this.setState({
					favoritesWeather: data.main.temp,
					weatherId: data.weather[0].icon,
				});
			})
			.catch(error => {
				console.log(error);
			});
	}

	render() {
		return (
			<div className='favorites'>
				<ul className="list-group">
					{this.state.favorites.map(city =>
						<li className='list-group-item'>
							{city.value}
							<button onClick={() => this.deleteItem(city.id)}>-</button>
						</li>
					)}
				</ul>
			</div>
		);
	}
}

export default FavoritesTable;