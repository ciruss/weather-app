import React, { Component } from 'react';
import Weather from './Weather';
import Map from './Map';
import Loader from './Loader';

const API_KEY = process.env.REACT_APP_API_KEY;
const API_URL = process.env.REACT_APP_API_URL;

class Search extends Component {
	state = {
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

	updateInput = e => {
		this.setState({
			input: e.target.value,
		});
	};

	getLocation = e => {
		e.preventDefault();

		this.setState({ isLoading: true });
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				position => {
					this.setState({
						lat: position.coords.latitude,
						lng: position.coords.longitude,
					});
					this.getDataByLocation();
					this.setState({ isLoading: false });
				},
				error => console.log(error),
			);
		}
	};

	getDataByLocation = () => {
		return fetch(
			`${API_URL}weather?lat=${this.state.lat}&lon=${
				this.state.lng
			}&${API_KEY}&units=metric`,
		)
			.then(response => {
				if (!response.ok) {
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
					dataError: false,
				});
			})
			.catch(error => {
				console.log(error);
			});
	};

	getData = e => {
		e.preventDefault();

		return fetch(
			`${API_URL}/weather?q=${this.state.input}&${API_KEY}&units=metric`,
		)
			.then(res => {
				if (!res.ok) {
					throw Error(res.status);
				}
				return res.json();
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
					input: '',
				});
			})
			.catch(error => {
				this.setState({ dataError: true });
				console.log(error);
			});
	};

	render() {
		const {
			input,
			dataError,
			isMarkerShown,
			isLoading,
			...rest
		} = this.state;
		return (
			<div className="search">
				<form className="form-signin my-2 my-lg-0">
					<input
						className="form-control mr-sm-2 form-signin__size"
						type="search"
						placeholder="Search"
						value={input}
						onChange={this.updateInput}
						style={{ color: `${dataError ? 'red' : 'black'}` }}
					/>
					<button
						className="search__btn btn btn-outline-primary my-2 my-sm-0"
						type="submit"
						onClick={this.getData}
					>
						Search
					</button>
					<br />
					<button className="btn__location">
						<i
							className="location material-icons"
							onClick={this.getLocation}
						>
							my_location
						</i>
					</button>
				</form>
				<Weather {...rest} />
				<div className="map">
					{isMarkerShown ? (
						<Map
							{...rest}
							loadingElement={<div style={{ height: '100%' }} />}
							containerElement={
								<div style={{ height: '400px' }} />
							}
							mapElement={<div style={{ height: '100%' }} />}
						/>
					) : null}
				</div>
				{isLoading && <Loader />}
			</div>
		);
	}
}

export default Search;
