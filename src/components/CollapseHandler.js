import React, { Component } from 'react';
import Collapse from 'reactstrap/lib/Collapse';
import ListGroupItem from 'reactstrap/lib/ListGroupItem';
import PropTypes from 'prop-types';

import CurrentWeather from './CurrentWeather';

const API_KEY = process.env.REACT_APP_API_KEY;
const API_URL = process.env.REACT_APP_API_URL;

class CollapseHandler extends Component {
	constructor(props) {
		super(props);
		this.state = {
			favorites: JSON.parse(localStorage.getItem('favoriteCitys')) || [],
			isOpened: false,
			weatherId: '',
			temp: '',
			description: '',
			wind: '',
			humidity: '',
		};
		this.toggle = this.toggle.bind(this);
		this.getCurrentWeather = this.getCurrentWeather.bind(this);
	}

	componentDidUpdate(prevState) {
		if (this.state.favorites !== prevState.favorites) {
			localStorage.setItem(
				'favoriteCitys',
				JSON.stringify(this.state.favorites),
			);
		}
	}

	toggle() {
		this.setState({ isOpened: !this.state.isOpened });
	}

	getCurrentWeather(value) {
		return fetch(`${API_URL}/weather?q=${value}&${API_KEY}&units=metric`)
			.then(res => {
				if (!res.ok) {
					throw Error(res.status);
				}
				console.log(res);
				return res.json();
			})
			.then(data => {
				this.setState({
					weatherId: data.weather[0].icon,
					temp: data.main.temp,
					description: data.weather[0].description,
					humidity: data.main.humidity,
					wind: data.wind.speed,
				});
			})
			.catch(error => {
				throw new Error(error);
			});
	}

	render() {
		const { isOpened } = this.state;
		const { favorite } = this.props;
		return (
			<div>
				<h4 onClick={this.toggle}>
					<strong onClick={() => this.getCurrentWeather(favorite)}>
						{favorite}
					</strong>
				</h4>
				<Collapse isOpen={isOpened}>
					<CurrentWeather city={favorite} {...this.state} />
				</Collapse>
			</div>
		);
	}
}

CollapseHandler.propTypes = {
	favorite: PropTypes.string.isRequired,
};

export default CollapseHandler;
