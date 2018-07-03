import React, { Component } from 'react';
import { Collapse } from 'react-collapse';
import CurrentWeather from './CurrentWeather';

const APIUrl = 'http://api.openweathermap.org/data/2.5/';
const APIKey = 'appid=51ac1e71f3bb963bdf6c1efe8dd0e33a';

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
		return fetch(`${APIUrl}/weather?q=${value}&${APIKey}&units=metric`)
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
				{this.state.favorites.map((city, index) =>
					<span
						className='favorites'
						key={index}
						onClick={() => this.getCurrentWeather(city)}
					>
						{city}
						<button onClick={() => this.deleteItem(city)}>-</button>
						<div className='favorites__weather'>
							<CurrentWeather
								cityName={cityName}
								temp={temp}
								weatherId={weatherId}
								description={description}
								wind={wind}
								humidity={humidity}
							/>
						</div>
					</span>
				)}
			</div>
		);
	}
}

export default FavoritesTable;