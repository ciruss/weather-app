import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CurrentWeather from './CurrentWeather';

const APIUrl = 'http://api.openweathermap.org/data/2.5/';
const APIKey = 'appid=51ac1e71f3bb963bdf6c1efe8dd0e33a';

class Weather extends Component {
	constructor(props) {
		super(props);
		this.state = {
			forecast: [],
			city: '',
			cityId: '',
			isHidden: true,
		};

		this.getForecast = this.getForecast.bind(this);
	}

	componentDidUpdate(prevProps) {
		if (prevProps.submit !== this.props.submit) {
			this.setState({
				city: this.props.city,
			});
			this.getForecast();
		}
	}

	getForecast () {
		return fetch(`${APIUrl}/forecast?q=${this.props.city}&${APIKey}&units=metric`)
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

	render() {
		return (
			<div>
				{this.state.isHidden ? null :
					<CurrentWeather
						{...this.props}
					/>}
				<div className='forecast forecast__border'>
					{this.state.forecast.map(item =>
						<div key={item.dt} className="ccard forecast__border">
							<div key={item.dt} className="container">
								<img key={item.dt} src={`http://openweathermap.org/img/w/${item.weather[0].icon}.png`} alt='weathericon' />
								<h4>{Math.round(item.main.temp)} &#8451;</h4>
								<p>{item.dt_txt.slice(5, 16)}</p>
							</div>
						</div>
					)}
				</div>
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