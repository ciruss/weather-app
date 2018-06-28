import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Header from '../components/Header';
import Search from '../components/Search';


class Home extends Component {
	render() {
		return (
			<React.Fragment>
				<Header />
				<Search />
			</React.Fragment>
		);
	}
}

export default Home;