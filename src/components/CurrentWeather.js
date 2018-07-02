import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CurrentWeather extends Component {
	constructor(props) {
		super(props);
		this.state = {
			favorites: [],
		};

		this.addItem = this.addItem.bind(this);
		this.deleteItem = this.deleteItem.bind(this);
	}

	componentDidMount() {
		localStorage.getItem('favoriteCitys') && this.setState({
			favorites: JSON.parse(localStorage.getItem('favoriteCitys'))
		});
	}

	componentDidUpdate(prevState) {
		if(this.state.favorites !== prevState.favorites) {
			localStorage.setItem('favoriteCitys', JSON.stringify(this.state.favorites));
		}
	}

	addItem() {
		const cityName = this.props.city;
		const favorites = [...this.state.favorites];

		if (this.state.favorites.includes(cityName) === false) {
			favorites.push(cityName);
		}

		this.setState({
			favorites,
		});

		localStorage.setItem('favoriteCitys', JSON.stringify(this.state.favorites));
	}

	deleteItem(name) {
		const list = [...this.state.favorites];
		const updatedList = list.filter(item => item !== name);

		this.setState({ favorites: updatedList });
	}

	isFavorite(city) {
		if(this.state.favorites.includes(city) === false) {
			return(
				<div>
					<i
						className="material-icons favorite__icon"
						onClick={() => this.addItem()}
					>
				star_border
					</i>
				</div>
			);
		} else {
			return(
				<div>
					<i
						className="material-icons favorite__icon"
						onClick={() => this.deleteItem(city)}
					>
				star
					</i>
				</div>
			);
		}
	}

	render() {
		const { city, weatherId, temp, description, wind, humidity } = this.props;
		return (
			<div>
				<div className='weather'>
					<div className='ccard ccard__large'>
						<div className='container__currentWeather'>
							<h4 className='ccard ccard__title'>
								{city}
							</h4>
							{this.isFavorite(city)}
							<img src={`http://openweathermap.org/img/w/${weatherId}.png`} alt='weatherIcon'/>
							<h4>{Math.round(temp)} &#8451;</h4>
							<h5>{description}</h5>
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