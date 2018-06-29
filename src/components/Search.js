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
			lat: 0,
			lng: 0,
			description: '',
			wind: '',
			humidity: '',
			isMarkerShown: false,
			dataError: true,
		};

		this.updateInput = this.updateInput.bind(this);
		this.getData = this.getData.bind(this);
		this.getDataByLocation = this.getDataByLocation.bind(this);
		// this.delayedShowMarker = this.delayedShowMarker.bind(this);
		this.getLocation = this.getLocation.bind(this);
	}

	componentWillMount() {
		navigator.geolocation.getCurrentPosition(
			position => {
				this.setState({ lat: position.coords.latitude, lng: position.coords.longitude});
			},
			error => console.log(error)
		);
	}

	/* 	componentDidMount() {
		this.delayedShowMarker();
	}

	delayedShowMarker() {
		setTimeout(() => {
			this.getLocation();
			this.setState({
				isMarkerShown: true,
				submit: true,
			});
		}, 1000);
	} */

	updateInput(e) {
		this.setState({
			city: e.target.value
		});
	}

	getLocation() {
		if(navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				position => {
					this.setState({
						lat: position.coords.latitude,
						lng: position.coords.longitude
					});
					this.getDataByLocation();
				});
		} else {
			error => console.log(error);
		}
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
					isMarkerShown: true,
					dataError: true
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
					lat: data.coord.lat,
					lng: data.coord.lon,
					submit: !this.state.submit,
					isMarkerShown: true,
					dataError: true
				});
			})
			.catch(error => {
				this.setState({ dataError: false });
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
			lng,
			isMarkerShown
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
						style={{color: `${this.state.dataError ? 'black' : 'red'}`}}
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
					onClick={this.getLocation}
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
				<div className='map' >
					<Map
						lat={lat}
						lng={lng}
						isMarkerShown={isMarkerShown}
						loadingElement={<div style={{ height: '100%' }} />}
						containerElement={<div style={{ height: '400px' }} />}
						mapElement={<div style={{ height: '100%' }} />}
					/>
				</div>
			</div>
		);
	}
}

export default Search;