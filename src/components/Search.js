import React, { Component } from 'react';
import Weather from './Weather';
import Map from './Map';
import Loader from './Loader';

class Search extends Component {
	constructor(props) {
		super(props);
		this.state = {
			input: '',
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
			dataError: false,
			isLoading: false,
		};

		this.updateInput = this.updateInput.bind(this);
		this.getData = this.getData.bind(this);
		this.getDataByLocation = this.getDataByLocation.bind(this);
		this.getLocation = this.getLocation.bind(this);
	}

	componentDidMount() {
		navigator.geolocation.getCurrentPosition(
			position => {
				this.setState({ lat: position.coords.latitude, lng: position.coords.longitude});
			},
			error => console.log(error)
		);
	}

	updateInput(e) {
		this.setState({
			input: e.target.value
		});
	}

	getLocation() {
		this.setState({ isLoading: true });
		if(navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				position => {
					this.setState({
						lat: position.coords.latitude,
						lng: position.coords.longitude
					});
					this.getDataByLocation();
					this.setState({ isLoading: false });
				},
				error => console.log(error)
			);
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
					dataError: false
				});
			})
			.catch(error => {
				console.log(error);
			});
	}

	getData (e) {
		e.preventDefault();

		return fetch(`http://api.openweathermap.org/data/2.5/weather?q=${this.state.input}&appid=51ac1e71f3bb963bdf6c1efe8dd0e33a&units=metric`)
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
					lat: data.coord.lat,
					lng: data.coord.lon,
					submit: !this.state.submit,
					isMarkerShown: true,
					dataError: false,
				});
			})
			.catch(error => {
				this.setState({ dataError: true });
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
			isMarkerShown,
			isLoading
		} = this.state;
		return (
			<div className='search'>
				<form className="form-signin my-2 my-lg-0">
					<input
						className="form-control mr-sm-2 form-signin__size"
						type="search"
						placeholder='Search'
						value={this.state.input}
						onChange={this.updateInput}
						style={{color: `${this.state.dataError ? 'red' : 'black'}`}}
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
					{isMarkerShown ? <Map
						lat={lat}
						lng={lng}
						isMarkerShown={isMarkerShown}
						loadingElement={<div style={{ height: '100%' }} />}
						containerElement={<div style={{ height: '400px' }} />}
						mapElement={<div style={{ height: '100%' }} />}
					/> : null}
				</div>
				{isLoading && <Loader />}
			</div>
		);
	}
}

export default Search;