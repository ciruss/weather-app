import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CurrentWeather extends Component {
	render() {
		const { city, weatherId, temp, description, wind, humidity } = this.props;
		return (
			<div>
				<div className='weather'>
					<div className='ccard ccard__large'>
						<div className='container__currentWeather'>
							<h4>{city}</h4>
							<img src={`http://openweathermap.org/img/w/${weatherId}.png`} alt='weatherIcon'/>
							<h4>{Math.round(temp)} &#8451;</h4>
							<h4>{description}</h4>
							<div className='wind'>
								<p>wind: {wind} m/s</p>
								<p>humidity: {humidity} %</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

CurrentWeather.propTypes = {
	city: PropTypes.string.isRequired,
	weatherId: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
};

CurrentWeather.defaultProps = {
	city: '',
	weatherId: '',
	description: '',
};

export default CurrentWeather;

