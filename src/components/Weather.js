import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CurrentWeather from './CurrentWeather';


class Weather extends Component {
	constructor(props) {
		super(props);
		this.state = {
			newCity: '',
			forecast: [],
			city: '',
			cityId: '',
			localCitys: [],
			isHidden: true,
		};

		this.getForecast = this.getForecast.bind(this);
		this.addItem = this.addItem.bind(this);
	}

	componentWillMount() {
		localStorage.getItem('favoriteCitys') && this.setState({
			localCitys: JSON.parse(localStorage.getItem('favoriteCitys'))
		});
	}

	componentWillUpdate(nextState) {
		if(this.state.newCity === nextState.newCity) {
			localStorage.setItem('favoriteCitys', JSON.stringify(nextState.localCitys));
		}
	}

	componentDidUpdate(prevProps) {
		if (prevProps.submit !== this.props.submit) {
			this.setState({
				city: this.props.city,
			});
			this.getForecast();
		}
	}

	addItem() {
		const newCity = {
			id: this.state.cityId,
			value: this.props.city
		};

		const localCitys = [...this.state.localCitys];

		localCitys.push(newCity);

		this.setState({
			newCity: '',
			localCitys,
		});
	}

	getForecast () {
		return fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${this.props.city}&appid=51ac1e71f3bb963bdf6c1efe8dd0e33a&units=metric`)
			.then(response => {
				if(!response.ok) {
					throw Error(response.status);
				}
				return response.json();
			})
			.then(data => { this.setState({
				forecast: data.list,
				cityId: data.city.id,
				isHidden: false,
			});})
			.catch(error => {
				console.log(error);
			});
	}

	/* 	addToFavorites () {
		if (this.state.localCitys !== [])
			localStorage.setItem('citys', JSON.stringify({ cityId: this.state.city}));
	} */

	render() {
		const { city, temp, weatherId, description, wind, humidity } = this.props;
		return (
			<div>
				{this.state.isHidden ? null :
					<CurrentWeather 
						temp={temp} 
						city={city} 
						weatherId={weatherId}
						description={description}
						wind={wind}
						humidity={humidity}
					/>}
				<div className='forecast forecast__border'>
					{this.state.forecast.map((item, index) =>
						<div className="ccard forecast__border">
							<div className="container">
								<img key={index} src={`http://openweathermap.org/img/w/${item.weather[0].icon}.png`} />
								<h4>{Math.round(item.main.temp)} &#8451;</h4>
								<p>{item.dt_txt.slice(5, 16)}</p>
							</div>
						</div>
					)}
				</div>{/*
				<button onClick={this.addItem}>
					Click away
				</button> */}
			</div>
		);
	}
}

Weather.propTypes = {
	city: PropTypes.string.isRequired,
	submit: PropTypes.bool.isRequired,
	weatherId: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
};

Weather.defaultProps = {
	city: '',
	submit: false,
	weatherId: '',
	description: '',
};

export default Weather;