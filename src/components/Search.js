import React, { Component } from 'react';
import CurrentWeather from './CurrentWeather';
import Weather from './Weather';
import Map from './Map';

class Search extends Component {
	constructor(props) {
		super(props);
		this.state = {
			city: '',
			temp: '',
			weatherId: '',
			submit: false,
			lat: '',
			lng: '',
			description: '',
			wind: '',
			humidity: '',
		};

		this.updateInput = this.updateInput.bind(this);
		this.getData = this.getData.bind(this);
		this.getDataByLocation = this.getDataByLocation.bind(this);
	}

	componentWillMount() {
		navigator.geolocation.getCurrentPosition(
			position => {
				this.setState({ lat: position.coords.latitude, lng: position.coords.longitude});
			},
			error => console.log(error)
		);
	}

	updateInput(e) {
		this.setState({
			city: e.target.value
		});
	}

	getDataByLocation() {
		return fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${this.state.lat}&lon=${this.state.lng}&appid=51ac1e71f3bb963bdf6c1efe8dd0e33a&units=metric`)
			.then(response => {
				if(!response.ok) {
					throw Error(response.status);
				}
				return response.json();
			})
			.then(data => {
				this.setState({
					temp: data.main.temp,
					weatherId: data.weather[0].icon,
					city: data.name,
					description: data.weather[0].description,
					wind: data.wind.speed,
					humidity: data.main.humidity,
					submit: !this.state.submit,
				});
			})
			.catch(error => {
				console.log(error);
			});
	}

	getData (e) {
		e.preventDefault();

		return fetch(`http://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&appid=51ac1e71f3bb963bdf6c1efe8dd0e33a&units=metric`)
			.then(response => {
				if(!response.ok) {
					throw Error(response.status);
				}
				return response.json();
			})
			.then(data => {
				this.setState({
					temp: data.main.temp,
					weatherId: data.weather[0].icon,
					submit: !this.state.submit
				});
			})
			.catch(error => {
				console.log(error);
			});
	}

	render() {
		const { temp,
			weatherId,
			city,
			submit,
			description,
			wind,
			humidity,
			lat,
			lng
		} = this.state;
		return (
			<div className='search'>
				<form className="form-signin my-2 my-lg-0">
					<input
						className="form-control mr-sm-2 form-signin__size"
						type="search"
						placeholder='Search'
						value={this.state.city}
						onChange={this.updateInput}
					/>
					<button
						className="search__btn btn btn-outline-primary my-2 my-sm-0"
						type="submit"
						onClick={this.getData}
					>
          Search
					</button>
				</form>
				<i
					className="location material-icons"
					onClick={this.getDataByLocation}
				>
        my_location
				</i>
				<Weather
					temp={temp}
					weatherId={weatherId}
					city={city}
					submit={submit}
					description={description}
					wind={wind}
					humidity={humidity}
				/>
				{/* <Map lat={lat} lng={lng}/> */}
			</div>
		);
	}
}

export default Search;