import React, { Component } from 'react';
import { Collapse } from 'react-collapse';
import CurrentWeather from './CurrentWeather';


class FavoritesTable extends Component {
	constructor(props) {
		super(props);
		this.state = {
			favorites: JSON.parse(localStorage.getItem('favoriteCitys')) || [],
			weatherId: '',
			cityName: '',
			temp: '',
			description: '',
			wind: '',
			humidity: '',
			isOpened: false,
		};
		this.getCurrentWeather = this.getCurrentWeather.bind(this);
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
					weatherId: data.weather[0].icon,
					cityName: data.name,
					temp: data.main.temp,
					description: data.weather[0].description,
					humidity: data.main.humidity,
					wind: data.wind.speed,
				});
			})
			.catch(error => {
				console.log(error);
			});
	}

	handleClick() {
		this.setState(prevState => ({
			isOpened: !prevState.isOpened
		}));
	}

	render() {
		const { temp,
			cityName,
			weatherId,
			description,
			wind,
			humidity,
		} = this.state;
		return (
			<div className='favorites'>
				<ul className="list-group">
					{this.state.favorites.map((name, index) =>
						<li
							key={index}
							className='list-group-item'
							onClick={() => this.getCurrentWeather(name)}
						>
							{name}
							<button onClick={() => this.deleteItem(name)}>-</button>
							{/* <CurrentWeather
								cityName={cityName}
								temp={temp}
								weatherId={weatherId}
								description={description}
								wind={wind}
								humidity={humidity}
							/> */}
						</li>
					)}
				</ul>
			</div>
		);
	}
}

export default FavoritesTable;