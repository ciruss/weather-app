import React, { Component } from 'react';
import Collapse from 'reactstrap/lib/Collapse';
import ListGroupItem from 'reactstrap/lib/ListGroupItem';
import PropTypes from 'prop-types';

import CurrentWeather from './CurrentWeather';

const APIUrl = 'http://api.openweathermap.org/data/2.5/';
const APIKey = 'appid=51ac1e71f3bb963bdf6c1efe8dd0e33a';

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
		if(this.state.favorites !== prevState.favorites) {
			localStorage.setItem('favoriteCitys', JSON.stringify(this.state.favorites));
		}
	}

	toggle() {
		this.setState({ isOpened: !this.state.isOpened });
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
				console.log(value);
				this.setState({
					weatherId: data.weather[0].icon,
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

	render() {
		// const favorite = this.props;
		return (
			<div>
				<h4 onClick={this.toggle}>
					<strong
						onClick={() => this.getCurrentWeather(this.props.favorite)}
					>{this.props.favorite}</strong>
				</h4>
				<Collapse
					isOpen={this.state.isOpened}
				>
					<CurrentWeather
						city={this.props.favorite}
						{...this.state}
					/>
				</Collapse>
			</div>
		);
	}
}

CollapseHandler.propTypes = {
	favorite: PropTypes.string.isRequired
};

export default CollapseHandler;